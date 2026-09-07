import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ShieldCheck, Sparkles } from 'lucide-react';

interface CategoryCard {
  id: string;
  name: string;
  tagline: string;
  count: string;
  image: string;
  badge: string;
  href: string;
}

const CATEGORY_CARDS: CategoryCard[] = [
  {
    id: 'mallas',
    name: 'Mallas de Competición',
    tagline: 'Compresión muscular 3D & Repelencia Nano-Hidrofóbica',
    count: 'FINA Approved',
    image: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?auto=format&fit=crop&w=800&q=80',
    badge: 'TechSuit Series',
    href: '/?category=mallas#catalogo',
  },
  {
    id: 'antiparras',
    name: 'Antiparras Tácticas',
    tagline: 'Lentes espejadas 180° & Sellado antiniebla HydroFog™',
    count: 'Pro Optics',
    image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=800&q=80',
    badge: 'HydroSpecular',
    href: '/?category=antiparras#catalogo',
  },
  {
    id: 'gorros',
    name: 'Gorros 3D Silicona',
    tagline: 'Inyección anatómica sin costuras ni pliegues de arrastre',
    count: '3D Molded',
    image: 'https://images.unsplash.com/photo-1560090995-019306dfc786?auto=format&fit=crop&w=800&q=80',
    badge: 'Dome 3D Cap',
    href: '/?category=gorros#catalogo',
  },
  {
    id: 'accesorios',
    name: 'Accesorios de Entreno',
    tagline: 'Tablas de EVA, tubos frontales y mochilas de malla 45L',
    count: 'Training Pro',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
    badge: 'Performance Gear',
    href: '/?category=accesorios#catalogo',
  },
];

export function CategoryShowcase() {
  return (
    <section id="categorias" className="py-16 md:py-20 bg-ocean-950 border-t border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Colección Especializada</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Explora por Categoría Técnica
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Equipamiento diseñado para optimizar tu biomecánica en cada fase de la natación.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORY_CARDS.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              className="group relative rounded-3xl overflow-hidden aspect-[4/5] bg-ocean-900 border border-slate-800 hover:border-cyan-400/60 transition-all duration-500 shadow-xl flex flex-col justify-end p-6"
            >
              {/* Background Image */}
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-75"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-ocean-950 via-ocean-950/40 to-transparent" />

              {/* Top Tag */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                <span className="px-2.5 py-1 rounded-lg bg-ocean-950/80 backdrop-blur-md border border-cyan-500/30 text-cyan-300 text-[10px] font-bold uppercase tracking-wider">
                  {cat.badge}
                </span>
                <div className="w-8 h-8 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0 group-hover:translate-y-0 translate-x-2 -translate-y-2">
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                </div>
              </div>

              {/* Content Box */}
              <div className="relative z-10 space-y-2">
                <span className="text-[11px] text-cyan-400 font-bold tracking-wider uppercase flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> {cat.count}
                </span>
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed opacity-90">
                  {cat.tagline}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
