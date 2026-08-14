// Firebase configuration — credentials loaded from .env (VITE_FIREBASE_*)
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage, isSupported } from 'firebase/messaging';

const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID
};

export const VAPID_KEY = import.meta.env.VITE_FIREBASE_VAPID_KEY || '';

// Only initialize if all required config values are present
const isConfigured = Object.values(firebaseConfig).every(v => v && v.length > 0);

const app = isConfigured ? initializeApp(firebaseConfig) : null;

// Lazy messaging instance — resolved once on first use
let _messaging = null;
async function getMessagingInstance() {
  if (!app) return null;
  if (_messaging) return _messaging;
  try {
    const supported = await isSupported();
    if (!supported) return null;
    _messaging = getMessaging(app);
    return _messaging;
  } catch {
    return null;
  }
}

export async function requestNotificationPermission() {
  try {
    const messaging = await getMessagingInstance();
    if (!messaging) return null;
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') return null;
    return await getToken(messaging, { vapidKey: VAPID_KEY });
  } catch {
    return null;
  }
}

export function onForegroundMessage(callback) {
  // Returns an unsubscribe fn; resolves async without blocking render
  let unsubscribe = () => {};
  getMessagingInstance().then(messaging => {
    if (!messaging) return;
    unsubscribe = onMessage(messaging, (payload) => {
      callback({
        title: payload.notification?.title || 'Weather Alert',
        body:  payload.notification?.body  || '',
        data:  payload.data || {}
      });
    });
  }).catch(() => {});
  return () => unsubscribe();
}

export default app;
