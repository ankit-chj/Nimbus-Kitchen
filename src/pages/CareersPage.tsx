import { ChefHat, Briefcase, Sparkles, MapPin } from 'lucide-react';
import { GlassPanel } from '../components/shared/GlassPanel';

export function CareersPage() {
  const jobs = [
    { title: 'Head Tandoor Master', station: 'Dawat-e-Khas', location: 'Koramangala Hub', type: 'Full-time' },
    { title: 'Wok & Asian Sous Chef', station: 'Dragon Wok', location: 'Koramangala Hub', type: 'Full-time' },
    { title: 'Dispatch Dock Supervisor', station: 'Hub Operations', location: 'Indiranagar Hub', type: 'Full-time' },
    { title: 'Kitchen KDS Systems Engineer', station: 'Tech Ops', location: 'Bengaluru HQ', type: 'Full-time' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-4xl font-black text-white">Join the Nimbus Kitchens Team</h1>
        <p className="text-xs text-slate-400">Build the future of multi-brand culinary logistics.</p>
      </div>

      <div className="space-y-4">
        {jobs.map((job, idx) => (
          <GlassPanel key={idx} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="font-extrabold text-base text-white">{job.title}</h3>
              <p className="text-xs text-amber-400 font-semibold">{job.station} • {job.location}</p>
            </div>

            <button
              type="button"
              onClick={() => alert(`Applied for ${job.title}! Our Hub HR team will contact you.`)}
              className="px-5 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 cursor-pointer shrink-0"
            >
              Apply Now
            </button>
          </GlassPanel>
        ))}
      </div>
    </div>
  );
}
