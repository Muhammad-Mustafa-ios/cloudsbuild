import React from 'react';

export function WhatsAppToggle() {
  const whatsappUrl = "https://wa.me/923429339057?text=Hello%20CloudsBuilt,%20I%20would%20like%20to%20discuss%20a%20project.";

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-2xl flex items-center justify-center hover:scale-110 transition-all duration-300 group relative"
        aria-label="Chat on WhatsApp (+923429339057)"
        title="Chat with us on WhatsApp (+923429339057)"
      >
        <svg className="w-8 h-8 fill-white" viewBox="0 0 24 24">
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01C17.18 3.03 14.69 2 12.04 2zm5.75 14.19c-.24.67-1.4 1.28-1.93 1.36-.5.08-1.14.12-3.84-.98-1.47-.61-2.42-2.1-2.49-2.2-.07-.1-1.2-1.6-1.2-3.05 0-1.45.76-2.16 1.03-2.45.27-.29.59-.36.79-.36.2 0 .4 0 .58.01.19.01.44-.07.69.53.25.6.85 2.08.93 2.23.08.15.13.33.03.53-.1.2-.15.33-.3.5-.15.17-.32.38-.46.51-.15.15-.31.31-.13.61.18.3 0.8 1.32 1.72 2.14 1.18 1.05 2.18 1.38 2.48 1.53.3.15.48.13.66-.08.18-.21.78-.91.99-1.22.21-.31.42-.26.7-.16.28.1 1.78.84 2.08.99.3.15.5.23.57.35.07.12.07.7-.17 1.37z" />
        </svg>
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-700 rounded-full border-2 border-white animate-ping"></span>
      </a>
    </div>
  );
}
