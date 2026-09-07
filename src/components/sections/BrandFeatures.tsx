import { Zap, ShieldCheck, Award, Truck } from 'lucide-react';

export function BrandFeatures() {
  return (
    <section className="py-12 bg-ocean-900/60 border-t border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature 1 */}
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-ocean-950/60 border border-slate-800/80 hover:border-cyan-500/30 transition-colors">
            <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Hidrodinámica Pura</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Reducción comprobada del 99.8% del arrastre laminar sobre el cuerpo.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-ocean-950/60 border border-slate-800/80 hover:border-cyan-500/30 transition-colors">
            <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Durabilidad AquaResist</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Más de 300 horas continuas de resistencia al cloro sin perder elastano.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-ocean-950/60 border border-slate-800/80 hover:border-cyan-500/30 transition-colors">
            <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">FINA / World Aquatics</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Homologación oficial para competir en torneos nacionales e internacionales.
              </p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-ocean-950/60 border border-slate-800/80 hover:border-cyan-500/30 transition-colors">
            <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Envío Express & Cambios</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Despacho prioritario en 24hs y 30 días de garantía de talle sin costo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
