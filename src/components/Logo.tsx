import React from 'react';
import logoImg from '../assets/images/Untitled_design__2_-removebg-preview.png';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  showText?: boolean;
}

export function Logo({ className = '', size = 'md', showSubtitle = false, showText = true }: LogoProps) {
  const iconSizes = {
    sm: 'w-16 h-16 sm:w-20 sm:h-20',
    md: 'w-20 h-20 sm:w-24 sm:h-24',
    lg: 'w-28 h-28 sm:w-36 sm:h-36'
  };

  const textSizes = {
    sm: 'text-xl sm:text-2xl',
    md: 'text-3xl sm:text-4xl',
    lg: 'text-4xl sm:text-5xl'
  };

  return (
    <div className={`flex items-center gap-3.5 sm:gap-4 ${className}`}>
      {/* CloudsBuilt Logo Image */}
      <div className={`${iconSizes[size]} relative flex items-center justify-center shrink-0`}>
        <img 
          src={logoImg} 
          alt="CloudsBuild Logo" 
          className="w-full h-full object-contain drop-shadow-sm"
        />
      </div>

      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col justify-center">
          <span className={`font-extrabold tracking-tight ${textSizes[size]} leading-none flex items-center`}>
            <span className="text-[#0F172A]">Clouds</span><span className="text-[#2563EB]">Build</span>
          </span>
        </div>
      )}
    </div>
  );
}

