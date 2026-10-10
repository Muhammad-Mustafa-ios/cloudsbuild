import React, { useState } from 'react';
import { ArrowRight, ExternalLink, CheckCircle2, TrendingUp, ShieldCheck, Sparkles, Globe, Smartphone, Code2, Layers, Play, Monitor, RefreshCw } from 'lucide-react';

interface OurWorkPageProps {
  onOpenContact: () => void;
  onBackToHome: () => void;
}

interface CaseStudy {
  id: number;
  title: string;
  client: string;
  category: string;
  description: string;
  imageUrl: string;
  liveDemoUrl: string;
  metrics: string[];
  tags: string[];
}

export function OurWorkPage({ onOpenContact, onBackToHome }: OurWorkPageProps) {
  const [caseStudies] = useState<CaseStudy[]>([
    {
      id: 1,
      title: "Fintech Enterprise Cloud Platform",
      client: "Aegis Financial Group",
      category: "Software & Web Platform",
      description: "Replaced legacy on-premise risk assessment systems with a cloud-native, secure financial analytics platform handling millions of daily transactions with sub-millisecond response times.",
      imageUrl: "https://i.pinimg.com/1200x/d6/7d/95/d67d954f36f71a0d9deb2d79b45d3662.jpg",
      liveDemoUrl: "https://example.com/fintech",
      metrics: ["+310% Processing Speed", "99.99% Uptime", "SOC2 Compliant"],
      tags: ["Cloud Architecture", "React & Node.js", "Enterprise Security"]
    },
    {
      id: 2,
      title: "Direct-to-Consumer E-Commerce Ecosystem",
      client: "Lumina Home Goods",
      category: "High-Performance E-Commerce",
      description: "Custom headless e-commerce store with lightning-fast page loads, automated inventory sync, and seamless checkout experience designed to convert high-intent buyers.",
      imageUrl: "https://i.pinimg.com/1200x/1a/7a/9c/1a7a9c2c6ed63a2120059474a3ded340.jpg",
      liveDemoUrl: "https://example.com/ecommerce",
      metrics: ["+185% Conversion Rate", "0.8s Load Time", "$4.2M+ Annual GMV"],
      tags: ["Headless Shopify", "Tailwind CSS", "Automated Payments"]
    },
    {
      id: 3,
      title: "AI-Powered Logistics & Fleet Optimizer",
      client: "Veloce Transport & Logistics",
      category: "AI & Workflow Automation",
      description: "Custom dispatch routing algorithm and automated customer notification chatbot that cut delivery delays by 40% and saved 12 hours weekly per dispatcher.",
      imageUrl: "https://i.pinimg.com/236x/e5/73/1d/e5731d7bd65d27b44183fefc56989fe5.jpg",
      liveDemoUrl: "https://example.com/ai-logistics",
      metrics: ["-40% Delivery Delays", "12h Saved Weekly", "Automated AI Dispatch"],
      tags: ["OpenAI API", "Real-Time Tracking", "Python Backend"]
    },
    {
      id: 4,
      title: "B2B SaaS Field Operations Mobile App",
      client: "Apex Field Services",
      category: "Mobile Application",
      description: "Cross-platform mobile app enabling field technicians to manage work orders, capture digital signatures, and sync offline inspection data instantly across remote job sites.",
      imageUrl: "https://i.pinimg.com/1200x/bb/2b/14/bb2b14e60515cdaf2a7482c507b8b2d2.jpg",
      liveDemoUrl: "https://example.com/mobile-app",
      metrics: ["500+ Daily Techs", "100% Offline Sync", "4.9 App Store Rating"],
      tags: ["React Native", "Offline-First Sync", "Push Notifications"]
    }
  ]);

  const [demoUrls, setDemoUrls] = useState<{ [key: number]: string }>(
    caseStudies.reduce((acc, curr) => ({ ...acc, [curr.id]: curr.liveDemoUrl }), {})
  );

  const [activeViewMode, setActiveViewMode] = useState<{ [key: number]: 'mockup' | 'live' }>({});

  const handleUrlChange = (id: number, newUrl: string) => {
    setDemoUrls(prev => ({ ...prev, [id]: newUrl }));
  };

  const toggleViewMode = (id: number, mode: 'mockup' | 'live') => {
    setActiveViewMode(prev => ({ ...prev, [id]: mode }));
  };

  return (
    <div className="min-h-screen pt-32 pb-24 bg-[#F0F6FF] dark:bg-slate-950 text-[#0F172A] dark:text-slate-100 transition-colors">
      
      {/* Background Glows */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-blue-400/15 dark:bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Back Link */}
        <div className="mb-8">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#2563EB] hover:text-blue-700 dark:text-blue-400 cursor-pointer group"
          >
            ← Back to Home
          </button>
        </div>

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-950 border border-blue-200/80 dark:border-blue-800 text-[#2563EB] dark:text-blue-400 text-xs font-bold tracking-widest uppercase shadow-sm">
            OUR WORK & CASE STUDIES
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-[#0F172A] dark:text-white tracking-tight leading-tight">
            Real businesses.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] via-blue-600 to-purple-600">Built on technology that works.</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Explore live digital platforms, mobile apps, e-commerce stores, and AI systems we've built. Paste any live URL to test interactive scrolling across laptop and mobile viewports.
          </p>
        </div>

        {/* Case Studies / Project Showcases */}
        <div className="space-y-24">
          {caseStudies.map((study, idx) => {
            const currentUrl = demoUrls[study.id] || study.liveDemoUrl;
            const viewMode = activeViewMode[study.id] || 'mockup';

            return (
              <div 
                key={study.id}
                className={`bg-gradient-to-br from-white via-blue-50/50 to-blue-100/30 dark:from-slate-900 dark:via-slate-900/90 dark:to-blue-950/40 backdrop-blur-2xl rounded-[3rem] border border-blue-200/60 dark:border-slate-800 shadow-[0_20px_60px_rgba(37,99,235,0.15)] hover:shadow-[0_30px_90px_rgba(37,99,235,0.25)] transition-all duration-500 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-12 group`}
              >
                {/* Left/Right Column: Live Dual-Device Showcase (Laptop & Mobile) */}
                <div className={`lg:col-span-7 space-y-4 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                  
                  {/* Live URL Input & Toggle Bar */}
                  <div className="bg-white/80 dark:bg-slate-800/90 backdrop-blur-md p-3 rounded-2xl border border-blue-100 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3 shadow-sm">
                    <div className="flex items-center gap-2 flex-1 min-w-[240px]">
                      <Globe className="w-4 h-4 text-[#2563EB] shrink-0" />
                      <input
                        type="text"
                        value={currentUrl}
                        onChange={(e) => handleUrlChange(study.id, e.target.value)}
                        placeholder="Paste live demo URL (e.g. https://myclient.com)"
                        className="w-full bg-transparent text-xs sm:text-sm text-slate-800 dark:text-slate-200 focus:outline-none font-mono"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleViewMode(study.id, 'mockup')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${viewMode === 'mockup' ? 'bg-[#2563EB] text-white shadow-md shadow-blue-500/20' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'}`}
                      >
                        Device Mockups
                      </button>
                      <button
                        onClick={() => toggleViewMode(study.id, 'live')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${viewMode === 'live' ? 'bg-[#2563EB] text-white shadow-md shadow-blue-500/20' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'}`}
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Live Preview
                      </button>
                    </div>
                  </div>

                  {/* Full-Bleed Showcase Container (No Laptop/Mobile frames, no browser header) */}
                  <div className="relative w-full h-[400px] sm:h-[450px] rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-2xl bg-slate-950 flex flex-col justify-end">
                    
                    {viewMode === 'live' ? (
                      <div className="w-full h-full relative">
                        <iframe
                          src={currentUrl.startsWith('http') ? currentUrl : `https://${currentUrl}`}
                          title={study.title}
                          className="w-full h-full border-0"
                          sandbox="allow-scripts allow-same-origin allow-forms"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-full relative overflow-y-auto scrollbar-thin scrollbar-thumb-blue-600 group/img">
                        <img
                          src={study.imageUrl}
                          alt={study.title}
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700 min-h-full"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                      </div>
                    )}

                    {/* Floating Simple White Live Demo Button */}
                    <div className="absolute top-4 right-4 z-20">
                      <a
                        href={currentUrl.startsWith('http') ? currentUrl : `https://${currentUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/95 hover:bg-white text-slate-900 font-bold text-xs shadow-xl backdrop-blur-md border border-slate-200 hover:scale-105 transition-all cursor-pointer"
                      >
                        <span>Live Demo</span>
                        <ExternalLink className="w-3.5 h-3.5 text-[#2563EB]" />
                      </a>
                    </div>

                    {/* Bottom Info Bar inside Showcase */}
                    <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between text-xs text-white font-medium bg-slate-900/80 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10">
                      <span className="flex items-center gap-1.5 font-bold">
                        <Sparkles className="w-3.5 h-3.5 text-blue-400" /> {study.title}
                      </span>
                      <span className="text-blue-300 font-semibold">
                        {study.client}
                      </span>
                    </div>

                  </div>

                </div>

                {/* Content Column */}
                <div className={`lg:col-span-5 space-y-6 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/80 text-[#2563EB] dark:text-blue-400 text-xs font-bold tracking-wider uppercase">
                    <Sparkles className="w-3.5 h-3.5" /> {study.category}
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] dark:text-white tracking-tight leading-tight">
                    {study.title}
                  </h3>

                  <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                    {study.description}
                  </p>

                  {/* Metrics Cards */}
                  <div className="grid grid-cols-3 gap-2.5 pt-1">
                    {study.metrics.map((metric, mIdx) => (
                      <div key={mIdx} className="bg-blue-50/90 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-900/50 p-3 rounded-2xl text-center shadow-sm">
                        <div className="text-[11px] sm:text-xs font-extrabold text-[#2563EB] dark:text-blue-400">
                          {metric}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {study.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="px-3 py-1 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold shadow-sm border border-slate-200/60 dark:border-slate-700">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-3">
                    <button
                      onClick={onOpenContact}
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-sm shadow-[0_10px_25px_rgba(37,99,235,0.3)] hover:shadow-[0_15px_35px_rgba(37,99,235,0.4)] hover:scale-105 transition-all cursor-pointer"
                    >
                      Start a Similar Project <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-28 rounded-[3rem] bg-gradient-to-r from-[#2563EB] via-blue-600 to-purple-600 text-white p-10 sm:p-16 text-center relative overflow-hidden shadow-[0_25px_60px_rgba(37,99,235,0.3)]">
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Ready to build your technology without hiring a team?
            </h2>
            <p className="text-blue-100 text-base sm:text-lg max-w-2xl mx-auto">
              Partner with CloudsBuild for end-to-end design, development, AI automation, and continuous management under one simple subscription.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={onOpenContact}
                className="px-8 py-4 rounded-full bg-white text-[#2563EB] font-bold text-base shadow-xl hover:bg-blue-50 hover:scale-105 transition-all cursor-pointer"
              >
                Start Your Project Today
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
