import { AlertTriangle, RefreshCw } from 'lucide-react';
import { GlassPanel } from './GlassPanel';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = 'Failed to load content',
  message = 'There was a temporary error connecting to Nimbus Kitchens cloud service. Please try again.',
  onRetry,
}: ErrorStateProps) {
  return (
    <GlassPanel className="p-10 text-center max-w-md mx-auto space-y-4 border-rose-500/30 my-8">
      <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto">
        <AlertTriangle className="w-7 h-7" />
      </div>
      <div className="space-y-1">
        <h3 className="font-extrabold text-lg text-white">{title}</h3>
        <p className="text-xs text-slate-400 leading-relaxed">{message}</p>
      </div>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Retry Connection</span>
        </button>
      )}
    </GlassPanel>
  );
}
