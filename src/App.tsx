import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/public/Hero';
import { StatsStrip } from './components/public/StatsStrip';
import { AboutSection } from './components/public/AboutSection';
import { ServicesSection } from './components/public/ServicesSection';
import { WhatWeManageSection } from './components/public/WhatWeManageSection';
import { ProcessSection } from './components/public/ProcessSection';
import { StartSmallBannerSection } from './components/public/StartSmallBannerSection';
import { TestimonialsSection } from './components/public/TestimonialsSection';
import { PricingSection } from './components/public/PricingSection';
import { ContactSection } from './components/public/ContactSection';
import { ContactPage } from './components/public/ContactPage';
import { WhyUsPage } from './components/public/WhyUsPage';
import { OurWorkPage } from './components/public/OurWorkPage';
import { Footer } from './components/Footer';
import { WhatsAppToggle } from './components/public/WhatsAppToggle';

export function AppContent() {
  const [currentView, setCurrentView] = useState<'home' | 'contact' | 'why-us' | 'our-work'>('home');

  // Real-time backend data state
  const [dbData, setDbData] = useState({
    projects: [],
    pricing: [],
    contacts: [],
    testimonials: []
  });

  const fetchBackendData = async () => {
    try {
      const res = await fetch('/api/data');
      const data = await res.json();
      setDbData(data);
    } catch (err) {
      console.error('Failed to fetch backend data:', err);
    }
  };

  useEffect(() => {
    fetchBackendData();
  }, []);

  const [selectedPlan, setSelectedPlan] = useState<any>(null);

  const handleOpenContact = (plan?: any) => {
    if (plan) setSelectedPlan(plan);
    setCurrentView('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (view: string) => {
    if (view === 'contact') {
      setCurrentView('contact');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (view === 'why-us') {
      setCurrentView('why-us');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (view === 'our-work' || view === 'testimonials') {
      setCurrentView('our-work');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setCurrentView('home');
    if (view === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setTimeout(() => {
        const el = document.getElementById(view);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F6FF] dark:bg-slate-950 text-[#0F172A] dark:text-slate-100 font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#2563EB] selection:text-white transition-colors duration-300">
      {/* Sticky Navbar */}
      <Navbar
        onNavigate={handleNavigate}
        onOpenContact={() => handleOpenContact()}
      />

      {currentView === 'contact' ? (
        <ContactPage onBackToHome={() => setCurrentView('home')} selectedPlan={selectedPlan} />
      ) : currentView === 'why-us' ? (
        <WhyUsPage onOpenContact={handleOpenContact} onBackToHome={() => setCurrentView('home')} />
      ) : currentView === 'our-work' ? (
        <OurWorkPage onOpenContact={handleOpenContact} onBackToHome={() => setCurrentView('home')} />
      ) : (
        <>
          {/* Hero Section */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Hero
              onOpenContact={() => handleOpenContact()}
              onNavigate={handleNavigate}
            />
          </motion.div>

          {/* Trust / Stats Strip */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true, margin: "-80px" }} 
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <StatsStrip />
          </motion.div>

          {/* About Section */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true, margin: "-80px" }} 
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <AboutSection />
          </motion.div>

          {/* Services Section */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true, margin: "-80px" }} 
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <ServicesSection onOpenContact={handleOpenContact} />
          </motion.div>



          {/* What We Manage (Dual Marquee Rows) */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true, margin: "-80px" }} 
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <WhatWeManageSection onOpenContact={handleOpenContact} />
          </motion.div>

          {/* How It Works (Five Steps) */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true, margin: "-80px" }} 
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <ProcessSection />
          </motion.div>

          {/* Start Small Banner Section */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true, margin: "-80px" }} 
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <StartSmallBannerSection onOpenContact={() => handleOpenContact()} />
          </motion.div>

          {/* Testimonials / Reviews */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true, margin: "-80px" }} 
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <TestimonialsSection />
          </motion.div>

          {/* Pricing */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true, margin: "-80px" }} 
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <PricingSection onOpenContact={handleOpenContact} plans={dbData.pricing} />
          </motion.div>
        </>
      )}

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenContact={() => handleOpenContact()}
      />

      {/* Floating WhatsApp Toggle */}
      <WhatsAppToggle />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

