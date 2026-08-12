import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Clock, ShoppingBag, ArrowRight, ShieldCheck, Flame } from 'lucide-react';
import { motion } from 'motion/react';
import { getBrandBySlug, getMenuItems } from '../lib/api';
import { Brand, MenuItem } from '../types';
import { GlassPanel } from '../components/shared/GlassPanel';
import { DishCard } from '../components/shared/DishCard';
import { SkeletonGrid } from '../components/shared/SkeletonCard';
import { ErrorState } from '../components/shared/ErrorState';
import { EmptyState } from '../components/shared/EmptyState';
import { ItemDetailModal } from '../components/shared/ItemDetailModal';
import { useCartStore } from '../store/useCartStore';
import { PriceTag } from '../components/shared/PriceTag';

export function BrandDetailPage() {
  const { brandSlug } = useParams<{ brandSlug: string }>();
  const navigate = useNavigate();

  const [brand, setBrand] = useState<Brand | null>(null);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [vegOnly, setVegOnly] = useState(false);
  const [selectedItemForModal, setSelectedItemForModal] = useState<MenuItem | null>(null);

  const cartItems = useCartStore((s) => s.items);
  const cartTotal = useCartStore((s) => s.getTotal());
  const openCart = useCartStore((s) => s.openDrawer);

  const fetchData = async () => {
    if (!brandSlug) return;
    setLoading(true);
    setError(false);
    try {
      const b = await getBrandBySlug(brandSlug);
      setBrand(b);
      const m = await getMenuItems({ brandId: b.id });
      setItems(m);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [brandSlug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24">
        <SkeletonGrid count={6} />
      </div>
    );
  }

  if (error || !brand) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24">
        <ErrorState onRetry={fetchData} />
      </div>
    );
  }

  // Filter items by category & veg switch
  const filteredItems = items.filter((item) => {
    if (vegOnly && !item.isVeg) return false;
    if (selectedCategory !== 'all' && item.categoryId !== selectedCategory) return false;
    return true;
  });

  // Unique categories present in this brand's menu items
  const categoryIds = Array.from(new Set(items.map((i) => i.categoryId)));

  return (
    <div className="pb-32 pt-20">
      {/* Brand Hero Cover Banner */}
      <div className="relative h-72 sm:h-80 w-full overflow-hidden">
        <img src={brand.coverImageUrl} alt={brand.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090D] via-[#08090D]/60 to-transparent" />

        <div className="absolute bottom-6 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end justify-between gap-4">
          <div className="flex items-end gap-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl bg-black/80 shrink-0">
              <img src={brand.logoUrl} alt={brand.name} className="w-full h-full object-cover" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-4xl font-black text-white">{brand.name}</h1>
                {brand.isPureVeg && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500 text-white">
                    100% PURE VEG
                  </span>
                )}
              </div>

              <p className="text-xs text-amber-400 font-semibold">{brand.cuisines.join(' • ')}</p>

              <div className="flex items-center gap-4 text-xs text-slate-300 pt-1">
                <div className="flex items-center gap-1 font-bold text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{brand.rating.toFixed(1)}</span>
                  <span className="text-slate-400 font-normal">({brand.ratingCount} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-indigo-400" />
                  <span>{brand.avgPrepTimeMins} mins avg prep</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Menu Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        {/* Story Snippet */}
        {brand.story && (
          <GlassPanel className="p-4 text-xs text-slate-300 leading-relaxed border-amber-500/20">
            <strong className="text-amber-400 block mb-1">Chef&apos;s Heritage Story:</strong>
            {brand.story}
          </GlassPanel>
        )}

        {/* Sticky Category Bar & Veg Switch */}
        <div className="sticky top-20 z-30 py-3 bg-[#08090D]/90 backdrop-blur-xl border-y border-white/10 flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10'
              }`}
            >
              All Items ({items.length})
            </button>

            {categoryIds.map((catId) => (
              <button
                key={catId}
                type="button"
                onClick={() => setSelectedCategory(catId)}
                className={`px-4 py-2 rounded-xl text-xs font-bold capitalize whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === catId
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10'
                }`}
              >
                {String(catId).replace('cat-', '')}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setVegOnly(!vegOnly)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border shrink-0 transition-all flex items-center gap-1.5 cursor-pointer ${
              vegOnly
                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                : 'bg-white/5 border-white/10 text-slate-400'
            }`}
          >
            <div className={`w-2.5 h-2.5 rounded-full ${vegOnly ? 'bg-emerald-400' : 'bg-slate-500'}`} />
            <span>Veg Only</span>
          </button>
        </div>

        {/* Dishes Grid */}
        {filteredItems.length === 0 ? (
          <EmptyState
            title="No Items Found"
            description="No menu items match your category or veg filter."
            actionText="Reset Filters"
            onAction={() => {
              setSelectedCategory('all');
              setVegOnly(false);
            }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {filteredItems.map((item) => (
              <DishCard
                key={item.id}
                item={item}
                brandName={brand.name}
                onOpenDetail={(i) => setSelectedItemForModal(i)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Floating Bottom Sticky "View Cart" Bar if Cart has items */}
      {cartItems.length > 0 && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-lg px-4"
        >
          <button
            type="button"
            onClick={openCart}
            className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-indigo-600 text-white font-black text-sm flex items-center justify-between shadow-2xl shadow-amber-500/30 hover:brightness-110 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              <span>{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in basket</span>
            </div>

            <div className="flex items-center gap-2">
              <PriceTag amount={cartTotal} className="text-base" />
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        </motion.div>
      )}

      {/* Item Detail Modal */}
      <ItemDetailModal
        item={selectedItemForModal}
        brandName={brand.name}
        onClose={() => setSelectedItemForModal(null)}
      />
    </div>
  );
}
