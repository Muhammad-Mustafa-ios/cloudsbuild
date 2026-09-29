import React, { useState } from 'react';
import { Briefcase, Calendar, DollarSign, CheckCircle2, Award, ArrowRight, X, Send, Mail } from 'lucide-react';

interface Internship {
  id: string;
  title: string;
  department: string;
  duration: string;
  stipend: string;
  description: string;
  requirements: string[];
  deadline: string;
  active: boolean;
}

interface InternshipsSectionProps {
  internships: Internship[];
  onRefreshData: () => void;
  currentUser?: any;
}

export function InternshipsSection({ internships, onRefreshData, currentUser }: InternshipsSectionProps) {
  const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: '',
    college: '',
    experience: '',
    statement: ''
  });

  const handleOpenModal = (internship: Internship) => {
    setSelectedInternship(internship);
    setModalOpen(true);
    setSuccessMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInternship) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/internship-apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          internshipId: selectedInternship.id,
          internshipTitle: selectedInternship.title,
          ...formData
        })
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMessage('Registration successful! Thank you for applying. You will be contacted through email regarding your selection status after our review process.');
        setFormData({ name: '', email: '', phone: '', college: '', experience: '', statement: '' });
        onRefreshData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="internships" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-4">
            <Award className="w-3.5 h-3.5" /> Student Career Programs
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Launch Your Tech Career With Our Internship Tracks
          </h2>
          <p className="text-lg text-slate-600">
            Gain real-world industry experience working on live enterprise client projects at CloudsBuilt, mentored by senior engineers and AI architects.
          </p>
        </div>

        {internships.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200">
            <p className="text-slate-500">No active internship openings right now. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {internships.map((item) => (
              <div 
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold">
                      {item.department}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-blue-600" /> Deadline: {item.deadline}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-3">
                    {item.title}
                  </h3>
                  
                  <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <Briefcase className="w-4 h-4 text-blue-600" /> {item.duration}
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
                      <DollarSign className="w-4 h-4 text-emerald-600" /> {item.stipend}
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-4 mb-6">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Key Requirements:</h4>
                    <ul className="space-y-1.5">
                      {item.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => handleOpenModal(item)}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-all shadow-md shadow-blue-500/20"
                  >
                    Apply & Register <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Application Modal */}
      {modalOpen && selectedInternship && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-8 shadow-2xl relative my-8">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-750 p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Internship Registration</span>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">{selectedInternship.title}</h3>
              <p className="text-xs text-slate-500 mt-1">Submit your details to apply for this internship position.</p>
            </div>

            {successMessage ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 rounded-xl text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto text-emerald-600">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-xl text-slate-900">Registration Submitted Successfully!</h4>
                <div className="p-4 bg-white rounded-xl border border-emerald-100 text-xs text-slate-700 leading-relaxed text-left flex items-start gap-3">
                  <Mail className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <span>
                    {successMessage}
                  </span>
                </div>
                <button
                  onClick={() => setModalOpen(false)}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm shadow-md transition-all"
                >
                  Got It, Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Sam Johnson"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-600 bg-slate-50/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="student@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-600 bg-slate-50/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Phone Number</label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 019-2834"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-600 bg-slate-50/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">College / University</label>
                  <input
                    type="text"
                    required
                    value={formData.college}
                    onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                    placeholder="Stanford University"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-600 bg-slate-50/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Why do you want this internship?</label>
                  <textarea
                    rows={3}
                    required
                    value={formData.statement}
                    onChange={(e) => setFormData({ ...formData, statement: e.target.value })}
                    placeholder="Briefly describe your passion and relevant experience..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-600 bg-slate-50/50 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
                >
                  {submitting ? 'Submitting...' : 'Complete Registration & Apply'}
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
