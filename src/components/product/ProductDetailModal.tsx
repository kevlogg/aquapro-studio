'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/lib/types';
import { X, Star, ShieldCheck, ShoppingCart, Check, Info, Truck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { SizeGuideModal } from './SizeGuideModal';
import { addToCartAction } from '@/actions/cart';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [activeImage, setActiveImage] = useState<string>('');
  const [showSizeGuide, setShowSizeGuide] = useState<boolean>(false);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  if (!product) return null;

  const currentSize = selectedSize || product.sizes[0]?.code || 'UNI';
  const currentColor = selectedColor || product.colors[0]?.name || 'Estándar';
  const currentImg = activeImage || product.image;

  const handleFormAddToCart = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append('productId', product.slug);

    const res = await addToCartAction(null, formData);
    if (res.success && res.data) {
      addItem(product, res.data.selectedSize, res.data.selectedColor, res.data.quantity);
      setActionFeedback(res.message);
      setTimeout(() => setActionFeedback(null), 3000);
    } else {
      setActionFeedback(res.message);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4" role="dialog" aria-modal="true">
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md" onClick={onClose} />

        <div className="relative w-full max-w-4xl bg-ocean-900 border border-cyan-500/30 rounded-3xl p-6 lg:p-8 text-slate-100 shadow-2xl z-10 max-h-[90vh] overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white bg-ocean-950 rounded-full border border-slate-800 transition-colors z-20"
            aria-label="Cerrar modal de producto"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Gallery Column */}
            <div className="space-y-4">
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-ocean-950 border border-slate-800">
                <Image
                  src={currentImg}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                {product.finaApproved && (
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-ocean-950/90 border border-cyan-400/40 text-cyan-300 font-extrabold text-xs flex items-center gap-1.5 shadow-lg">
                    <ShieldCheck className="w-4 h-4 text-cyan-400" /> FINA Approved
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              <div className="flex items-center gap-3">
                {[product.image, product.secondaryImage].map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(imgUrl)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      currentImg === imgUrl ? 'border-cyan-400 scale-105' : 'border-slate-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image src={imgUrl} alt={`Vista ${idx + 1}`} fill className="object-cover" sizes="80px" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details & Purchase Form */}
            <div className="space-y-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span className="font-semibold text-cyan-400">{product.categoryName}</span>
                  <div className="flex items-center gap-1 text-amber-400 font-bold">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span>{product.rating}</span>
                    <span className="text-slate-500 font-normal">({product.reviewsCount} reseñas)</span>
                  </div>
                </div>

                <h2 className="text-2xl lg:text-3xl font-extrabold text-white">{product.name}</h2>
                <p className="text-sm text-slate-300 mt-1 leading-relaxed">{product.tagline}</p>

                <div className="flex items-baseline gap-3 mt-3">
                  <span className="text-3xl font-extrabold text-white">${product.price.toFixed(2)} USD</span>
                  {product.originalPrice && (
                    <span className="text-sm text-slate-500 line-through">${product.originalPrice.toFixed(2)} USD</span>
                  )}
                  <span className="px-2.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold text-xs">
                    {product.hydrodynamicGrade}
                  </span>
                </div>
              </div>

              {actionFeedback && (
                <div className="p-3 rounded-xl bg-cyan-500/20 border border-cyan-400 text-cyan-200 text-xs font-semibold flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400" />
                  {actionFeedback}
                </div>
              )}

              {/* Form Integrated with Server Action */}
              <form onSubmit={handleFormAddToCart} className="space-y-4">
                {/* Size Selector */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      Selecciona Talle: <span className="text-cyan-400">{currentSize}</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowSizeGuide(true)}
                      className="text-xs text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
                    >
                      <Info className="w-3.5 h-3.5" /> Guía de Medidas
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((sz) => {
                      const isSel = currentSize === sz.code;
                      return (
                        <button
                          key={sz.code}
                          type="button"
                          disabled={!sz.inStock}
                          onClick={() => setSelectedSize(sz.code)}
                          className={`py-2 px-4 rounded-xl text-xs font-bold border transition-all ${
                            isSel
                              ? 'bg-cyan-400 text-slate-950 border-cyan-400 font-extrabold'
                              : sz.inStock
                              ? 'bg-ocean-950 text-slate-300 border-slate-700 hover:border-slate-500'
                              : 'bg-ocean-950/40 text-slate-600 border-slate-800 line-through cursor-not-allowed'
                          }`}
                        >
                          {sz.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Color Selector */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    Color: <span className="text-cyan-400">{currentColor}</span>
                  </label>
                  <div className="flex items-center gap-3">
                    {product.colors.map((clr) => {
                      const isSel = currentColor === clr.name;
                      return (
                        <button
                          key={clr.name}
                          type="button"
                          onClick={() => setSelectedColor(clr.name)}
                          className={`flex items-center gap-2 p-1.5 rounded-xl border text-xs transition-all ${
                            isSel ? 'border-cyan-400 bg-cyan-500/10 text-white' : 'border-slate-800 text-slate-400'
                          }`}
                        >
                          <span
                            className="w-4 h-4 rounded-full border border-slate-700"
                            style={{ backgroundColor: clr.hex }}
                          />
                          <span className="font-semibold">{clr.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Hidden Fields for Server Action */}
                <input type="hidden" name="selectedSize" value={currentSize} />
                <input type="hidden" name="selectedColor" value={currentColor} />
                <input type="hidden" name="quantity" value={1} />

                {/* CTA Buttons */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 px-6 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-extrabold rounded-2xl text-base transition-all shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Añadir al Carrito de Compras
                  </button>
                </div>
              </form>

              <div className="pt-3 border-t border-slate-800 flex items-center gap-4 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-cyan-400" />
                  <span>Envío Gratis &gt; $100 USD</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>Garantía de Ajuste 30 días</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SizeGuideModal
        isOpen={showSizeGuide}
        onClose={() => setShowSizeGuide(false)}
        categoryName={product.categoryName}
      />
    </>
  );
}
