import { Link } from 'react-router-dom';
import { Utensils, Home } from 'lucide-react';
import { GlassPanel } from '../components/shared/GlassPanel';

export function NotFoundPage() {
  return (
    <div className="max-w-md mx-auto px-4 py-32 text-center">
      <GlassPanel className="p-8 space-y-4">
        <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
          <Utensils className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-black text-white">404 - Page Not Found</h1>
        <p className="text-xs text-slate-400 leading-relaxed">
          The culinary route you requested does not exist in our cloud kitchen hub.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-500 text-slate-950 font-black text-xs hover:bg-amber-400 transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
      </GlassPanel>
    </div>
  );
}
