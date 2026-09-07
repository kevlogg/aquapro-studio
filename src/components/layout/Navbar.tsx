'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ShoppingBag, Search, Menu, X, Waves, ShieldCheck, Truck, Zap } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export function Navbar() {
  const { totalItems, openCart } = useCart();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState<string>(searchParams.get('search') || '');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (searchQuery.trim()) {
      params.set('search', searchQuery.trim());
    } else {
      params.delete('search');
    }
    router.push(`/?${params.toString()}#catalogo`, { scroll: false });
  };

  return (
    <div className="sticky top-0 z-40 w-full">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-ocean-950 via-cyan-500/20 to-ocean-950 border-b border-cyan-500/20 py-2 px-4 text-center text-xs font-semibold text-slate-200 flex items-center justify-center gap-4">
        <span className="flex items-center gap-1.5 text-cyan-300">
          <Truck className="w-3.5 h-3.5" /> ENVÍO EXPRESS EN 24/48HS
        </span>
        <span className="hidden sm:inline text-slate-500">•</span>
        <span className="hidden sm:inline-flex items-center gap-1 text-slate-300">
          <Zap className="w-3.5 h-3.5 text-cyan-400" /> HASTA 6 CUOTAS SIN INTERÉS
        </span>
        <span className="hidden md:inline text-slate-500">•</span>
        <span className="hidden md:inline text-cyan-400 font-bold">
          GARANTÍA DE CAMBIO DE TALLE 30 DÍAS
        </span>
      </div>

      {/* Main E-Commerce Header */}
      <header className="glass-panel border-b border-cyan-500/20 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-lg p-1"
            aria-label="AQUAPRO Studio - Ir a la tienda"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 via-cyan-500 to-ocean-800 flex items-center justify-center text-slate-950 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <Waves className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-wider text-white flex items-center gap-1">
                AQUAPRO <span className="text-cyan-400 font-light">STUDIO</span>
              </span>
              <span className="block text-[10px] text-cyan-400/90 tracking-widest uppercase -mt-1 font-bold">
                HIGH PERFORMANCE SWIMWEAR
              </span>
            </div>
          </Link>

          {/* E-Commerce Links - Desktop */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-200">
            <Link href="#categorias" className="hover:text-cyan-400 transition-colors">
              Categorías
            </Link>
            <Link href="#catalogo" className="hover:text-cyan-400 transition-colors">
              Catálogo
            </Link>
            <Link href="#tecnologia" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
              Tecnología FINA
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            </Link>
            <Link href="#testimonios" className="hover:text-cyan-400 transition-colors">
              Atletas
            </Link>
            <Link href="#faq" className="hover:text-cyan-400 transition-colors">
              FAQ
            </Link>
          </nav>

          {/* Search Bar & Cart Trigger */}
          <div className="flex items-center gap-3">
            <form onSubmit={handleSearchSubmit} className="relative hidden sm:block w-48 lg:w-64">
              <input
                type="search"
                placeholder="Buscar antiparras, mallas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-ocean-950/90 border border-slate-700 focus:border-cyan-400 rounded-full text-slate-200 placeholder-slate-500 focus:outline-none transition-colors shadow-inner"
                aria-label="Buscar productos en la tienda"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
            </form>

            {/* Cart Button */}
            <button
              onClick={openCart}
              className="relative p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-400/40 hover:bg-cyan-400 hover:text-slate-950 text-cyan-400 transition-all focus:ring-2 focus:ring-cyan-400 shadow-md group"
              aria-label={`Abrir carrito de compras. Contiene ${totalItems} artículos.`}
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-cyan-400 text-slate-950 font-extrabold text-[11px] flex items-center justify-center animate-pulse shadow-md">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white md:hidden rounded-lg"
              aria-label="Abrir menú de navegación móvil"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800 bg-ocean-950 p-4 space-y-4 shadow-2xl">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="search"
                placeholder="Buscar antiparras, mallas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-sm bg-ocean-900 border border-slate-700 rounded-lg text-white"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </form>

            <nav className="flex flex-col space-y-3 text-slate-200 text-base font-medium">
              <Link
                href="#categorias"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 hover:bg-ocean-800 rounded-lg"
              >
                Categorías Destacadas
              </Link>
              <Link
                href="#catalogo"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 hover:bg-ocean-800 rounded-lg"
              >
                Catálogo Completo
              </Link>
              <Link
                href="#tecnologia"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 hover:bg-ocean-800 rounded-lg"
              >
                Tecnología FINA Approved
              </Link>
              <Link
                href="#testimonios"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 hover:bg-ocean-800 rounded-lg"
              >
                Atletas & Testimonios
              </Link>
              <Link
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 hover:bg-ocean-800 rounded-lg"
              >
                Preguntas Frecuentes
              </Link>
            </nav>
          </div>
        )}
      </header>
    </div>
  );
}
