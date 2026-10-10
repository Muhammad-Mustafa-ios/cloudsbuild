import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Globe, ShoppingBag, Cpu, Bot, Workflow, Code2, Layout, Layers } from 'lucide-react';

interface ServicesSectionProps {
  onOpenContact: () => void;
}

export function ServicesSection({ onOpenContact }: ServicesSectionProps) {
  const [services, setServices] = useState<any[]>([
    {
      id: 1,
      title: "Websites & Web Platforms",
      description: "A website built around your business, not a recycled template.",
      imageUrl: "https://i.pinimg.com/736x/b1/7e/17/b17e1784d932c8a69512c452ec446cdf.jpg",
      link: "/services/websites"
    },
    {
      id: 2,
      title: "E-Commerce",
      description: "An online store your customers can actually use.",
      imageUrl: "https://i.pinimg.com/736x/b1/7e/17/b17e1784d932c8a69512c452ec446cdf.jpg",
      link: "/services/ecommerce"
    },
    {
      id: 3,
      title: "Software & Business Systems",
      description: "Software built around how your business works.",
      imageUrl: "https://i.pinimg.com/1200x/b3/18/aa/b318aace2f92aa1c37a5b38446d6b078.jpg",
      link: "/services/software"
    },
    {
      id: 4,
      title: "Mobile Apps",
      description: "Mobile applications for your customers or your team.",
      imageUrl: "https://i.pinimg.com/736x/f3/2f/25/f32f2546c88eb85bae3111d81de4d608.jpg",
      link: "/services/mobile-apps"
    },
    {
      id: 5,
      title: "AI & Automation",
      description: "AI tools and automated workflows that help your business move faster.",
      imageUrl: "https://i.pinimg.com/736x/d3/17/b3/d317b31e0835bbd1b25a876ae6135424.jpg",
      link: "/services/ai-automation"
    },
    {
      id: 6,
      title: "Design, Support & Growth",
      description: "We continue improving and supporting your technology after launch.",
      imageUrl: "https://i.pinimg.com/1200x/ef/72/71/ef72718ba9d31cfb2a7f462411fc094d.jpg",
      link: "/services/support"
    },
    {
      id: 7,
      title: "Digital Marketing & Meta/TikTok Ads",
      description: "High-converting ad campaigns on Meta and TikTok to drive immediate customer acquisition and sales.",
      imageUrl: "https://i.pinimg.com/736x/54/6c/66/546c6694a58259a264274435cd3494f9.jpg",
      link: "/services/marketing"
    }
  ]);

  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setServices(data);
        }
      })
      .catch(err => console.error("Failed to load services:", err));
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  // Auto rotation every 3 seconds unless paused
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % services.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isPaused, services.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % services.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
  };

  // Touch & Mouse Drag support
  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setTouchStart(clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent | React.MouseEvent) => {
    if (touchStart === null) return;
    const clientX = 'changedTouches' in e ? e.changedTouches[0].clientX : e.clientX;
    const diff = touchStart - clientX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    setTouchStart(null);
  };

  return (
    <section 
      id="services" 
      className="py-24 bg-[#F0F6FF] dark:bg-slate-950 relative overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 dark:bg-blue-950 border border-blue-200/80 text-[#2563EB] text-xs font-semibold tracking-wide">
            Our Core Services
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] dark:text-white tracking-tight">
            Everything You Need To Build And Scale
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Comprehensive technology services designed to modernize your operations and elevate your digital presence.
          </p>
        </div>

        {/* 3D Carousel Stage */}
        <div 
          ref={containerRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleTouchStart}
          onMouseUp={handleTouchEnd}
          className="relative h-[350px] sm:h-[390px] flex items-center justify-center perspective-[1400px] cursor-grab active:cursor-grabbing overflow-visible my-4"
        >
          {services.map((service, index) => {
            const total = services.length;
            let offset = (index - currentIndex + total) % total;
            if (offset > total / 2) {
              offset -= total;
            }

            // Visible range
            const isVisible = Math.abs(offset) <= 3;
            if (!isVisible) return null;

            const isCenter = offset === 0;

            let translateX = offset * 390;
            let translateZ = isCenter ? 80 : -60 * Math.abs(offset);
            let rotateY = offset * -10;
            let scale = isCenter ? 1.04 : Math.max(0.8, 1 - Math.abs(offset) * 0.08);
            let opacity = isCenter ? 1 : Math.max(0.4, 1 - Math.abs(offset) * 0.25);
            let zIndex = total - Math.abs(offset);

            if (window.innerWidth < 640) {
              translateX = offset * 280;
              scale = isCenter ? 1 : 0.75;
            }

            const hasImage = service.imageUrl && service.imageUrl.trim() !== '' && !imageErrors[service.id];

             return (
              <div
                key={service.id || index}
                onClick={() => setCurrentIndex(index)}
                style={{
                  transform: `translate3d(${translateX}px, 0px, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  zIndex: zIndex,
                  opacity: opacity,
                  transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                className={`absolute w-[340px] sm:w-[440px] h-[270px] sm:h-[290px] bg-slate-900 border-2 ${
                  isCenter 
                    ? 'border-blue-500 shadow-[0_0_35px_rgba(37,99,235,0.4),0_20px_50px_rgba(11,19,43,0.8)] ring-2 ring-blue-500/30' 
                    : 'border-blue-500/30 shadow-[0_0_20px_rgba(37,99,235,0.15)]'
                } rounded-3xl flex flex-col justify-end group cursor-pointer overflow-hidden p-0`}
              >
                {/* Full Bleed Image Covering the Entire Container */}
                <div className="absolute inset-0 w-full h-full overflow-hidden bg-slate-950">
                  {hasImage ? (
                    <img
                      src={service.imageUrl}
                      alt={service.title}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={() => setImageErrors(prev => ({ ...prev, [service.id]: true }))}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-115"
                    />
                  ) : (
                    <div className="service-image-placeholder text-slate-400 text-xs font-semibold tracking-wide uppercase flex items-center justify-center w-full h-full">
                      Service Preview
                    </div>
                  )}
                  {/* Dark gradient overlay for gorgeous contrast with text */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128] via-[#0A1128]/60 to-transparent" />
                </div>

                {/* Top accent line */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#2563EB] via-indigo-500 to-blue-400 transition-opacity duration-300 ${isCenter ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />

                {/* Content Overlay at Bottom: Only Service Title and Action */}
                <div className="relative z-10 p-6 space-y-3 bg-gradient-to-t from-[#0A1128] via-[#0A1128]/90 to-transparent pt-12">
                  <h3 className={`text-xl font-extrabold transition-colors line-clamp-2 ${isCenter ? 'text-blue-400' : 'text-white group-hover:text-blue-400'}`}>
                    {service.title}
                  </h3>

                  <div className="pt-2 border-t border-blue-500/30 flex items-center justify-between text-sm font-semibold text-blue-400">
                    <span>Explore Service</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Navigation Controls */}
        <div className="flex items-center justify-center gap-6 mt-10">
          <button 
            onClick={handlePrev}
            className="w-12 h-12 rounded-full bg-white dark:bg-slate-900 hover:bg-[#2563EB] border border-slate-200 dark:border-slate-800 text-[#0F172A] dark:text-white hover:text-white flex items-center justify-center shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
            aria-label="Previous service"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2">
            {services.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === idx 
                    ? 'w-8 bg-[#2563EB] shadow-[0_0_10px_rgba(37,99,235,0.4)]' 
                    : 'w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button 
            onClick={handleNext}
            className="w-12 h-12 rounded-full bg-white dark:bg-slate-900 hover:bg-[#2563EB] border border-slate-200 dark:border-slate-800 text-[#0F172A] dark:text-white hover:text-white flex items-center justify-center shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
            aria-label="Next service"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
