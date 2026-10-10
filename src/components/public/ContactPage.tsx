import React, { useState } from 'react';
import { ArrowLeft, Send, MessageCircle, Mail, Phone, MapPin, Globe, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

interface ContactPageProps {
  onBackToHome: () => void;
  onRefreshData?: () => void;
  selectedPlan?: any;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
}

export function ContactPage({ onBackToHome, onRefreshData, selectedPlan }: ContactPageProps) {
  const [formData, setFormData] = useState<FormData>(() => ({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: selectedPlan ? `Plan: ${selectedPlan.name} (${selectedPlan.price})` : 'Enterprise Web & SaaS Development',
    message: selectedPlan ? `I am interested in selecting the ${selectedPlan.name} plan (${selectedPlan.price}). Features included: ${(selectedPlan.features || []).join(', ')}.` : '',
  }));

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [honey, setHoney] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in your name, email, and project details.');
      return;
    }
    setError('');

    const phone = '923429339057';
    const text = `*New Inquiry via CloudsBuilt Website*%0A%0A*Name:* ${encodeURIComponent(formData.name)}%0A*Email:* ${encodeURIComponent(formData.email)}%0A*Phone:* ${encodeURIComponent(formData.phone)}%0A*Company:* ${encodeURIComponent(formData.company)}%0A*Service:* ${encodeURIComponent(formData.service)}%0A*Message:* ${encodeURIComponent(formData.message)}`;

    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honey) {
      setSubmitted(true);
      return;
    }

    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all required fields.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Failed to submit inquiry');
      }

      if (onRefreshData) onRefreshData();
      setSubmitted(true);
    } catch (err: any) {
      console.error(err);
      setError('Failed to submit. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      service: selectedPlan ? `Plan: ${selectedPlan.name} (${selectedPlan.price})` : 'Enterprise Web & SaaS Development',
      message: selectedPlan ? `I am interested in selecting the ${selectedPlan.name} plan (${selectedPlan.price}). Features included: ${(selectedPlan.features || []).join(', ')}.` : '',
    });
    setSubmitted(false);
    setError('');
  };

  const inputClass = "w-full px-4 py-3.5 rounded-xl bg-white border border-slate-200 text-[#0F172A] text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all";
  const labelClass = "block text-xs font-bold text-[#64748B] uppercase tracking-wider mb-2";

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        {/* Back Button */}
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-4 py-2.5 rounded-xl transition-all mb-8 shadow-sm cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>

        {/* Page Header */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden mb-12">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Native Contact Portal
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Let's Build Something Extraordinary
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Fill out the project inquiry form below. Our engineering and AI architecture teams will review your request and respond within 2 hours.
            </p>
          </div>
        </div>

        {/* Contact Grid: Info Cards + Native Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Quick Info */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-[#0F172A]">Contact Information</h3>
              <p className="text-sm text-[#64748B] leading-relaxed">
                Have questions about our AI solutions, enterprise software, or custom engineering? Reach out through any channel below.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#64748B] uppercase">Email Us</h4>
                    <a href="mailto:team.cloudsbuild@gmail.com" className="text-sm font-semibold text-[#0F172A] hover:text-blue-600">
                      team.cloudsbuild@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#64748B] uppercase">WhatsApp / Call</h4>
                    <a href="https://wa.me/923429339057" target="_blank" rel="noreferrer" className="text-sm font-semibold text-[#0F172A] hover:text-emerald-600">
                      +92 342 9339057
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#64748B] uppercase">Headquarters</h4>
                    <p className="text-sm font-semibold text-[#0F172A]">
                      Global Tech Hub & Remote Operations
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#64748B] uppercase">Availability</h4>
                    <p className="text-sm font-semibold text-[#0F172A]">
                      24/7 Enterprise Support
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Pristine Native Website Contact Form */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-10 shadow-sm relative">
            {selectedPlan && (
              <div className="mb-8 p-5 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 font-bold">
                    ⭐
                  </div>
                  <div>
                    <span className="text-xs font-bold tracking-widest text-blue-600 uppercase">Selected Plan</span>
                    <h4 className="text-lg font-extrabold text-[#0F172A]">{selectedPlan.name} Plan ({selectedPlan.price})</h4>
                  </div>
                </div>
              </div>
            )}

            {submitted ? (
              <div className="text-center py-16 space-y-5">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <h3 className="text-2xl font-bold text-[#0F172A]">
                  Inquiry Submitted Successfully!
                </h3>

                <p className="text-sm text-[#64748B] max-w-md mx-auto">
                  Thank you, {formData.name}. Your inquiry has been saved securely to our database and notified to our team. We will get back to you shortly.
                </p>

                <button
                  type="button"
                  onClick={resetForm}
                  className="mt-4 px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-sm font-bold transition-all shadow-md shadow-blue-500/20 cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot field (hidden) */}
                <input
                  type="text"
                  name="_honey"
                  value={honey}
                  onChange={(e) => setHoney(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  style={{ display: 'none' }}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className={labelClass}>
                      Your Full Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      required
                      maxLength={100}
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className={labelClass}>
                      Email Address *
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      maxLength={150}
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className={labelClass}>
                      Phone Number / WhatsApp
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      maxLength={50}
                      placeholder="+1 (555) 019-2834"
                      value={formData.phone}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className={labelClass}>
                      Company / Organization
                    </label>
                    <input
                      id="company"
                      type="text"
                      name="company"
                      maxLength={100}
                      placeholder="Acme Inc."
                      value={formData.company}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className={labelClass}>
                    Service / Plan Interested In *
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    {selectedPlan && (
                      <option value={`Plan: ${selectedPlan.name} (${selectedPlan.price})`}>
                        Selected Plan: {selectedPlan.name} ({selectedPlan.price})
                      </option>
                    )}
                    <option value="Websites & Web Platforms">Websites & Web Platforms</option>
                    <option value="E-Commerce">E-Commerce</option>
                    <option value="Software & Business Systems">Software & Business Systems</option>
                    <option value="Mobile Apps">Mobile Apps</option>
                    <option value="AI & Automation">AI & Automation</option>
                    <option value="Digital Marketing & Meta/TikTok Ads">Digital Marketing & Meta/TikTok Ads</option>
                    <option value="Design, Support & Growth">Design, Support & Growth</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className={labelClass}>
                    Project Details & Requirements *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    maxLength={2000}
                    placeholder="Tell us about your goals, features needed, and timeline..."
                    value={formData.message}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                {error && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:flex-1 py-4 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-sm shadow-xl shadow-blue-500/25 hover:shadow-2xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    {submitting ? 'Submitting...' : 'Send Inquiry'} <Send className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppSubmit}
                    className="w-full sm:w-auto px-6 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-xl shadow-emerald-500/25 hover:shadow-2xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" /> Send via WhatsApp
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
