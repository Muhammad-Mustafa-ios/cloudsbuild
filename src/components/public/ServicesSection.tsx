import React, { useState, useEffect, useRef } from 'react';
import { Globe, ShoppingBag, Cpu, Bot, Workflow, Code2, Layout, Layers, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface ServicesSectionProps {
  onOpenContact: () => void;
}

export function ServicesSection({ onOpenContact }: ServicesSectionProps) {
  const services = [
    {
      icon: <Globe className="w-6 h-6 text-[#2563EB]" />,
      title: 'Web Development',
      description: 'Modern responsive websites and high-performance web applications built for conversion and speed.'
    },
    {
      icon: <ShoppingBag className="w-6 h-6 text-[#2563EB]" />,
      title: 'E-Commerce Development',
      description: 'Scalable online stores and customized e-commerce experiences tailored to drive online sales.'
    },
    {
      icon: <Cpu className="w-6 h-6 text-[#2563EB]" />,
      title: 'AI Automation',
      description: 'Automate repetitive business processes using cutting-edge AI models and intelligent workflows.'
    },
    {
      icon: <Bot className="w-6 h-6 text-[#2563EB]" />,
      title: 'AI Chatbots',
      description: 'Intelligent customer-support and business assistants available 24/7 across web and WhatsApp.'
    },
    {
      icon: <Workflow className="w-6 h-6 text-[#2563EB]" />,
      title: 'Business Process Automation',
      description: 'Connect disparate tools, eliminate repetitive manual tasks and drastically improve productivity.'
    },
    {
      icon: <Code2 className="w-6 h-6 text-[#2563EB]" />,
      title: 'Custom Software',
      description: 'Tailored software solutions designed precisely around unique enterprise business requirements.'
    },
    {
      icon: <Layout className="w-6 h-6 text-[#2563EB]" />,
      title: 'UI/UX Design',
      description: 'Modern user interfaces and immersive digital experiences focused on usability and conversion.'
    },
    {
      icon: <Layers className="w-6 h-6 text-[#2563EB]" />,
      title: 'Digital Solutions',
      description: 'End-to-end technology solutions engineered to solve real business problems and scale growth.'
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  // Auto rotation every 3 seconds unless paused
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % services.length);
    }, 3000);
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
      className="py-24 bg-[#F8FAFC] relative overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-[#2563EB] text-xs font-semibold tracking-wide">
            Our Core Services
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight">
            Everything You Need To Build And Scale
          </h2>
          <p className="text-base sm:text-lg text-[#64748B]">
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
          className="relative h-[420px] sm:h-[450px] flex items-center justify-center perspective-[1400px] cursor-grab active:cursor-grabbing overflow-visible my-4"
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

            let translateX = offset * 290;
            let translateZ = isCenter ? 80 : -60 * Math.abs(offset);
            let rotateY = offset * -12;
            let scale = isCenter ? 1.04 : Math.max(0.8, 1 - Math.abs(offset) * 0.08);
            let opacity = isCenter ? 1 : Math.max(0.4, 1 - Math.abs(offset) * 0.25);
            let zIndex = total - Math.abs(offset);

            if (window.innerWidth < 640) {
              translateX = offset * 240;
              scale = isCenter ? 1 : 0.75;
            }

            return (
              <div
                key={index}
                onClick={() => setCurrentIndex(index)}
                style={{
                  transform: `translate3d(${translateX}px, 0px, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  zIndex: zIndex,
                  opacity: opacity,
                  transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                className={`absolute w-[280px] sm:w-[320px] h-[370px] bg-white p-7 rounded-3xl border ${
                  isCenter 
                    ? 'border-blue-400 shadow-[0_20px_50px_rgba(37,99,235,0.15)] ring-2 ring-blue-500/20' 
                    : 'border-slate-200/80 shadow-md'
                } flex flex-col justify-between group cursor-pointer overflow-hidden`}
              >
                {/* Top accent line on active or hover */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2563EB] to-amber-400 transition-opacity duration-300 ${isCenter ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />

                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors duration-300 ${isCenter ? 'bg-[#2563EB] text-white shadow-md' : 'bg-blue-50 text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white'}`}>
                    {React.cloneElement(service.icon, { className: `w-6 h-6 ${isCenter ? 'text-white' : 'text-[#2563EB] group-hover:text-white'}` })}
                  </div>

                  <h3 className={`text-xl font-bold transition-colors ${isCenter ? 'text-[#2563EB]' : 'text-[#0F172A] group-hover:text-[#2563EB]'}`}>
                    {service.title}
                  </h3>

                  <p className="text-sm text-[#64748B] leading-relaxed line-clamp-3">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-sm font-semibold text-[#2563EB]">
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Navigation Controls */}
        <div className="flex items-center justify-center gap-6 mt-10">
          <button 
            onClick={handlePrev}
            className="w-12 h-12 rounded-full bg-white hover:bg-[#2563EB] border border-slate-200 text-[#0F172A] hover:text-white flex items-center justify-center shadow-md transition-all hover:scale-105 active:scale-95"
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
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === idx 
                    ? 'w-8 bg-[#2563EB] shadow-[0_0_10px_rgba(37,99,235,0.4)]' 
                    : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button 
            onClick={handleNext}
            className="w-12 h-12 rounded-full bg-white hover:bg-[#2563EB] border border-slate-200 text-[#0F172A] hover:text-white flex items-center justify-center shadow-md transition-all hover:scale-105 active:scale-95"
            aria-label="Next service"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
