import { Flame } from 'lucide-react';

interface SpiceLevelProps {
  level: number; // 0, 1, 2, 3
}

export function SpiceLevelIndicator({ level }: SpiceLevelProps) {
  if (level <= 0) return null;

  const labels = ['', 'Mild Spice', 'Medium Spice', 'Extra Hot'];

  return (
    <div className="inline-flex items-center gap-0.5 text-amber-500" title={labels[level]}>
      {Array.from({ length: level }).map((_, i) => (
        <Flame key={i} className="w-3.5 h-3.5 fill-amber-500/30 text-amber-500" />
      ))}
    </div>
  );
}
