import React from 'react';
import { ArrowLeft, Award } from 'lucide-react';
import { InternshipsSection } from './InternshipsSection';

interface InternshipsPageProps {
  internships: any[];
  onRefreshData: () => void;
  currentUser: any;
  onBackToHome: () => void;
  onOpenContact: () => void;
}

export function InternshipsPage({ internships, onRefreshData, currentUser, onBackToHome, onOpenContact }: InternshipsPageProps) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-16">
      {/* Top Breadcrumb Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-xl transition-all mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>
        
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" /> Career Launchpad
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Student Internship Programs
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Gain verified industry experience working on enterprise client projects at CloudsBuilt. Mentored by senior software architects and AI engineers.
            </p>
          </div>
        </div>
      </div>

      {/* Internships List */}
      <InternshipsSection
        internships={internships}
        onRefreshData={onRefreshData}
        currentUser={currentUser}
      />
    </div>
  );
}
