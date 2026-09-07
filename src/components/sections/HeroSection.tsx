import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Zap, Award } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 bg-gradient-to-b from-ocean-950 via-ocean-900 to-ocean-950">
      {/* Decorative Cyan Glow Blur */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: AIDA / FAB Copy */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Attention Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold tracking-wide uppercase">
              <Zap className="w-4 h-4 fill-cyan-400" />
              <span>Tecnología de Hidrodinámica Avanzada 2026</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
              Rediseña tu deslizamiento.{' '}
              <span className="text-gradient-cyan">Domina cada centésima.</span>
            </h1>

            {/* FAB Copy (Features, Advantages, Benefits) */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-normal">
              No vendemos solo trajes o antiparras: entregamos la reducción del <strong className="text-cyan-300 font-semibold">99.8% del arrastre laminar</strong>. Siente la compresión graduada que sostiene tu postura corporal óptima durante los 50 o 1500 metros sin fricción ni fatiga.
            </p>

            {/* Value Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-3.5 rounded-xl bg-ocean-800/40 border border-slate-800">
                <div className="text-cyan-400 font-bold text-lg">0.02s</div>
                <div className="text-xs text-slate-400 mt-0.5">Mejora media en reactividad en partidas</div>
              </div>
              <div className="p-3.5 rounded-xl bg-ocean-800/40 border border-slate-800">
                <div className="text-cyan-400 font-bold text-lg">300h+</div>
                <div className="text-xs text-slate-400 mt-0.5">Resistencia garantizada al cloro activo</div>
              </div>
              <div className="p-3.5 rounded-xl bg-ocean-800/40 border border-slate-800">
                <div className="text-cyan-400 font-bold text-lg">World Aquatics</div>
                <div className="text-xs text-slate-400 mt-0.5">Homologación FINA para torneos oficiales</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <Link
                href="#catalogo"
                className="py-4 px-8 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-extrabold rounded-xl transition-all shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-2 group text-base"
              >
                Explorar Equipamiento de Competición
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#tecnologia"
                className="py-4 px-6 bg-ocean-800/80 hover:bg-ocean-800 border border-slate-700 text-slate-200 hover:text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <Award className="w-4 h-4 text-cyan-400" />
                Certificación FINA
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Visual with priority next/image */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto w-full max-w-md lg:max-w-none aspect-[4/5] rounded-3xl overflow-hidden glass-panel p-2 shadow-2xl border-cyan-500/30">
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=1200&q=85"
                  alt="Nadador técnico en acción con antiparras de competición AQUAPRO Studio"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ocean-950/90 via-transparent to-transparent" />

                {/* Overlaid Float Card */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl glass-panel text-slate-100 border border-cyan-400/30 flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-cyan-400/20 text-cyan-400 shrink-0">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xs font-bold uppercase tracking-wider text-cyan-400">FINA Approved Gear</h2>
                    <p className="text-sm font-medium text-white">Probado en natatorios olímpicos y aguas abiertas.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
