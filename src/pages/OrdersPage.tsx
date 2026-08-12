import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Clock, ShoppingBag, ArrowRight, Layers, RefreshCw } from 'lucide-react';
import { getOrders } from '../lib/api';
import { Order } from '../types';
import { GlassPanel } from '../components/shared/GlassPanel';
import { StatusBadge } from '../components/shared/StatusBadge';
import { PriceTag } from '../components/shared/PriceTag';
import { SkeletonGrid } from '../components/shared/SkeletonCard';
import { EmptyState } from '../components/shared/EmptyState';
import { ErrorState } from '../components/shared/ErrorState';

export function OrdersPage() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState<'all' | 'active' | 'delivered'>('all');

  const fetchOrders = async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((ord) => {
    if (filter === 'active') {
      return ord.currentStatus !== 'delivered' && ord.currentStatus !== 'cancelled';
    }
    if (filter === 'delivered') {
      return ord.currentStatus === 'delivered';
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-500 uppercase tracking-wider">
            <Clock className="w-4 h-4" />
            <span>Order History</span>
          </div>
          <h1 className="text-4xl font-black text-white">Your Cloud Kitchen Orders</h1>
          <p className="text-xs text-slate-400">Track live orders and view past meal details.</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white/5 border border-white/10">
          {(['all', 'active', 'delivered'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                filter === tab
                  ? 'bg-amber-500 text-slate-950 font-extrabold shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <SkeletonGrid count={3} />
      ) : error ? (
        <ErrorState onRetry={fetchOrders} />
      ) : filteredOrders.length === 0 ? (
        <EmptyState
          icon={ShoppingBag}
          title="No Orders Found"
          description="You haven't placed any orders matching this status filter yet."
          actionText="Order Food Now"
          onAction={() => navigate('/brands')}
        />
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((ord) => (
            <GlassPanel key={ord.id} hoverEffect className="p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-extrabold text-amber-400 text-base">{ord.id}</span>
                    <StatusBadge status={ord.currentStatus} />
                  </div>

                  <p className="text-xs text-amber-500/90 font-bold">
                    {ord.brandName} • <span className="text-slate-400 font-normal">{new Date(ord.placedAt).toLocaleDateString()}</span>
                  </p>

                  <div className="text-xs text-slate-300">
                    {ord.items.map((it) => `${it.qty}x ${it.name}`).join(', ')}
                  </div>
                </div>

                <div className="flex items-center gap-4 text-right">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Total Amount</span>
                    <PriceTag amount={ord.total} className="text-amber-400 text-lg font-black" />
                  </div>

                  <button
                    type="button"
                    onClick={() => navigate(`/orders/${ord.id}`)}
                    className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 hover:bg-amber-400 cursor-pointer"
                  >
                    <span>Track Order</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </GlassPanel>
          ))}
        </div>
      )}
    </div>
  );
}
