import { Order } from '../../types';

interface StatusBadgeProps {
  status: Order['currentStatus'];
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const map: Record<Order['currentStatus'], { label: string; color: string }> = {
    placed: { label: 'Order Confirmed', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
    preparing: { label: 'Preparing', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
    cooking: { label: 'In Tandoor & Wok', color: 'bg-orange-500/20 text-orange-400 border-orange-500/30' },
    packed: { label: 'Quality Sealed', color: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30' },
    out_for_delivery: { label: 'Out for Delivery', color: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' },
    delivered: { label: 'Delivered', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
    cancelled: { label: 'Cancelled', color: 'bg-rose-500/20 text-rose-400 border-rose-500/30' },
  };

  const item = map[status] || { label: status, color: 'bg-white/10 text-slate-300' };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-extrabold border ${item.color}`}>
      {item.label}
    </span>
  );
}
