import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { Brand } from '../../types';
import { GlassPanel } from './GlassPanel';

export interface BrandCardProps {
  brand: Brand;
  key?: React.Key;
}

export function BrandCard({ brand }: BrandCardProps) {
  return (
    <Link to={`/brands/${brand.slug}`}>
      <GlassPanel hoverEffect className="overflow-hidden group h-full flex flex-col">
        {/* Cover Image & Badges */}
        <div className="relative h-44 overflow-hidden">
          <img
            src={brand.coverImageUrl}
            alt={brand.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08090D] via-transparent to-black/20" />

          {/* Logo overlay badge */}
          <div className="absolute bottom-3 left-3 w-12 h-12 rounded-xl overflow-hidden border-2 border-white/20 shadow-lg bg-black/60 backdrop-blur-md">
            <img
              src={brand.logoUrl}
              alt={brand.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Price Tier & Veg Badge */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5">
            {brand.isPureVeg && (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-500/90 text-white shadow-md backdrop-blur-sm">
                100% VEG
              </span>
            )}
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/60 text-white border border-white/20 backdrop-blur-sm">
              {brand.priceTier}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-extrabold text-lg text-slate-100 group-hover:text-amber-400 transition-colors">
                {brand.name}
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-bold shrink-0">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{brand.rating.toFixed(1)}</span>
              </div>
            </div>

            <p className="text-xs text-amber-500/90 font-medium mt-0.5">
              {brand.cuisines.join(' • ')}
            </p>

            <p className="text-xs text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
              {brand.tagline}
            </p>
          </div>

          {/* Footer info: Prep time & Badges */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-1 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-indigo-400" />
              <span>{brand.avgPrepTimeMins} mins prep</span>
            </div>

            <div className="flex items-center gap-1">
              {brand.badges.slice(0, 1).map((b) => (
                <span
                  key={b}
                  className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-semibold text-slate-300"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>
      </GlassPanel>
    </Link>
  );
}
