import { Link } from 'react-router-dom';
import { CreditCard, ArrowLeft, ShieldCheck, Check } from 'lucide-react';
import { useUserStore } from '../store/useUserStore';
import { GlassPanel } from '../components/shared/GlassPanel';

export function AccountPaymentMethodsPage() {
  const paymentMethods = useUserStore((s) => s.paymentMethods);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-8">
      <div>
        <Link to="/account" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white">
          <ArrowLeft className="w-4 h-4 text-amber-500" />
          <span>Back to Account</span>
        </Link>
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-black text-white">Payment Methods</h1>
        <p className="text-xs text-slate-400">Manage payment profiles for instant 1-click cloud kitchen checkout.</p>
      </div>

      <div className="space-y-4">
        {paymentMethods.map((pm) => (
          <GlassPanel key={pm.id} className="p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-base text-white block">{pm.title}</span>
                <span className="text-xs text-slate-400 block">{pm.details}</span>
              </div>
            </div>

            {pm.isDefault && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                DEFAULT PAYMENT
              </span>
            )}
          </GlassPanel>
        ))}
      </div>
    </div>
  );
}
