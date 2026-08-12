import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { GlassPanel } from '../components/shared/GlassPanel';

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-4xl font-black text-white">Contact Nimbus Hub Operations</h1>
        <p className="text-xs text-slate-400">Questions about catering, orders, or cloud kitchen partnerships?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <GlassPanel className="p-6 space-y-5">
          <h3 className="font-extrabold text-lg text-white">Hub Information</h3>

          <div className="space-y-4 text-xs text-slate-300">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">Nimbus Central Hub 01</strong>
                <span>#42, 80 Feet Rd, Koramangala 4th Block, Bengaluru 560034</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-amber-500 shrink-0" />
              <span>+91 80 4912 3456 (24/7 Hotline)</span>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-amber-500 shrink-0" />
              <span>support@nimbuskitchens.com</span>
            </div>
          </div>
        </GlassPanel>

        <GlassPanel className="p-6">
          {submitted ? (
            <div className="text-center py-8 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="font-black text-lg text-white">Message Dispatched!</h3>
              <p className="text-xs text-slate-400">Our Hub Operations Manager will reach out within 15 minutes.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="font-extrabold text-lg text-white">Send Us a Note</h3>

              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
              />

              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
              />

              <textarea
                rows={4}
                placeholder="How can we help you?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500 resize-none"
              />

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center gap-2 hover:bg-amber-400 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Transmit Message</span>
              </button>
            </form>
          )}
        </GlassPanel>
      </div>
    </div>
  );
}
