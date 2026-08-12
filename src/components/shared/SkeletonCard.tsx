export function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3 animate-pulse">
      <div className="h-40 bg-white/10 rounded-xl w-full" />
      <div className="h-5 bg-white/10 rounded w-3/4" />
      <div className="h-4 bg-white/10 rounded w-1/2" />
      <div className="flex justify-between pt-2">
        <div className="h-4 bg-white/10 rounded w-1/4" />
        <div className="h-4 bg-white/10 rounded w-1/4" />
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
