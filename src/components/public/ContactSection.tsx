import React, { useState, useEffect } from 'react';
import {
  Mail,
  MessageCircle,
  MapPin,
  CheckCircle2,
  Sparkles,
  AlertCircle,
} from 'lucide-react';

const TEAM_EMAIL = 'team.cloudsbuild@gmail.com';

// No backend needed: FormSubmit forwards the submission straight to the Gmail inbox.
// First submission ever triggers a one-time activation email to TEAM_EMAIL (check Spam) - click "Activate".
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${TEAM_EMAIL}`;

interface SelectedPlan {
  name?: string;
  selectedPrice?: string | number;
  pricePk?: string | number;
  priceInt?: string | number;
  priceMonthly?: string | number;
  price?: string | number;
  selectedRegion?: string;
}

interface ContactSectionProps {
  onRefreshData?: () => void;
  selectedPlan?: SelectedPlan | null;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
  selectedPlanName: string;
  selectedPlanPrice: string;
  selectedPlanRegion: string;
}

const initialFormData: FormData = {
  name: '',
  email: '',
  phone: '',
  company: '',
  service: 'AI Automation',
  message: '',
  selectedPlanName: '',
  selectedPlanPrice: '',
  selectedPlanRegion: '',
};

export function ContactSection({
  onRefreshData,
  selectedPlan,
}: ContactSectionProps) {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [formMode, setFormMode] = useState<'quick' | 'googleForm'>('quick');
  const [googleFormUrl, setGoogleFormUrl] = useState(
    'https://docs.google.com/forms/d/e/1FAIpQLSeB0csxshBv0yLzqx4nctSeatnTigC07PAe-5EA1cC4fcRIjA/viewform?embedded=true'
  );
  // Honeypot: real users never see or fill this; bots often do
  const [honey, setHoney] = useState('');

  useEffect(() => {
    if (selectedPlan) {
      const planName = selectedPlan.name || '';
      const planPrice =
        selectedPlan.selectedPrice ||
        selectedPlan.pricePk ||
        selectedPlan.priceInt ||
        selectedPlan.priceMonthly ||
        selectedPlan.price ||
        '';
      const planRegion = selectedPlan.selectedRegion || 'int';

      setFormData((prev) => ({
        ...prev,
        service: 'Custom Software Development',
        selectedPlanName: String(planName),
        selectedPlanPrice: String(planPrice),
        selectedPlanRegion: String(planRegion),
        message: `I would like to select the "${planName}" plan (${planPrice}). Please contact me with further onboarding details.`,
      }));
    }
  }, [selectedPlan]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;

    // Silently drop bot submissions
    if (honey) {
      setSubmitted(true);
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      // 1. Save to backend database (Admin dashboard)
      await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || 'N/A',
          company: formData.company || 'N/A',
          service: formData.service,
          selected_plan: formData.selectedPlanName
            ? `${formData.selectedPlanName} (${formData.selectedPlanPrice}, region: ${formData.selectedPlanRegion})`
            : 'None',
          message: formData.message,
        }),
      }).catch(() => {});

      // 2. Construct mailto link for direct guaranteed Gmail delivery
      const subject = encodeURIComponent(`New Inquiry: ${formData.name} - ${formData.service}`);
      const body = encodeURIComponent(
        `Hello CloudsBuilt Team,\n\nYou have received a new customer inquiry from your website contact form:\n\n` +
        `• Name: ${formData.name}\n` +
        `• Email: ${formData.email}\n` +
        `• Phone: ${formData.phone || 'N/A'}\n` +
        `• Company: ${formData.company || 'N/A'}\n` +
        `• Service Required: ${formData.service}\n` +
        (formData.selectedPlanName ? `• Selected Plan: ${formData.selectedPlanName} (${formData.selectedPlanPrice})\n` : '') +
        (formData.selectedPlanRegion ? `• Region: ${formData.selectedPlanRegion}\n` : '') +
        `\nMessage:\n${formData.message}\n\n---\nSent automatically via CloudsBuilt website.`
      );

      const mailtoUrl = `mailto:${TEAM_EMAIL}?subject=${subject}&body=${body}`;
      
      await new Promise((resolve) => setTimeout(resolve, 500));
      window.open(mailtoUrl, '_blank');

      setSubmitted(true);
      onRefreshData?.();
    } catch (err: any) {
      console.error('Submission error:', err);
      setError(
        `Could not send your message: ${err?.message || 'network error'}. ` +
          `Please try again, or email us directly at ${TEAM_EMAIL}.`
      );
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setHoney('');
    setSubmitted(false);
    setError('');
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in your name, email, and message before sending.');
      return;
    }
    setError('');

    const text = encodeURIComponent(
      `*New Website Inquiry*\n\n` +
      `• *Name:* ${formData.name}\n` +
      `• *Email:* ${formData.email}\n` +
      `• *Phone:* ${formData.phone || 'N/A'}\n` +
      `• *Company:* ${formData.company || 'N/A'}\n` +
      `• *Service:* ${formData.service}\n` +
      (formData.selectedPlanName ? `• *Plan:* ${formData.selectedPlanName} (${formData.selectedPlanPrice})\n` : '') +
      `\n*Message:*\n${formData.message}`
    );

    const waUrl = `https://wa.me/923429339057?text=${text}`;
    window.open(waUrl, '_blank');
    setSubmitted(true);
    onRefreshData?.();
  };

  const labelClass =
    'text-xs font-bold text-[#0F172A] uppercase tracking-wider block';
  const inputClass =
    'w-full px-4 py-3.5 rounded-xl bg-white border border-slate-200 text-[#0F172A] text-sm focus:outline-none focus:border-[#2563EB]';

  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-10 right-10 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Contact Information */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-[#2563EB] text-xs font-semibold tracking-wide">
                Get In Touch
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
                Let's Build Something Exceptional Together
              </h2>

              <p className="text-base text-[#64748B] leading-relaxed">
                Ready to accelerate your business with enterprise software or AI
                automation? Contact our engineering team today.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200/60">
                <div className="w-10 h-10 rounded-xl bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
                    Email Us
                  </h4>
                  <a
                    href={`mailto:${TEAM_EMAIL}`}
                    className="text-sm font-semibold text-[#0F172A] mt-0.5 block"
                  >
                    {TEAM_EMAIL}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200/60">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
                    WhatsApp Support
                  </h4>
                  <p className="text-sm font-semibold text-[#0F172A] mt-0.5">
                    +92 342 9339057
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200/60">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
                    Headquarters
                  </h4>
                  <p className="text-sm font-semibold text-[#0F172A] mt-0.5">
                    Islamabad, Pakistan
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 bg-[#F8FAFC] rounded-3xl border border-slate-200/80 p-8 sm:p-10 shadow-sm relative">
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900 space-y-3">
                <h4 className="font-bold text-lg flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  Official Google Forms & Sheets Integration
                </h4>
                <p className="text-sm leading-relaxed text-blue-800">
                  Google Forms is 100% free, requires zero backend code, and automatically logs every submission into your Google Sheet while notifying your Gmail inbox directly.
                </p>
                <div className="text-xs space-y-1 text-blue-800 font-medium bg-blue-100/60 p-3 rounded-xl">
                  <p className="font-bold mb-1">How to connect your Google Form:</p>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Go to <a href="https://forms.google.com" target="_blank" rel="noreferrer" className="underline font-bold text-blue-700">forms.google.com</a> and create your form.</li>
                    <li>Click <strong>Send</strong> → Select the Embed HTML tab (&lt;&gt;) or copy your Form Embed link.</li>
                    <li>Paste your Google Form embed URL or iframe src below to display it instantly on your website!</li>
                  </ol>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-[#64748B] uppercase tracking-wider">
                  Your Google Form Embed URL or Iframe Src *
                </label>
                <input
                  type="url"
                  placeholder="https://docs.google.com/forms/d/e/.../viewform?embedded=true"
                  value={googleFormUrl}
                  onChange={(e) => setGoogleFormUrl(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-[#0F172A] text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB]"
                />
              </div>

              {googleFormUrl ? (
                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-white">
                  <iframe
                    src={googleFormUrl}
                    width="100%"
                    height="750"
                    className="border-0"
                    title="Embedded Google Form"
                  >
                    Loading Google Form...
                  </iframe>
                </div>
              ) : (
                <div className="text-center py-16 px-6 rounded-2xl bg-white border border-slate-200/80 space-y-4">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mx-auto">
                    <Mail className="w-6 h-6" />
                  </div>
                  <h5 className="font-bold text-[#0F172A] text-base">Paste your Google Form URL above</h5>
                  <p className="text-xs text-[#64748B] max-w-sm mx-auto">
                    Paste your Google Form embed link above to render your live interactive form directly on this page. All submissions will go straight to your Google Sheet and Gmail.
                  </p>
                  <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                    <a
                      href="https://forms.google.com"
                      target="_blank"
                      rel="noreferrer"
                      className="px-5 py-3 rounded-xl bg-[#2563EB] text-white text-xs font-bold shadow-md shadow-blue-500/20 hover:bg-blue-700 transition-all flex items-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      Create Free Google Form Now
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}