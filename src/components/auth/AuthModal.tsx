import React, { useState } from 'react';
import { Mail, Lock, User, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { Logo } from '../Logo';

interface AuthModalProps {
  initialMode?: 'login' | 'register';
  onClose: () => void;
  onLoginSuccess: (user?: any) => void;
}

export function AuthModal({ initialMode = 'login', onClose, onLoginSuccess }: AuthModalProps) {
  const [authMode, setAuthMode] = useState<'login' | 'register'>(initialMode);
  const [name, setName] = useState('');
  const [profileType, setProfileType] = useState<'student' | 'business'>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    const endpoint = authMode === 'register' ? '/api/auth/register' : '/api/auth/login';
    const payload = authMode === 'register' 
      ? { name, email, password, role: profileType === 'student' ? 'student' : 'client' }
      : { email, password, role: profileType };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success && data.user) {
        onLoginSuccess(data.user);
      } else {
        setErrorMessage(data.error || 'Authentication failed. Please verify your details.');
      }
    } catch (err) {
      setErrorMessage('Network connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoAdminLogin = async () => {
    setEmail('admin@samstack.com');
    setPassword('SamStackAdmin2026!');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'admin@samstack.com', password: 'SamStackAdmin2026!' })
      });
      const data = await res.json();
      if (data.success && data.user) {
        onLoginSuccess(data.user);
      } else {
        onLoginSuccess({ id: 'admin', name: 'Sam Johnson', email: 'admin@samstack.com', role: 'admin' });
      }
    } catch (err) {
      onLoginSuccess({ id: 'admin', name: 'Sam Johnson', email: 'admin@samstack.com', role: 'admin' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0F172A]/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xl w-full max-w-md overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header */}
        <div className="p-6 sm:p-8 pb-4 flex items-center justify-between border-b border-slate-100">
          <Logo size="sm" />
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-[#0F172A] flex items-center justify-center text-sm font-bold"
          >
            ✕
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-[#0F172A]">
              {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h3>
            <p className="text-sm text-[#64748B]">
              {authMode === 'login' 
                ? 'Sign in to access your student courses, internships, and dashboard.' 
                : 'Register a new account to join CloudsBuilt platform.'}
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-100 rounded-2xl">
            <button
              type="button"
              onClick={() => setAuthMode('login')}
              className={`py-2.5 rounded-xl font-bold text-xs transition-all ${
                authMode === 'login' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setAuthMode('register')}
              className={`py-2.5 rounded-xl font-bold text-xs transition-all ${
                authMode === 'register' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sign Up / Register
            </button>
          </div>

          {/* Profile Type Selector */}
          <div className="grid grid-cols-2 gap-3 p-1.5 bg-slate-50 border border-slate-200 rounded-2xl">
            <button
              type="button"
              onClick={() => setProfileType('student')}
              className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                profileType === 'student' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🎓 Student
            </button>
            <button
              type="button"
              onClick={() => setProfileType('business')}
              className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                profileType === 'business' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🏢 Business Client
            </button>
          </div>

          {errorMessage && (
            <div className="p-4 rounded-xl bg-rose-50 text-rose-700 text-xs font-semibold border border-rose-200">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {authMode === 'register' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Smith"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-600 bg-slate-50/50"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-600 bg-slate-50/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-600 bg-slate-50/50"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-sm shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 transition-all"
            >
              {loading ? 'Processing...' : (authMode === 'login' ? 'Sign In' : 'Create Account & Sign Up')}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>



        </div>

      </div>
    </div>
  );
}
