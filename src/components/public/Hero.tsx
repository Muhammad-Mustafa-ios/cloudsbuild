import React, { useEffect, useRef } from 'react';
import { ArrowRight, Globe, Code, ShoppingCart, Sparkles, Smartphone, Share2, Check } from 'lucide-react';
import { ScrollReveal } from '../ScrollReveal';

interface HeroProps {
  onOpenContact: () => void;
  onNavigate: (view: any) => void;
}

export function Hero({ onOpenContact, onNavigate }: HeroProps) {
  /* ============ PASTE YOUR ICON IMAGE LINKS HERE ============
     Put full image URLs (https://...) between the quotes for each side icon.
     Leave "" empty if you want to fall back to the default vector icon. */
  const SIDE_IMAGE_URLS = [
    "https://i.pinimg.com/736x/0c/73/53/0c735354d280f3f88caa3e76e7676498.jpg",
    "https://i.pinimg.com/736x/9a/eb/49/9aeb49f8bbe3d7bc93159195355e80d8.jpg",
    "https://i.pinimg.com/736x/0f/65/58/0f6558f88fb457e68f92c042df252892.jpg",
    "https://i.pinimg.com/736x/60/6b/c0/606bc0717982547e555a514b479365a0.jpg",
    "https://i.pinimg.com/736x/5d/31/cb/5d31cb3e90d5ef99a9964b6cd3134e90.jpg",
    "https://i.pinimg.com/1200x/73/52/0f/73520fce409385c445d1c72fd37b7d4d.jpg"
  ];
  /* ========================================================= */

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const iconElements = container.querySelectorAll<HTMLDivElement>('.bouncing-icon');
    if (!iconElements.length) return;

    const width = container.clientWidth || 1000;
    const height = container.clientHeight || 600;

    const icons = Array.from(iconElements).map((el, i) => {
      const radius = 32;
      const x = Math.random() * (width - 160) + 80;
      const y = Math.random() * (height - 160) + 80;
      const angle = Math.random() * Math.PI * 2;
      const speed = 4.0 + Math.random() * 3.5;
      return {
        el: el as HTMLDivElement,
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius,
      };
    });

    let rafId: number;
    let lastTime = performance.now();

    const animate = (time: number) => {
      const dt = Math.min(20, time - lastTime) / 16.67;
      lastTime = time;

      const w = container.clientWidth;
      const h = container.clientHeight;

      // Update positions
      icons.forEach((icon) => {
        icon.x += icon.vx * dt;
        icon.y += icon.vy * dt;

        // Wall collisions (bounce)
        if (icon.x - icon.radius < 0) {
          icon.x = icon.radius;
          icon.vx *= -1;
        } else if (icon.x + icon.radius > w) {
          icon.x = w - icon.radius;
          icon.vx *= -1;
        }

        if (icon.y - icon.radius < 0) {
          icon.y = icon.radius;
          icon.vy *= -1;
        } else if (icon.y + icon.radius > h) {
          icon.y = h - icon.radius;
          icon.vy *= -1;
        }
      });

      // Icon-to-icon collisions (elastic collision)
      for (let i = 0; i < icons.length; i++) {
        for (let j = i + 1; j < icons.length; j++) {
          const a = icons[i];
          const b = icons[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.hypot(dx, dy);
          const minDist = a.radius + b.radius;

          if (dist < minDist && dist > 0) {
            const overlap = (minDist - dist) / 2;
            const nx = dx / dist;
            const ny = dy / dist;

            a.x -= nx * overlap;
            a.y -= ny * overlap;
            b.x += nx * overlap;
            b.y += ny * overlap;

            const kx = a.vx - b.vx;
            const ky = a.vy - b.vy;
            const p = 2 * (nx * kx + ny * ky) / 2;

            a.vx -= p * nx;
            a.vy -= p * ny;
            b.vx += p * nx;
            b.vy += p * ny;
          }
        }
      }

      // Apply transforms
      icons.forEach((icon) => {
        icon.el.style.transform = `translate3d(${icon.x - icon.radius}px, ${icon.y - icon.radius}px, 0)`;
      });

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(rafId);
  }, []);

  const defaultIcons = [<Globe />, <Code />, <ShoppingCart />, <Sparkles />, <Smartphone />, <Share2 />];

  return (
    <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden bg-gradient-to-b from-[#EFF6FF] via-white to-[#F8FAFC] dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors">
      
      {/* Background Soft Glow Aura */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Physics Bouncing Container Area */}
      <div ref={containerRef} className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {SIDE_IMAGE_URLS.map((url, idx) => (
          <div
            key={idx}
            className="bouncing-icon absolute left-0 top-0 w-16 h-16 pointer-events-auto cursor-pointer transition-transform duration-75 hover:scale-110"
            style={{ willChange: 'transform' }}
          >
            <div className="w-16 h-16 rounded-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-1.5 shadow-xl border border-blue-100 dark:border-slate-800 flex items-center justify-center overflow-hidden">
              {url ? (
                <img src={url} alt="" className="w-full h-full object-cover rounded-full pointer-events-none" referrerPolicy="no-referrer" />
              ) : (
                <div className="text-[#2563EB] dark:text-blue-400 flex items-center justify-center w-full h-full">
                  {defaultIcons[idx % defaultIcons.length]}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Hero Center Content */}
        <div className="relative flex flex-col items-center text-center max-w-4xl mx-auto mb-16">
          
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
