import React, { useState, useEffect, useRef } from 'react';

export function StatsStrip() {
  const [scrollY, setScrollY] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState({ p50: 0, b20: 0, a10: 0, c99: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          // Animate numbers count up on scroll
          let start = 0;
          const duration = 1500;
          const startTime = performance.now();

          const animateNumbers = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // easeOutQuad
            const easeProgress = progress * (2 - progress);

            setCounts({
              p50: Math.floor(easeProgress * 50),
              b20: Math.floor(easeProgress * 20),
              a10: Math.floor(easeProgress * 10),
              c99: Math.floor(easeProgress * 99),
            });

            if (progress < 1) {
              requestAnimationFrame(animateNumbers);
            }
          };

          requestAnimationFrame(animateNumbers);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section 
      ref={sectionRef}
      className="bg-[#2563EB] text-white py-16 relative overflow-hidden transition-all"
    >
      {/* Background moving on scroll (Parallax effect) */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-400/60 via-blue-600/30 to-blue-800/80 pointer-events-none transition-transform duration-75"
        style={{ transform: `translateY(${scrollY * 0.15}px)` }}
      />
      
      {/* Additional floating particle / grid effect */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          
          <div className="space-y-1 transform transition-transform hover:scale-105 duration-300">
            <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white drop-shadow-md">
              {counts.p50}+
            </div>
            <div className="text-sm sm:text-base font-medium text-blue-100 uppercase tracking-wider">
              Projects Delivered
            </div>
          </div>

          <div className="space-y-1 transform transition-transform hover:scale-105 duration-300">
            <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white drop-shadow-md">
              {counts.b20}+
            </div>
            <div className="text-sm sm:text-base font-medium text-blue-100 uppercase tracking-wider">
              Business Solutions
            </div>
          </div>

          <div className="space-y-1 transform transition-transform hover:scale-105 duration-300">
            <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white drop-shadow-md">
              {counts.a10}+
            </div>
            <div className="text-sm sm:text-base font-medium text-blue-100 uppercase tracking-wider">
              AI Automations
            </div>
          </div>

          <div className="space-y-1 transform transition-transform hover:scale-105 duration-300">
            <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white drop-shadow-md">
              {counts.c99}%
            </div>
            <div className="text-sm sm:text-base font-medium text-blue-100 uppercase tracking-wider">
              Client Satisfaction
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
