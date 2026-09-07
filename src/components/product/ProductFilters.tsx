'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Category, CategoryId } from '@/lib/types';
import { Filter, SlidersHorizontal, Check } from 'lucide-react';

interface ProductFiltersProps {
  categories: Category[];
  currentCategory: CategoryId;
  currentSort: string;
  finaOnly: boolean;
}

export function ProductFilters({
  categories,
  currentCategory,
  currentSort,
  finaOnly,
}: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategoryChange = (catId: CategoryId) => {
    const params = new URLSearchParams(searchParams.toString());
    if (catId === 'all') {
      params.delete('category');
    } else {
      params.set('category', catId);
    }
    router.push(`/?${params.toString()}#catalogo`, { scroll: false });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    const value = e.target.value;
    if (value === 'featured') {
      params.delete('sort');
    } else {
      params.set('sort', value);
    }
    router.push(`/?${params.toString()}#catalogo`, { scroll: false });
  };

  const handleFinaToggle = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (finaOnly) {
      params.delete('fina');
    } else {
      params.set('fina', 'true');
    }
    router.push(`/?${params.toString()}#catalogo`, { scroll: false });
  };

  return (
    <div className="space-y-6">
      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const isActive = currentCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 focus:ring-2 focus:ring-cyan-400 ${
                isActive
                  ? 'bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/20 scale-105'
                  : 'bg-ocean-800/60 hover:bg-ocean-800 text-slate-300 border border-slate-800'
              }`}
              aria-label={`Filtrar por ${cat.name}`}
            >
              {cat.name}
              {cat.badge && (
                <span
                  className={`px-1.5 py-0.5 rounded text-[10px] uppercase font-extrabold ${
                    isActive ? 'bg-slate-950 text-cyan-400' : 'bg-cyan-500/20 text-cyan-400'
                  }`}
                >
                  {cat.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Controls Bar: Sort & FINA Only Checkbox */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-ocean-800/40 border border-slate-800">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
          <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
          <span>Filtros Activos</span>
        </div>

        <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
          {/* FINA Approved Toggle */}
          <button
            onClick={handleFinaToggle}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
              finaOnly
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                : 'bg-ocean-950 border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
          >
            <div
              className={`w-4 h-4 rounded flex items-center justify-center border ${
                finaOnly ? 'bg-cyan-400 border-cyan-400 text-slate-950' : 'border-slate-600'
              }`}
            >
              {finaOnly && <Check className="w-3 h-3 stroke-[3]" />}
            </div>
            Solo Homologados FINA
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <label htmlFor="sort-select" className="text-xs text-slate-400 whitespace-nowrap">
              Ordenar por:
            </label>
            <select
              id="sort-select"
              value={currentSort}
              onChange={handleSortChange}
              className="px-3 py-1.5 text-xs bg-ocean-950 border border-slate-700 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
            >
              <option value="featured">Destacados</option>
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
              <option value="rating">Mejor Valorados</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
