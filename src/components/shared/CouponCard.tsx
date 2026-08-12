import React, { useState } from 'react';
import { Copy, Check, Tag } from 'lucide-react';
import { Offer } from '../../types';
import { GlassPanel } from './GlassPanel';
import { useCartStore } from '../../store/useCartStore';

export interface CouponCardProps {
  offer: Offer;
  key?: React.Key;
}

export function CouponCard({ offer }: CouponCardProps) {
  const [copied, setCopied] = useState(false);
  const applyOffer = useCartStore((s) => s.applyOffer);
  const appliedOffer = useCartStore((s) => s.appliedOffer);

  const isApplied = appliedOffer?.id === offer.id;

  const handleCopy = () => {
    navigator.clipboard.writeText(offer.code);
    applyOffer(offer);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <GlassPanel hoverEffect className="p-5 flex flex-col justify-between h-full relative overflow-hidden border-dashed border-amber-500/40">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-extrabold bg-amber-500/20 text-amber-400 border border-amber-500/30">
            {offer.code}
          </span>
          {offer.isPopular && (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              POPULAR
            </span>
          )}
        </div>

        <h3 className="font-extrabold text-lg text-white">{offer.title}</h3>
        <p className="text-xs text-slate-300 leading-relaxed">{offer.description}</p>
      </div>

      <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs">
        <span className="text-slate-400">Min Order: ₹{offer.minOrderValue}</span>

        <button
          type="button"
          onClick={handleCopy}
          className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
            isApplied || copied
              ? 'bg-emerald-500 text-white'
              : 'bg-amber-500 text-slate-950 hover:bg-amber-400'
          }`}
        >
          {copied || isApplied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Applied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Apply Code</span>
            </>
          )}
        </button>
      </div>
    </GlassPanel>
  );
}
