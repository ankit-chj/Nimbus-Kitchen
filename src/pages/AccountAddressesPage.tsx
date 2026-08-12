import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowLeft, Plus, Trash2, Check } from 'lucide-react';
import { useUserStore } from '../store/useUserStore';
import { GlassPanel } from '../components/shared/GlassPanel';
import { Address } from '../types';

export function AccountAddressesPage() {
  const addresses = useUserStore((s) => s.addresses);
  const addAddress = useUserStore((s) => s.addAddress);
  const removeAddress = useUserStore((s) => s.removeAddress);
  const setDefaultAddress = useUserStore((s) => s.setDefaultAddress);

  const [showAdd, setShowAdd] = useState(false);
  const [street, setStreet] = useState('');
  const [area, setArea] = useState('Indiranagar');
  const [type, setType] = useState<'Home' | 'Work' | 'Other'>('Home');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!street.trim()) return;

    const newAddr: Address = {
      id: `addr-${Date.now()}`,
      type,
      name: 'User',
      street,
      area,
      city: 'Bengaluru',
      pincode: '560038',
      isDefault: false,
    };

    addAddress(newAddr);
    setStreet('');
    setShowAdd(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-8">
      <div>
        <Link to="/account" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white">
          <ArrowLeft className="w-4 h-4 text-amber-500" />
          <span>Back to Account</span>
        </Link>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-white">Saved Delivery Addresses</h1>
          <p className="text-xs text-slate-400">Manage locations for quick Nimbus cloud kitchen dropoffs.</p>
        </div>

        <button
          type="button"
          onClick={() => setShowAdd(!showAdd)}
          className="px-4 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 hover:bg-amber-400 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Address</span>
        </button>
      </div>

      {showAdd && (
        <GlassPanel className="p-6 space-y-4">
          <h3 className="font-extrabold text-sm text-amber-400">Add New Address</h3>
          <form onSubmit={handleAdd} className="space-y-3">
            <div className="flex gap-2">
              {(['Home', 'Work', 'Other'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setType(t)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                    type === t ? 'bg-amber-500 text-slate-950' : 'bg-white/10 text-slate-300'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <input
              type="text"
              placeholder="Flat / Building / Street"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
            />

            <input
              type="text"
              placeholder="Area (e.g. Koramangala, Indiranagar)"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
            />

            <div className="flex gap-2 pt-2">
              <button type="submit" className="px-5 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs">
                Save
              </button>
              <button
                type="button"
                onClick={() => setShowAdd(false)}
                className="px-5 py-2 rounded-xl bg-white/10 text-slate-300 text-xs"
              >
                Cancel
              </button>
            </div>
          </form>
        </GlassPanel>
      )}

      <div className="space-y-4">
        {addresses.map((addr) => (
          <GlassPanel key={addr.id} className="p-5 flex items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base text-white">{addr.type}</span>
                {addr.isDefault && (
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    DEFAULT
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300">{addr.street}, {addr.area}</p>
              <p className="text-[11px] text-slate-500">{addr.city} - {addr.pincode}</p>
            </div>

            <div className="flex items-center gap-2">
              {!addr.isDefault && (
                <button
                  type="button"
                  onClick={() => setDefaultAddress(addr.id)}
                  className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-slate-300 font-bold"
                >
                  Set Default
                </button>
              )}

              <button
                type="button"
                onClick={() => removeAddress(addr.id)}
                className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </GlassPanel>
        ))}
      </div>
    </div>
  );
}
