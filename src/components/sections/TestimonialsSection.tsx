import Image from 'next/image';
import { Star, Quote, Award } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  club: string;
  discipline: string;
  avatar: string;
  quote: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Camila Rossi',
    role: 'Nadadora Federada Máster',
    club: 'Club Atlético Universitario',
    discipline: '100m y 200m Mariposa',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    quote: 'Las antiparras HydroSpecular Pro Mirror cambiaron radicalmente mis vueltas olímpicas. Cero entrada de agua durante los virajes intensos y la visibilidad en natatorio cubierto es cristalina.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Lucas Benítez',
    role: 'Atleta de Aguas Abiertas & Triatlón',
    club: 'AquaTri Performance Team',
    discipline: '10K Aguas Abiertas',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    quote: 'El traje TechSuit Carbon ofrece la compresión exacta en los muslos sin restringir la patada. Bajé mi marca personal en 4 segundos en el último campeonato nacional.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Dra. Sofía Peralta',
    role: 'Entrenadora Máster & Biomecánica',
    club: 'Federación Metropolitana',
    discipline: 'Técnica de Cromo y Espalda',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    quote: 'Recomiendo a todos mis atletas el gorro Dome 3D. La ausencia de pliegues en la parte posterior reduce la turbulencia donde más importa. Calidad de nivel olímpico.',
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonios" className="py-20 bg-ocean-950 border-t border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <Award className="w-4 h-4" />
            <span>Social Proof & Testimonios</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Avalado por la élite de la natación
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Nadadores federados, másters y triatletas confían en la precisión técnica de AQUAPRO Studio para superar sus límites.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-3xl bg-ocean-900 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between shadow-xl relative"
            >
              <Quote className="w-10 h-10 text-cyan-500/20 absolute top-6 right-6" />

              <div className="space-y-4 relative z-10">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-slate-300 text-sm italic leading-relaxed">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3 pt-6 mt-6 border-t border-slate-800">
                <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-cyan-400/40">
                  <Image src={item.avatar} alt={item.name} fill className="object-cover" sizes="48px" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{item.name}</h3>
                  <p className="text-xs text-cyan-400 font-medium">{item.role}</p>
                  <p className="text-[11px] text-slate-400">{item.club} · {item.discipline}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
