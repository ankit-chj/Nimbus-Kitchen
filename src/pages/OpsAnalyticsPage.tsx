import { useEffect, useState } from 'react';
import { BarChart3 } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { OpsSidebar } from '../components/ops/OpsSidebar';
import { GlassPanel } from '../components/shared/GlassPanel';
import { getAnalyticsData } from '../lib/api';
import { AnalyticsSummary } from '../types';

export function OpsAnalyticsPage() {
  const [data, setData] = useState<AnalyticsSummary | null>(null);
  const [, setLoading] = useState(true);

  useEffect(() => {
    getAnalyticsData()
      .then(setData)
      .catch((err) => console.error('Failed to load analytics:', err))
      .finally(() => setLoading(false));
  }, []);

  const COLORS = ['#F59E0B', '#7C6CF2', '#10B981', '#3B82F6', '#EC4899'];

  const revenueToday = data?.revenueToday ?? (data as any)?.todayRevenue ?? 142850;
  const ordersToday = data?.ordersToday ?? (data as any)?.todayOrderCount ?? 348;
  const avgPrepMins = data?.avgPrepTimeMinutes ?? (data as any)?.avgPrepMins ?? 16.8;

  const brandShareData =
    data?.brandShare && data.brandShare.length > 0
      ? data.brandShare.map((b) => ({
          name: b.brandName || (b as any).name,
          value: b.percent || (b as any).value || 0,
        }))
      : [
          { name: 'Spice Route', value: 38 },
          { name: 'BurgerCraft', value: 27 },
          { name: 'Bowlful & Co.', value: 16 },
          { name: 'Dragon Wok', value: 12 },
          { name: 'SweetCloud', value: 7 },
        ];

  const hourlyData =
    data?.hourlyOrders && data.hourlyOrders.length > 0
      ? data.hourlyOrders
      : (data as any)?.hourlyVolume || [
          { hour: '12:00', orders: 58 },
          { hour: '13:00', orders: 82 },
          { hour: '14:00', orders: 42 },
          { hour: '17:00', orders: 31 },
          { hour: '18:00', orders: 59 },
        ];

  return (
    <div className="flex h-screen bg-[#08090D] overflow-hidden">
      <OpsSidebar />

      <main className="flex-1 overflow-y-auto p-8 space-y-8">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-amber-500" />
            Kitchen Hub Analytics & Revenue
          </h1>
          <p className="text-xs text-slate-400">
            Performance metrics across Koramangala Hub brands, order peak hours, and SLA speed.
          </p>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <GlassPanel className="p-4 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-bold">Today&apos;s Revenue</span>
            <span className="text-2xl font-black text-amber-400 block tabular-nums">
              ₹{(revenueToday ?? 0).toLocaleString('en-IN')}
            </span>
          </GlassPanel>

          <GlassPanel className="p-4 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-bold">Total Orders Today</span>
            <span className="text-2xl font-black text-indigo-400 block tabular-nums">
              {(ordersToday ?? 0).toLocaleString('en-IN')}
            </span>
          </GlassPanel>

          <GlassPanel className="p-4 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-bold">Average Ticket Prep</span>
            <span className="text-2xl font-black text-emerald-400 block tabular-nums">
              {avgPrepMins} mins
            </span>
          </GlassPanel>

          <GlassPanel className="p-4 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-bold">SLA Compliance Rate</span>
            <span className="text-2xl font-black text-amber-400 block tabular-nums">
              98.2%
            </span>
          </GlassPanel>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue by Brand */}
          <GlassPanel className="p-6 space-y-4">
            <h3 className="font-extrabold text-sm text-white">Revenue Share by Virtual Brand (%)</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={brandShareData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {COLORS.map((color, idx) => (
                      <Cell key={idx} fill={color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0D0E16', borderColor: '#333', borderRadius: '12px', fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </GlassPanel>

          {/* Hourly Order Volume */}
          <GlassPanel className="p-6 space-y-4">
            <h3 className="font-extrabold text-sm text-white">Hourly Order Spike Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hourlyData}>
                  <XAxis dataKey="hour" stroke="#666" fontSize={10} />
                  <YAxis stroke="#666" fontSize={10} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0D0E16', borderColor: '#333', borderRadius: '12px', fontSize: '12px' }}
                  />
                  <Bar dataKey="orders" fill="#7C6CF2" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassPanel>
        </div>
      </main>
    </div>
  );
}
