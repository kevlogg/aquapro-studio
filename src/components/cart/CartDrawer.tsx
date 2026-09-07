'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, CheckCircle2, Lock, ShieldCheck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { processCheckoutAction } from '@/actions/checkout';
import { trackBeginCheckout } from '@/lib/analytics/events';

export function CartDrawer() {
  const { cart, isOpen, closeCart, removeItem, updateQuantity, clearCart, totalItems, subtotal } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);
  const [checkoutStatus, setCheckoutStatus] = useState<{ success: boolean; message: string; orderId?: string } | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleStartCheckout = () => {
    trackBeginCheckout(totalItems, subtotal);
    setIsCheckingOut(true);
  };

  const handleCheckoutSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    const formData = new FormData(e.currentTarget);
    formData.append('acceptTerms', 'true');

    const response = await processCheckoutAction(null, formData);
    setIsPending(false);

    if (response.success && response.data) {
      setCheckoutStatus({
        success: true,
        message: response.message,
        orderId: response.data.orderId,
      });
      clearCart();
    } else {
      setCheckoutStatus({
        success: false,
        message: response.message || 'Error en el checkout',
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true" aria-labelledby="cart-title">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-ocean-900 border-l border-cyan-500/20 text-slate-100 flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-cyan-400" />
              <h2 id="cart-title" className="text-lg font-bold text-white tracking-wide">
                Tu Carrito ({totalItems})
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Cerrar carrito"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Checkout Completed View */}
          {checkoutStatus?.success ? (
            <div className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-white">¡Orden Confirmada!</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{checkoutStatus.message}</p>
              <div className="p-4 rounded-xl bg-ocean-800/80 border border-cyan-500/30 w-full text-left">
                <p className="text-xs text-cyan-400 font-mono">CÓDIGO DE SEGUIMIENTO:</p>
                <p className="text-lg font-bold text-white tracking-wider">{checkoutStatus.orderId}</p>
                <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" /> Envío prioritario AQUAPRO Express
                </p>
              </div>
              <button
                onClick={() => {
                  setCheckoutStatus(null);
                  setIsCheckingOut(false);
                  closeCart();
                }}
                className="w-full py-3 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold rounded-xl transition-colors mt-4"
              >
                Volver a la Tienda
              </button>
            </div>
          ) : isCheckingOut ? (
            /* Checkout Form View */
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base font-semibold text-cyan-400 flex items-center gap-1.5">
                  <Lock className="w-4 h-4" /> Datos de Envío & Pago
                </h3>
                <button
                  onClick={() => setIsCheckingOut(false)}
                  className="text-xs text-slate-400 hover:text-white underline"
                >
                  Volver al carrito
                </button>
              </div>

              {checkoutStatus?.success === false && (
                <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/40 text-red-200 text-xs">
                  {checkoutStatus.message}
                </div>
              )}

              <form onSubmit={handleCheckoutSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Nombre Completo</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    placeholder="Ej. Mateo Fernández"
                    className="w-full px-3 py-2 bg-ocean-950 border border-slate-700 rounded-lg text-sm text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Correo Electrónico</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="mateo@ejemplo.com"
                    className="w-full px-3 py-2 bg-ocean-950 border border-slate-700 rounded-lg text-sm text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Teléfono</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+54 11 1234-5678"
                    className="w-full px-3 py-2 bg-ocean-950 border border-slate-700 rounded-lg text-sm text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Dirección de Entrega</label>
                  <input
                    type="text"
                    name="address"
                    required
                    placeholder="Calle, Número, Piso/Depto"
                    className="w-full px-3 py-2 bg-ocean-950 border border-slate-700 rounded-lg text-sm text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Ciudad</label>
                    <input
                      type="text"
                      name="city"
                      required
                      placeholder="Buenos Aires"
                      className="w-full px-3 py-2 bg-ocean-950 border border-slate-700 rounded-lg text-sm text-white focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Código Postal</label>
                    <input
                      type="text"
                      name="postalCode"
                      required
                      placeholder="C1425"
                      className="w-full px-3 py-2 bg-ocean-950 border border-slate-700 rounded-lg text-sm text-white focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Método de Pago</label>
                  <select
                    name="paymentMethod"
                    className="w-full px-3 py-2 bg-ocean-950 border border-slate-700 rounded-lg text-sm text-white focus:border-cyan-400 focus:outline-none"
                  >
                    <option value="credit_card">Tarjeta de Crédito / Débito (Encintada de Seguridad)</option>
                    <option value="mercadopago">MercadoPago Express</option>
                    <option value="transfer">Transferencia Bancaria Directa</option>
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full py-3 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 text-slate-950 font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    {isPending ? 'Procesando Pago Seguro...' : `Pagar $${subtotal.toFixed(2)} USD`}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* Cart Items List View */
            <>
              {cart.length === 0 ? (
                <div className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-slate-800 text-slate-500 flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h3 className="text-base font-semibold text-white">Tu carrito está vacío</h3>
                  <p className="text-xs text-slate-400 max-w-xs">
                    Explora nuestra colección técnica de antiparras, mallas de competición y gorros de silicona.
                  </p>
                </div>
              ) : (
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {cart.map((item) => (
                    <div
                      key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                      className="flex gap-4 p-3 rounded-xl bg-ocean-800/50 border border-slate-800 hover:border-cyan-500/30 transition-colors"
                    >
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-ocean-950">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-white truncate">{item.product.name}</h4>
                        <p className="text-xs text-cyan-400 mt-0.5">
                          Talle: <span className="font-semibold text-slate-200">{item.selectedSize}</span> | Color:{' '}
                          <span className="font-semibold text-slate-200">{item.selectedColor}</span>
                        </p>
                        <p className="text-sm font-bold text-slate-100 mt-1">${item.product.price.toFixed(2)} USD</p>

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-slate-700 rounded-lg bg-ocean-950">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity - 1)}
                              className="p-1 hover:text-cyan-400 text-slate-400 transition-colors"
                              aria-label="Disminuir cantidad"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-2 text-xs font-semibold text-white">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity + 1)}
                              className="p-1 hover:text-cyan-400 text-slate-400 transition-colors"
                              aria-label="Aumentar cantidad"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(item.product.id, item.selectedSize)}
                            className="p-1 text-slate-500 hover:text-red-400 transition-colors"
                            aria-label="Eliminar producto"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Cart Footer / Summary */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-slate-800 bg-ocean-950 space-y-3">
                  <div className="flex items-center justify-between text-sm text-slate-300">
                    <span>Subtotal</span>
                    <span className="font-bold text-white text-base">${subtotal.toFixed(2)} USD</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-cyan-400">
                    <span>Envío Express</span>
                    <span>{subtotal >= 100 ? '¡GRATIS!' : '$12.00 USD'}</span>
                  </div>

                  <button
                    onClick={handleStartCheckout}
                    className="w-full py-3.5 px-4 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 group"
                  >
                    Procesar Compra
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
