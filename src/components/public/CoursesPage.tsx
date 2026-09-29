import React from 'react';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { CoursesSection } from './CoursesSection';

interface CoursesPageProps {
  courses: any[];
  onRefreshData: () => void;
  currentUser: any;
  onOpenTraining: (course: any) => void;
  onBackToHome: () => void;
}

export function CoursesPage({ courses, onRefreshData, currentUser, onOpenTraining, onBackToHome }: CoursesPageProps) {
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
        
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/30 text-blue-200 text-xs font-semibold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" /> Professional Academy
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Masterclass Online Courses
            </h1>
            <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
              Upskill with industry-tested bootcamps, full-stack web development, and AI automation masterclasses taught by top engineering leaders.
            </p>
          </div>
        </div>
      </div>

      {/* Courses List */}
      <CoursesSection
        courses={courses}
        onRefreshData={onRefreshData}
        currentUser={currentUser}
        onOpenTraining={onOpenTraining}
      />
    </div>
  );
}
