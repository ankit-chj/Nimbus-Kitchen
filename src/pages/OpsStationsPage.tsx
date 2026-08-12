import { useEffect } from 'react';
import { Layers, Users, Flame } from 'lucide-react';
import { useOpsStore } from '../store/useOpsStore';
import { OpsSidebar } from '../components/ops/OpsSidebar';
import { StationLoadBar } from '../components/ops/StationLoadBar';
import { GlassPanel } from '../components/shared/GlassPanel';

export function OpsStationsPage() {
  const stations = useOpsStore((s) => s.stations);
  const staff = useOpsStore((s) => s.staff);
  const fetchOpsData = useOpsStore((s) => s.fetchOpsData);

  useEffect(() => {
    fetchOpsData();
  }, [fetchOpsData]);

  return (
    <div className="flex h-screen bg-[#08090D] overflow-hidden">
      <OpsSidebar />

      <main className="flex-1 overflow-y-auto p-8 space-y-8">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Layers className="w-6 h-6 text-amber-500" />
            Station Loads & Staffing
          </h1>
          <p className="text-xs text-slate-400">
            Real-time thermal capacity and chef deployment across Koramangala Hub 01.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stations.map((st) => {
            const assignedStaff = staff.filter((s) => st.assignedStaffIds.includes(s.id));
            return <StationLoadBar key={st.id} station={st} staffMembers={assignedStaff} />;
          })}
        </div>

        {/* Roster Table */}
        <GlassPanel className="p-6 space-y-4">
          <h3 className="font-extrabold text-base text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-400" />
            Active Shift Roster
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="border-b border-white/10 text-slate-400 uppercase text-[10px] font-bold">
                <tr>
                  <th className="py-2.5">Staff Name</th>
                  <th className="py-2.5">Role</th>
                  <th className="py-2.5">Station</th>
                  <th className="py-2.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {staff.map((stf) => (
                  <tr key={stf.id}>
                    <td className="py-3 font-bold text-white flex items-center gap-2">
                      <img src={stf.avatarUrl} alt={stf.name} className="w-7 h-7 rounded-full object-cover" />
                      <span>{stf.name}</span>
                    </td>
                    <td className="py-3 text-slate-400">{stf.role}</td>
                    <td className="py-3 text-amber-400 font-bold">{stf.stationId.replace('st-', '')}</td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase">
                        {stf.shift} SHIFT
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassPanel>
      </main>
    </div>
  );
}
