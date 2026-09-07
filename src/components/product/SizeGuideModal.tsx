'use client';

import { X, Ruler, ShieldAlert } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryName: string;
}

export function SizeGuideModal({ isOpen, onClose, categoryName }: SizeGuideModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-ocean-900 border border-cyan-500/30 rounded-2xl p-6 text-slate-100 shadow-2xl z-10 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg font-bold text-white">Guía Oficial de Talles & Medidas</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors"
            aria-label="Cerrar guía de talles"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-xs text-cyan-300 flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <span>
              <strong>Recomendación Técnica AQUAPRO:</strong> Para mallas de competición (TechSuits FINA Approved), se recomienda elegir 1 talle por debajo de tu talle de entrenamiento habitual para maximizar la compresión hidrodinámica.
            </span>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-ocean-950 text-cyan-400 font-bold uppercase border-b border-slate-800">
                <tr>
                  <th className="p-3">Talle AQUAPRO</th>
                  <th className="p-3">Cintura (cm)</th>
                  <th className="p-3">Pecho (cm)</th>
                  <th className="p-3">Cadera (cm)</th>
                  <th className="p-3">Altura (cm)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr>
                  <td className="p-3 font-bold text-white">XS / 65</td>
                  <td className="p-3">63 - 67</td>
                  <td className="p-3">78 - 82</td>
                  <td className="p-3">84 - 88</td>
                  <td className="p-3">155 - 165</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">S / 70</td>
                  <td className="p-3">68 - 72</td>
                  <td className="p-3">83 - 87</td>
                  <td className="p-3">89 - 93</td>
                  <td className="p-3">166 - 173</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">M / 75</td>
                  <td className="p-3">73 - 77</td>
                  <td className="p-3">88 - 92</td>
                  <td className="p-3">94 - 98</td>
                  <td className="p-3">174 - 180</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">L / 80</td>
                  <td className="p-3">78 - 82</td>
                  <td className="p-3">93 - 97</td>
                  <td className="p-3">99 - 103</td>
                  <td className="p-3">181 - 187</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">XL / 85</td>
                  <td className="p-3">83 - 87</td>
                  <td className="p-3">98 - 102</td>
                  <td className="p-3">104 - 108</td>
                  <td className="p-3">188 - 195</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="pt-2 text-xs text-slate-400 leading-relaxed">
            <p><strong>¿Cómo medir correctamente?</strong></p>
            <ul className="list-disc list-inside space-y-1 mt-1 text-slate-300">
              <li><strong>Cintura:</strong> Mide horizontalmente alrededor de la parte más estrecha del abdomen.</li>
              <li><strong>Cadera:</strong> Mide alrededor del punto más ancho de los glúteos estando de pie con los pies juntos.</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 text-right">
          <button
            onClick={onClose}
            className="py-2 px-6 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold rounded-xl text-xs transition-colors"
          >
            Entendido, volver al producto
          </button>
        </div>
      </div>
    </div>
  );
}
