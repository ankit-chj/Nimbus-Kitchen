import { LucideIcon, Sparkles } from 'lucide-react';
import { GlassPanel } from './GlassPanel';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon: Icon = Sparkles,
  title,
  description,
  actionText,
  onAction,
}: EmptyStateProps) {
  return (
    <GlassPanel className="p-12 text-center max-w-md mx-auto space-y-4 my-8">
      <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
        <Icon className="w-8 h-8" />
      </div>
      <div className="space-y-1">
        <h3 className="font-extrabold text-xl text-white">{title}</h3>
        <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">{description}</p>
      </div>
      {actionText && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-extrabold text-xs shadow-lg shadow-amber-500/20 hover:brightness-110 cursor-pointer"
        >
          {actionText}
        </button>
      )}
    </GlassPanel>
  );
}
