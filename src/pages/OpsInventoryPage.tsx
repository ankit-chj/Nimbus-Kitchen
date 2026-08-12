import { useEffect } from 'react';
import { Package, AlertTriangle } from 'lucide-react';
import { useOpsStore } from '../store/useOpsStore';
import { OpsSidebar } from '../components/ops/OpsSidebar';
import { GlassPanel } from '../components/shared/GlassPanel';

export function OpsInventoryPage() {
  const inventory = useOpsStore((s) => s.inventory);
  const fetchOpsData = useOpsStore((s) => s.fetchOpsData);
  const restockItem = useOpsStore((s) => s.restockItem);

  useEffect(() => {
    fetchOpsData();
  }, [fetchOpsData]);

  const lowStockItems = inventory.filter((inv) => inv.status === 'low' || inv.status === 'critical');

  return (
    <div className="flex h-screen bg-[#08090D] overflow-hidden">
      <OpsSidebar />

      <main className="flex-1 overflow-y-auto p-8 space-y-8">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Package className="w-6 h-6 text-amber-500" />
            Inventory & Raw Material Stock
          </h1>
          <p className="text-xs text-slate-400">
            Real-time stock alerts for dairy, meats, spices, and packaging supplies.
          </p>
        </div>

        {/* Low Stock Warning Banner */}
        {lowStockItems.length > 0 && (
          <div className="p-4 rounded-2xl bg-rose-500/15 border border-rose-500/40 text-rose-300 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-bold">
              <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
              <span>{lowStockItems.length} items below minimum threshold (e.g. Amul Butter, Thermal Bags)</span>
            </div>
          </div>
        )}

        {/* Inventory Table */}
        <GlassPanel className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="border-b border-white/10 text-slate-400 uppercase text-[10px] font-bold">
                <tr>
                  <th className="py-3">Ingredient / Item</th>
                  <th className="py-3">Category</th>
                  <th className="py-3">Current Quantity</th>
                  <th className="py-3">Min Threshold</th>
                  <th className="py-3">Status</th>
                  <th className="py-3 text-right">Quick Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {inventory.map((item) => {
                  const isLow = item.status === 'low' || item.status === 'critical';
                  return (
                    <tr key={item.id}>
                      <td className="py-3.5 font-extrabold text-white">{item.name}</td>
                      <td className="py-3.5 text-amber-400 font-bold capitalize">{item.category}</td>
                      <td className="py-3.5 font-mono font-bold text-slate-200">
                        {item.currentStock} {item.unit}
                      </td>
                      <td className="py-3.5 font-mono text-slate-400">
                        {item.minThreshold} {item.unit}
                      </td>
                      <td className="py-3.5">
                        {isLow ? (
                          <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold bg-rose-500/20 text-rose-400 border border-rose-500/30">
                            {item.status.toUpperCase()} STOCK
                          </span>
                        ) : (
                          <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            OPTIMAL
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 text-right">
                        {isLow && (
                          <button
                            type="button"
                            onClick={() => restockItem(item.id, 50)}
                            className="px-3 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 cursor-pointer"
                          >
                            Restock +50
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </GlassPanel>
      </main>
    </div>
  );
}
