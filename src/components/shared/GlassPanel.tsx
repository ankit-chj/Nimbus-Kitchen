import React from 'react';
import { cn } from '../../lib/cn';

export interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  hoverEffect?: boolean;
  intensity?: 'light' | 'normal' | 'heavy';
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  key?: React.Key;
}

export function GlassPanel({
  children,
  className,
  hoverEffect = false,
  intensity = 'normal',
  onClick,
  ...props
}: GlassPanelProps) {
  const backdropMap = {
    light: 'backdrop-blur-md',
    normal: 'backdrop-blur-xl',
    heavy: 'backdrop-blur-2xl',
  };

  const bgStyle = 'bg-white/[0.05] border-white/10 text-white shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]';

  const hoverStyle = hoverEffect
    ? 'transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/40 hover:bg-white/[0.08] hover:shadow-[0_12px_40px_0_rgba(255,107,53,0.15)]'
    : '';

  return (
    <div
      onClick={onClick}
      className={cn(
        'rounded-2xl border',
        backdropMap[intensity],
        bgStyle,
        hoverStyle,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
