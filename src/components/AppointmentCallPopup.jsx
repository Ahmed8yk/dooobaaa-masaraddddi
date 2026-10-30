import React, { useState, useEffect, useCallback } from 'react';
import { Phone, CalendarCheck, MessageSquare, X, Clock, ShieldCheck, HeartPulse, ChevronRight } from 'lucide-react';
import { HospitalLogo } from './HospitalLogo.jsx';
import { useHospitalData } from '../context/HospitalContext.jsx';

export const AppointmentCallPopup = () => {
  const { data } = useHospitalData();
  const [isVisible, setIsVisible] = useState(false);
  const [hasDismissed, setHasDismissed] = useState(false);

  useEffect(() => {
    // Check if dismissed in this session
    try {
      const sessionDismissed = sessionStorage.getItem('masaraddi_popup_dismissed_session');
      if (sessionDismissed === 'true') {
        setHasDismissed(true);
        return;
      }
    } catch {
      // Storage access disabled/restricted
    }

    // Polite, prompt appearance after 2.5 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = useCallback(() => {
    setIsVisible(false);
    setHasDismissed(true);
    try {
      sessionStorage.setItem('masaraddi_popup_dismissed_session', 'true');
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Keyboard Escape listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isVisible) {
        handleDismiss();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, handleDismiss]);

  const handleBookAppointment = () => {
    handleDismiss();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const headerOffset = 80;
      const elementPosition = contactSection.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: Math.max(0, elementPosition - headerOffset),
        behavior: 'smooth'
      });

      // Focus first input field in appointment form
      setTimeout(() => {
        const input = document.getElementById('patient-name') ||
                      document.getElementById('appointment-patient-name') || 
                      document.querySelector('#contact input[type="text"]');
        if (input) {
          input.focus();
        }
      }, 500);
    }
  };

  if (!isVisible || hasDismissed) return null;

  const phone = data?.contact?.phone || '+918354220000';
  const phoneDisplay = data?.contact?.phoneDisplay || '+91 8354 220000';
  const whatsappUrl = `https://wa.me/${data?.contact?.whatsappNumber || '919448000000'}?text=${encodeURIComponent(
    'Hello, I would like to book a consultation with Dr. Shivakumar K. Masaraddi at Masaraddi Neuro Care Center.'
  )}`;

  return (
    <aside
      className="fixed bottom-[74px] sm:bottom-6 left-3 right-3 sm:left-auto sm:right-6 z-50 max-w-sm sm:max-w-md mx-auto sm:mx-0 animate-in fade-in slide-in-from-bottom-4 duration-300 font-sans"
      aria-label="Doctor Consultation & Hospital Appointment Popup"
      role="dialog"
      aria-modal="false"
    >
      <div className="relative bg-[#080E1A]/95 backdrop-blur-2xl text-white rounded-3xl p-4 sm:p-5 border border-sky-400/35 shadow-[0_20px_50px_rgba(0,0,0,0.85),inset_0_1px_1.5px_rgba(255,255,255,0.25)] overflow-hidden">
        
        {/* Subtle Top Glass Reflection */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/10 to-transparent" />

        {/* Close Button ('✕') */}
        <button
          type="button"
          onClick={handleDismiss}
          className="absolute top-3.5 right-3.5 min-w-[36px] min-h-[36px] rounded-full bg-white/10 hover:bg-white/20 active:bg-white/25 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer border border-white/10 z-10 active:scale-90"
          aria-label="Close appointment popup"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header / Doctor & Hospital Details */}
        <div className="flex items-start gap-3 sm:gap-3.5 pr-8">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-sky-500/25 to-blue-600/30 ring-1 ring-sky-400/40 p-1 shrink-0 flex items-center justify-center shadow-md">
            <HospitalLogo className="w-full h-full object-contain" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-bold uppercase tracking-wider text-sky-300 bg-sky-950/80 px-2 py-0.5 rounded-full border border-sky-400/30">
                Hospital Help Desk
              </span>
              <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Open Today
              </span>
            </div>

            <h3 className="text-sm sm:text-base font-extrabold text-white font-outfit leading-tight pt-0.5">
              Need a Neurology Consultation?
            </h3>

            <p className="text-xs text-slate-300 leading-snug">
              Consult <strong className="text-white">Dr. Shivakumar K. Masaraddi</strong> (DM Neurology) for stroke, headache, epilepsy, tremors, and nerve disorders.
            </p>
          </div>
        </div>

        {/* OPD & Emergency Timing Strip */}
        <div className="mt-3 py-1.5 px-3 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-between text-[11px] text-slate-300">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-sky-400 shrink-0" />
            <span>OPD: 10AM–4PM &bull; 6PM–8PM</span>
          </span>
          <span className="text-emerald-400 font-semibold flex items-center gap-1">
            <HeartPulse className="w-3 h-3" />
            24/7 ICU
          </span>
        </div>

        {/* Primary Action Buttons: Call Now & Book Appointment */}
        <div className="mt-3.5 grid grid-cols-2 gap-2">
          {/* 1. Call Now */}
          <a
            href={`tel:${phone}`}
            onClick={handleDismiss}
            className="min-h-[46px] flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 active:from-sky-600 active:to-blue-700 text-white font-bold text-xs shadow-md shadow-sky-950/60 border border-sky-300/40 transition-all active:scale-95 text-center cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5 text-white shrink-0" />
            <span>Call Now</span>
          </a>

          {/* 2. Book Appointment */}
          <button
            type="button"
            onClick={handleBookAppointment}
            className="min-h-[46px] flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-xs border border-emerald-400/40 shadow-md shadow-emerald-950/40 transition-all active:scale-95 text-center cursor-pointer"
          >
            <CalendarCheck className="w-3.5 h-3.5 text-white shrink-0" />
            <span>Book Appointment</span>
          </button>
        </div>

        {/* Secondary WhatsApp & Location Note */}
        <div className="mt-2.5 pt-2 border-t border-white/[0.07] flex items-center justify-between text-[11px]">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleDismiss}
            className="text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1 transition-colors"
          >
            <MessageSquare className="w-3 h-3" />
            <span>Message on WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={handleDismiss}
            className="text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
          >
            Dismiss
          </button>
        </div>

      </div>
    </aside>
  );
};
