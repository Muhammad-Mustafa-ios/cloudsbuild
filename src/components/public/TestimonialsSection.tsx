import React, { useState, useEffect, useRef } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

export function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      name: 'Muhammad Ali & Ayesha Khan',
      role: 'Co-Founders, LahoreTech Solutions (Lahore, Pakistan)',
      letter: 'M',
      content: 'We were running our software business online for months but barely getting any clients or traffic. After partnering with CloudsBuilt, our digital presence skyrocketed and we are now getting 3x more clients every single week!',
      rating: 5,
    },
    {
      id: 2,
      name: 'Sophia Laurent',
      role: 'CEO, Luxe Apparel Global (Paris, France)',
      letter: 'S',
      content: 'We struggled to attract international buyers with our old slow website and had very few orders. CloudsBuilt rebuilt our e-commerce platform, and within weeks our sales and customer inquiries surged dramatically!',
      rating: 5,
    },
    {
      id: 3,
      name: 'Usman Malik',
      role: 'Director of Operations, Karachi Logistics (Karachi, Pakistan)',
      letter: 'U',
      content: 'Before CloudsBuilt, we were getting hardly any inbound leads through our web portal. Their custom development and automated workflows brought us a steady stream of new corporate clients.',
      rating: 5,
    },
    {
      id: 4,
      name: 'Carlos Mendoza',
      role: 'Chief Technology Officer, InnovaLatam (Madrid, Spain)',
      letter: 'C',
      content: 'Our startup was stuck with low user engagement and minimal client acquisition. CloudsBuilt revamped our entire tech stack and user experience, leading to a massive influx of new paying customers.',
      rating: 5,
    },
    {
      id: 5,
      name: 'Fatima Noor',
      role: 'Lead Product Manager, Islamabad Digital (Islamabad, Pakistan)',
      letter: 'F',
      content: 'We had a great service but our online visibility was poor, resulting in very few client sign-ups. CloudsBuilt optimized everything, and now our pipeline is constantly full of high-value clients.',
      rating: 5,
    },
    {
      id: 6,
      name: 'Hans Weber',
      role: 'Managing Director, Berlin Cloud Systems (Berlin, Germany)',
      letter: 'H',
      content: 'We were running our cloud agency without proper client conversion tools, leading to stagnant growth. CloudsBuilt delivered a high-converting platform that doubled our monthly client acquisitions.',
      rating: 5,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-advance carousel smoothly every 4 seconds unless paused
  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
      }, 4000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, testimonials.length]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  // Helper to get card positioning relative to activeIndex (Circular arrangement)
  const getCardOffsetStyle = (index: number) => {
    const total = testimonials.length;
    let diff = (index - activeIndex + total) % total;
    if (diff > total / 2) diff -= total; // normalize around 0

    if (diff === 0) {
      // Center Card (Prominent)
      return {
        transform: 'translateX(0px) scale(1.05)',
        zIndex: 30,
        opacity: 1,
        filter: 'blur(0px)',
        pointerEvents: 'auto' as const,
      };
    } else if (diff === 1 || diff === - (total - 1)) {
      // Right adjacent card
      return {
        transform: 'translateX(340px) scale(0.9)',
        zIndex: 20,
        opacity: 0.7,
        filter: 'blur(0.5px)',
        pointerEvents: 'auto' as const,
      };
    } else if (diff === -1 || diff === total - 1) {
      // Left adjacent card
      return {
        transform: 'translateX(-340px) scale(0.9)',
        zIndex: 20,
        opacity: 0.7,
        filter: 'blur(0.5px)',
        pointerEvents: 'auto' as const,
      };
    } else if (diff === 2 || diff === - (total - 2)) {
      // Far right card
      return {
        transform: 'translateX(660px) scale(0.78)',
        zIndex: 10,
        opacity: 0.4,
        filter: 'blur(1px)',
        pointerEvents: 'none' as const,
      };
    } else {
      // Far left card
      return {
        transform: 'translateX(-660px) scale(0.78)',
        zIndex: 10,
        opacity: 0.4,
        filter: 'blur(1px)',
        pointerEvents: 'none' as const,
      };
    }
  };

  return (
    <section id="testimonials" className="py-24 bg-gradient-to-b from-[#F8FAFC] via-white to-[#F8FAFC] overflow-hidden relative">
      {/* Background decorative glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-400/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-[#2563EB] text-xs font-semibold tracking-wide shadow-xs">
            Client Reviews
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight">
            Trusted by Industry Leaders
          </h2>
          <p className="text-base sm:text-lg text-[#64748B]">
            Discover how CloudsBuilt empowers businesses worldwide with high-performance software and autonomous AI workflows.
          </p>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative h-[460px] flex items-center justify-center overflow-hidden py-8"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Cards Track */}
          <div className="absolute w-full max-w-md sm:max-w-lg h-[360px] flex items-center justify-center">
            {testimonials.map((t, index) => {
              const style = getCardOffsetStyle(index);
              const isCenter = index === activeIndex;

              return (
                <div
                  key={t.id}
                  onClick={() => setActiveIndex(index)}
                  style={{
                    ...style,
                    transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  className={`absolute w-[340px] sm:w-[400px] bg-white rounded-3xl p-8 border cursor-pointer select-none ${
                    isCenter 
                      ? 'border-blue-300 shadow-2xl shadow-blue-500/15 bg-white' 
                      : 'border-slate-200 shadow-lg bg-white/90'
                  }`}
                >
                  <div className="absolute top-6 right-6 text-blue-100 pointer-events-none">
                    <Quote className="w-16 h-16" />
                  </div>

                  <div className="relative z-10 space-y-6 flex flex-col justify-between h-full">
                    <div className="space-y-4">
                      <div className="flex items-center gap-1 text-amber-500">
                        {[...Array(t.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-500" />
                        ))}
                      </div>

                      <p className="text-sm sm:text-base font-normal text-[#0F172A] leading-relaxed italic">
                        "{t.content}"
                      </p>
                    </div>

                    <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold text-lg flex items-center justify-center shadow-md shadow-blue-500/20 border border-blue-400/30">
                        {t.letter}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[#0F172A]">{t.name}</div>
                        <div className="text-xs text-[#64748B] font-medium">{t.role}</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Side Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-4 sm:left-12 z-40 w-12 h-12 rounded-2xl bg-white hover:bg-[#2563EB] hover:text-white border border-slate-200 text-[#0F172A] shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 sm:right-12 z-40 w-12 h-12 rounded-2xl bg-white hover:bg-[#2563EB] hover:text-white border border-slate-200 text-[#0F172A] shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105"
            aria-label="Next review"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Subtle Navigation Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                activeIndex === idx 
                  ? 'w-8 bg-[#2563EB]' 
                  : 'w-2.5 bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`Go to review ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
