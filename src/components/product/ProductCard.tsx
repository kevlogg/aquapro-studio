'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/lib/types';
import { Star, ShieldCheck, Eye, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { trackSelectItem } from '@/lib/analytics/events';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { addItem } = useCart();
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const defaultSize = product.sizes[0]?.code || 'UNI';
  const defaultColor = product.colors[0]?.name || 'Estándar';

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product, defaultSize, defaultColor, 1);
  };

  const handleSelect = () => {
    trackSelectItem(product);
    onQuickView(product);
  };

  return (
    <div
      onClick={handleSelect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative rounded-2xl bg-ocean-900 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 overflow-hidden flex flex-col cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-cyan-500/10"
    >
      {/* Image Container */}
      <div className="relative aspect-square w-full bg-ocean-950 overflow-hidden">
        <Image
          src={isHovered ? product.secondaryImage : product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="flex flex-col gap-1">
            {product.isNew && (
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-400 text-slate-950 font-extrabold text-[10px] uppercase tracking-wider shadow-md">
                Novedad 2026
              </span>
            )}
            {product.isBestSeller && (
              <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-extrabold text-[10px] uppercase tracking-wider shadow-md">
                Más Vendido
              </span>
            )}
          </div>

          {product.finaApproved && (
            <span className="px-2.5 py-1 rounded-lg bg-ocean-950/80 backdrop-blur-md border border-cyan-400/40 text-cyan-300 font-bold text-[10px] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" /> FINA
            </span>
          )}
        </div>

        {/* Hover Quick View Overlay Action */}
        <div className="absolute inset-0 bg-ocean-950/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleSelect();
            }}
            className="py-2.5 px-4 rounded-xl bg-slate-900/90 hover:bg-slate-950 border border-slate-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-lg"
          >
            <Eye className="w-4 h-4 text-cyan-400" /> Vista Rápida
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>{product.categoryName}</span>
            <div className="flex items-center gap-1 text-amber-400 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{product.rating}</span>
              <span className="text-slate-500 font-normal">({product.reviewsCount})</span>
            </div>
          </div>

          <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">{product.tagline}</p>
        </div>

        {/* Pricing & Add Button */}
        <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-extrabold text-white">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-xs text-slate-500 line-through">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>
            <span className="text-[10px] text-cyan-400 font-medium">{product.hydrodynamicGrade}</span>
          </div>

          <button
            onClick={handleQuickAdd}
            className="p-2.5 rounded-xl bg-cyan-400/10 hover:bg-cyan-400 text-cyan-400 hover:text-slate-950 border border-cyan-500/30 transition-all font-bold focus:ring-2 focus:ring-cyan-300"
            aria-label={`Añadir ${product.name} al carrito`}
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
