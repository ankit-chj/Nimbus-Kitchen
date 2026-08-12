import { useState, useEffect } from 'react';
import { Clock, Layers, AlertTriangle, RefreshCw, Flame } from 'lucide-react';
import { useOpsStore } from '../store/useOpsStore';
import { OpsSidebar } from '../components/ops/OpsSidebar';
import { KanbanCard } from '../components/ops/KanbanCard';
import { GlassPanel } from '../components/shared/GlassPanel';
import { SkeletonGrid } from '../components/shared/SkeletonCard';
import { Order } from '../types';

export function OpsQueuePage() {
  const activeOrders = useOpsStore((s) => s.activeOrders);
  const loading = useOpsStore((s) => s.loading);
  const fetchOpsData = useOpsStore((s) => s.fetchOpsData);
  const stations = useOpsStore((s) => s.stations);

  useEffect(() => {
    fetchOpsData();
  }, [fetchOpsData]);

  const columns: { key: Order['currentStatus']; label: string; color: string }[] = [
    { key: 'placed', label: '1. New Received', color: 'border-blue-500/40 text-blue-400' },
    { key: 'preparing', label: '2. Prep Station', color: 'border-amber-500/40 text-amber-400' },
    { key: 'cooking', label: '3. Tandoor & Wok', color: 'border-orange-500/40 text-orange-400' },
    { key: 'packed', label: '4. Quality Packed', color: 'border-indigo-500/40 text-indigo-400' },
    { key: 'out_for_delivery', label: '5. Dispatch Rider', color: 'border-cyan-500/40 text-cyan-400' },
  ];

  return (
    <div className="flex h-screen bg-[#08090D] overflow-hidden">
      <OpsSidebar />

      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Ops Header */}
        <header className="p-5 border-b border-white/10 bg-[#0F111A] flex items-center justify-between shrink-0">
          <div>
            <h1 className="text-xl font-black text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-500" />
              Live Kitchen KDS Queue
            </h1>
            <p className="text-xs text-slate-400">
              Parallel ticket dispatch across 5 virtual brand cooking stations.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={fetchOpsData}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Refresh KDS Stream"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>KDS STREAM LIVE</span>
            </div>
          </div>
        </header>

        {/* Station Capacity Overview Bar */}
        <div className="px-6 py-3 bg-white/[0.02] border-b border-white/10 flex items-center justify-between gap-4 overflow-x-auto shrink-0">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 shrink-0">Station Loads:</span>
          <div className="flex items-center gap-4 text-xs font-mono">
            {stations.map((st) => (
              <div key={st.id} className="flex items-center gap-1.5 shrink-0">
                <span className="text-slate-300 font-bold">{st.name}:</span>
                <span className={`font-black ${st.loadPercent >= 80 ? 'text-rose-400' : 'text-amber-400'}`}>
                  {st.loadPercent}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Kanban Board Container */}
        <div className="flex-1 p-6 overflow-x-auto overflow-y-hidden">
          {loading ? (
            <SkeletonGrid count={5} />
          ) : (
            <div className="grid grid-cols-5 gap-4 h-full min-w-[1200px]">
              {columns.map((col) => {
                const columnOrders = activeOrders.filter((o) => o.currentStatus === col.key);

                return (
                  <div key={col.key} className="flex flex-col h-full bg-white/[0.02] border border-white/10 rounded-2xl p-3 overflow-hidden">
                    <div className={`flex items-center justify-between pb-3 border-b border-white/10 ${col.color}`}>
                      <span className="font-extrabold text-xs uppercase tracking-wider">{col.label}</span>
                      <span className="px-2 py-0.5 rounded-full bg-white/10 text-white font-mono font-bold text-xs">
                        {columnOrders.length}
                      </span>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-3 pt-3 pr-1">
                      {columnOrders.length === 0 ? (
                        <div className="h-full flex items-center justify-center text-center p-4 text-slate-600 text-xs">
                          No active tickets
                        </div>
                      ) : (
                        columnOrders.map((order) => (
                          <KanbanCard key={order.id} order={order} />
                        ))
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
