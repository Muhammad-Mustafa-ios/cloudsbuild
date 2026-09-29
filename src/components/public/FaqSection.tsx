import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What services does CloudsBuilt provide?',
      a: 'We provide end-to-end technology solutions including custom software development, AI automation workflows, AI chatbots, web development, e-commerce stores, UI/UX design, and digital consulting.'
    },
    {
      q: 'Can you build custom software?',
      a: 'Yes. We specialize in tailoring robust, scalable software solutions designed precisely around your unique enterprise requirements and business logic.'
    },
    {
      q: 'Do you provide AI automation?',
      a: 'Yes, AI automation is one of our core pillars. We build autonomous AI agents, document processing pipelines, OCR extraction, and intelligent customer support bots connected to your databases.'
    },
    {
      q: 'Can you integrate existing business tools?',
      a: 'Absolutely. We seamlessly connect disparate software tools, CRMs (HubSpot, Salesforce), ERPs, payment gateways (Stripe), and helpdesk systems using custom webhooks and APIs.'
    },
    {
      q: 'Can you build e-commerce websites?',
      a: 'Yes. We build high-performance e-commerce platforms using Shopify Plus, headless architectures, and custom Next.js storefronts optimized for speed and conversion.'
    },
    {
      q: 'How does the development process work?',
      a: 'Our 4-step process includes Discover (understanding your goals), Design (architecture & UI/UX), Build (development & AI integration), and Scale (monitoring & continuous optimization).'
    },
    {
      q: 'How long does a project take?',
      a: 'Project timelines vary based on scope. Standard web applications take 3–6 weeks, while complex AI automation pipelines and enterprise custom software take 6–12 weeks.'
    },
    {
      q: 'Do you provide maintenance and support?',
      a: 'Yes. We offer comprehensive ongoing maintenance, 24/7 system monitoring, performance tuning, and iterative feature enhancements to ensure long-term success.'
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-[#F8FAFC]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-[#2563EB] text-xs font-semibold tracking-wide">
            Got Questions?
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg text-[#64748B]">
            Everything you need to know about working with CloudsBuilt.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-2xs transition-all"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-bold text-[#0F172A] hover:text-[#2563EB] transition-colors"
                >
                  <span className="text-base sm:text-lg">{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-[#2563EB] shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-sm sm:text-base text-[#64748B] leading-relaxed border-t border-slate-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
