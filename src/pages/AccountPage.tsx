import { Link } from 'react-router-dom';
import { User, MapPin, CreditCard, Sliders, ShoppingBag, ShieldCheck, ChevronRight } from 'lucide-react';
import { useUserStore } from '../store/useUserStore';
import { GlassPanel } from '../components/shared/GlassPanel';

export function AccountPage() {
  const profile = useUserStore((s) => s.profile);
  const addresses = useUserStore((s) => s.addresses);
  const paymentMethods = useUserStore((s) => s.paymentMethods);

  const links = [
    {
      title: 'Saved Delivery Addresses',
      description: `${addresses.length} saved addresses (Default: ${addresses.find((a) => a.isDefault)?.area || 'Home'})`,
      path: '/account/addresses',
      icon: MapPin,
    },
    {
      title: 'Payment Methods',
      description: `${paymentMethods.length} saved mock payment cards & UPI handles`,
      path: '/account/payment-methods',
      icon: CreditCard,
    },
    {
      title: 'Dietary & Notification Preferences',
      description: `Diet: ${profile.dietaryPreference.toUpperCase()} • Notifications: ${profile.notificationsEnabled ? 'ENABLED' : 'DISABLED'}`,
      path: '/account/preferences',
      icon: Sliders,
    },
    {
      title: 'Order History & Invoices',
      description: 'View past multi-brand receipts and live tracking',
      path: '/orders',
      icon: ShoppingBag,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-8">
      {/* Profile Overview Card */}
      <GlassPanel className="p-8 flex flex-col sm:flex-row items-center gap-6">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-500 to-indigo-600 p-1 shadow-xl shrink-0">
          <div className="w-full h-full rounded-xl bg-[#08090D] flex items-center justify-center font-extrabold text-2xl text-amber-400">
            {profile.name.charAt(0)}
          </div>
        </div>

        <div className="space-y-1 text-center sm:text-left flex-1">
          <h1 className="text-2xl font-black text-white">{profile.name}</h1>
          <p className="text-xs text-slate-300 font-mono">{profile.email} • {profile.phone}</p>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500/20 text-amber-400 border border-amber-500/30 uppercase">
              VIP GOURMET MEMBER
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 uppercase">
              BENEPICK PRO
            </span>
          </div>
        </div>
      </GlassPanel>

      {/* Account Settings Menu */}
      <div className="space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">Account Management</h2>

        <div className="space-y-3">
          {links.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.path} to={item.path}>
                <GlassPanel hoverEffect className="p-5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-base text-white">{item.title}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">{item.description}</p>
                    </div>
                  </div>

                  <ChevronRight className="w-5 h-5 text-slate-500" />
                </GlassPanel>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
