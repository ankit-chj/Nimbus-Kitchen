import { useState, useEffect } from 'react';
import { Search, Utensils } from 'lucide-react';
import { getBrands, getMenuItems } from '../lib/api';
import { Brand, MenuItem } from '../types';
import { BrandCard } from '../components/shared/BrandCard';
import { DishCard } from '../components/shared/DishCard';
import { SkeletonGrid } from '../components/shared/SkeletonCard';
import { ItemDetailModal } from '../components/shared/ItemDetailModal';

export function SearchPage() {
  const [query, setQuery] = useState('');
  const [brands, setBrands] = useState<Brand[]>([]);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItemForModal, setSelectedItemForModal] = useState<MenuItem | null>(null);

  useEffect(() => {
    Promise.all([getBrands(), getMenuItems()])
      .then(([b, m]) => {
        setBrands(b);
        setItems(m);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredBrands = brands.filter(
    (b) =>
      b.name.toLowerCase().includes(query.toLowerCase()) ||
      b.cuisines.some((c) => c.toLowerCase().includes(query.toLowerCase()))
  );

  const filteredItems = items.filter(
    (i) =>
      i.name.toLowerCase().includes(query.toLowerCase()) ||
      i.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-black text-white">Search Nimbus Catalog</h1>
        <p className="text-xs text-slate-400">Search across all 5 virtual cloud kitchen brands.</p>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-500" />
        <input
          type="text"
          placeholder="Search Butter Chicken, Smash Burger, Hakka Noodles..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500 text-base"
        />
      </div>

      {loading ? (
        <SkeletonGrid count={6} />
      ) : query.trim() === '' ? (
        <div className="text-center py-12 space-y-2 text-slate-400">
          <Utensils className="w-10 h-10 text-slate-600 mx-auto" />
          <p className="font-bold text-white">Start typing to search dishes or brands</p>
        </div>
      ) : (
        <div className="space-y-10">
          {filteredBrands.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-extrabold text-amber-400">Brands ({filteredBrands.length})</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredBrands.map((b) => (
                  <BrandCard key={b.id} brand={b} />
                ))}
              </div>
            </div>
          )}

          {filteredItems.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-extrabold text-amber-400">Dishes ({filteredItems.length})</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredItems.map((item) => (
                  <DishCard
                    key={item.id}
                    item={item}
                    brandName={brands.find((b) => b.id === item.brandId)?.name}
                    onOpenDetail={(i) => setSelectedItemForModal(i)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <ItemDetailModal
        item={selectedItemForModal}
        brandName={brands.find((b) => b.id === selectedItemForModal?.brandId)?.name}
        onClose={() => setSelectedItemForModal(null)}
      />
    </div>
  );
}
