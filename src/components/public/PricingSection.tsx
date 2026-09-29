import React from 'react';
import { Check, ArrowRight, Sparkles } from 'lucide-react';

interface PricingSectionProps {
  onOpenContact: (plan?: any) => void;
  plans?: any[];
}

export function PricingSection({ onOpenContact, plans = [] }: PricingSectionProps) {
  const defaultPlans = [
    {
      name: 'Starter',
      tagline: 'Professional website + UI/UX + basic SEO + forms + mobile responsive + 1 month support.',
      price: 'Custom Proposal',
      period: '/ project',
      popular: false,
      features: [
        'Professional website & UI/UX design',
        'Basic SEO optimization',
        'Contact & inquiry forms',
        'Fully mobile responsive layout',
        '1 month post-launch support'
      ]
    },
    {
      name: 'Growth',
      tagline: 'Website/E-commerce + basic AI chatbot + 1–2 automation workflows + database integration + support.',
      price: 'Custom Proposal',
      period: '/ project',
      popular: true,
      features: [
        'Advanced Website or E-Commerce store',
        'Basic AI Customer Support chatbot',
        '1–2 custom AI automation workflows',
        'Full database integration & admin panel',
        'Ongoing maintenance & support'
      ]
    },
    {
      name: 'Custom',
      tagline: 'Custom software + AI automation + integrations + dashboards.',
      price: 'Custom Proposal',
      period: '/ project',
      popular: false,
      features: [
        'Fully custom enterprise software',
        'Advanced AI automation & workflows',
        'Third-party API & CRM integrations',
        'Scalable dashboards & analytics',
        'Dedicated priority engineering'
      ]
    }
  ];

  const displayPlans = plans && plans.length > 0 ? plans : defaultPlans;

  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-white via-[#F8FAFC] to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-[#2563EB] text-xs font-semibold tracking-wide shadow-xs">
            Our Professional Plans
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight">
            Tailored Plans For Every Stage
          </h2>
          <p className="text-base sm:text-lg text-[#64748B]">
            Comprehensive software & AI solutions. Pricing is fully customized and tailored to your project scope.
          </p>
        </div>

        {/* Pricing Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {displayPlans.map((plan, index) => {
            const priceVal = plan.price || plan.priceMonthly || plan.priceProject || 'Custom Proposal';
            return (
              <div
                key={plan.id || index}
                className={`bg-white rounded-3xl p-8 border flex flex-col justify-between transition-all duration-300 relative ${
                  plan.popular
                    ? 'border-[#2563EB] shadow-2xl ring-2 ring-[#2563EB]/25 lg:-translate-y-2'
                    : 'border-slate-200/80 shadow-lg shadow-slate-100 hover:shadow-xl'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#2563EB] text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-md flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    Most Popular Choice ⭐
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-[#0F172A]">{plan.name}</h3>
                    <p className="text-sm text-[#64748B] mt-1">{plan.tagline || plan.description}</p>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
                      {priceVal}
                    </span>
                    <span className="text-xs sm:text-sm text-[#64748B] font-medium">
                      {plan.period || '/ project'}
                    </span>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-slate-100">
                    {(plan.features || []).map((feat: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-sm text-[#0F172A] font-medium">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8 mt-8 border-t border-slate-100">
                  <button
                    onClick={() => onOpenContact(plan)}
                    className={`w-full py-4 rounded-xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                      plan.popular
                        ? 'bg-[#2563EB] hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20'
                        : 'bg-slate-900 hover:bg-slate-800 text-white shadow-md'
                    }`}
                  >
                    Select {plan.name} Plan
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
