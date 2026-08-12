import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Layers, SlidersHorizontal, Star, Check } from 'lucide-react';
import { getBrands } from '../lib/api';
import { Brand } from '../types';
import { BrandCard } from '../components/shared/BrandCard';
import { SkeletonGrid } from '../components/shared/SkeletonCard';
import { EmptyState } from '../components/shared/EmptyState';
import { ErrorState } from '../components/shared/ErrorState';

export function BrandsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Filter states initialized from URL params
  const pureVegOnly = searchParams.get('veg') === 'true';
  const minRating = parseFloat(searchParams.get('rating') || '0');
  const selectedCuisine = searchParams.get('cuisine') || 'all';

  const fetchBrands = async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await getBrands();
      setBrands(data);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  // Filter computation
  const filteredBrands = brands.filter((brand) => {
    if (pureVegOnly && !brand.isPureVeg) return false;
    if (brand.rating < minRating) return false;
    if (selectedCuisine !== 'all' && !brand.cuisines.some((c) => c.toLowerCase().includes(selectedCuisine.toLowerCase()))) {
      return false;
    }
    return true;
  });

  const updateParam = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (!value || value === 'all' || value === 'false' || value === '0') {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams);
  };

  const allCuisines = Array.from(
    new Set(brands.flatMap((b) => b.cuisines))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-500 uppercase tracking-wider">
          <Layers className="w-4 h-4" />
          <span>Cloud Kitchen Directory</span>
        </div>
        <h1 className="text-4xl font-black text-white">Explore Virtual Brands</h1>
        <p className="text-xs text-slate-400">
          Discover specialized kitchens cooking out of Nimbus Koramangala Hub.
        </p>
      </div>

      {/* Filter & Sort Bar */}
      <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Pure Veg Switch */}
          <button
            type="button"
            onClick={() => updateParam('veg', String(!pureVegOnly))}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 cursor-pointer ${
              pureVegOnly
                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
            }`}
          >
            <div className={`w-3 h-3 rounded-full ${pureVegOnly ? 'bg-emerald-400' : 'bg-slate-500'}`} />
            <span>100% Pure Veg</span>
          </button>

          {/* Cuisine Selector */}
          <select
            value={selectedCuisine}
            onChange={(e) => updateParam('cuisine', e.target.value)}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white/5 border border-white/10 text-slate-200 focus:outline-none cursor-pointer"
          >
            <option value="all" className="bg-[#08090D]">All Cuisines</option>
            {allCuisines.map((c) => (
              <option key={String(c)} value={String(c).toLowerCase()} className="bg-[#08090D]">
                {String(c)}
              </option>
            ))}
          </select>

          {/* Rating Threshold */}
          <select
            value={minRating.toString()}
            onChange={(e) => updateParam('rating', e.target.value)}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white/5 border border-white/10 text-slate-200 focus:outline-none cursor-pointer"
          >
            <option value="0" className="bg-[#08090D]">Any Rating</option>
            <option value="4.5" className="bg-[#08090D]">4.5★ & Above</option>
            <option value="4.8" className="bg-[#08090D]">4.8★ & Above</option>
          </select>
        </div>

        <div className="text-xs text-slate-400 font-medium">
          Showing <strong className="text-amber-400">{filteredBrands.length}</strong> cloud brands
        </div>
      </div>

      {/* Grid Content */}
      {loading ? (
        <SkeletonGrid count={6} />
      ) : error ? (
        <ErrorState onRetry={fetchBrands} />
      ) : filteredBrands.length === 0 ? (
        <EmptyState
          title="No Brands Match Filters"
          description="Try clearing your pure veg or rating filters to see more virtual kitchens."
          actionText="Reset Filters"
          onAction={() => setSearchParams(new URLSearchParams())}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBrands.map((brand) => (
            <BrandCard key={brand.id} brand={brand} />
          ))}
        </div>
      )}
    </div>
  );
}
