import React from 'react';
import { 
  Code2, Server, FolderKanban, ShieldAlert, Smartphone, 
  TrendingUp, BarChart3, Headphones, Cpu, Wrench, ArrowRight 
} from 'lucide-react';

interface WhatWeManageSectionProps {
  onOpenContact: () => void;
}

export function WhatWeManageSection({ onOpenContact }: WhatWeManageSectionProps) {
  const services = [
    {
      title: "Custom Design & Development",
      description: "Built around your business, not a recycled template.",
      icon: <Code2 className="w-6 h-6 text-[#2563EB]" />
    },
    {
      title: "Hosting & Infrastructure",
      description: "Fast, secure hosting and the technical infrastructure your solution needs.",
      icon: <Server className="w-6 h-6 text-[#2563EB]" />
    },
    {
      title: "Content & Product Setup",
      description: "We help organise, upload and maintain your website or store content.",
      icon: <FolderKanban className="w-6 h-6 text-[#2563EB]" />
    },
    {
      title: "Security & Backups",
      description: "Regular updates, backups and essential security monitoring.",
      icon: <ShieldAlert className="w-6 h-6 text-[#2563EB]" />
    },
    {
      title: "Mobile-Ready Experiences",
      description: "Websites and digital experiences designed to work beautifully across devices.",
      icon: <Smartphone className="w-6 h-6 text-[#2563EB]" />
    },
    {
      title: "Ongoing Improvements",
      description: "New pages, products, features and improvements as your business evolves.",
      icon: <TrendingUp className="w-6 h-6 text-[#2563EB]" />
    },
    {
      title: "Analytics & Insights",
      description: "Understand how people interact with your digital presence.",
      icon: <BarChart3 className="w-6 h-6 text-[#2563EB]" />
    },
    {
      title: "Direct Support",
      description: "Get help from the people who build and manage your solution.",
      icon: <Headphones className="w-6 h-6 text-[#2563EB]" />
    },
    {
      title: "AI & Automation",
      description: "Add chatbots, AI tools and automated workflows when your business needs them.",
      icon: <Cpu className="w-6 h-6 text-[#2563EB]" />
    },
    {
      title: "Maintenance & Management",
      description: "We keep your technology running so you don't have to.",
      icon: <Wrench className="w-6 h-6 text-[#2563EB]" />
    }
  ];

  // Split into two rows or use full list for both rows (duplicated for infinite loop)
  const row1Services = [...services, ...services];
  const row2Services = [...services.slice().reverse(), ...services.slice().reverse()];

  return (
    <section className="py-24 bg-[#F0F6FF] dark:bg-slate-950 relative overflow-hidden">
      {/* Subtle ambient glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-purple-400/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 dark:bg-blue-950 border border-blue-200/80 dark:border-blue-800 text-[#2563EB] dark:text-blue-400 text-xs font-bold tracking-widest uppercase mb-4">
          WHAT WE MANAGE
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] dark:text-white tracking-tight leading-tight mb-4">
          One subscription.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-purple-600">Everything managed by us.</span>
        </h2>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Not a list of features handed over for you to run. Every one of these stays our job, every month, for as long as you're with us.
        </p>
      </div>

      {/* Marquee Container with Edge Fade Mask */}
      <div className="relative w-full overflow-hidden py-4 marquee-mask">
        
        {/* ROW 1: Right -> Left (32s) */}
        <div className="flex w-full overflow-hidden mb-6 sm:mb-8">
          <div className="flex gap-6 shrink-0 marquee-track-1 py-3 pl-6">
            {row1Services.map((service, idx) => (
              <div
                key={`row1-${idx}`}
                className="w-[300px] sm:w-[340px] shrink-0 bg-white dark:bg-slate-900 text-[#0F172A] dark:text-white p-6 border-2 border-blue-200 dark:border-blue-800 shadow-[0_0_25px_rgba(37,99,235,0.12)] hover:shadow-[0_0_40px_rgba(37,99,235,0.35),0_0_15px_rgba(59,130,246,0.2)] hover:border-blue-400 dark:hover:border-blue-600 hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer flex flex-col justify-between rounded-3xl relative overflow-hidden"
                style={{ willChange: 'transform' }}
              >
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 group-hover:h-1.5 transition-all" />

                <div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[#2563EB] group-hover:text-white transition-all duration-300">
                    {React.cloneElement(service.icon, { className: 'w-6 h-6 text-[#2563EB] group-hover:text-white transition-colors' })}
                  </div>
                  <h3 className="text-lg font-bold text-[#0F172A] dark:text-white mb-2 group-hover:text-[#2563EB] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {service.description}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 group-hover:text-[#2563EB]">
                  <span>Included in subscription</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ROW 2: Left -> Right (38s) */}
        <div className="flex w-full overflow-hidden">
          <div className="flex gap-6 shrink-0 marquee-track-2 py-3 pl-6">
            {row2Services.map((service, idx) => (
              <div
                key={`row2-${idx}`}
                className="w-[300px] sm:w-[340px] shrink-0 bg-white dark:bg-slate-900 text-[#0F172A] dark:text-white p-6 border-2 border-blue-200 dark:border-blue-800 shadow-[0_0_25px_rgba(37,99,235,0.12)] hover:shadow-[0_0_40px_rgba(37,99,235,0.35),0_0_15px_rgba(59,130,246,0.2)] hover:border-blue-400 dark:hover:border-blue-600 hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer flex flex-col justify-between rounded-3xl relative overflow-hidden"
                style={{ willChange: 'transform' }}
              >
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 group-hover:h-1.5 transition-all" />

                <div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[#2563EB] group-hover:text-white transition-all duration-300">
                    {React.cloneElement(service.icon, { className: 'w-6 h-6 text-[#2563EB] group-hover:text-white transition-colors' })}
                  </div>
                  <h3 className="text-lg font-bold text-[#0F172A] dark:text-white mb-2 group-hover:text-[#2563EB] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {service.description}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 group-hover:text-[#2563EB]">
                  <span>Fully managed</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <div className="text-center mt-12 relative z-10">
        <button
          onClick={onOpenContact}
          className="px-8 py-4 rounded-full bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-base shadow-lg shadow-blue-500/25 hover:shadow-xl hover:scale-105 transition-all duration-200 inline-flex items-center gap-2 cursor-pointer"
        >
          Explore All Managed Services <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </section>
  );
}
