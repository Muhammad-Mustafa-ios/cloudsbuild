import React, { useState, useEffect } from 'react';
import { Play, Pause, CheckCircle2, Clock, Award, ShieldCheck, X, Film } from 'lucide-react';

interface VideoTrainingModalProps {
  item: {
    id: string;
    title: string;
    category?: string;
    description: string;
    duration?: string;
  };
  type: 'internship' | 'course';
  onClose: () => void;
  onComplete: (id: string) => void;
}

export function VideoTrainingModal({ item, type, onClose, onComplete }: VideoTrainingModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const totalDuration = 30; // 30 seconds training video length simulation
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isPlaying && !completed) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          const next = prev + 1;
          if (next >= totalDuration) {
            setCompleted(true);
            setIsPlaying(false);
            onComplete(item.id);
            // Notify backend completion
            fetch(`/api/course-enroll/${item.id}/complete`, { method: 'PUT' }).catch(() => {});
          }
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, completed, item.id]);

  const progressPercent = Math.min(100, Math.round((currentTime / totalDuration) * 100));

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remSecs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 bg-[#0F172A] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold">
              <Film className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-blue-400 font-bold block">
                CloudsBuilt Studio Uploaded Video
              </span>
              <h3 className="text-xl font-bold text-white">{item.title}</h3>
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
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Custom Sam Stack Studio Video Player */}
          <div className="relative aspect-video rounded-2xl bg-slate-900 overflow-hidden flex flex-col items-center justify-center shadow-lg group border border-slate-800">
            {/* Video Simulated Stage */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 p-8 text-center">
              <div className="w-20 h-20 rounded-full bg-blue-600/30 border-2 border-blue-500/50 flex items-center justify-center mb-4 text-blue-400 animate-pulse">
                <Film className="w-10 h-10" />
              </div>
              <h4 className="text-white font-extrabold text-xl mb-2">{item.title}</h4>
              <p className="text-blue-300 text-xs font-semibold tracking-wider uppercase mb-1">
                CloudsBuilt High-Definition Lecture
              </p>
              <p className="text-slate-400 text-xs max-w-md">
                {completed ? '🎉 Video successfully finished! Your progress is updated to 100%.' : (isPlaying ? 'Playing official CloudsBuilt recording...' : 'Click play below to begin watching.')}
              </p>
            </div>

            {/* Video Player Controls Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-4 flex flex-col gap-2 z-10">
              {/* Scrubber Bar */}
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden cursor-pointer">
                <div 
                  className="bg-blue-500 h-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-300">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center justify-center transition-colors shadow-md"
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
                  </button>
                  <span className="font-mono font-semibold text-white">
                    {formatTime(currentTime)} / {formatTime(totalDuration)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-slate-800 text-blue-400 font-bold">
                    {completed ? '100% Complete' : `${progressPercent}% Watched`}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Status & Progress Card */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between text-sm font-semibold">
              <span className="text-slate-700 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" /> Watch Progress: {currentTime}s / {totalDuration}s
              </span>
              <span className={`${completed ? 'text-emerald-600 font-bold' : 'text-blue-600'}`}>
                {completed ? '✓ Verified Complete & Synced with Dashboard!' : `${progressPercent}% Completed`}
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 ${completed ? 'bg-emerald-500' : 'bg-blue-600'}`}
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            {completed && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>
                  CloudsBuilt Studio video training successfully completed! Your status has been automatically updated in the admin dashboard. You are now eligible for your verified certificate.
                </span>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Module Description:</h4>
            <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-slate-100">
            {!completed && (
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2"
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
                {isPlaying ? 'Pause Video' : 'Play CloudsBuilt Video'}
              </button>
            )}
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm"
            >
              Close
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
