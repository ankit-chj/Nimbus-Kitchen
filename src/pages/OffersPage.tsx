import { useState, useEffect } from 'react';
import { Tag, Sparkles } from 'lucide-react';
import { getOffers } from '../lib/api';
import { Offer } from '../types';
import { CouponCard } from '../components/shared/CouponCard';
import { SkeletonGrid } from '../components/shared/SkeletonCard';
import { ErrorState } from '../components/shared/ErrorState';

export function OffersPage() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchOffers = async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await getOffers();
      setOffers(data);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-8">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-500 uppercase tracking-wider">
          <Tag className="w-4 h-4" />
          <span>Nimbus Savings</span>
        </div>
        <h1 className="text-4xl font-black text-white">Coupons & Exclusive Deals</h1>
        <p className="text-xs text-slate-400">
          Apply discount codes at checkout to save on multi-brand orders.
        </p>
      </div>

      {loading ? (
        <SkeletonGrid count={4} />
      ) : error ? (
        <ErrorState onRetry={fetchOffers} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <CouponCard key={offer.id} offer={offer} />
          ))}
        </div>
      )}
    </div>
  );
}
