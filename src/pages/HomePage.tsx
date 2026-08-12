import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Clock,
  Building2,
  ShieldCheck,
  Flame,
  Star,
  Layers,
  ChefHat,
  UtensilsCrossed
} from 'lucide-react';
import { motion } from 'motion/react';
import { getBrands, getMenuItems, getTestimonials, getOffers } from '../lib/api';
import { Brand, MenuItem, Testimonial, Offer } from '../types';
import { GlassPanel } from '../components/shared/GlassPanel';
import { BrandCard } from '../components/shared/BrandCard';
import { DishCard } from '../components/shared/DishCard';
import { CouponCard } from '../components/shared/CouponCard';
import { SkeletonGrid } from '../components/shared/SkeletonCard';
import { ErrorState } from '../components/shared/ErrorState';
import { ItemDetailModal } from '../components/shared/ItemDetailModal';

export function HomePage() {
  const navigate = useNavigate();

  const [brands, setBrands] = useState<Brand[]>([]);
  const [trendingItems, setTrendingItems] = useState<MenuItem[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedItemForModal, setSelectedItemForModal] = useState<MenuItem | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(false);
    try {
      const [b, m, t, o] = await Promise.all([
        getBrands(),
        getMenuItems(),
        getTestimonials(),
        getOffers(),
      ]);
      setBrands(b);
      setTrendingItems(m.filter((i) => i.isBestseller).slice(0, 6));
      setTestimonials(t);
      setOffers(o.slice(0, 3));
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="space-y-24 pb-16 pt-24">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-indigo-500/20 border border-amber-500/30 text-amber-400 text-xs font-bold"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Next-Gen Multi-Brand Cloud Kitchen</span>
          </motion.div>

          {/* Hero Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-black text-4xl sm:text-6xl tracking-tight leading-none text-white"
          >
            One Kitchen Hub.{' '}
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-indigo-400 bg-clip-text text-transparent">
              Infinite Cravings.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto"
          >
            Order rich Butter Chicken, artisan Truffle Smash Burgers, clean Avocado Grain Bowls, and Belgian Lava Cakes in a single combined delivery.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-2"
          >
            <button
              type="button"
              onClick={() => navigate('/brands')}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-indigo-600 text-white font-black text-sm shadow-2xl shadow-amber-500/25 hover:brightness-110 flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
            >
              <span>Explore All Brands</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <Link
              to="/about"
              className="px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-slate-200 font-extrabold text-sm hover:bg-white/10 transition-all"
            >
              How Cloud Kitchen Works
            </Link>
          </motion.div>

          {/* Live Stat Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="pt-6"
          >
            <GlassPanel className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center max-w-3xl mx-auto">
              <div className="p-2">
                <span className="text-2xl font-black text-amber-400 block tabular-nums">5 Brands</span>
                <span className="text-[11px] text-slate-400 font-medium">Under 1 Roof</span>
              </div>
              <div className="p-2 border-l border-white/10">
                <span className="text-2xl font-black text-indigo-400 block tabular-nums">22 Mins</span>
                <span className="text-[11px] text-slate-400 font-medium">Avg Delivery SLA</span>
              </div>
              <div className="p-2 border-l border-white/10">
                <span className="text-2xl font-black text-emerald-400 block tabular-nums">1 Bag</span>
                <span className="text-[11px] text-slate-400 font-medium">Combined Delivery</span>
              </div>
              <div className="p-2 border-l border-white/10">
                <span className="text-2xl font-black text-amber-400 block tabular-nums">4.8 ★</span>
                <span className="text-[11px] text-slate-400 font-medium">Customer Rating</span>
              </div>
            </GlassPanel>
          </motion.div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-500 uppercase tracking-wider">
              <Layers className="w-4 h-4" />
              <span>Virtual Cloud Hub</span>
            </div>
            <h2 className="text-3xl font-black text-white mt-1">Our Culinary Brands</h2>
            <p className="text-xs text-slate-400 mt-1">
              Each brand features specialized chefs, dedicated station gear, and zero compromise.
            </p>
          </div>

          <Link
            to="/brands"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
          >
            <span>View All Brands ({brands.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <SkeletonGrid count={3} />
        ) : error ? (
          <ErrorState onRetry={fetchData} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brands.map((b) => (
              <BrandCard key={b.id} brand={b} />
            ))}
          </div>
        )}
      </section>

      {/* Trending Dishes Carousel / Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-orange-500 uppercase tracking-wider">
              <Flame className="w-4 h-4" />
              <span>Bestsellers</span>
            </div>
            <h2 className="text-3xl font-black text-white mt-1">Trending Across Kitchens</h2>
          </div>
        </div>

        {loading ? (
          <SkeletonGrid count={6} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingItems.map((item) => {
              const brand = brands.find((b) => b.id === item.brandId);
              return (
                <DishCard
                  key={item.id}
                  item={item}
                  brandName={brand?.name}
                  onOpenDetail={(i) => setSelectedItemForModal(i)}
                />
              );
            })}
          </div>
        )}
      </section>

      {/* How It Works - Multi-Brand Workflow */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <GlassPanel className="p-8 sm:p-12 space-y-10">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">
              The Nimbus Advantage
            </span>
            <h2 className="text-3xl font-black text-white">How Multi-Brand Cloud Kitchen Works</h2>
            <p className="text-xs text-slate-400">
              Eliminating the multi-restaurant delivery hassle with unified hub logistics.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            <div className="space-y-3 relative">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 font-black text-lg flex items-center justify-center border border-amber-500/30">
                01
              </div>
              <h3 className="font-extrabold text-lg text-white">Mix & Match Items</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Add butter chicken, burgers, and boba shakes from different brands into a single cart.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/20 text-orange-400 font-black text-lg flex items-center justify-center border border-orange-500/30">
                02
              </div>
              <h3 className="font-extrabold text-lg text-white">Parallel Station Cooking</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Tandoor, Wok, and Smash Grill stations cook your items concurrently under 1 roof.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 font-black text-lg flex items-center justify-center border border-indigo-500/30">
                03
              </div>
              <h3 className="font-extrabold text-lg text-white">Thermal Sealed Bag</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                All dishes are quality checked and consolidated into one heat-retaining bag.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 font-black text-lg flex items-center justify-center border border-emerald-500/30">
                04
              </div>
              <h3 className="font-extrabold text-lg text-white">One Express Delivery</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                A single delivery rider delivers everything fresh to your doorstep in ~22 minutes.
              </p>
            </div>
          </div>
        </GlassPanel>
      </section>

      {/* Offers Teaser */}
      {offers.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black text-white">Hot Coupons & Deals</h2>
              <p className="text-xs text-slate-400">Save extra on your cloud kitchen basket.</p>
            </div>
            <Link to="/offers" className="text-xs font-bold text-amber-400 hover:underline">
              View All Offers
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {offers.map((offer) => (
              <CouponCard key={offer.id} offer={offer} />
            ))}
          </div>
        </section>
      )}

      {/* Customer Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-black text-white">Loved by Foodies in Bengaluru</h2>
          <p className="text-xs text-slate-400">Real reviews from multi-brand orders.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <GlassPanel key={t.id} className="p-6 space-y-4">
              <div className="flex items-center gap-1 text-amber-400">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>

              <p className="text-xs text-slate-200 italic leading-relaxed">
                &quot;{t.comment}&quot;
              </p>

              <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                <img src={t.avatarUrl} alt={t.author} className="w-10 h-10 rounded-full object-cover border border-amber-500/30" />
                <div>
                  <span className="font-extrabold text-sm text-white block">{t.author}</span>
                  <span className="text-[10px] text-slate-400 block">{t.location}</span>
                </div>
              </div>
            </GlassPanel>
          ))}
        </div>
      </section>

      {/* Item Detail Modal */}
      <ItemDetailModal
        item={selectedItemForModal}
        brandName={brands.find((b) => b.id === selectedItemForModal?.brandId)?.name}
        onClose={() => setSelectedItemForModal(null)}
      />
    </div>
  );
}
