import { useState, useEffect, useCallback, useRef } from 'react';
import api from '../services/api';
import { requestNotificationPermission, onForegroundMessage } from '../firebase';

export function useWeatherAlerts() {
  const [alerts, setAlerts] = useState([]);
  const [popup, setPopup] = useState(null);
  const shownAlertIds = useRef(new Set()); // track already-shown alert IDs

  const loadAlerts = useCallback(async () => {
    try {
      const res = await api.get('/admin/weather-alerts');
      const incoming = res.data.data.alerts || [];
      setAlerts(incoming);

      // Only show popup for an alert that hasn't been shown yet this session
      const unshown = incoming.filter(a => !shownAlertIds.current.has(a.id));
      if (unshown.length > 0) {
        const worst = [...unshown].sort((a, b) => {
          const order = { danger: 0, warning: 1, info: 2 };
          return (order[a.severity] ?? 3) - (order[b.severity] ?? 3);
        })[0];
        shownAlertIds.current.add(worst.id);
        setPopup({ title: worst.title, body: worst.message, severity: worst.severity, region: worst.region });
      }
    } catch {
      // Fail silently — weather alerts are non-critical
    }
  }, []);

  // Request Firebase permission once (non-blocking)
  useEffect(() => {
    requestNotificationPermission().catch(() => {});
  }, []);

  // Listen for foreground Firebase push messages
  useEffect(() => {
    const unsubscribe = onForegroundMessage(({ title, body }) => {
      setPopup({ title, body, severity: 'warning' });
    });
    return unsubscribe;
  }, []);

  // Load on mount, then poll every 10 minutes (not 5 — less noisy)
  useEffect(() => {
    loadAlerts();
    const interval = setInterval(loadAlerts, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, [loadAlerts]);

  return { alerts, popup, dismissPopup: () => setPopup(null) };
}

