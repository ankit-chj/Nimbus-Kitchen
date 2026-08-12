import { Link } from 'react-router-dom';
import { Sliders, ArrowLeft, Check } from 'lucide-react';
import { useUserStore } from '../store/useUserStore';
import { GlassPanel } from '../components/shared/GlassPanel';

export function AccountPreferencesPage() {
  const profile = useUserStore((s) => s.profile);
  const updateProfile = useUserStore((s) => s.updateProfile);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-8">
      <div>
        <Link to="/account" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white">
          <ArrowLeft className="w-4 h-4 text-amber-500" />
          <span>Back to Account</span>
        </Link>
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-black text-white">Dietary & App Preferences</h1>
        <p className="text-xs text-slate-400">Tailor dish suggestions and delivery updates.</p>
      </div>

      <GlassPanel className="p-6 space-y-6">
        {/* Dietary Preference */}
        <div className="space-y-3">
          <h3 className="font-extrabold text-sm text-amber-400">Dietary Filter Default</h3>
          <div className="grid grid-cols-3 gap-3">
            {(['all', 'veg', 'vegan'] as const).map((pref) => {
              const isSelected = profile.dietaryPreference === pref;
              return (
                <button
                  key={pref}
                  type="button"
                  onClick={() => updateProfile({ dietaryPreference: pref })}
                  className={`p-3 rounded-2xl border font-bold text-xs capitalize transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                      : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  {pref === 'all' ? 'All (Non-Veg & Veg)' : pref === 'veg' ? 'Strict Vegetarian' : '100% Vegan'}
                </button>
              );
            })}
          </div>
        </div>

        {/* Notifications Toggle */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-sm text-white">Live WhatsApp & SMS Updates</h3>
            <p className="text-xs text-slate-400">Receive real-time station cooking & rider dispatch notifications.</p>
          </div>

          <button
            type="button"
            onClick={() => updateProfile({ notificationsEnabled: !profile.notificationsEnabled })}
            className={`w-12 h-6 rounded-full transition-colors p-1 flex items-center cursor-pointer ${
              profile.notificationsEnabled ? 'bg-amber-500 justify-end' : 'bg-white/20 justify-start'
            }`}
          >
            <div className="w-4 h-4 rounded-full bg-slate-950" />
          </button>
        </div>
      </GlassPanel>
    </div>
  );
}
