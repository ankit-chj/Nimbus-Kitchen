import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ShoppingBag,
  Search,
  User,
  Menu as MenuIcon,
  X,
  ChefHat,
  Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCartStore } from '../../store/useCartStore';
import { useUserStore } from '../../store/useUserStore';

interface NavbarProps {
  onOpenSearch: () => void;
}

export function Navbar({ onOpenSearch }: NavbarProps) {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartCount = useCartStore((s) => s.getItemCount());
  const toggleCart = useCartStore((s) => s.toggleDrawer);
  const profile = useUserStore((s) => s.profile);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Brands', path: '/brands' },
    { name: 'Offers', path: '/offers' },
    { name: 'Orders', path: '/orders' },
    { name: 'About', path: '/about' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#08090D]/80 backdrop-blur-xl border-b border-white/10 shadow-lg'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-indigo-600 p-0.5 shadow-md group-hover:scale-105 transition-transform">
            <div className="w-full h-full rounded-[10px] flex items-center justify-center bg-[#08090D]">
              <Layers className="w-5 h-5 text-amber-500" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-amber-400 via-orange-400 to-indigo-400 bg-clip-text text-transparent">
                NIMBUS
              </span>
              <span className="text-xs px-1.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 font-semibold uppercase tracking-wider">
                Kitchens
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium hidden sm:block">
              One Kitchen. Infinite Cravings.
            </p>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-white/[0.04] p-1.5 rounded-full border border-white/10">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${
                  isActive
                    ? 'text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavTab"
                    className="absolute inset-0 rounded-full shadow-sm bg-white/10 border border-white/20"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search Trigger (⌘K) */}
          <button
            type="button"
            onClick={onOpenSearch}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium text-slate-400 hover:text-slate-200 transition-all cursor-pointer bg-white/[0.05] border-white/10 hover:border-white/20"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search dishes & brands...</span>
            <kbd className="px-1.5 py-0.5 text-[10px] rounded bg-white/10 border border-white/10 text-slate-400 font-mono">
              ⌘K
            </kbd>
          </button>

          {/* Search Mobile Icon */}
          <button
            type="button"
            onClick={onOpenSearch}
            aria-label="Open search"
            className="sm:hidden p-2 rounded-xl bg-white/[0.05] border border-white/10 text-slate-300 hover:text-white"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Kitchen Ops Dashboard Button */}
          <Link
            to="/ops"
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/20 transition-all"
            title="Kitchen Operations Dashboard"
          >
            <ChefHat className="w-3.5 h-3.5" />
            <span>Kitchen Ops</span>
          </Link>

          {/* Cart Icon Button with Badge */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            type="button"
            onClick={toggleCart}
            aria-label="Shopping Cart"
            className="relative p-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md shadow-amber-500/20 hover:brightness-110 transition-all cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-indigo-600 text-white border-2 border-[#08090D] text-[10px] font-extrabold flex items-center justify-center tabular-nums"
              >
                {cartCount}
              </motion.span>
            )}
          </motion.button>

          {/* Account Profile Link */}
          <Link
            to="/account"
            className="hidden sm:flex items-center gap-2 p-1.5 pr-3 rounded-xl border transition-all bg-white/[0.05] border-white/10 hover:border-white/20 text-slate-200"
          >
            <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-xs">
              {profile.name.charAt(0)}
            </div>
            <span className="text-xs font-semibold max-w-[90px] truncate">
              {profile.name.split(' ')[0]}
            </span>
          </Link>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="md:hidden p-2 rounded-xl bg-white/[0.05] border border-white/10 text-slate-300"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b bg-[#08090D]/95 border-white/10 backdrop-blur-2xl px-4 py-4 space-y-3"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${
                    location.pathname === link.path
                      ? 'bg-amber-500/20 text-amber-400 font-bold border border-amber-500/30'
                      : 'text-slate-300 hover:bg-white/[0.05]'
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <Link
                to="/account"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl font-medium text-sm text-slate-300 hover:bg-white/[0.05] flex items-center gap-2"
              >
                <User className="w-4 h-4 text-amber-500" />
                <span>My Account</span>
              </Link>

              <Link
                to="/ops"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl font-medium text-sm bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center gap-2"
              >
                <ChefHat className="w-4 h-4" />
                <span>Kitchen Ops Dashboard</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
