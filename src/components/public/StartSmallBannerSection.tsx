import React from 'react';
import { ArrowRight } from 'lucide-react';

interface StartSmallBannerSectionProps {
  onOpenContact: () => void;
}

export function StartSmallBannerSection({ onOpenContact }: StartSmallBannerSectionProps) {
  return (
    <section className="py-12 bg-[#F0F6FF] dark:bg-slate-950 px-4 sm:px-6 lg:px-8">
      <style>{`
        @keyframes frequentShake {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          12% { transform: translateX(-6px) rotate(-0.6deg); }
          25% { transform: translateX(6px) rotate(0.6deg); }
          38% { transform: translateX(-5px) rotate(-0.4deg); }
          50% { transform: translateX(5px) rotate(0.4deg); }
          63% { transform: translateX(-3px) rotate(-0.2deg); }
          75% { transform: translateX(3px) rotate(0.2deg); }
          88% { transform: translateX(-1px) rotate(0deg); }
        }
        .animate-shake-attention {
          animation: frequentShake 2s ease-in-out infinite;
        }
      `}</style>
      <div className="max-w-5xl mx-auto">
        <div className="glass-card-light p-8 sm:p-12 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8 animate-shake-attention transition-transform duration-300 hover:scale-[1.02] cursor-default">
          
          <div className="space-y-3 text-center md:text-left">
            <div className="text-xs font-extrabold tracking-widest text-[#2563EB] uppercase">
              START SMALL. GROW WHEN YOU'RE READY.
            </div>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] dark:text-white tracking-tight">
              Your digital journey can start from just <span className="text-[#2563EB] font-black">PKR 6,999</span><span className="text-base sm:text-lg font-bold text-slate-500">/month</span>
            </h3>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium">
              No setup bill. No lock-in.
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={onOpenContact}
              className="px-8 py-4 rounded-full bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-base shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:scale-105 transition-all duration-200 flex items-center gap-2 cursor-pointer"
            >
              Talk to us <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
