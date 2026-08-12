import React from 'react';
import { motion } from 'motion/react';
import { Station, Staff } from '../../types';
import { GlassPanel } from '../shared/GlassPanel';
import { Layers } from 'lucide-react';

export interface StationLoadBarProps {
  station: Station;
  staffMembers: Staff[];
  key?: React.Key;
}

export function StationLoadBar({ station, staffMembers }: StationLoadBarProps) {
  const isHighLoad = station.loadPercent >= 80;

  return (
    <GlassPanel className="p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-white">{station.name}</h3>
            <p className="text-xs text-slate-400">{station.description}</p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xl font-extrabold text-white tabular-nums">{station.loadPercent}%</span>
          <span className="text-[10px] text-slate-400 block uppercase font-bold">Capacity Load</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden relative">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${station.loadPercent}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={`h-full rounded-full ${
            isHighLoad
              ? 'bg-gradient-to-r from-amber-500 to-rose-500 shadow-lg shadow-rose-500/50'
              : 'bg-gradient-to-r from-emerald-500 to-amber-500'
          }`}
        />
      </div>

      {/* Footer Staff Members */}
      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-medium">Assigned Staff:</span>
          <div className="flex -space-x-2 overflow-hidden">
            {staffMembers.map((stf) => (
              <img
                key={stf.id}
                src={stf.avatarUrl}
                alt={stf.name}
                title={`${stf.name} (${stf.role})`}
                className="inline-block h-7 w-7 rounded-full ring-2 ring-[#08090D] object-cover"
              />
            ))}
          </div>
        </div>

        <span className="font-bold text-amber-400 tabular-nums">{station.activeOrderCount} active tickets</span>
      </div>
    </GlassPanel>
  );
}
