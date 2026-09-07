export function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl bg-ocean-900 border border-slate-800 p-4 space-y-4 animate-pulse">
      <div className="w-full aspect-square bg-slate-800/60 rounded-xl" />
      <div className="h-4 bg-slate-800/60 rounded w-1/3" />
      <div className="h-6 bg-slate-800/60 rounded w-3/4" />
      <div className="h-4 bg-slate-800/60 rounded w-1/2" />
      <div className="flex items-center justify-between pt-2 border-t border-slate-800">
        <div className="h-6 bg-slate-800/60 rounded w-1/4" />
        <div className="w-10 h-10 bg-slate-800/60 rounded-xl" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 my-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
