import React, { useState } from 'react';
import { BookOpen, Star, Users, Clock, CheckCircle2, ArrowRight, User, Mail, Phone, Send, X, Play } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  category: string;
  level: string;
  duration: string;
  price: string;
  rating: number;
  studentsCount: number;
  description: string;
  image: string;
  videoUrl?: string;
}

interface CoursesSectionProps {
  courses: Course[];
  onRefreshData: () => void;
  currentUser?: any;
  onOpenTraining: (course: Course) => void;
}

export function CoursesSection({ courses, onRefreshData, currentUser, onOpenTraining }: CoursesSectionProps) {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: '',
    experienceLevel: 'Beginner'
  });

  const handleOpenModal = (course: Course) => {
    setSelectedCourse(course);
    setModalOpen(true);
    setSuccessMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourse) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/course-enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId: selectedCourse.id,
          courseTitle: selectedCourse.title,
          ...formData
        })
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMessage('Successfully enrolled! Registration is complete, you can now watch course videos.');
        setFormData({ name: '', email: '', phone: '', experienceLevel: 'Beginner' });
        onRefreshData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="courses" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-4">
            <BookOpen className="w-3.5 h-3.5" /> Professional Online Academy
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Master Cutting-Edge Tech Skills With Expert-Led Courses
          </h2>
          <p className="text-lg text-slate-600">
            Upskill with industry-tested bootcamps and masterclasses taught by senior engineers at CloudsBuilt.
          </p>
        </div>

        {courses.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
            <p className="text-slate-500">No courses available right now.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div 
                key={course.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <img 
                      src={course.image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"} 
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {course.category}
                    </div>
                    <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                      {course.price}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 mb-3">
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-blue-600" /> {course.duration}</span>
                      <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> {course.rating}</span>
                      <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-slate-500" /> {course.studentsCount} Enrolled</span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
                      {course.title}
                    </h3>

                    <p className="text-slate-600 text-sm mb-6 line-clamp-2">
                      {course.description}
                    </p>

                    <div className="flex items-center justify-between text-xs font-semibold text-slate-700 bg-slate-50 px-3 py-2 rounded-lg mb-6">
                      <span>Level: <span className="text-blue-600">{course.level}</span></span>
                      <span>Certificate Included</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 space-y-2">
                  <button
                    onClick={() => {
                      if (!currentUser) {
                        alert('Please sign in and enroll in this course first to access training videos.');
                        handleOpenModal(course);
                      } else {
                        onOpenTraining(course);
                      }
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-sm transition-all border border-blue-200 shadow-sm"
                    title="Available after enrollment"
                  >
                    <Play className="w-4 h-4 fill-blue-600 text-blue-600" /> Watch Videos (Enrolled Only)
                  </button>
                  <button
                    onClick={() => handleOpenModal(course)}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-semibold text-sm transition-all shadow-md"
                  >
                    Enroll Now <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Enrollment Modal */}
      {modalOpen && selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-8 shadow-2xl relative my-8">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-750 p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Course Enrollment</span>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">{selectedCourse.title}</h3>
              <p className="text-xs text-slate-500 mt-1">Enroll to unlock full video library and certification.</p>
            </div>

            {successMessage ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 rounded-xl text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-lg">Enrollment Successful!</h4>
                <p className="text-sm text-emerald-700">{successMessage}</p>
                <button
                  onClick={() => {
                    setModalOpen(false);
                    onOpenTraining(selectedCourse);
                  }}
                  className="mt-4 px-6 py-2.5 bg-emerald-600 text-white font-semibold rounded-lg text-sm shadow-md flex items-center justify-center gap-2 mx-auto"
                >
                  <Play className="w-4 h-4 fill-white" /> Watch Videos Now
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
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Experience Level</label>
                  <select
                    value={formData.experienceLevel}
                    onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-600 bg-slate-50/50"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
                >
                  {submitting ? 'Enrolling...' : 'Confirm Enrollment'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
