'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Error no capturado en la aplicación:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-ocean-950 text-slate-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full p-8 rounded-3xl bg-ocean-900 border border-cyan-500/30 text-center space-y-6 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-extrabold text-white">Algo no salió según lo esperado</h1>
          <p className="text-xs text-slate-400 leading-relaxed">
            Se ha producido un error inesperado al procesar la solicitud. Nuestro equipo técnico ha sido notificado.
          </p>
          {error.digest && (
            <p className="text-[10px] text-cyan-400/80 font-mono pt-1">Código de referencia: {error.digest}</p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="flex-1 py-3 px-4 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" /> Reintentar Carga
          </button>
          <Link
            href="/"
            className="py-3 px-4 bg-ocean-950 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" /> Ir al Inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
