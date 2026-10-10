import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { WhyUsHero } from './WhyUsHero';
import { UpfrontCostSection } from './UpfrontCostSection';
import { OurStorySection } from './OurStorySection';
import { WhyChooseUsVisualSection } from './WhyChooseUsVisualSection';
import { TechnologyAreasSection } from './TechnologyAreasSection';
import { 
  ArrowRight, ShieldCheck, Cpu, Zap, Sparkles, CheckCircle2, 
  Layers, Code2, Smartphone, Globe, ShoppingBag, Workflow, 
  Database, Cloud, Headphones, Award, TrendingUp, Check
} from 'lucide-react';

interface WhyUsPageProps {
  onOpenContact: (plan?: any) => void;
  onBackToHome: () => void;
}

export function WhyUsPage({ onOpenContact, onBackToHome }: WhyUsPageProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = "Why CloudsBuilt | Your Technology Partner";
  }, []);

  const modelCards = [
    {
      step: '01',
      title: 'Build',
      desc: 'Websites, web apps, software, e-commerce platforms and digital products engineered for performance.',
      icon: <Code2 className="w-6 h-6 text-[#2563EB]" />,
    },
    {
      step: '02',
      title: 'Launch',
      desc: 'Deployment, integrations, configuration and everything needed to go live smoothly.',
      icon: <Globe className="w-6 h-6 text-[#2563EB]" />,
    },
    {
      step: '03',
      title: 'Maintain',
      desc: 'Updates, fixes, monitoring, security and dedicated ongoing technical support.',
      icon: <ShieldCheck className="w-6 h-6 text-[#2563EB]" />,
    },
    {
      step: '04',
      title: 'Grow',
      desc: 'Continuous improvements, new features, automation and AI solutions that scale with you.',
      icon: <TrendingUp className="w-6 h-6 text-[#2563EB]" />,
    },
  ];

  const whyChooseUsCards = [
    {
      num: '01',
      title: 'Idea to Reality',
      desc: 'From the first conversation to a working product, we handle the entire technical journey.',
      icon: <Sparkles className="w-6 h-6 text-[#2563EB]" />,
    },
    {
      num: '02',
      title: 'No Technical Team Required',
      desc: 'You don\'t need to hire developers, designers, DevOps engineers or other specialists.',
      icon: <ShieldCheck className="w-6 h-6 text-[#2563EB]" />,
    },
    {
      num: '03',
      title: 'One Technology Partner',
      desc: 'Websites, apps, software, AI, automation, integrations and support under one roof.',
      icon: <Layers className="w-6 h-6 text-[#2563EB]" />,
    },
    {
      num: '04',
      title: 'Transparent Pricing',
      desc: 'Clear pricing with no confusing technical surprises or unnecessary costs.',
      icon: <Zap className="w-6 h-6 text-[#2563EB]" />,
    },
    {
      num: '05',
      title: 'We Stay',
      desc: 'We don\'t disappear after launch. We continue supporting and improving what we build.',
      icon: <Cpu className="w-6 h-6 text-[#2563EB]" />,
    },
    {
      num: '06',
      title: 'Built for Growth',
      desc: 'Our solutions are designed to be reliable, secure, scalable and ready for your next stage.',
      icon: <TrendingUp className="w-6 h-6 text-[#2563EB]" />,
    },
  ];

  const principles = [
    {
      title: 'Affordable by Design',
      desc: 'Technology should be accessible to businesses that are still growing.',
    },
    {
      title: 'The Whole Journey',
      desc: 'We don\'t just build. We help with planning, launching, maintaining and improving.',
    },
    {
      title: 'Simple & Transparent',
      desc: 'No unnecessary complexity. No confusing technical language.',
    },
    {
      title: 'Built to Be Used',
      desc: 'We build practical products that real customers and teams can actually use.',
    },
    {
      title: 'Long-Term Partnership',
      desc: 'Our relationship doesn\'t end when the product launches.',
    },
  ];

  const workflowSteps = [
    {
      num: '01',
      title: 'Tell Us Your Idea',
      desc: 'Tell us what you want to build, improve or automate.',
    },
    {
      num: '02',
      title: 'We Plan It',
      desc: 'We understand your goals and create a practical technical plan.',
    },
    {
      num: '03',
      title: 'We Build It',
      desc: 'Our team designs, develops, integrates and launches the solution.',
    },
    {
      num: '04',
      title: 'We Keep It Growing',
      desc: 'We maintain, improve and evolve your technology as your business grows.',
    },
  ];

  const techAreas = [
    { name: 'Websites', icon: <Globe className="w-5 h-5 text-[#2563EB]" /> },
    { name: 'Web Applications', icon: <Code2 className="w-5 h-5 text-[#2563EB]" /> },
    { name: 'Mobile Applications', icon: <Smartphone className="w-5 h-5 text-[#2563EB]" /> },
    { name: 'E-commerce', icon: <ShoppingBag className="w-5 h-5 text-[#2563EB]" /> },
    { name: 'Custom Software', icon: <Layers className="w-5 h-5 text-[#2563EB]" /> },
    { name: 'AI Solutions', icon: <Cpu className="w-5 h-5 text-[#2563EB]" /> },
    { name: 'Business Automation', icon: <Workflow className="w-5 h-5 text-[#2563EB]" /> },
    { name: 'API Integrations', icon: <Database className="w-5 h-5 text-[#2563EB]" /> },
    { name: 'Cloud Solutions', icon: <Cloud className="w-5 h-5 text-[#2563EB]" /> },
    { name: 'Meta & TikTok Ads', icon: <Zap className="w-5 h-5 text-[#2563EB]" /> },
    { name: 'Maintenance & Support', icon: <Headphones className="w-5 h-5 text-[#2563EB]" /> },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-[#0F172A] dark:text-slate-100 font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* 1. Hero Section */}
      <WhyUsHero onOpenContact={onOpenContact} />

      {/* 2. Our Story */}
      <OurStorySection />

      {/* 3. Mission & Vision */}
      <section className="py-24 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            
            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="bg-[#F8FAFC] dark:bg-slate-950 p-10 rounded-3xl border-2 border-blue-200/80 dark:border-blue-800/80 shadow-[0_0_25px_rgba(37,99,235,0.1)] hover:shadow-[0_0_35px_rgba(37,99,235,0.2)] flex flex-col justify-between transition-all duration-300"
            >
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-[#2563EB] text-xs font-bold tracking-wide mb-6 border border-blue-200 dark:border-blue-800">
                  OUR MISSION
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] dark:text-white mb-4 leading-snug">
                  Make powerful technology accessible to growing businesses.
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                  “Our mission is to give ambitious businesses access to the technical expertise they need without the cost and complexity of building an entire technology team.”
                </p>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="bg-[#F8FAFC] dark:bg-slate-950 p-10 rounded-3xl border-2 border-blue-200/80 dark:border-blue-800/80 shadow-[0_0_25px_rgba(37,99,235,0.1)] hover:shadow-[0_0_35px_rgba(37,99,235,0.2)] flex flex-col justify-between transition-all duration-300"
            >
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-[#2563EB] text-xs font-bold tracking-wide mb-6 border border-blue-200 dark:border-blue-800">
                  OUR VISION
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] dark:text-white mb-4 leading-snug">
                  Become the technology partner behind the next generation of businesses.
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                  “We want businesses to compete, innovate and grow with technology that works for them — regardless of the size of their internal team.”
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 4. Why Choose Us */}
      <WhyChooseUsVisualSection />

      {/* 5. What We Stand For (Principles) */}
      <section className="py-24 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950 text-[#2563EB] text-xs font-bold tracking-wide border border-blue-200 dark:border-blue-800">
              WHAT WE STAND FOR
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] dark:text-white tracking-tight">
              Our Core Principles
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {principles.map((p, idx) => (
              <motion.div 
                key={idx} 
                whileHover={{ scale: 1.03, y: -4 }}
                transition={{ duration: 0.2 }}
                className="p-8 rounded-3xl bg-[#F8FAFC] dark:bg-slate-950 border-2 border-blue-200/80 dark:border-blue-800/80 shadow-[0_0_20px_rgba(37,99,235,0.08)] hover:shadow-[0_0_30px_rgba(37,99,235,0.18)] flex items-start gap-4 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-950 text-[#2563EB] flex items-center justify-center shrink-0 mt-1 border border-blue-300 dark:border-blue-800">
                  <Check className="w-5 h-5 font-bold" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0F172A] dark:text-white mb-2">{p.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. Monthly / Partnership Model (Technology without massive upfront cost) */}
      <UpfrontCostSection />



      {/* 9. Technology Areas */}
      <TechnologyAreasSection />



      {/* 10. Strong Closing CTA */}
      <section className="py-24 bg-gradient-to-b from-[#F8FAFC] via-white to-[#F8FAFC] dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#2563EB] to-blue-700 rounded-[2.5rem] p-10 sm:p-16 text-white text-center shadow-2xl relative overflow-hidden border border-blue-400/40">
            
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                Ready to build what's next?
              </h2>

              <p className="text-blue-100 text-base sm:text-lg leading-relaxed">
                “Tell us what your business needs. We'll help turn the idea into a practical technology solution.”
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <button
                  onClick={() => onOpenContact()}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-[#2563EB] hover:bg-slate-100 font-bold text-base shadow-xl hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                  Start a Project <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onOpenContact()}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-blue-800/60 hover:bg-blue-800 text-white border border-white/20 font-bold text-base shadow-lg hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                  Contact Us
                </button>
              </div>

              <p className="text-xs text-blue-200 pt-2 font-medium">
                No obligation. No complicated process. Just a conversation about what you want to build.
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}

