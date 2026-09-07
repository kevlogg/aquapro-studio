'use client';

import { useState } from 'react';
import { Product } from '@/lib/types';
import { ProductCard } from './ProductCard';
import { ProductDetailModal } from './ProductDetailModal';
import { Waves } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  if (products.length === 0) {
    return (
      <div className="p-12 rounded-3xl bg-ocean-900/50 border border-slate-800 text-center space-y-4 my-8">
        <div className="w-16 h-16 rounded-full bg-slate-800/80 text-cyan-400 flex items-center justify-center mx-auto">
          <Waves className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-white">No se encontraron productos</h3>
        <p className="text-sm text-slate-400 max-w-md mx-auto">
          No hay equipamiento que coincida con los filtros seleccionados. Intenta restablecer los términos de búsqueda o cambiar la categoría.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 my-8">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onQuickView={(p) => setSelectedProduct(p)}
          />
        ))}
      </div>

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
}
