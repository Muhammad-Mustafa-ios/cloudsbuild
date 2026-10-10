import React from 'react';
import { BookOpen, Video, Users, CheckCircle, ArrowRight, Play } from 'lucide-react';
import { ScrollReveal } from '../ScrollReveal';

interface CoursesSectionProps {
  courses: any[];
  onRefreshData: () => void;
  currentUser: any;
  onOpenTraining: (course: any) => void;
}

export function CoursesSection({ courses, onRefreshData, currentUser, onOpenTraining }: CoursesSectionProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses && courses.length > 0 ? (
          courses.map((course, index) => (
            <ScrollReveal key={course.id || index} direction={index % 2 === 0 ? 'left' : 'right'} delay={index * 0.1}>
              <div className="glass-card-light dark:glass-card p-6 flex flex-col justify-between h-full group hover:shadow-2xl transition-all">
                <div>
                  <div className="relative h-48 rounded-xl overflow-hidden mb-4">
                    <img src={course.imageUrl || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800'} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                      <span className="text-xs font-bold text-white bg-blue-600/90 px-3 py-1 rounded-full">{course.category || 'Masterclass'}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">{course.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">{course.description}</p>
                </div>
                <button
                  onClick={() => onOpenTraining(course)}
                  className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-all cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current" /> Watch Masterclass
                </button>
              </div>
            </ScrollReveal>
          ))
        ) : (
          <div className="col-span-3 text-center py-12 text-slate-500">
            No courses available at the moment.
          </div>
        )}
      </div>
    </div>
  );
}
