import React from 'react';
import { ArrowRight, ShieldCheck, Users, TrendingUp, Lightbulb, Cpu, Headphones, Award, Cloud, Database } from 'lucide-react';

interface HeroProps {
  onOpenContact: () => void;
  onNavigate: (view: any) => void;
}

export function Hero({ onOpenContact, onNavigate }: HeroProps) {
  return (
    <section className="relative pt-32 pb-16 md:pt-36 md:pb-20 overflow-hidden bg-gradient-to-b from-[#F8FAFC] via-white to-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid: Left Text & Right Image with Floating Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center mb-20">
          
          {/* Left Column */}
          <div className="lg:col-span-6 text-left">
            
            {/* Trusted Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-xs mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-slate-700 tracking-wide">
                Trusted by 500+ Enterprise Clients Worldwide
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F172A] tracking-tight leading-[1.15] mb-6">
              Architecting the Future with <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-purple-600">Cloud & AI Excellence</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed mb-8 max-w-xl">
              Empowering global enterprises with high-performance cloud infrastructure, custom software engineering, and intelligent AI automation.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={onOpenContact}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-base shadow-lg shadow-blue-500/25 hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer group"
              >
                Get Started Today <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('services');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-7 py-4 rounded-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-bold text-base shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer"
              >
                Our Services
              </button>
            </div>

          </div>

          {/* Right Column: Skyscraper Visual with Curved Mask & Floating Cards */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Skyscraper Image with custom rounded curve */}
              <div className="relative rounded-[2.5rem] lg:rounded-tr-[120px] overflow-hidden shadow-2xl border-4 border-white bg-slate-900 aspect-[4/3] sm:aspect-[16/11]">
                <img 
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop" 
                  alt="Modern Cloud Infrastructure Building" 
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>

              {/* Floating Card 1: Cloud Uptime */}
              <div className="absolute -top-6 -left-4 sm:-left-8 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3.5 z-20">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold">
                  <Cloud className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-medium text-slate-500">Cloud Uptime</div>
                  <div className="text-base font-extrabold text-[#0F172A] flex items-center gap-1">
                    99.99% <span className="text-xs text-emerald-600 font-bold">↑</span>
                  </div>
                  <div className="text-[10px] text-slate-400">Enterprise SLA Guarantee</div>
                </div>
              </div>

              {/* Floating Card 2: Active Deployments */}
              <div className="absolute top-1/2 -right-4 sm:-right-8 -translate-y-1/2 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-100 z-20">
                <div className="text-xs font-semibold text-slate-500 mb-1">Active Projects</div>
                <div className="text-lg font-extrabold text-[#0F172A] mb-2">1,200+</div>
                <div className="flex items-center -space-x-2">
                  <img className="w-7 h-7 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" alt="Client" />
                  <img className="w-7 h-7 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" alt="Client" />
                  <img className="w-7 h-7 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" alt="Client" />
                  <div className="w-7 h-7 rounded-full border-2 border-white bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">+</div>
                </div>
              </div>

              {/* Floating Card 3: Secure Data */}
              <div className="absolute -bottom-6 right-6 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 z-20">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">SOC2 & ISO Certified</div>
                  <div className="text-[10px] text-slate-500">Enterprise grade data security.</div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Feature Strip (4 Pillars) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-12 border-t border-slate-200/80">
          
          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/70 shadow-xs hover:shadow-md transition-shadow flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0">
              <Cloud className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0F172A] mb-1">Cloud Architecture</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Scalable, highly available multi-cloud deployments.</p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/70 shadow-xs hover:shadow-md transition-shadow flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0F172A] mb-1">AI Automation</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Smart LLM workflows and intelligent AI agents.</p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/70 shadow-xs hover:shadow-md transition-shadow flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0F172A] mb-1">Custom Engineering</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Robust full-stack web and mobile applications.</p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/70 shadow-xs hover:shadow-md transition-shadow flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0F172A] mb-1">Enterprise Security</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Rigorous compliance and zero-trust data protection.</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
