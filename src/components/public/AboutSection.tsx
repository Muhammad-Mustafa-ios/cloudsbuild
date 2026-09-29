import React from 'react';
import { Cpu, Zap } from 'lucide-react';

export function AboutSection() {
  const steps = [
    'Understand the business',
    'Identify inefficiencies',
    'Build the right technology',
    'Automate repetitive work',
    'Measure results',
    'Continuously improve',
  ];

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Heading & Intro */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-[#2563EB] text-xs font-semibold tracking-wide">
              About CloudsBuilt
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
              Technology That Works For Your Business
            </h2>

            <p className="text-base sm:text-lg text-[#64748B] leading-relaxed">
              At CloudsBuilt, we bridge the gap between complex engineering and everyday business growth. We do not just build software—we engineer complete operational ecosystems designed to eliminate friction and accelerate revenue.
            </p>

            <div className="space-y-3 pt-2">
              {steps.slice(0, 3).map((step, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-[#2563EB] flex items-center justify-center font-bold text-xs">
                    ✓
                  </div>
                  <span className="text-[#0F172A] font-semibold text-sm sm:text-base">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Methodology Board Container (Clean & Professional without lamp) */}
          <div className="lg:col-span-6 relative">
            <div className="bg-[#F8FAFC] p-8 sm:p-10 rounded-3xl border-2 border-blue-200/85 shadow-xl space-y-6 relative z-10 backdrop-blur-xl">
              <h3 className="text-xl font-bold text-[#0F172A] flex items-center gap-2">
                <Cpu className="w-5 h-5 text-[#2563EB]" />
                Our Proven Methodology
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {steps.map((step, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs hover:border-blue-400 hover:shadow-md transition-all space-y-2 group">
                    <div className="text-xs font-extrabold text-[#2563EB] group-hover:scale-105 transition-transform">0{idx + 1}</div>
                    <div className="text-sm font-bold text-[#0F172A]">{step}</div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#2563EB] text-white flex items-center justify-center font-bold shadow-md">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0F172A]">Transformation Guarantee</div>
                    <div className="text-[11px] text-[#64748B]">From manual bottlenecks to automated scale</div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
