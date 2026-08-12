interface VegNonVegDotProps {
  isVeg: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function VegNonVegDot({ isVeg, size = 'md' }: VegNonVegDotProps) {
  const outerSizeMap = {
    sm: 'w-3.5 h-3.5 border',
    md: 'w-4.5 h-4.5 border-2',
    lg: 'w-5 h-5 border-2',
  };

  const innerSizeMap = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-2.5 h-2.5',
  };

  return (
    <div
      className={`inline-flex items-center justify-center rounded-sm shrink-0 ${
        outerSizeMap[size]
      } ${
        isVeg
          ? 'border-emerald-500 text-emerald-500'
          : 'border-rose-600 text-rose-600'
      }`}
      title={isVeg ? 'Pure Vegetarian' : 'Non-Vegetarian'}
    >
      <div
        className={`rounded-full ${innerSizeMap[size]} ${
          isVeg ? 'bg-emerald-500' : 'bg-rose-600'
        }`}
      />
    </div>
  );
}
