import Link from 'next/link';
import { Waves, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-ocean-950 text-slate-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full p-8 rounded-3xl bg-ocean-900 border border-slate-800 text-center space-y-6 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto">
          <Waves className="w-8 h-8 stroke-[2.5]" />
        </div>

        <div className="space-y-2">
          <h1 className="text-5xl font-extrabold text-cyan-400">404</h1>
          <h2 className="text-xl font-bold text-white">Página fuera de curso</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            El enlace al que intentas acceder no existe o ha sido reubicado en nuestro catálogo.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-lg shadow-cyan-500/20"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al Catálogo Principal
        </Link>
      </div>
    </div>
  );
}
