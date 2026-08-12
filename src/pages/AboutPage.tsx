import { Building2, Sparkles, ShieldCheck, Flame, Layers, Clock } from 'lucide-react';
import { GlassPanel } from '../components/shared/GlassPanel';

export function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-12">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
          ABOUT NIMBUS KITCHENS
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-white">Reimagining Food Delivery Architecture</h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Nimbus Kitchens is a multi-brand virtual kitchen platform built to eliminate delivery fatigue and fragmented ordering.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassPanel className="p-6 space-y-3">
          <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 w-fit">
            <Building2 className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-lg text-white">Centralized Physical Hub</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Our 8,000 sq ft Koramangala facility houses specialized cooking pods for Indian tandoors, Asian woks, American smash grilles, and gourmet baking.
          </p>
        </GlassPanel>

        <GlassPanel className="p-6 space-y-3">
          <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400 w-fit">
            <Layers className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-lg text-white">Parallel Cooking Engine</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            When you order a Biryani from Dawat and a Burger from Crave, kitchen display systems route tickets instantly to both stations simultaneously.
          </p>
        </GlassPanel>

        <GlassPanel className="p-6 space-y-3">
          <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 w-fit">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-lg text-white">Thermal Sealed Single Delivery</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Items pass quality seal audits at the dispatch dock before being consolidated into 1 thermal bag for 1 express delivery driver.
          </p>
        </GlassPanel>
      </div>
    </div>
  );
}
