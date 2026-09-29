import React, { useState } from 'react';
import { ArrowLeft, Send, MessageCircle, Mail, Phone, MapPin, Globe, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

interface ContactPageProps {
  onBackToHome: () => void;
  onRefreshData?: () => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
}

const initialFormData: FormData = {
  name: '',
  email: '',
  phone: '',
  company: '',
  service: 'Enterprise Web & SaaS Development',
  message: '',
};

export function ContactPage({ onBackToHome, onRefreshData }: ContactPageProps) {
  const [formData, setFormData] = useState<FormData>(initialFormData);
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
    setFormData(initialFormData);
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
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-4 py-2.5 rounded-xl transition-all mb-8 shadow-sm"
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
                  className="mt-4 px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-sm font-bold transition-all shadow-md shadow-blue-500/20"
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
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      maxLength={30}
                      placeholder="+1 (555) 000-0000"
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
                      placeholder="Acme Corp"
                      value={formData.company}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className={labelClass}>
                    Service Required *
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="Enterprise Web & SaaS Development">Enterprise Web & SaaS Development</option>
                    <option value="AI Automation & Custom Agents">AI Automation & Custom Agents</option>
                    <option value="Cloud Architecture & DevOps">Cloud Architecture & DevOps</option>
                    <option value="UI/UX Product Design">UI/UX Product Design</option>
                    <option value="Mobile App Development">Mobile App Development</option>
                    <option value="AI Chatbot & LLM Integration">AI Chatbot & LLM Integration</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className={labelClass}>
                    Project Details / Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    maxLength={5000}
                    placeholder="Tell us about your project requirements, goals, and timeline..."
                    value={formData.message}
                    onChange={handleChange}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {error && (
                  <div
                    role="alert"
                    className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-2"
                  >
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleWhatsAppSubmit}
                    className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Submit to WhatsApp
                  </button>
                </div>

                <p className="text-xs text-center text-[#64748B]">
                  Your information is encrypted and securely sent to our engineering team.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
