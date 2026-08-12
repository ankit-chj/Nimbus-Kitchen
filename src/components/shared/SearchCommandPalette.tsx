import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Star, ArrowRight, Utensils, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getBrands, getMenuItems } from '../../lib/api';
import { Brand, MenuItem } from '../../types';
import { PriceTag } from './PriceTag';
import { VegNonVegDot } from './VegNonVegDot';

interface SearchCommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchCommandPalette({ isOpen, onClose }: SearchCommandPaletteProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [brands, setBrands] = useState<Brand[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      Promise.all([getBrands(), getMenuItems()])
        .then(([b, m]) => {
          setBrands(b);
          setMenuItems(m);
        })
        .finally(() => setLoading(false));
    }
  }, [isOpen]);

  // Keybindings (ESC, ⌘K toggle handled in parent)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const filteredBrands = brands.filter(
    (b) =>
      b.name.toLowerCase().includes(query.toLowerCase()) ||
      b.cuisines.some((c) => c.toLowerCase().includes(query.toLowerCase()))
  );

  const filteredItems = menuItems.filter(
    (i) =>
      i.name.toLowerCase().includes(query.toLowerCase()) ||
      i.description.toLowerCase().includes(query.toLowerCase()) ||
      i.tags?.some((t) => t.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="relative w-full max-w-2xl bg-[#0F111A] border border-white/20 rounded-3xl overflow-hidden shadow-2xl text-slate-100 flex flex-col max-h-[80vh]"
        >
          {/* Input Header */}
          <div className="p-4 border-b border-white/10 flex items-center gap-3 bg-white/[0.02]">
            <Search className="w-5 h-5 text-amber-500 shrink-0" />
            <input
              type="text"
              autoFocus
              placeholder="Search Butter Chicken, Smash Burger, Dragon Wok..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-base text-white placeholder:text-slate-500 focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] rounded bg-white/10 text-slate-400 font-mono">
              ESC
            </kbd>
          </div>

          {/* Results List */}
          <div className="p-4 overflow-y-auto space-y-6 flex-1">
            {loading ? (
              <p className="text-center text-xs text-slate-400 py-8">Searching Nimbus Kitchens catalog...</p>
            ) : query.trim() === '' ? (
              <div className="space-y-4">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Popular Searches</p>
                <div className="flex flex-wrap gap-2">
                  {['Butter Chicken', 'Truffle Burger', 'Hyderabadi Biryani', 'Grain Bowl', 'Molten Cake'].map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setQuery(tag)}
                      className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 hover:bg-white/10 hover:text-amber-400 transition-colors cursor-pointer"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            ) : filteredBrands.length === 0 && filteredItems.length === 0 ? (
              <div className="text-center py-12 space-y-2">
                <Utensils className="w-10 h-10 text-slate-600 mx-auto" />
                <p className="font-bold text-slate-300">No dishes or brands match &quot;{query}&quot;</p>
                <p className="text-xs text-slate-500">Try searching for Indian, Burgers, Bowls, or Shakes.</p>
              </div>
            ) : (
              <>
                {/* Brand Results */}
                {filteredBrands.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-500">Cloud Kitchen Brands</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {filteredBrands.map((brand) => (
                        <div
                          key={brand.id}
                          onClick={() => {
                            onClose();
                            navigate(`/brands/${brand.slug}`);
                          }}
                          className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-500/40 hover:bg-white/10 transition-all flex items-center gap-3 cursor-pointer"
                        >
                          <img src={brand.logoUrl} alt={brand.name} className="w-10 h-10 rounded-xl object-cover" />
                          <div className="flex-1 truncate">
                            <span className="font-extrabold text-sm text-white block truncate">{brand.name}</span>
                            <span className="text-[11px] text-slate-400 block truncate">{brand.cuisines.join(', ')}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs font-bold text-amber-400">
                            <Star className="w-3 h-3 fill-amber-400" />
                            <span>{brand.rating}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* MenuItem Results */}
                {filteredItems.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-500">Dishes & Entrees</h4>
                    <div className="space-y-2">
                      {filteredItems.map((item) => {
                        const b = brands.find((brand) => brand.id === item.brandId);
                        return (
                          <div
                            key={item.id}
                            onClick={() => {
                              onClose();
                              if (b) navigate(`/brands/${b.slug}`);
                            }}
                            className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-500/40 hover:bg-white/10 transition-all flex items-center gap-3 cursor-pointer"
                          >
                            <img src={item.imageUrl} alt={item.name} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                            <div className="flex-1 truncate">
                              <div className="flex items-center gap-1.5">
                                <VegNonVegDot isVeg={item.isVeg} size="sm" />
                                <span className="font-extrabold text-sm text-white truncate">{item.name}</span>
                              </div>
                              <p className="text-[11px] text-slate-400 line-clamp-1">{item.description}</p>
                            </div>
                            <div className="text-right shrink-0">
                              <PriceTag amount={item.price} className="text-amber-400 text-sm block" />
                              <span className="text-[10px] text-slate-500">{b?.name}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </motion.div>
      </div>
      )}
    </AnimatePresence>
  );
}
