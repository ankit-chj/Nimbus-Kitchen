import React, { useState, useEffect } from 'react';
import { Clock, AlertTriangle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Order } from '../../types';
import { GlassPanel } from '../shared/GlassPanel';
import { PriceTag } from '../shared/PriceTag';
import { useOpsStore } from '../../store/useOpsStore';

export interface KanbanCardProps {
  order: Order;
  key?: React.Key;
}

export function KanbanCard({ order }: KanbanCardProps) {
  const advanceStatus = useOpsStore((s) => s.advanceOrderStatus);
  const [elapsedSecs, setElapsedSecs] = useState(0);

  useEffect(() => {
    const placedTime = new Date(order.placedAt).getTime();
    const updateTimer = () => {
      const now = Date.now();
      setElapsedSecs(Math.max(0, Math.floor((now - placedTime) / 1000)));
    };
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [order.placedAt]);

  const mins = Math.floor(elapsedSecs / 60);
  const secs = elapsedSecs % 60;
  const isSlaBreached = mins >= 15;

  const getNextActionLabel = (status: Order['currentStatus']) => {
    switch (status) {
      case 'placed':
        return 'Start Prep';
      case 'preparing':
        return 'Send to Tandoor/Wok';
      case 'cooking':
        return 'Seal & Pack';
      case 'packed':
        return 'Hand to Rider';
      case 'out_for_delivery':
        return 'Mark Delivered';
      default:
        return 'Complete';
    }
  };

  return (
    <GlassPanel
      className={`p-4 space-y-3 relative transition-all ${
        isSlaBreached ? 'border-rose-500/70 shadow-[0_0_20px_rgba(244,63,94,0.25)]' : ''
      }`}
    >
      {/* Top Header: ID & Timer */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
        <div>
          <span className="font-mono font-extrabold text-sm text-amber-400 block">{order.id}</span>
          <span className="text-[10px] text-slate-400 font-bold uppercase">{order.brandName}</span>
        </div>

        <div
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-mono font-bold tabular-nums border ${
            isSlaBreached
              ? 'bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse'
              : 'bg-white/5 text-slate-300 border-white/10'
          }`}
        >
          {isSlaBreached ? (
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
          ) : (
            <Clock className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
          )}
          <span>
            {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Item List */}
      <div className="space-y-1.5 text-xs text-slate-200">
        {order.items.map((it, idx) => (
          <div key={idx} className="flex justify-between items-start gap-2">
            <div>
              <span className="font-extrabold text-amber-400 mr-1.5">{it.qty}x</span>
              <span>{it.name}</span>
              {it.customizations && it.customizations.length > 0 && (
                <p className="text-[10px] text-slate-400 pl-5">
                  {it.customizations.join(', ')}
                </p>
              )}
            </div>
            <PriceTag amount={it.lineTotal} className="text-slate-400 text-[11px]" />
          </div>
        ))}
      </div>

      {/* Customer Info */}
      <div className="pt-2 border-t border-white/10 text-[11px] text-slate-400 flex items-center justify-between">
        <span>Customer: <strong className="text-slate-200">{order.customerName}</strong></span>
        <PriceTag amount={order.total} className="text-amber-400 font-extrabold text-xs" />
      </div>

      {/* Click-to-Advance Status CTA */}
      {order.currentStatus !== 'delivered' && (
        <motion.button
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={() => advanceStatus(order.id)}
          className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-indigo-600 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 hover:brightness-110 shadow-md cursor-pointer mt-2"
        >
          <span>{getNextActionLabel(order.currentStatus)}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </motion.button>
      )}
    </GlassPanel>
  );
}
