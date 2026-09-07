'use client';

import { useState, useEffect } from 'react';
import { ShieldCheck, Cookie, Check, X } from 'lucide-react';
import { getSavedConsent, updateConsentState } from '@/lib/analytics/events';
import { ConsentState } from '@/lib/types';

export function ConsentBanner() {
  const [showBanner, setShowBanner] = useState<boolean>(false);
  const [consent, setConsent] = useState<ConsentState | null>(null);

  useEffect(() => {
    const saved = getSavedConsent();
    setConsent(saved);
    if (!saved.hasChoiceBeenMade) {
      setShowBanner(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const updated = updateConsentState({
      ad_storage: 'granted',
      analytics_storage: 'granted',
      functionality_storage: 'granted',
    });
    setConsent(updated);
    setShowBanner(false);
  };

  const handleDenyOptional = () => {
    const updated = updateConsentState({
      ad_storage: 'denied',
      analytics_storage: 'denied',
      functionality_storage: 'granted',
    });
    setConsent(updated);
    setShowBanner(false);
  };

  if (!showBanner || !consent) return null;

  return (
    <aside
      aria-label="Gestión de Privacidad y Cookies"
      role="dialog"
      aria-live="polite"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 p-5 rounded-2xl glass-panel text-slate-100 shadow-2xl border border-cyan-500/30 animate-fade-in"
    >
      <div className="flex items-start gap-3">
        <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 shrink-0">
          <Cookie className="w-6 h-6" aria-hidden="true" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-base text-white flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              Privacidad & Consentimiento
            </h3>
            <button
              onClick={handleDenyOptional}
              className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
              aria-label="Cerrar aviso de cookies"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
            Utilizamos cookies esenciales y analítica desacoplada para optimizar la experiencia hidrodinámica en AQUAPRO Studio. Puedes aceptar todas o limitar la recolección.
          </p>

          <div className="flex flex-col sm:flex-row gap-2 mt-4">
            <button
              onClick={handleAcceptAll}
              className="flex-1 py-2 px-3 text-xs font-semibold rounded-lg bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-colors flex items-center justify-center gap-1.5 focus:ring-2 focus:ring-cyan-300"
            >
              <Check className="w-3.5 h-3.5" />
              Aceptar Todo
            </button>
            <button
              onClick={handleDenyOptional}
              className="py-2 px-3 text-xs font-semibold rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors border border-slate-700 focus:ring-2 focus:ring-slate-400"
            >
              Solo Esenciales
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
