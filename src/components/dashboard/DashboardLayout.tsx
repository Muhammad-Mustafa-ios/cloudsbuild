import React, { useState } from 'react';
import { 
  LayoutDashboard, BarChart3, Users, Cpu, GitBranch, 
  Bot, MessageSquare, CheckSquare, Calendar as CalendarIcon, FileText, 
  CreditCard, Files, UserCheck, Bell, Settings as SettingsIcon, User, 
  LogOut, Plus, ExternalLink, Trash2, CheckCircle2, Award, BookOpen, Send, Sparkles, X, Edit, Scissors
} from 'lucide-react';
import { DashboardTab } from '../../types';
import { ANALYTICS_REVENUE_DATA } from '../../data/mockData';
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid, Legend 
} from 'recharts';
import { ImageCropperModal } from './ImageCropperModal';

interface DashboardLayoutProps {
  dbData: {
    projects: any[];
    internships: any[];
    courses: any[];
    pricing: any[];
    contacts: any[];
    internshipApplications: any[];
    courseEnrollments: any[];
    users: any[];
    testimonials?: any[];
  };
  currentUser: any;
  onRefreshData: () => void;
  onLogout: () => void;
  onReturnToWebsite: () => void;
}

export function DashboardLayout({ dbData, currentUser, onRefreshData, onLogout, onReturnToWebsite }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentTab, setCurrentTab] = useState<DashboardTab | 'internships-admin' | 'courses-admin' | 'leads' | 'student-apps' | 'course-enr'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Modals for adding new items
  const [newInternshipModal, setNewInternshipModal] = useState(false);
  const [newCourseModal, setNewCourseModal] = useState(false);
  const [newPricingModal, setNewPricingModal] = useState(false);
  const [newTestimonialModal, setNewTestimonialModal] = useState(false);

  // Edit states
  const [editingInternship, setEditingInternship] = useState<any>(null);
  const [editingCourse, setEditingCourse] = useState<any>(null);
  const [editingPricing, setEditingPricing] = useState<any>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<any>(null);

  // Form states
  const [internshipForm, setInternshipForm] = useState({ title: '', department: 'Engineering', duration: '3 Months', stipend: '$600 / mo', description: '', deadline: '2026-10-01', requirements: 'React, TypeScript, Git' });
  const [courseForm, setCourseForm] = useState({ title: '', category: 'Web Development', level: 'Intermediate', duration: '8 Weeks', price: '$199', description: '', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' });
  const [pricingForm, setPricingForm] = useState({ name: '', tagline: '', pricePk: 'PKR 30,000', priceInt: '$300', popular: false, features: 'Feature 1, Feature 2' });
  const [testimonialForm, setTestimonialForm] = useState({ whatsappChatImage: '' });
  const [cropperImage, setCropperImage] = useState<string | null>(null);
  const [isEditingCropper, setIsEditingCropper] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string, isEditing = false) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setIsEditingCropper(isEditing);
        setCropperImage(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (croppedUrl: string) => {
    if (isEditingCropper && editingTestimonial) {
      setEditingTestimonial({ ...editingTestimonial, whatsappChatImage: croppedUrl });
    } else {
      setTestimonialForm(prev => ({ ...prev, whatsappChatImage: croppedUrl }));
    }
    setCropperImage(null);
  };

  const handleAddTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testimonialForm.whatsappChatImage) {
      triggerToast('Please select a WhatsApp chat screenshot image.');
      return;
    }
    try {
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          whatsappChatImage: testimonialForm.whatsappChatImage,
          name: 'Verified Client',
          role: 'WhatsApp Chat Proof',
          content: 'Verified WhatsApp Chat Conversation Proof',
          rating: 5,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
        })
      });
      if (res.ok) {
        triggerToast('WhatsApp Chat Proof uploaded successfully!');
        setNewTestimonialModal(false);
        setTestimonialForm({ whatsappChatImage: '' });
        onRefreshData();
      } else {
        triggerToast('Failed to upload.');
      }
    } catch (err) { 
      console.error(err); 
      triggerToast('Error uploading chat proof.');
    }
  };

  const handleUpdateTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTestimonial) return;
    try {
      const res = await fetch(`/api/testimonials/${editingTestimonial.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingTestimonial)
      });
      if (res.ok) {
        triggerToast('Testimonial updated successfully!');
        setEditingTestimonial(null);
        onRefreshData();
      }
    } catch (err) { console.error(err); }
  };

  const handleDeleteTestimonial = async (id: string) => {
    try {
      await fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
      triggerToast('Testimonial deleted.');
      onRefreshData();
    } catch (err) { console.error(err); }
  };

  const triggerToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 3500);
  };

  // Handlers for adding data
  const handleAddInternship = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/internships', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...internshipForm,
          active: true,
          requirements: internshipForm.requirements.split(',').map(s => s.trim())
        })
      });
      if (res.ok) {
        triggerToast('Internship listing added successfully to student portal!');
        setNewInternshipModal(false);
        setInternshipForm({ title: '', department: 'Engineering', duration: '3 Months', stipend: '$600 / mo', description: '', deadline: '2026-10-01', requirements: 'React, TypeScript, Git' });
        onRefreshData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateInternship = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingInternship) return;
    try {
      const res = await fetch(`/api/internships/${editingInternship.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...editingInternship,
          requirements: typeof editingInternship.requirements === 'string' ? editingInternship.requirements.split(',').map((s: string) => s.trim()) : editingInternship.requirements
        })
      });
      if (res.ok) {
        triggerToast('Internship updated successfully!');
        setEditingInternship(null);
        onRefreshData();
      }
    } catch (err) { console.error(err); }
  };

  const handleDeleteInternship = async (id: string) => {
    try {
      await fetch(`/api/internships/${id}`, { method: 'DELETE' });
      triggerToast('Internship deleted.');
      onRefreshData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...courseForm,
          rating: 5.0,
          studentsCount: 1
        })
      });
      if (res.ok) {
        triggerToast('Online course published successfully to company academy!');
        setNewCourseModal(false);
        setCourseForm({ title: '', category: 'Web Development', level: 'Intermediate', duration: '8 Weeks', price: '$199', description: '', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' });
        onRefreshData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCourse) return;
    try {
      const res = await fetch(`/api/courses/${editingCourse.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingCourse)
      });
      if (res.ok) {
        triggerToast('Course updated successfully!');
        setEditingCourse(null);
        onRefreshData();
      }
    } catch (err) { console.error(err); }
  };

  const handleDeleteCourse = async (id: string) => {
    try {
      await fetch(`/api/courses/${id}`, { method: 'DELETE' });
      triggerToast('Course deleted.');
      onRefreshData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddPricing = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/pricing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pricingForm)
      });
      if (res.ok) {
        triggerToast('Pricing plan added successfully!');
        setNewPricingModal(false);
        setPricingForm({ name: '', tagline: '', priceMonthly: '$3,500', priceProject: '$10,000', popular: false, features: 'Feature 1, Feature 2, Feature 3' });
        onRefreshData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdatePricing = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPricing) return;
    try {
      const res = await fetch(`/api/pricing/${editingPricing.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...editingPricing,
          features: typeof editingPricing.features === 'string' ? editingPricing.features.split(',').map((s: string) => s.trim()) : editingPricing.features
        })
      });
      if (res.ok) {
        triggerToast('Pricing plan updated successfully!');
        setEditingPricing(null);
        onRefreshData();
      }
    } catch (err) { console.error(err); }
  };

  const handleDeletePricing = async (id: string) => {
    try {
      await fetch(`/api/pricing/${id}`, { method: 'DELETE' });
      triggerToast('Pricing plan deleted.');
      onRefreshData();
    } catch (err) { console.error(err); }
  };

  const handleDeleteContact = async (id: string) => {
    try {
      await fetch(`/api/contacts/${id}`, { method: 'DELETE' });
      triggerToast('Contact lead deleted.');
      onRefreshData();
    } catch (err) { console.error(err); }
  };

  const handleDeleteInternshipApp = async (id: string) => {
    try {
      await fetch(`/api/internship-applications/${id}`, { method: 'DELETE' });
      triggerToast('Internship application deleted.');
      onRefreshData();
    } catch (err) { console.error(err); }
  };

  const handleDeleteCourseEnrollment = async (id: string) => {
    try {
      await fetch(`/api/course-enrollments/${id}`, { method: 'DELETE' });
      triggerToast('Course enrollment deleted.');
      onRefreshData();
    } catch (err) { console.error(err); }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-['Plus_Jakarta_Sans',sans-serif] flex">
      
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0F172A] text-white px-6 py-3.5 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-sm font-semibold">{successToast}</span>
        </div>
      )}

      {/* Sidebar */}
      <aside className={`bg-[#0F172A] text-white transition-all duration-300 flex flex-col z-20 ${sidebarCollapsed ? 'w-20' : 'w-72'}`}>
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-white shadow-lg shadow-blue-500/30 flex items-center justify-center">
                <img src="/cloudsbuilt_logo.jpg" alt="CloudsBuilt" className="w-full h-full object-cover" />
              </div>
              <div>
                <h1 className="font-extrabold text-white text-base leading-tight">CloudsBuilt</h1>
                <span className="text-[10px] text-cyan-400 font-semibold tracking-wider uppercase">Enterprise Portal</span>
              </div>
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
          >
            {sidebarCollapsed ? '▶' : '◀'}
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-6">
          <div className="space-y-1">
            <div className="px-3 pb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Main</div>
            <button
              onClick={() => setCurrentTab('overview')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold transition-all ${currentTab === 'overview' ? 'bg-[#2563EB] text-white shadow-md' : 'text-slate-300 hover:bg-slate-800/80'}`}
            >
              <LayoutDashboard className="w-5 h-5" />
              {!sidebarCollapsed && <span>Overview</span>}
            </button>
            <button
              onClick={() => setCurrentTab('analytics')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold transition-all ${currentTab === 'analytics' ? 'bg-[#2563EB] text-white shadow-md' : 'text-slate-300 hover:bg-slate-800/80'}`}
            >
              <BarChart3 className="w-5 h-5" />
              {!sidebarCollapsed && <span>Analytics</span>}
            </button>
          </div>

          <div className="space-y-1">
            <div className="px-3 pb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Public Site Sync</div>
            <button
              onClick={() => setCurrentTab('internships-admin')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-all ${currentTab === 'internships-admin' ? 'bg-[#2563EB] text-white shadow-md' : 'text-slate-300 hover:bg-slate-800/80'}`}
            >
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5" />
                {!sidebarCollapsed && <span>Internships ({dbData.internships.length})</span>}
              </div>
            </button>
            <button
              onClick={() => setCurrentTab('courses-admin')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-all ${currentTab === 'courses-admin' ? 'bg-[#2563EB] text-white shadow-md' : 'text-slate-300 hover:bg-slate-800/80'}`}
            >
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5" />
                {!sidebarCollapsed && <span>Online Courses ({dbData.courses.length})</span>}
              </div>
            </button>
            <button
              onClick={() => setCurrentTab('pricing-admin')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-all ${currentTab === 'pricing-admin' ? 'bg-[#2563EB] text-white shadow-md' : 'text-slate-300 hover:bg-slate-800/80'}`}
            >
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5" />
                {!sidebarCollapsed && <span>Manage Pricing</span>}
              </div>
            </button>
            <button
              onClick={() => setCurrentTab('testimonials-admin')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-all ${currentTab === 'testimonials-admin' ? 'bg-[#2563EB] text-white shadow-md' : 'text-slate-300 hover:bg-slate-800/80'}`}
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-emerald-400" />
                {!sidebarCollapsed && <span>Testimonials & Chat ({(dbData.testimonials || []).length})</span>}
              </div>
            </button>
          </div>

          <div className="space-y-1">
            <div className="px-3 pb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Submissions & Leads</div>
            <button
              onClick={() => setCurrentTab('leads')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-all ${currentTab === 'leads' ? 'bg-[#2563EB] text-white shadow-md' : 'text-slate-300 hover:bg-slate-800/80'}`}
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5" />
                {!sidebarCollapsed && <span>Contact Leads</span>}
              </div>
              {!sidebarCollapsed && dbData.contacts.length > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-blue-500 text-white text-xs font-bold">{dbData.contacts.length}</span>
              )}
            </button>
            <button
              onClick={() => setCurrentTab('student-apps')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-all ${currentTab === 'student-apps' ? 'bg-[#2563EB] text-white shadow-md' : 'text-slate-300 hover:bg-slate-800/80'}`}
            >
              <div className="flex items-center gap-3">
                <UserCheck className="w-5 h-5" />
                {!sidebarCollapsed && <span>Internship Applicants</span>}
              </div>
              {!sidebarCollapsed && dbData.internshipApplications.length > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white text-xs font-bold">{dbData.internshipApplications.length}</span>
              )}
            </button>
            <button
              onClick={() => setCurrentTab('course-enr')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-all ${currentTab === 'course-enr' ? 'bg-[#2563EB] text-white shadow-md' : 'text-slate-300 hover:bg-slate-800/80'}`}
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5" />
                {!sidebarCollapsed && <span>Course Enrollments</span>}
              </div>
              {!sidebarCollapsed && dbData.courseEnrollments.length > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-purple-500 text-white text-xs font-bold">{dbData.courseEnrollments.length}</span>
              )}
            </button>
          </div>
        </div>

        {/* User Footer */}
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center font-bold text-white text-sm">
                  {currentUser?.name ? currentUser.name[0] : 'S'}
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs font-bold text-white truncate">{currentUser?.name || 'Admin User'}</p>
                  <p className="text-[10px] text-slate-400 truncate">{currentUser?.email || 'admin@samstack.com'}</p>
                </div>
              </div>
            )}
            <button
              onClick={onLogout}
              title="Logout"
              className="p-2 rounded-xl bg-slate-800 hover:bg-rose-600/20 text-slate-400 hover:text-rose-400 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Top Bar */}
        <header className="bg-white border-b border-slate-200 h-20 px-8 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-extrabold text-[#0F172A] capitalize">
              {currentTab === 'internships-admin' ? 'Manage Internships' : currentTab === 'courses-admin' ? 'Manage Online Courses' : currentTab === 'leads' ? 'Contact Form Leads' : currentTab === 'student-apps' ? 'Internship Applications' : currentTab === 'course-enr' ? 'Course Enrollments' : currentTab}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onReturnToWebsite}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors"
            >
              <ExternalLink className="w-4 h-4" /> Return To Public Website
            </button>
            <div className="h-6 w-px bg-slate-200"></div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-200">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" /> Real-Time Sync Active
            </div>
          </div>
        </header>

        {/* Tab Content */}
        <div className="p-8 space-y-8 flex-1">
          
          {/* OVERVIEW TAB */}
          {currentTab === 'overview' && (
            <div className="space-y-8">
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Public Projects</p>
                    <h3 className="text-3xl font-extrabold text-[#0F172A]">{dbData.projects.length}</h3>
                    <p className="text-xs text-emerald-600 font-semibold mt-1">Live on website</p>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Files className="w-7 h-7" />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Internship Tracks</p>
                    <h3 className="text-3xl font-extrabold text-[#0F172A]">{dbData.internships.length}</h3>
                    <p className="text-xs text-emerald-600 font-semibold mt-1">{dbData.internshipApplications.length} Applicants</p>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Award className="w-7 h-7" />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Online Courses</p>
                    <h3 className="text-3xl font-extrabold text-[#0F172A]">{dbData.courses.length}</h3>
                    <p className="text-xs text-purple-600 font-semibold mt-1">{dbData.courseEnrollments.length} Enrollments</p>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
                    <BookOpen className="w-7 h-7" />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Contact Leads</p>
                    <h3 className="text-3xl font-extrabold text-[#0F172A]">{dbData.contacts.length}</h3>
                    <p className="text-xs text-blue-600 font-semibold mt-1">Direct from website</p>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <MessageSquare className="w-7 h-7" />
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs">
                <h3 className="text-lg font-bold text-[#0F172A] mb-4">Quick Content Management</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <button
                    onClick={() => { setCurrentTab('internships-admin'); setNewInternshipModal(true); }}
                    className="p-5 rounded-2xl bg-blue-50 hover:bg-blue-100 border border-blue-200 flex items-center gap-4 text-left transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                      <Plus className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-blue-900 text-sm">Add Internship Track</h4>
                      <p className="text-xs text-blue-700 mt-0.5">Publish student career opportunity</p>
                    </div>
                  </button>

                  <button
                    onClick={() => { setCurrentTab('internships-admin'); setNewInternshipModal(true); }}
                    className="p-5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 flex items-center gap-4 text-left transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                      <Plus className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-emerald-900 text-sm">Add Internship</h4>
                      <p className="text-xs text-emerald-700 mt-0.5">Post new student career track</p>
                    </div>
                  </button>

                  <button
                    onClick={() => { setCurrentTab('courses-admin'); setNewCourseModal(true); }}
                    className="p-5 rounded-2xl bg-purple-50 hover:bg-purple-100 border border-purple-200 flex items-center gap-4 text-left transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold">
                      <Plus className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-purple-900 text-sm">Add Online Course</h4>
                      <p className="text-xs text-purple-700 mt-0.5">Publish student masterclass</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ANALYTICS TAB */}
          {currentTab === 'analytics' && (
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs">
                <h3 className="text-lg font-bold text-[#0F172A] mb-6">Revenue & Enterprise Growth</h3>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={ANALYTICS_REVENUE_DATA}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="month" stroke="#64748B" fontSize={12} />
                      <YAxis stroke="#64748B" fontSize={12} />
                      <Tooltip />
                      <Area type="monotone" dataKey="revenue" stroke="#2563EB" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}



          {/* INTERNSHIPS ADMIN TAB */}
          {currentTab === 'internships-admin' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#0F172A]">Student Internship Tracks</h3>
                  <p className="text-xs text-slate-500">Manage internship postings displayed in the public student section.</p>
                </div>
                <button
                  onClick={() => setNewInternshipModal(true)}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-sm shadow-md"
                >
                  <Plus className="w-4 h-4" /> Add Internship Track
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dbData.internships.map((item: any) => (
                  <div key={item.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full">{item.department}</span>
                        <div className="flex items-center gap-1">
                          <button onClick={() => setEditingInternship({...item, requirements: Array.isArray(item.requirements) ? item.requirements.join(', ') : item.requirements})} className="text-slate-400 hover:text-blue-600 p-1">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDeleteInternship(item.id)} className="text-slate-400 hover:text-rose-600 p-1">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <h4 className="font-bold text-slate-900 text-lg mb-2">{item.title}</h4>
                      <p className="text-sm text-slate-600 mb-4">{item.description}</p>
                    </div>
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                      <span className="text-blue-600">{item.duration}</span>
                      <span className="text-emerald-700">{item.stipend}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* COURSES ADMIN TAB */}
          {currentTab === 'courses-admin' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#0F172A]">Online Academy Courses</h3>
                  <p className="text-xs text-slate-500">Manage online courses displayed in the public academy section.</p>
                </div>
                <button
                  onClick={() => setNewCourseModal(true)}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-sm shadow-md"
                >
                  <Plus className="w-4 h-4" /> Add Online Course
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dbData.courses.map((course: any) => (
                  <div key={course.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="relative h-40 bg-slate-100">
                        <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                        <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                          {course.price}
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-blue-600">{course.category}</span>
                          <div className="flex items-center gap-1">
                            <button onClick={() => setEditingCourse(course)} className="text-slate-400 hover:text-blue-600 p-1">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDeleteCourse(course.id)} className="text-slate-400 hover:text-rose-600 p-1">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <h4 className="font-bold text-slate-900 text-lg mb-2">{course.title}</h4>
                        <p className="text-sm text-slate-600 line-clamp-2">{course.description}</p>
                      </div>
                    </div>
                    <div className="p-6 pt-0 flex items-center justify-between text-xs font-semibold text-slate-500">
                      <span>{course.duration}</span>
                      <span>⭐ {course.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PRICING ADMIN TAB */}
          {currentTab === 'pricing-admin' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#0F172A]">Manage Pricing Plans</h3>
                  <p className="text-xs text-slate-500">Update pricing tiers, retainers, and features displayed on the public website.</p>
                </div>
                <button
                  onClick={() => setNewPricingModal(true)}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-sm shadow-md"
                >
                  <Plus className="w-4 h-4" /> Add Pricing Plan
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {(dbData.pricing || []).map((plan: any) => (
                  <div key={plan.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full">{plan.name}</span>
                        <div className="flex items-center gap-1">
                          <button onClick={() => setEditingPricing({...plan, features: Array.isArray(plan.features) ? plan.features.join(', ') : plan.features})} className="text-slate-400 hover:text-blue-600 p-1">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDeletePricing(plan.id)} className="text-slate-400 hover:text-rose-600 p-1">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="space-y-1 mb-2">
                        <div className="text-sm font-extrabold text-emerald-600 flex items-center gap-1">
                          <span>🇵🇰 {plan.pricePk || 'PKR 30,000'}</span>
                        </div>
                        <div className="text-sm font-extrabold text-blue-600 flex items-center gap-1">
                          <span>🌎 {plan.priceInt || plan.price || '$300'}</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 mb-4">{plan.tagline}</p>
                      <ul className="space-y-2 mb-4">
                        {(plan.features || []).map((f: string, idx: number) => (
                          <li key={idx} className="text-xs text-slate-600 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TESTIMONIALS ADMIN TAB */}
          {currentTab === 'testimonials-admin' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#0F172A]">Client Testimonials & WhatsApp Chat Proof</h3>
                  <p className="text-xs text-slate-500">Upload WhatsApp chat conversation screenshots from your computer and manage client reviews.</p>
                </div>
                <button
                  onClick={() => setNewTestimonialModal(true)}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-sm shadow-md"
                >
                  <Plus className="w-4 h-4" /> Add Testimonial & WhatsApp Proof
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(dbData.testimonials || []).map((t: any) => (
                  <div key={t.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full flex items-center gap-1">
                          💬 WhatsApp Chat Proof
                        </span>
                        <div className="flex items-center gap-1">
                          <button onClick={() => setEditingTestimonial(t)} className="text-slate-400 hover:text-blue-600 p-1" title="Edit Screenshot">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDeleteTestimonial(t.id)} className="text-slate-400 hover:text-rose-600 p-1" title="Delete">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {t.whatsappChatImage && (
                        <div className="rounded-xl overflow-hidden border border-slate-200 h-48 bg-slate-900 flex items-center justify-center relative group">
                          <img src={t.whatsappChatImage} alt="WhatsApp Chat Proof" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-xs font-bold">
                            Click edit to update screenshot
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CONTACT LEADS TAB */}
          {currentTab === 'leads' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-[#0F172A]">Real-Time Contact Form Submissions</h3>
              {dbData.contacts.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
                  No contact submissions yet. Submit a message via the public website contact section to see it appear here instantly!
                </div>
              ) : (
                <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
                  <div className="divide-y divide-slate-100">
                    {dbData.contacts.map((c: any) => (
                      <div key={c.id} className="p-6 flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-3 flex-wrap">
                            <h4 className="font-bold text-slate-900 text-base">{c.name}</h4>
                            <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">{c.service || 'General Inquiry'}</span>
                            {c.selectedPlanName && (
                              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                                ✨ Selected Plan: {c.selectedPlanName} ({c.selectedPlanPrice})
                              </span>
                            )}
                            <span className="text-xs text-slate-400">{new Date(c.timestamp).toLocaleString()}</span>
                          </div>
                          <p className="text-xs text-slate-500">Email: {c.email} • Phone: {c.phone || 'N/A'}</p>
                          <p className="text-sm text-slate-700 mt-2 bg-slate-50 p-4 rounded-xl">{c.message}</p>
                        </div>
                        <button onClick={() => handleDeleteContact(c.id)} className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STUDENT APPS TAB */}
          {currentTab === 'student-apps' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-[#0F172A]">Internship Applications</h3>
              {dbData.internshipApplications.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
                  No internship applications received yet. Students can apply via the public internship tracks section.
                </div>
              ) : (
                <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
                  <div className="divide-y divide-slate-100">
                    {dbData.internshipApplications.map((app: any) => (
                      <div key={app.id} className="p-6 flex items-start justify-between gap-4">
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-3">
                            <h4 className="font-bold text-slate-900 text-base">{app.name}</h4>
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">{app.internshipTitle}</span>
                            <span className="text-xs text-slate-400">{new Date(app.timestamp).toLocaleString()}</span>
                          </div>
                          <p className="text-xs text-slate-600">Email: {app.email} • Phone: {app.phone} • College: {app.college}</p>
                          <p className="text-xs text-slate-500">Portfolio: <a href={app.experience} target="_blank" rel="noreferrer" className="text-blue-600 underline">{app.experience}</a></p>
                          <p className="text-sm text-slate-700 mt-2 bg-slate-50 p-4 rounded-xl"><strong>Statement:</strong> {app.statement}</p>
                        </div>
                        <button onClick={() => handleDeleteInternshipApp(app.id)} className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* COURSE ENROLLMENTS TAB */}
          {currentTab === 'course-enr' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#0F172A]">Online Course Enrollments & Candidate Status</h3>
                  <p className="text-xs text-slate-500">Track candidate watch time and course completion status to send official certificates via Gmail.</p>
                </div>
              </div>
              {dbData.courseEnrollments.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
                  No course enrollments yet. Students can enroll via the public academy courses section.
                </div>
              ) : (
                <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
                  <div className="divide-y divide-slate-100">
                    {dbData.courseEnrollments.map((enr: any) => (
                      <div key={enr.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-3">
                            <h4 className="font-bold text-slate-900 text-base">{enr.name}</h4>
                            <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 text-xs font-semibold">{enr.courseTitle}</span>
                            {enr.status === 'Completed' ? (
                              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full flex items-center gap-1.5 shadow-xs">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Completed
                              </span>
                            ) : (
                              <span className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-semibold rounded-full">
                                In Progress / Enrolled
                              </span>
                            )}
                            <span className="text-xs text-slate-400">{new Date(enr.timestamp).toLocaleDateString()}</span>
                          </div>
                          <p className="text-xs text-slate-600">Email: <span className="font-semibold text-slate-900">{enr.email}</span> • Phone: {enr.phone || 'N/A'} • Experience: {enr.experienceLevel}</p>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <a
                            href={`mailto:${enr.email}?subject=Official Certificate of Completion - ${encodeURIComponent(enr.courseTitle)}&body=Dear%20${encodeURIComponent(enr.name)},%0D%0A%0D%0ACongratulations%20on%20successfully%20completing%20the%20course%20%22${encodeURIComponent(enr.courseTitle)}%22%20at%20CloudsBuilt!%20Your%20training%20timeline%20and%20watch%20progress%20have%20been%20verified%20and%20marked%20as%20completed.%0D%0A%0D%0AAttached%20is%20your%20official%20certificate%20of%20completion.%0D%0A%0D%0ABest%20regards,%0D%0ACloudsBuilt%20Academy`}
                            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm flex items-center gap-2 transition-all"
                          >
                            <Send className="w-3.5 h-3.5" /> Send Certificate on Gmail
                          </a>
                          <button onClick={() => handleDeleteCourseEnrollment(enr.id)} className="p-2.5 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </main>



      {/* MODAL: ADD INTERNSHIP */}
      {newInternshipModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl relative">
            <button onClick={() => setNewInternshipModal(false)} className="absolute top-5 right-5 text-slate-400 hover:text-slate-750">✕</button>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Add Internship Track</h3>
            <p className="text-xs text-slate-500 mb-6">Publish a new internship listing on the student career page.</p>

            <form onSubmit={handleAddInternship} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Internship Title</label>
                <input type="text" required value={internshipForm.title} onChange={e => setInternshipForm({...internshipForm, title: e.target.value})} placeholder="AI & ML Research Intern" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Department</label>
                  <input type="text" required value={internshipForm.department} onChange={e => setInternshipForm({...internshipForm, department: e.target.value})} placeholder="Engineering" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Duration & Stipend</label>
                  <input type="text" required value={internshipForm.stipend} onChange={e => setInternshipForm({...internshipForm, stipend: e.target.value})} placeholder="$700 / mo" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Requirements (comma-separated)</label>
                <input type="text" required value={internshipForm.requirements} onChange={e => setInternshipForm({...internshipForm, requirements: e.target.value})} placeholder="Python, PyTorch, LangChain" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Description</label>
                <textarea rows={3} required value={internshipForm.description} onChange={e => setInternshipForm({...internshipForm, description: e.target.value})} placeholder="Job description and responsibilities..." className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm resize-none"></textarea>
              </div>
              <button type="submit" className="w-full py-3 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold rounded-xl text-sm shadow-md">Publish Internship</button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD COURSE */}
      {newCourseModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl relative">
            <button onClick={() => setNewCourseModal(false)} className="absolute top-5 right-5 text-slate-400 hover:text-slate-750">✕</button>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Publish Online Course</h3>
            <p className="text-xs text-slate-500 mb-6">Add a new online course for students on the company website.</p>

            <form onSubmit={handleAddCourse} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Course Title</label>
                <input type="text" required value={courseForm.title} onChange={e => setCourseForm({...courseForm, title: e.target.value})} placeholder="Advanced React & Next.js Masterclass" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Category</label>
                  <input type="text" required value={courseForm.category} onChange={e => setCourseForm({...courseForm, category: e.target.value})} placeholder="Web Development" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Level</label>
                  <input type="text" required value={courseForm.level} onChange={e => setCourseForm({...courseForm, level: e.target.value})} placeholder="Advanced" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Price</label>
                  <input type="text" required value={courseForm.price} onChange={e => setCourseForm({...courseForm, price: e.target.value})} placeholder="$199" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Course Video URL (YouTube / Embed / MP4)</label>
                <input type="text" required value={courseForm.videoUrl} onChange={e => setCourseForm({...courseForm, videoUrl: e.target.value})} placeholder="https://www.youtube.com/embed/..." className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Description</label>
                <textarea rows={3} required value={courseForm.description} onChange={e => setCourseForm({...courseForm, description: e.target.value})} placeholder="Course curriculum and learning outcomes..." className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm resize-none"></textarea>
              </div>
              <button type="submit" className="w-full py-3 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold rounded-xl text-sm shadow-md">Publish Course</button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD PRICING PLAN */}
      {newPricingModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl relative">
            <button onClick={() => setNewPricingModal(false)} className="absolute top-5 right-5 text-slate-400 hover:text-slate-750">✕</button>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Add Pricing Plan</h3>
            <p className="text-xs text-slate-500 mb-6">Create a new pricing tier for the public website.</p>

            <form onSubmit={handleAddPricing} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Plan Name</label>
                <input type="text" required value={pricingForm.name} onChange={e => setPricingForm({...pricingForm, name: e.target.value})} placeholder="Growth Pro" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Tagline</label>
                <input type="text" required value={pricingForm.tagline} onChange={e => setPricingForm({...pricingForm, tagline: e.target.value})} placeholder="For scaling tech companies." className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">🇵🇰 Pakistan Price (PKR)</label>
                  <input type="text" required value={pricingForm.pricePk} onChange={e => setPricingForm({...pricingForm, pricePk: e.target.value})} placeholder="PKR 30,000" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">🌎 International Price ($)</label>
                  <input type="text" required value={pricingForm.priceInt} onChange={e => setPricingForm({...pricingForm, priceInt: e.target.value})} placeholder="$300" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Features (comma-separated)</label>
                <input type="text" required value={pricingForm.features} onChange={e => setPricingForm({...pricingForm, features: e.target.value})} placeholder="Custom AI Agents, Dedicated Dev, Priority Support" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm" />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="popularCheck" checked={pricingForm.popular} onChange={e => setPricingForm({...pricingForm, popular: e.target.checked})} className="w-4 h-4 text-blue-600 rounded border-slate-300" />
                <label htmlFor="popularCheck" className="text-xs font-bold text-slate-700">Mark as Most Popular Choice</label>
              </div>
              <button type="submit" className="w-full py-3 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold rounded-xl text-sm shadow-md">Add Pricing Plan</button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT PRICING PLAN */}
      {editingPricing && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl relative">
            <button onClick={() => setEditingPricing(null)} className="absolute top-5 right-5 text-slate-400 hover:text-slate-750">✕</button>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Edit Pricing Plan</h3>
            <p className="text-xs text-slate-500 mb-6">Update pricing tier details.</p>

            <form onSubmit={handleUpdatePricing} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Plan Name</label>
                <input type="text" required value={editingPricing.name} onChange={e => setEditingPricing({...editingPricing, name: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Tagline</label>
                <input type="text" required value={editingPricing.tagline} onChange={e => setEditingPricing({...editingPricing, tagline: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">🇵🇰 Pakistan Price (PKR)</label>
                  <input type="text" required value={editingPricing.pricePk || ''} onChange={e => setEditingPricing({...editingPricing, pricePk: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">🌎 International Price ($)</label>
                  <input type="text" required value={editingPricing.priceInt || editingPricing.price || ''} onChange={e => setEditingPricing({...editingPricing, priceInt: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Features (comma-separated)</label>
                <input type="text" required value={editingPricing.features} onChange={e => setEditingPricing({...editingPricing, features: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm" />
              </div>
              <button type="submit" className="w-full py-3 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold rounded-xl text-sm shadow-md">Save Changes</button>
            </form>
          </div>
        </div>
      )}



      {/* MODAL: EDIT INTERNSHIP */}
      {editingInternship && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl relative">
            <button onClick={() => setEditingInternship(null)} className="absolute top-5 right-5 text-slate-400 hover:text-slate-750">✕</button>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Edit Internship Track</h3>
            <p className="text-xs text-slate-500 mb-6">Update student internship track details.</p>

            <form onSubmit={handleUpdateInternship} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Internship Title</label>
                <input type="text" required value={editingInternship.title} onChange={e => setEditingInternship({...editingInternship, title: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Department</label>
                  <input type="text" required value={editingInternship.department} onChange={e => setEditingInternship({...editingInternship, department: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Duration & Stipend</label>
                  <input type="text" required value={editingInternship.stipend} onChange={e => setEditingInternship({...editingInternship, stipend: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Requirements</label>
                <input type="text" required value={editingInternship.requirements} onChange={e => setEditingInternship({...editingInternship, requirements: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Description</label>
                <textarea rows={3} required value={editingInternship.description} onChange={e => setEditingInternship({...editingInternship, description: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm resize-none"></textarea>
              </div>
              <button type="submit" className="w-full py-3 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold rounded-xl text-sm shadow-md">Save Changes</button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT COURSE */}
      {editingCourse && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl relative">
            <button onClick={() => setEditingCourse(null)} className="absolute top-5 right-5 text-slate-400 hover:text-slate-750">✕</button>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Edit Online Course</h3>
            <p className="text-xs text-slate-500 mb-6">Update academy course details.</p>

            <form onSubmit={handleUpdateCourse} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Course Title</label>
                <input type="text" required value={editingCourse.title} onChange={e => setEditingCourse({...editingCourse, title: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Category</label>
                  <input type="text" required value={editingCourse.category} onChange={e => setEditingCourse({...editingCourse, category: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Level</label>
                  <input type="text" required value={editingCourse.level} onChange={e => setEditingCourse({...editingCourse, level: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Price</label>
                  <input type="text" required value={editingCourse.price} onChange={e => setEditingCourse({...editingCourse, price: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Course Video URL</label>
                <input type="text" required value={editingCourse.videoUrl || ''} onChange={e => setEditingCourse({...editingCourse, videoUrl: e.target.value})} placeholder="https://www.youtube.com/embed/..." className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Description</label>
                <textarea rows={3} required value={editingCourse.description} onChange={e => setEditingCourse({...editingCourse, description: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm resize-none"></textarea>
              </div>
              <button type="submit" className="w-full py-3 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold rounded-xl text-sm shadow-md">Save Changes</button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD TESTIMONIAL & WHATSAPP CHAT PROOF */}
      {newTestimonialModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl relative">
            <button onClick={() => setNewTestimonialModal(false)} className="absolute top-5 right-5 text-slate-400 hover:text-slate-750">✕</button>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Upload WhatsApp Chat Proof</h3>
            <p className="text-xs text-slate-500 mb-6">Select a WhatsApp chat conversation screenshot from your computer. Only the image is required.</p>

            <form onSubmit={handleAddTestimonial} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">WhatsApp Chat Screenshot (Required)</label>
                <input 
                  type="file" 
                  accept="image/*" 
                  required
                  onChange={e => handleFileUpload(e, 'whatsappChatImage')} 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs file:mr-4 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 cursor-pointer bg-slate-50" 
                />
                {testimonialForm.whatsappChatImage && (
                  <div className="mt-3 rounded-xl overflow-hidden border border-emerald-200 h-40 bg-slate-900 flex items-center justify-center relative">
                    <img src={testimonialForm.whatsappChatImage} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-emerald-900/30 flex items-center justify-center text-white text-xs font-bold">
                      ✓ Image Loaded Successfully
                    </div>
                  </div>
                )}
              </div>

              <button 
                type="submit" 
                disabled={!testimonialForm.whatsappChatImage}
                className="w-full py-3.5 bg-[#2563EB] hover:bg-blue-700 disabled:opacity-50 text-white font-semibold rounded-xl text-sm shadow-md transition-colors"
              >
                Upload & Publish Testimonial
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT TESTIMONIAL */}
      {editingTestimonial && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl relative">
            <button onClick={() => setEditingTestimonial(null)} className="absolute top-5 right-5 text-slate-400 hover:text-slate-750">✕</button>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Update WhatsApp Chat Proof</h3>
            <p className="text-xs text-slate-500 mb-6">Update the WhatsApp chat conversation screenshot.</p>

            <form onSubmit={handleUpdateTestimonial} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">New WhatsApp Chat Screenshot</label>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={e => handleFileUpload(e, 'whatsappChatImage', true)} 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs file:mr-4 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 cursor-pointer bg-slate-50" 
                />
                {editingTestimonial.whatsappChatImage && (
                  <div className="mt-3 rounded-xl overflow-hidden border border-emerald-200 h-40 bg-slate-900 flex items-center justify-center relative">
                    <img src={editingTestimonial.whatsappChatImage} alt="Current Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-emerald-900/30 flex items-center justify-center text-white text-xs font-bold">
                      ✓ Current Image Loaded
                    </div>
                  </div>
                )}
              </div>

              <button 
                type="submit" 
                className="w-full py-3.5 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold rounded-xl text-sm shadow-md transition-colors"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Image Cropper Modal */}
      {cropperImage && (
        <ImageCropperModal
          imageSrc={cropperImage}
          onCropComplete={handleCropComplete}
          onClose={() => setCropperImage(null)}
        />
      )}

    </div>
  );
}
