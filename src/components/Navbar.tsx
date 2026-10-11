import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight, ChevronRight, ChevronDown } from 'lucide-react';
import { Logo } from './Logo';

interface NavbarProps {
  onNavigate: (view: 'home' | 'about' | 'services' | 'ai-automation' | 'pricing' | 'contact') => void;
  onOpenContact: () => void;
}

export function Navbar({ onNavigate, onOpenContact }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const serviceItems = [
    { name: 'Websites & Web Platforms', id: 'services' },
    { name: 'E-Commerce', id: 'services' },
    { name: 'Software & Business Systems', id: 'services' },
    { name: 'Mobile Apps', id: 'services' },
    { name: 'AI & Automation', id: 'services' },
    { name: 'Design, Support & Growth', id: 'services' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id as any);
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-2.5 px-4 sm:px-6 lg:px-8 pointer-events-none">
      <div className="w-full max-w-[94rem] mx-auto pointer-events-auto">
        <div className={`transition-all duration-300 rounded-full bg-white/90 backdrop-blur-2xl border border-white/40 shadow-xl px-6 sm:px-8 py-1.5 sm:py-2 flex items-center justify-between gap-6 hover:scale-[1.02] transition-transform duration-300 ${
          scrolled ? 'shadow-2xl py-1.5 bg-white/98' : ''
        }`}>
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('home')}
            className="cursor-pointer shrink-0 hover:scale-105 transition-transform duration-200"
          >
            <Logo size="sm" />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            <button
              onClick={() => handleNavClick('why-us')}
              className="text-sm font-semibold text-slate-700 hover:text-[#2563EB] hover:scale-105 transition-all cursor-pointer"
            >
              Why CloudsBuilt
            </button>

            {/* Services Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                onMouseEnter={() => setServicesDropdownOpen(true)}
                className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold text-slate-700 hover:text-[#2563EB] hover:bg-blue-50/50 hover:scale-105 transition-all cursor-pointer"
              >
                <span>Services</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-[#2563EB]' : 'text-slate-400'}`} />
              </button>

              {servicesDropdownOpen && (
                <div 
                  onMouseLeave={() => setServicesDropdownOpen(false)}
                  className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 py-3 px-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                >
                  {serviceItems.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleNavClick(item.id)}
                      className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-[#2563EB] hover:translate-x-1 transition-all flex items-center justify-between group"
                    >
                      <span>{item.name}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#2563EB] transition-all" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavClick('our-work')}
              className="text-sm font-semibold text-slate-700 hover:text-[#2563EB] hover:scale-105 transition-all cursor-pointer"
            >
              Our Work
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className="text-sm font-semibold text-slate-700 hover:text-[#2563EB] hover:scale-105 transition-all cursor-pointer"
            >
              Contact
            </button>
          </nav>

          {/* Right Side Actions: Talk to Us */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenContact}
              className="px-6 py-2.5 rounded-full bg-[#2563EB] hover:bg-blue-700 text-white text-sm font-bold shadow-md shadow-blue-500/25 hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center gap-2 cursor-pointer"
            >
              Talk to us
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full bg-slate-100 text-slate-800 hover:scale-105 transition-transform"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-4 right-4 mt-2 bg-white rounded-3xl shadow-2xl border border-slate-200 py-6 px-6 pointer-events-auto animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('why-us')}
              className="py-3 px-4 rounded-xl text-left text-base font-semibold text-slate-800 hover:bg-blue-50 hover:text-[#2563EB]"
            >
              Why CloudsBuilt
            </button>
            <div className="py-2 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Services</div>
            {serviceItems.map((item, i) => (
              <button
                key={i}
                onClick={() => handleNavClick(item.id)}
                className="py-2.5 pl-6 pr-4 rounded-xl text-left text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-[#2563EB]"
              >
                • {item.name}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('our-work')}
              className="py-3 px-4 rounded-xl text-left text-base font-semibold text-slate-800 hover:bg-blue-50 hover:text-[#2563EB]"
            >
              Our Work
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="py-3 px-4 rounded-xl text-left text-base font-semibold text-slate-800 hover:bg-blue-50 hover:text-[#2563EB]"
            >
              Contact
            </button>
            <div className="pt-4 mt-2 border-t border-slate-100">
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenContact(); }}
                className="w-full py-3 rounded-full bg-[#2563EB] text-white font-bold text-center flex items-center justify-center gap-2 shadow-md hover:scale-105 transition-transform"
              >
                Talk to us <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}



