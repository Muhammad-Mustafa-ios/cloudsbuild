import React from 'react';
import { User, Mail, Award, BookOpen, Briefcase, CheckCircle2, X, ShieldCheck } from 'lucide-react';

interface UserProfileModalProps {
  currentUser: any;
  onClose: () => void;
  dbData: any;
  onOpenTraining: (item: any, type: 'internship' | 'course') => void;
}

export function UserProfileModal({ currentUser, onClose, dbData, onOpenTraining }: UserProfileModalProps) {
  // Find user's applications & enrollments
  const userApplications = dbData.internshipApplications?.filter((app: any) => app.email === currentUser?.email) || [];
  const userEnrollments = dbData.courseEnrollments?.filter((enr: any) => enr.email === currentUser?.email) || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-md p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-900 to-blue-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-extrabold text-2xl shadow-lg">
              {currentUser?.name ? currentUser.name[0].toUpperCase() : 'U'}
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-blue-400 font-bold">Personal Student Profile</span>
              <h3 className="text-2xl font-bold text-white">{currentUser?.name || 'Student User'}</h3>
              <p className="text-xs text-slate-300">{currentUser?.email}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center font-bold"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          
          {/* Profile Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
              <span className="text-2xl font-extrabold text-blue-600 block">{userApplications.length}</span>
              <span className="text-xs font-semibold text-slate-600">Internships Applied</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
              <span className="text-2xl font-extrabold text-emerald-600 block">{userEnrollments.length}</span>
              <span className="text-xs font-semibold text-slate-600">Courses Enrolled</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center col-span-2 sm:col-span-1">
              <span className="text-2xl font-extrabold text-purple-600 block">Active</span>
              <span className="text-xs font-semibold text-slate-600">Account Status</span>
            </div>
          </div>

          {/* Enrolled Courses & Watch Videos Access */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-600" /> Enrolled Courses & Watch Videos Access
            </h4>
            {userEnrollments.length === 0 ? (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                <p className="text-xs text-slate-500">You are not enrolled in any courses yet. Browse our Online Courses section to enroll!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {userEnrollments.map((enr: any, idx: number) => {
                  const courseObj = dbData.courses.find((c: any) => c.id === enr.courseId) || { id: enr.courseId, title: enr.courseTitle, description: 'Masterclass video course', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' };
                  return (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <h5 className="font-bold text-slate-900 text-sm">{enr.courseTitle}</h5>
                        <p className="text-xs text-slate-500">Enrolled: {new Date(enr.timestamp).toLocaleDateString()} • Status: <span className="text-emerald-600 font-semibold">{enr.status}</span></p>
                      </div>
                      <button
                        onClick={() => {
                          onClose();
                          onOpenTraining(courseObj, 'course');
                        }}
                        className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md transition-all shrink-0 flex items-center gap-1.5"
                      >
                        ▶ Watch Videos & Train
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Internships & Training */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-blue-600" /> Internship Applications & Training Access
            </h4>
            {userApplications.length === 0 ? (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                <p className="text-xs text-slate-500">No internship applications submitted yet. Apply via the Internships section!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {userApplications.map((app: any, idx: number) => {
                  const intObj = dbData.internships.find((i: any) => i.id === app.internshipId) || { id: app.internshipId, title: app.internshipTitle, description: 'Internship training track', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' };
                  return (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <h5 className="font-bold text-slate-900 text-sm">{app.internshipTitle}</h5>
                        <p className="text-xs text-slate-500">Applied: {new Date(app.timestamp).toLocaleDateString()} • Status: <span className="text-blue-600 font-semibold">{app.status}</span></p>
                      </div>
                      <button
                        onClick={() => {
                          onClose();
                          onOpenTraining(intObj, 'internship');
                        }}
                        className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md transition-all shrink-0 flex items-center gap-1.5"
                      >
                        ▶ Watch Internship Videos
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm"
          >
            Close Profile
          </button>
        </div>

      </div>
    </div>
  );
}
