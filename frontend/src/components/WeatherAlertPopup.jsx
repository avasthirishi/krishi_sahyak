import React, { useEffect } from 'react';

const SEVERITY_STYLES = {
  danger:  { bg: 'bg-red-600',    icon: '🚨', text: 'text-white', bar: 'bg-red-800'   },
  warning: { bg: 'bg-amber-500',  icon: '⚠️', text: 'text-white', bar: 'bg-amber-700' },
  info:    { bg: 'bg-blue-600',   icon: '🌦️', text: 'text-white', bar: 'bg-blue-800'  }
};

// Plays a short chime using Web Audio API — no audio file required
function playAlertSound(severity) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const patterns = {
      danger:  [{ freq: 880, dur: 0.15 }, { freq: 660, dur: 0.15 }, { freq: 880, dur: 0.3 }],
      warning: [{ freq: 660, dur: 0.2  }, { freq: 880, dur: 0.3 }],
      info:    [{ freq: 523, dur: 0.15 }, { freq: 659, dur: 0.25 }]
    };
    const notes = patterns[severity] || patterns.info;
    let time = ctx.currentTime;
    notes.forEach(({ freq, dur }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time);
      gain.gain.setValueAtTime(0.4, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + dur);
      osc.start(time);
      osc.stop(time + dur);
      time += dur + 0.05;
    });
  } catch {
    // Audio not supported — fail silently
  }
}

export default function WeatherAlertPopup({ popup, onDismiss }) {
  useEffect(() => {
    if (popup) playAlertSound(popup.severity || 'info');
  }, [popup]);

  if (!popup) return null;

  const style = SEVERITY_STYLES[popup.severity] || SEVERITY_STYLES.info;

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-sm w-full animate-slide-up">
      <div className={`${style.bg} ${style.text} rounded-2xl shadow-2xl overflow-hidden`}>
        <div className={`${style.bar} h-1 w-full`} />
        <div className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <span className="text-2xl">{style.icon}</span>
              <div>
                <p className="font-bold text-sm">{popup.title}</p>
                {popup.region && <p className="text-xs opacity-80 mb-1">📍 {popup.region}</p>}
                <p className="text-xs opacity-90 leading-relaxed">{popup.body}</p>
              </div>
            </div>
            <button
              onClick={onDismiss}
              className="text-white/70 hover:text-white text-xl leading-none flex-shrink-0 mt-0.5"
              aria-label="Dismiss"
            >
              ×
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

