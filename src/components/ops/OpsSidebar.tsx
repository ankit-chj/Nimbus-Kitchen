import { Link, useLocation } from 'react-router-dom';
import { ChefHat, Clock, Layers, BarChart3, Package, ArrowLeft, Building2 } from 'lucide-react';
import { useOpsStore } from '../../store/useOpsStore';

export function OpsSidebar() {
  const location = useLocation();
  const selectedKitchenId = useOpsStore((s) => s.selectedKitchenId);
  const setSelectedKitchenId = useOpsStore((s) => s.setSelectedKitchenId);

  const links = [
    { name: 'Live Order Queue', path: '/ops/queue', icon: Clock },
    { name: 'Station Load & Staff', path: '/ops/stations', icon: Layers },
    { name: 'Inventory & Stock Alerts', path: '/ops/inventory', icon: Package },
    { name: 'Analytics & Revenue', path: '/ops/analytics', icon: BarChart3 },
  ];

  return (
    <aside className="w-64 bg-[#08090D] border-r border-white/10 flex flex-col justify-between p-4 shrink-0 h-screen sticky top-0 text-slate-300">
      <div className="space-y-6">
        {/* Top Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-indigo-500 to-amber-500 text-white font-bold shadow-md">
              <ChefHat className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-sm text-white tracking-wide uppercase">
                Nimbus Ops
              </h2>
              <span className="text-[10px] text-amber-400 font-semibold uppercase tracking-widest">
                Hub Control Portal
              </span>
            </div>
          </div>

          {/* Kitchen Selector */}
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-indigo-400 shrink-0" />
            <select
              value={selectedKitchenId}
              onChange={(e) => setSelectedKitchenId(e.target.value)}
              className="bg-transparent text-xs font-bold text-slate-200 focus:outline-none w-full cursor-pointer"
            >
              <option value="kitchen-blr-01" className="bg-[#08090D]">Koramangala Hub 01</option>
              <option value="kitchen-blr-02" className="bg-[#08090D]">Indiranagar Hub 02</option>
            </select>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1">
          {links.map((link) => {
            const isActive = location.pathname === link.path || (link.path === '/ops/queue' && location.pathname === '/ops');
            const Icon = link.icon;

            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600/30 to-amber-500/20 text-white border border-indigo-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Back to Customer App */}
      <div className="pt-4 border-t border-white/10">
        <Link
          to="/"
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-amber-500" />
          <span>Exit Ops to Customer App</span>
        </Link>
      </div>
    </aside>
  );
}
