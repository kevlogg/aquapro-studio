'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ShoppingBag, Search, Menu, X, Waves, ShieldCheck } from 'lucide-react';
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
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-cyan-500/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-lg p-1"
          aria-label="AQUAPRO Studio - Ir a la página principal"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-slate-950 shadow-md group-hover:scale-105 transition-transform">
            <Waves className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-wider text-white flex items-center gap-1">
              AQUAPRO <span className="text-cyan-400 font-light">STUDIO</span>
            </span>
            <span className="block text-[10px] text-slate-400 tracking-widest uppercase -mt-1 font-semibold">
              SWIM EQUIPMENT
            </span>
          </div>
        </Link>

        {/* Navigation Links - Desktop */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <Link href="#catalogo" className="hover:text-cyan-400 transition-colors">
            Catálogo Técnico
          </Link>
          <Link href="#tecnologia" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
            Tecnología FINA
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
          </Link>
          <Link href="#testimonios" className="hover:text-cyan-400 transition-colors">
            Atletas & Testimonios
          </Link>
          <Link href="#faq" className="hover:text-cyan-400 transition-colors">
            Preguntas Frecuentes
          </Link>
        </nav>

        {/* Search Bar & Cart Trigger */}
        <div className="flex items-center gap-3">
          <form onSubmit={handleSearchSubmit} className="relative hidden sm:block w-48 lg:w-64">
            <input
              type="search"
              placeholder="Buscar equipamiento..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-ocean-950/80 border border-slate-700 focus:border-cyan-400 rounded-full text-slate-200 placeholder-slate-500 focus:outline-none transition-colors"
              aria-label="Buscar productos en la tienda"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
          </form>

          {/* Cart Button */}
          <button
            onClick={openCart}
            className="relative p-2.5 rounded-xl bg-ocean-800/80 border border-cyan-500/30 hover:border-cyan-400 text-cyan-400 hover:text-white transition-colors focus:ring-2 focus:ring-cyan-400"
            aria-label={`Abrir carrito de compras. Contiene ${totalItems} artículos.`}
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-cyan-400 text-slate-950 font-extrabold text-[11px] flex items-center justify-center animate-pulse">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
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
        <div className="md:hidden border-t border-slate-800 bg-ocean-900/95 p-4 space-y-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="search"
              placeholder="Buscar antiparras, mallas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm bg-ocean-950 border border-slate-700 rounded-lg text-white"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </form>

          <nav className="flex flex-col space-y-3 text-slate-200 text-base font-medium">
            <Link
              href="#catalogo"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 hover:bg-ocean-800 rounded-lg"
            >
              Catálogo Técnico
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
  );
}
