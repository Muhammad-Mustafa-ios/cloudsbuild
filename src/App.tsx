import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/public/Hero';
import { StatsStrip } from './components/public/StatsStrip';
import { AboutSection } from './components/public/AboutSection';
import { ServicesSection } from './components/public/ServicesSection';
import { AiAutomationSection } from './components/public/AiAutomationSection';
import { ProcessSection } from './components/public/ProcessSection';
import { WhyUsSection } from './components/public/WhyUsSection';
import { TestimonialsSection } from './components/public/TestimonialsSection';
import { PricingSection } from './components/public/PricingSection';
import { ContactSection } from './components/public/ContactSection';
import { ContactPage } from './components/public/ContactPage';
import { Footer } from './components/Footer';
import { WhatsAppToggle } from './components/public/WhatsAppToggle';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'contact'>('home');

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
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#FF4500] selection:text-white">
      {/* Sticky Navbar */}
      <Navbar
        onNavigate={handleNavigate}
        onOpenContact={() => handleOpenContact()}
      />

      {currentView === 'contact' ? (
        <ContactPage onBackToHome={() => setCurrentView('home')} />
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
          <motion.div initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6 }}>
            <StatsStrip />
          </motion.div>

          {/* About Section */}
          <motion.div initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }}>
            <AboutSection />
          </motion.div>

          {/* Services Section */}
          <motion.div initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }}>
            <ServicesSection onOpenContact={handleOpenContact} />
          </motion.div>

          {/* AI Automation Section */}
          <motion.div initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }}>
            <AiAutomationSection
              onOpenContact={handleOpenContact}
              onNavigate={handleNavigate}
            />
          </motion.div>

          {/* Process Section */}
          <motion.div initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }}>
            <ProcessSection />
          </motion.div>

          {/* Why CloudsBuilt */}
          <motion.div initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }}>
            <WhyUsSection />
          </motion.div>

          {/* Testimonials / Reviews */}
          <motion.div initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }}>
            <TestimonialsSection />
          </motion.div>

          {/* Pricing */}
          <motion.div initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }}>
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
