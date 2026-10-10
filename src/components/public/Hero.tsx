import React from 'react';
import { ArrowRight, Globe, Code, ShoppingCart, Sparkles, Smartphone, Share2, Check } from 'lucide-react';
import { ScrollReveal } from '../ScrollReveal';

interface HeroProps {
  onOpenContact: () => void;
  onNavigate: (view: any) => void;
}

export function Hero({ onOpenContact, onNavigate }: HeroProps) {
  return (
    <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden bg-gradient-to-b from-[#EFF6FF] via-white to-[#F8FAFC] dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors">
      
      {/* Background Soft Glow Aura */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Hero Center Content & Floating Side Elements */}
        <div className="relative flex flex-col items-center text-center max-w-4xl mx-auto mb-16">
          
          {/* Left Floating Cards (Extreme Left positions with active animations) */}
          <div className="hidden xl:block absolute -left-36 lg:-left-56 top-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-blue-100 dark:border-slate-800 animate-bounce duration-[1500ms]">
            <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-[#2563EB] flex items-center justify-center">
              <Globe className="w-6 h-6 animate-spin duration-[10000ms]" />
            </div>
          </div>

          <div className="hidden xl:block absolute -left-44 lg:-left-64 top-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-purple-100 dark:border-slate-800 animate-pulse duration-[2000ms]">
            <div className="w-11 h-11 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 flex items-center justify-center">
              <Code className="w-6 h-6 animate-pulse" />
            </div>
          </div>

          <div className="hidden xl:block absolute -left-36 lg:-left-56 bottom-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-emerald-100 dark:border-slate-800 animate-bounce duration-[1800ms]">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center">
              <ShoppingCart className="w-6 h-6" />
            </div>
          </div>

          {/* Right Floating Cards (Extreme Right positions with active animations) */}
          <div className="hidden xl:block absolute -right-36 lg:-right-56 top-8 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-amber-100 dark:border-slate-800 animate-pulse duration-[1600ms]">
            <div className="w-11 h-11 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 flex items-center justify-center">
              <Sparkles className="w-6 h-6 animate-spin duration-[8000ms]" />
            </div>
          </div>

          <div className="hidden xl:block absolute -right-44 lg:-right-64 top-44 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-indigo-100 dark:border-slate-800 animate-bounce duration-[1400ms]">
            <div className="w-11 h-11 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 flex items-center justify-center">
              <Smartphone className="w-6 h-6" />
            </div>
          </div>

          <div className="hidden xl:block absolute -right-36 lg:-right-56 bottom-8 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-rose-100 dark:border-slate-800 animate-pulse duration-[2200ms]">
            <div className="w-11 h-11 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 flex items-center justify-center">
              <Share2 className="w-6 h-6" />
            </div>
          </div>

          {/* Main Headline */}
          <ScrollReveal direction="down" delay={0.1}>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#0F172A] dark:text-white tracking-tight leading-[1.12] mb-6">
              We build the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-purple-600">technology.</span><br />
              You <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-purple-600">grow</span> the business.
            </h1>
          </ScrollReveal>

          {/* Subtitle */}
          <ScrollReveal direction="up" delay={0.2}>
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 font-normal leading-relaxed mb-10 max-w-2xl mx-auto">
              From websites and e-commerce to custom software, mobile apps, AI and automation — we give your business the technology it needs to grow, without the traditional upfront cost.
            </p>
          </ScrollReveal>

          {/* CTA Buttons */}
          <ScrollReveal direction="zoom" delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-8">
              <button
                onClick={() => {
                  const el = document.getElementById('services');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  else onNavigate('services');
                }}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-base shadow-lg shadow-blue-500/25 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer group"
              >
                Explore Our Services <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('how-it-works') || document.getElementById('process');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-bold text-base shadow-sm hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                How It Works <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </ScrollReveal>

          {/* Trust Checkmarks below CTA */}
          <ScrollReveal direction="up" delay={0.4}>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-semibold text-slate-700 dark:text-slate-300 pt-2">
              <span className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-950/80 text-[#2563EB] flex items-center justify-center font-bold text-xs"><Check className="w-3.5 h-3.5" /></span>
                Affordable Monthly Plans
              </span>
              <span className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-950/80 text-[#2563EB] flex items-center justify-center font-bold text-xs"><Check className="w-3.5 h-3.5" /></span>
                No Unnecessary Upfront Investment
              </span>
              <span className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-950/80 text-[#2563EB] flex items-center justify-center font-bold text-xs"><Check className="w-3.5 h-3.5" /></span>
                Cancel Anytime
              </span>
            </div>
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
}


