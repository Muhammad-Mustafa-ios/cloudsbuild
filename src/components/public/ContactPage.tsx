import React, { useState, useEffect } from 'react';
import { ArrowLeft, Send, CheckCircle2, AlertCircle, Mail, Phone, MapPin, Globe } from 'lucide-react';

interface ContactPageProps {
  onBackToHome: () => void;
  onRefreshData?: () => void;
  selectedPlan?: any;
}

export function ContactPage({ onBackToHome, onRefreshData, selectedPlan }: ContactPageProps) {
  const TEAM_EMAIL = 'team.cloudsbuild@gmail.com';
  const SIDE_IMAGE = 'https://i.postimg.cc/L5rhQr8w/download-removebg-preview.png';
  const HERO_IMAGE = 'https://i.postimg.cc/WpKD4Jwv/Handsome-man-showing-and-pointing-fingers-at-wall-and-upper-left-corner-with-happy-expression-advice.png';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: selectedPlan ? `Plan: ${selectedPlan.name} (${selectedPlan.price})` : 'Enterprise Web & SaaS Development',
    message: selectedPlan ? `I am interested in selecting the ${selectedPlan.name} plan (${selectedPlan.price}). Features included: ${(selectedPlan.features || []).join(', ')}.` : '',
  });

  const [honey, setHoney] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [gmailUrl, setGmailUrl] = useState('#');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = "Contact Us | CloudsBuilt";
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (honey) {
      setSubmitted(true);
      return;
    }

    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in your name, email, and project details.');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    const subject = 'New inquiry from ' + formData.name + ' (CloudsBuilt website)';
    const body =
      'Name: ' + formData.name + '\n' +
      'Email: ' + formData.email + '\n' +
      'Phone: ' + (formData.phone || '-') + '\n' +
      'Company: ' + (formData.company || '-') + '\n' +
      'Service: ' + formData.service + '\n\n' +
      'Project details:\n' + formData.message;

    const generatedGmailUrl = 'https://mail.google.com/mail/?view=cm&fs=1' +
      '&to=' + encodeURIComponent(TEAM_EMAIL) +
      '&su=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(body);

    setGmailUrl(generatedGmailUrl);

    // Save to backend DB as well
    try {
      await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (onRefreshData) onRefreshData();
    } catch (err) {
      console.error(err);
    }

    window.open(generatedGmailUrl, '_blank', 'noopener');
    setSubmitted(true);
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

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] pt-28 pb-24 font-['Plus_Jakarta_Sans',system-ui,sans-serif]">
      <style>{`
        .contact-page *, .contact-page *::before, .contact-page *::after { box-sizing: border-box; }
        .contact-page .hero { position: relative; overflow: hidden; color: #fff; border-radius: 1.5rem; margin-bottom: 3rem; background: linear-gradient(120deg, #0B1530 0%, #172554 55%, #1E3A8A 100%); box-shadow: 0 20px 25px -5px rgba(0,0,0,.15); display: grid; grid-template-columns: 1fr; }
        @media (min-width: 900px) { .contact-page .hero { grid-template-columns: 1.1fr .9fr; } }
        .contact-page .hero-glow { position: absolute; border-radius: 50%; filter: blur(80px); pointer-events: none; }
        .contact-page .hero-glow.a { top: -6rem; right: -4rem; width: 26rem; height: 26rem; background: rgba(59,130,246,.35); }
        .contact-page .hero-glow.b { bottom: -8rem; left: -6rem; width: 22rem; height: 22rem; background: rgba(99,102,241,.25); }
        .contact-page .hero-text { position: relative; z-index: 1; padding: 2.5rem 2rem; display: grid; gap: 1.25rem; align-content: center; }
        @media (min-width: 640px) { .contact-page .hero-text { padding: 3.5rem 3rem; } }
        .contact-page .badge { justify-self: start; padding: .3rem .8rem; border-radius: 999px; background: rgba(147,197,253,.15); border: 1px solid rgba(147,197,253,.3); color: #BFDBFE; font-size: .8rem; font-weight: 600; }
        .contact-page .hero h1 { font-size: 2.25rem; line-height: 1.1; font-weight: 800; letter-spacing: -.03em; }
        @media (min-width: 640px) { .contact-page .hero h1 { font-size: 3.25rem; } }
        .contact-page .hero-sub { color: #CBD5E1; font-size: 1rem; line-height: 1.65; max-width: 34rem; }
        .contact-page .hero-facts { display: flex; flex-wrap: wrap; gap: 1.5rem 2.5rem; margin: 0; padding: 1.5rem 0 0; border-top: 1px solid rgba(255,255,255,.15); }
        .contact-page .hero-facts div { display: grid; gap: .1rem; }
        .contact-page .hero-facts dt { font-size: 1.125rem; font-weight: 800; }
        .contact-page .hero-facts dd { margin: 0; font-size: .8rem; color: #93C5FD; }
        .contact-page .hero-art { position: relative; z-index: 1; display: none; align-items: center; justify-content: center; padding: 2rem 2rem 2rem 0; }
        @media (min-width: 900px) { .contact-page .hero-art { display: flex; } }
        .contact-page .hero-art img { width: 100%; max-height: 26rem; object-fit: contain; filter: drop-shadow(0 30px 30px rgba(0,0,0,.35)); user-select: none; }
        
        .contact-page .grid { display: grid; grid-template-columns: 1fr; gap: 2rem; align-items: start; }
        @media (min-width: 1024px) { .contact-page .grid { grid-template-columns: 22.5rem 1fr; } }

        .contact-page .card { background: #fff; border: 1px solid rgba(226,232,240,.8); border-radius: 1.5rem; box-shadow: 0 1px 2px rgba(0,0,0,.05); }
        .contact-page .info { padding: 2rem; display: grid; gap: 1.5rem; }
        .contact-page .info h3 { font-size: 1.25rem; font-weight: 700; }
        .contact-page .muted { font-size: .875rem; color: #64748B; line-height: 1.65; }
        .contact-page .rows { display: grid; gap: 1rem; padding-top: .5rem; }
        .contact-page .row { display: flex; align-items: flex-start; gap: 1rem; }
        .contact-page .ico { flex-shrink: 0; width: 2.5rem; height: 2.5rem; border-radius: .75rem; display: flex; align-items: center; justify-content: center; }
        .contact-page .ico svg { width: 1.25rem; height: 1.25rem; }
        .contact-page .ico.blue { background: #EFF6FF; color: #2563EB; }
        .contact-page .ico.green { background: #ECFDF5; color: #059669; }
        .contact-page .ico.purple { background: #FAF5FF; color: #9333EA; }
        .contact-page .ico.amber { background: #FFFBEB; color: #D97706; }
        .contact-page .row h4 { font-size: .75rem; font-weight: 700; color: #64748B; text-transform: uppercase; }
        .contact-page .row a, .contact-page .row p { font-size: .875rem; font-weight: 600; overflow-wrap: anywhere; }
        .contact-page .row a:hover { color: #2563EB; }

        .contact-page .formcard { overflow: hidden; display: grid; grid-template-columns: 1fr; }
        @media (min-width: 768px) { .contact-page .formcard { grid-template-columns: 3fr 2fr; } }
        .contact-page .formside { padding: 2rem; }
        @media (min-width: 640px) { .contact-page .formside { padding: 2.5rem; } }
        .contact-page form { display: grid; gap: 1.5rem; }
        .contact-page .two { display: grid; grid-template-columns: 1fr; gap: 1.5rem; }
        @media (min-width: 640px) { .contact-page .two { grid-template-columns: 1fr 1fr; } }
        .contact-page .lbl { display: block; font-size: .75rem; font-weight: 700; color: #64748B; text-transform: uppercase; letter-spacing: .05em; margin-bottom: .5rem; }
        .contact-page .inp { width: 100%; padding: .875rem 1rem; border-radius: .75rem; background: #fff; border: 1px solid #E2E8F0; color: #0F172A; font: inherit; font-size: .875rem; outline: none; transition: border-color .15s, box-shadow .15s; }
        .contact-page .inp:focus { border-color: #2563EB; box-shadow: 0 0 0 3px rgba(37,99,235,.2); }
        .contact-page textarea.inp { resize: vertical; }

        .contact-page .err { display: flex; align-items: center; gap: .5rem; padding: 1rem; border-radius: .75rem; background: #FEF2F2; border: 1px solid #FECACA; color: #DC2626; font-size: .875rem; }
        .contact-page .btn { width: 100%; padding: 1rem; border: 0; border-radius: .75rem; background: #2563EB; color: #fff; font: inherit; font-size: .875rem; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: .5rem; cursor: pointer; box-shadow: 0 10px 15px -3px rgba(59,130,246,.25); transition: background .15s; }
        .contact-page .btn:hover { background: #1D4ED8; }
        .contact-page .btn.small { width: auto; padding: .75rem 1.5rem; margin-top: 1rem; }

        .contact-page .success { text-align: center; padding: 4rem 0; display: grid; gap: 1.25rem; justify-items: center; }
        .contact-page .success .big { width: 4rem; height: 4rem; border-radius: 1rem; background: #D1FAE5; color: #059669; display: flex; align-items: center; justify-content: center; }
        .contact-page .success h3 { font-size: 1.5rem; font-weight: 700; }

        .contact-page .imgside { display: none; position: relative; overflow: hidden; align-items: flex-end; justify-content: center; background: linear-gradient(135deg, #2563EB, #1D4ED8, #0F172A); }
        @media (min-width: 768px) { .contact-page .imgside { display: flex; } }
        .contact-page .blob { position: absolute; width: 16rem; height: 16rem; border-radius: 50%; filter: blur(64px); }
        .contact-page .blob.a { top: -4rem; right: -4rem; background: rgba(96,165,250,.3); }
        .contact-page .blob.b { bottom: -5rem; left: -4rem; background: rgba(99,102,241,.3); }
        .contact-page .imgtext { position: absolute; top: 2rem; left: 2rem; right: 2rem; color: #fff; }
        .contact-page .imgtext strong { display: block; font-size: 1.125rem; line-height: 1.35; }
        .contact-page .imgtext span { display: block; margin-top: .25rem; font-size: .875rem; color: rgba(219,234,254,.8); }
        .contact-page .imgwrap { position: relative; z-index: 1; width: 100%; padding: 10rem 1.5rem 2rem; display: flex; align-items: flex-end; justify-content: center; }
        .contact-page .imgwrap img { width: 100%; max-height: 26rem; object-fit: contain; filter: drop-shadow(0 25px 25px rgba(0,0,0,.25)); user-select: none; }
      `}</style>

      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 pt-4 contact-page">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#2563EB] bg-[#EFF6FF] hover:bg-[#DBEAFE] px-4 py-2.5 rounded-xl transition-all mb-8 shadow-sm cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>

        {selectedPlan && (
          <div className="mb-6 p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold tracking-widest text-blue-600 uppercase">Selected Plan</span>
              <h4 className="text-base font-extrabold text-[#0F172A]">{selectedPlan.name} Plan ({selectedPlan.price})</h4>
            </div>
          </div>
        )}

        <section className="hero">
          <div className="hero-glow a"></div>
          <div className="hero-glow b"></div>
          <div className="hero-text">
            <div className="badge">Now booking new projects</div>
            <h1>Tell us what you want to build. We'll start there.</h1>
            <p className="hero-sub">Websites, SaaS platforms, mobile apps and AI automation, built by one team. Send us your idea and an engineer will reply within 2 hours.</p>
            <dl className="hero-facts">
              <div><dt>2 hours</dt><dd>Average first reply</dd></div>
              <div><dt>24/7</dt><dd>Enterprise support</dd></div>
              <div><dt>Web, AI, Mobile</dt><dd>One team for all of it</dd></div>
            </dl>
          </div>
          <div className="hero-art" aria-hidden="true">
            <img src={HERO_IMAGE} alt="CloudsBuilt Hero" referrerPolicy="no-referrer" />
          </div>
        </section>

        <div className="grid">
          {/* Info Card */}
          <div className="card info">
            <h3>Contact Information</h3>
            <p className="muted">Have questions about our AI solutions, enterprise software, or custom engineering? Reach out through any channel below.</p>
            <div className="rows">
              <div className="row">
                <div className="ico blue"><Mail className="w-5 h-5" /></div>
                <div><h4>Email Us</h4><a href="mailto:team.cloudsbuild@gmail.com">team.cloudsbuild@gmail.com</a></div>
              </div>
              <div className="row">
                <div className="ico green"><Phone className="w-5 h-5" /></div>
                <div><h4>Call Us</h4><a href="tel:+923429339057">+92 342 9339057</a></div>
              </div>
              <div className="row">
                <div className="ico purple"><MapPin className="w-5 h-5" /></div>
                <div><h4>Headquarters</h4><p>Global Tech Hub &amp; Remote Operations</p></div>
              </div>
              <div className="row">
                <div className="ico amber"><Globe className="w-5 h-5" /></div>
                <div><h4>Availability</h4><p>24/7 Enterprise Support</p></div>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="card formcard" id="contact-form">
            <div className="formside">
              {submitted ? (
                <div className="success">
                  <div className="big"><CheckCircle2 className="w-8 h-8" /></div>
                  <h3>Gmail is ready</h3>
                  <p className="muted">Thank you, {formData.name}. We opened Gmail in a new tab with your message filled in. Press <strong>Send</strong> there to deliver it to our team. If nothing opened, <a href={gmailUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#2563EB', fontWeight: 600, textDecoration: 'underline' }}>click here to open Gmail</a>.</p>
                  <button type="button" onClick={resetForm} className="btn small">Write another message</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <input type="text" name="_honey" value={honey} onChange={(e) => setHoney(e.target.value)} tabIndex={-1} autoComplete="off" style={{ display: 'none' }} />

                  <div className="two">
                    <div>
                      <label htmlFor="name" className="lbl">Your Full Name *</label>
                      <input id="name" name="name" type="text" required maxLength={100} placeholder="John Doe" value={formData.name} onChange={handleChange} className="inp" />
                    </div>
                    <div>
                      <label htmlFor="email" className="lbl">Email Address *</label>
                      <input id="email" name="email" type="email" required maxLength={150} placeholder="john@company.com" value={formData.email} onChange={handleChange} className="inp" />
                    </div>
                  </div>

                  <div className="two">
                    <div>
                      <label htmlFor="phone" className="lbl">Phone Number</label>
                      <input id="phone" name="phone" type="tel" maxLength={50} placeholder="+1 (555) 019-2834" value={formData.phone} onChange={handleChange} className="inp" />
                    </div>
                    <div>
                      <label htmlFor="company" className="lbl">Company</label>
                      <input id="company" name="company" type="text" maxLength={100} placeholder="Acme Inc." value={formData.company} onChange={handleChange} className="inp" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="service" className="lbl">Service Interested In *</label>
                    <select id="service" name="service" value={formData.service} onChange={handleChange} className="inp">
                      {selectedPlan && (
                        <option value={`Plan: ${selectedPlan.name} (${selectedPlan.price})`}>
                          Selected Plan: {selectedPlan.name} ({selectedPlan.price})
                        </option>
                      )}
                      <option>Enterprise Web &amp; SaaS Development</option>
                      <option>Websites &amp; Web Platforms</option>
                      <option>E-Commerce</option>
                      <option>Software &amp; Business Systems</option>
                      <option>Mobile Apps</option>
                      <option>AI &amp; Automation</option>
                      <option>Digital Marketing &amp; Meta/TikTok Ads</option>
                      <option>Design, Support &amp; Growth</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="lbl">Project Details &amp; Requirements *</label>
                    <textarea id="message" name="message" rows={5} required maxLength={2000} placeholder="Tell us about your goals, features needed, and timeline..." value={formData.message} onChange={handleChange} className="inp" />
                  </div>

                  {error && (
                    <div className="err">
                      <AlertCircle className="w-5 h-5" />
                      <span>{error}</span>
                    </div>
                  )}

                  <button type="submit" className="btn">
                    <span>Continue in Gmail</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>

            <div className="imgside" aria-hidden="true">
              <div className="blob a"></div>
              <div className="blob b"></div>
              <div className="imgtext">
                <strong>We read every message.</strong>
                <span>Expect a reply from a real engineer, usually within 2 hours.</span>
              </div>
              <div className="imgwrap">
                <img src={SIDE_IMAGE} alt="CloudsBuilt Illustration" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
