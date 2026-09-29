import React from 'react';
import { Briefcase, Cpu, Zap, Shield, Sparkles, Headphones } from 'lucide-react';

export function WhyUsSection() {
  const advantages = [
    {
      icon: <Briefcase className="w-6 h-6 text-[#2563EB]" />,
      title: 'Business-Focused Solutions',
      description: 'We align every line of code directly with your bottom line, ROI, and operational efficiency.'
    },
    {
      icon: <Cpu className="w-6 h-6 text-[#2563EB]" />,
      title: 'Modern Technology',
      description: 'Built with elite modern stacks (React, TypeScript, Next.js, Python, Node, Cloud & AI SDKs).'
    },
    {
      icon: <Zap className="w-6 h-6 text-[#2563EB]" />,
      title: 'AI-Powered Automation',
      description: 'Transform manual data entry and customer bottlenecks into autonomous AI pipelines.'
    },
    {
      icon: <Shield className="w-6 h-6 text-[#2563EB]" />,
      title: 'Scalable Architecture',
      description: 'Engineered for seamless growth, high traffic loads, and enterprise-grade security standards.'
    },
    {
      icon: <Sparkles className="w-6 h-6 text-[#2563EB]" />,
      title: 'Clean User Experience',
      description: 'Sophisticated design and intuitive interfaces that delight users and drive engagement.'
    },
    {
      icon: <Headphones className="w-6 h-6 text-[#2563EB]" />,
      title: 'Long-Term Support',
      description: 'Dedicated ongoing maintenance, performance monitoring, and iterative feature enhancements.'
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-[#2563EB] text-xs font-semibold tracking-wide">
            Why CloudsBuilt
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight">
            Built For Uncompromising Excellence
          </h2>
          <p className="text-base sm:text-lg text-[#64748B]">
            Discover why forward-thinking companies partner with us for their software and AI automation needs.
          </p>
        </div>

        {/* 6 Advantages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((adv, index) => (
            <div
              key={index}
              className="bg-[#F8FAFC] p-8 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 space-y-4 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm group-hover:bg-[#2563EB] group-hover:text-white transition-colors duration-300">
                {React.cloneElement(adv.icon, { className: 'w-6 h-6 text-[#2563EB] group-hover:text-white transition-colors' })}
              </div>

              <h3 className="text-xl font-bold text-[#0F172A]">
                {adv.title}
              </h3>

              <p className="text-sm text-[#64748B] leading-relaxed">
                {adv.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
