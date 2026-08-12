import { Link } from 'react-router-dom';
import { Layers, ChefHat, ArrowUpRight, Github, Twitter, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t mt-20 transition-colors bg-[#08090D]/90 border-white/10 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-indigo-600 p-0.5 shadow-md">
                <div className="w-full h-full rounded-[10px] flex items-center justify-center bg-[#08090D]">
                  <Layers className="w-4 h-4 text-amber-500" />
                </div>
              </div>
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-amber-400 to-indigo-400 bg-clip-text text-transparent">
                NIMBUS KITCHENS
              </span>
            </Link>

            <p className="text-sm leading-relaxed max-w-sm">
              Architecting multi-brand cloud kitchens. Combining Indian curries, gourmet burgers, clean grain bowls, and hot desserts into a single synchronized delivery.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="#"
                className="p-2 rounded-xl bg-white/[0.05] border border-white/10 text-slate-400 hover:text-amber-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-xl bg-white/[0.05] border border-white/10 text-slate-400 hover:text-amber-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-xl bg-white/[0.05] border border-white/10 text-slate-400 hover:text-amber-400 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Explore Brands
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/brands/spice-route" className="hover:text-amber-400 transition-colors">
                  Spice Route
                </Link>
              </li>
              <li>
                <Link to="/brands/burger-craft" className="hover:text-amber-400 transition-colors">
                  BurgerCraft
                </Link>
              </li>
              <li>
                <Link to="/brands/bowlful-co" className="hover:text-amber-400 transition-colors">
                  Bowlful & Co.
                </Link>
              </li>
              <li>
                <Link to="/brands/sweet-cloud" className="hover:text-amber-400 transition-colors">
                  SweetCloud
                </Link>
              </li>
              <li>
                <Link to="/brands/dragon-wok" className="hover:text-amber-400 transition-colors">
                  Dragon Wok
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Nimbus Hub
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:text-amber-400 transition-colors">
                  Our Cloud Model
                </Link>
              </li>
              <li>
                <Link to="/offers" className="hover:text-amber-400 transition-colors">
                  Deals & Coupons
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-amber-400 transition-colors">
                  Careers <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-semibold ml-1">Hiring</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-amber-400 transition-colors">
                  Contact & Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Internal Ops Link */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Internal Tooling
            </h4>
            <p className="text-xs text-slate-400">
              Real-time multi-brand kitchen station control and SLA monitoring.
            </p>
            <Link
              to="/ops"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/20 transition-all"
            >
              <ChefHat className="w-4 h-4" />
              <span>Launch Kitchen Ops</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Nimbus Kitchens Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Crafted for high-performance cloud kitchen hubs</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
