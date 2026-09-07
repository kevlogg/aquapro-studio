'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export interface FAQItem {
  question: string;
  answer: string;
}

export const FAQS: FAQItem[] = [
  {
    question: '¿Qué significa la aprobación FINA / World Aquatics en los productos AQUAPRO?',
    answer: 'La acreditación oficial de World Aquatics (anteriormente FINA) certifica que la prenda o accesorio cumple con las normativas internacionales estrictas de permeabilidad, espesor, flotabilidad neutra y diseño técnico exigidas para competir en torneos oficiales y campeonatos mundiales.',
  },
  {
    question: '¿Cómo elijo el talle correcto de mi malla de competición TechSuit?',
    answer: 'Para trajes de competición se recomienda elegir un talle inferior al de entrenamiento diario. El tejido de compresión graduada debe quedar ceñido al cuerpo sin pliegues en la ingle o escápula para lograr una compresión hidrodinámica eficiente.',
  },
  {
    question: '¿Cómo mantengo el tratamiento antiniebla de las antiparras HydroSpecular?',
    answer: 'Nunca frotes el interior de los lentes con los dedos o toallas. Enjuaga las antiparras con agua dulce fría inmediatamente después de cada entrenamiento para eliminar el cloro y déjalas secar a la sombra.',
  },
  {
    question: '¿Cuáles son los tiempos de envío y la política de cambios?',
    answer: 'Ofrecemos envío express prioritario de 24 a 48 horas hábiles. Todos nuestros productos cuentan con garantía de satisfacción y cambio de talle sin costo adicional dentro de los primeros 30 días posteriores a la recepción.',
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-ocean-900/40 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            <span>Resolución de Dudas</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white">Preguntas Frecuentes</h2>
          <p className="text-slate-400 text-sm">
            Respuestas de nuestro equipo técnico sobre normativas, talles y cuidado del equipamiento.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-ocean-900 border border-slate-800 transition-colors overflow-hidden"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-white text-base hover:text-cyan-300 transition-colors focus:ring-2 focus:ring-cyan-400 rounded-2xl"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-cyan-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
