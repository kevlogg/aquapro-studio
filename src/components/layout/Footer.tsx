'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Waves, Mail, ArrowRight, ShieldCheck, CheckCircle2, Lock } from 'lucide-react';
import { subscribeNewsletterAction } from '@/actions/newsletter';
import { trackSubscribeNewsletter } from '@/lib/analytics/events';

export function Footer() {
  const [newsletterState, setNewsletterState] = useState<{
    success?: boolean;
    message?: string;
    errors?: Record<string, string[]>;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleNewsletterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    formData.append('consentAccepted', 'true');

    const res = await subscribeNewsletterAction(null, formData);
    setIsSubmitting(false);
    setNewsletterState(res);

    if (res.success && res.data) {
      trackSubscribeNewsletter(res.data.subscribedEmail);
    }
  };

  return (
    <footer className="bg-ocean-950 border-t border-slate-800 text-slate-300 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-slate-950 shadow-md">
                <Waves className="w-6 h-6 stroke-[2.5]" />
              </div>
              <span className="text-xl font-extrabold tracking-wider text-white">
                AQUAPRO <span className="text-cyan-400 font-light">STUDIO</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Marca enterprise de indumentaria y equipamiento de natación de alto rendimiento. Diseñado bajo ingeniería hidrodinámica y estándares homologados por World Aquatics.
            </p>
            <div className="flex items-center gap-2 text-xs text-cyan-400 font-semibold">
              <ShieldCheck className="w-4 h-4" /> WCAG 2.1 AA Compliant & SSL Secured
            </div>
          </div>

          {/* Nav Column 1 */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Catálogo Técnico</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/?category=antiparras#catalogo" className="hover:text-cyan-400 transition-colors">Antiparras Tácticas</Link></li>
              <li><Link href="/?category=mallas#catalogo" className="hover:text-cyan-400 transition-colors">Mallas de Competición</Link></li>
              <li><Link href="/?category=gorros#catalogo" className="hover:text-cyan-400 transition-colors">Gorros 3D Silicona</Link></li>
              <li><Link href="/?category=accesorios#catalogo" className="hover:text-cyan-400 transition-colors">Accesorios de Entreno</Link></li>
            </ul>
          </div>

          {/* Nav Column 2 */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Institucional</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="#tecnologia" className="hover:text-cyan-400 transition-colors">Tecnología FINA</Link></li>
              <li><Link href="#testimonios" className="hover:text-cyan-400 transition-colors">Atletas & Patrocinios</Link></li>
              <li><Link href="#faq" className="hover:text-cyan-400 transition-colors">Preguntas Frecuentes</Link></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Términos & Privacidad</a></li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-cyan-400" /> Newsletter
            </h4>
            <p className="text-xs text-slate-400">
              Recibe lanzamientos exclusivos y guías de técnica en tu email.
            </p>

            {newsletterState?.success ? (
              <div className="p-3 rounded-xl bg-cyan-500/20 border border-cyan-400 text-cyan-300 text-xs flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-cyan-400" />
                <span>{newsletterState.message}</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="tu@email.com"
                    className="w-full px-3 py-2 pr-9 text-xs bg-ocean-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 rounded-lg transition-colors"
                    aria-label="Suscribirse al newsletter"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                {newsletterState?.errors?.email && (
                  <p className="text-[11px] text-red-400">{newsletterState.errors.email[0]}</p>
                )}
                <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                  <Lock className="w-3 h-3" /> Sin spam. Cancela cuando quieras.
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Rights */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} AQUAPRO Studio. Todos los derechos reservados.</p>
          <div className="flex items-center gap-6">
            <span>WCAG 2.1 AA</span>
            <span>World Aquatics Standard</span>
            <span>GDPR Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
