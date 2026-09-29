import React from 'react';
import { Search, Compass, Code, TrendingUp, ArrowRight } from 'lucide-react';

export function ProcessSection() {
  const steps = [
    {
      num: '01',
      title: 'Discover & Analyze',
      description: 'We dive deep into your business requirements, goals, and technical challenges to define a bulletproof project scope.',
      icon: <Search className="w-6 h-6 text-blue-600" />,
      badge: 'Requirement Analysis'
    },
    {
      num: '02',
      title: 'Architect & Design',
      description: 'Our engineers and UX designers craft intuitive user flows, secure database schemas, and modern system architectures.',
      icon: <Compass className="w-6 h-6 text-indigo-600" />,
      badge: 'System Blueprint'
    },
    {
      num: '03',
      title: 'Build & Automate',
      description: 'We write clean, production-ready code, integrate AI workflows, and set up automated testing and pipelines.',
      icon: <Code className="w-6 h-6 text-blue-600" />,
      badge: 'Agile Engineering'
    },
    {
      num: '04',
      title: 'Deploy & Scale',
      description: 'We launch your application on robust cloud infrastructure with 24/7 monitoring, security audits, and ongoing support.',
      icon: <TrendingUp className="w-6 h-6 text-emerald-600" />,
      badge: 'Enterprise Launch'
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-[#F8FAFC] via-white to-[#F8FAFC] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-blue-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-[#2563EB] text-xs font-semibold tracking-wide shadow-xs">
            Our Development Process
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight">
            How We Bring Your Vision To Life
          </h2>
          <p className="text-base sm:text-lg text-[#64748B]">
            A structured, transparent methodology ensuring flawless execution from initial concept to enterprise deployment.
          </p>
        </div>

        {/* Process Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 relative group flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    {step.icon}
                  </div>
                  <span className="text-3xl font-extrabold text-slate-200 group-hover:text-blue-600 transition-colors">
                    {step.num}
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full">
                    {step.badge}
                  </span>
                  <h3 className="text-xl font-extrabold text-[#0F172A] pt-1">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform">
                <span>Phase {step.num}</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
