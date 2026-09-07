import { ProductGridSkeleton } from '@/components/common/Skeletons';
import { Waves } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-ocean-950 text-slate-100 flex flex-col items-center justify-center p-6 space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 animate-bounce">
        <Waves className="w-8 h-8 stroke-[2.5]" />
      </div>

      <div className="text-center space-y-2 max-w-sm">
        <h2 className="text-xl font-bold text-white tracking-wide">Cargando AQUAPRO Studio...</h2>
        <p className="text-xs text-slate-400">
          Sincronizando catálogo técnico y especificaciones homologadas FINA.
        </p>
      </div>

      <div className="w-full max-w-5xl mx-auto opacity-40 pointer-events-none mt-8">
        <ProductGridSkeleton />
      </div>
    </div>
  );
}
