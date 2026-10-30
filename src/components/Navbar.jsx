import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  MessageSquare, 
  Menu, 
  X, 
  MapPin, 
  Clock, 
  ChevronRight,
  Navigation,
  Heart,
  Bookmark,
  Check
} from 'lucide-react';
import { useHospitalData } from '../context/HospitalContext.jsx';
import { HospitalLogo } from './HospitalLogo.jsx';
import { downloadHospitalContactCard } from '../utils/hospitalActions.js';

export const Navbar = () => {
  const { data } = useHospitalData();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const [likesCount, setLikesCount] = useState(1482);
  const [isLiked, setIsLiked] = useState(false);
  const [isRemembered, setIsRemembered] = useState(false);

  useEffect(() => {
    try {
      const storedLiked = localStorage.getItem('masaraddi_liked') === 'true';
      const storedCount = parseInt(localStorage.getItem('masaraddi_likes_count') || '1482', 10);
      const storedRemembered = localStorage.getItem('masaraddi_remembered') === 'true';

      setIsLiked(storedLiked);
      setLikesCount(storedLiked ? Math.max(1482, storedCount) : 1482);
      setIsRemembered(storedRemembered);
    } catch {}
  }, []);

  const handleLikeToggle = () => {
    const nextState = !isLiked;
    const nextCount = nextState ? likesCount + 1 : Math.max(1482, likesCount - 1);

    setIsLiked(nextState);
    setLikesCount(nextCount);

    try {
      localStorage.setItem('masaraddi_liked', String(nextState));
      localStorage.setItem('masaraddi_likes_count', String(nextCount));
    } catch {}
  };

  const handleRememberUs = () => {
    setIsRemembered(true);
    try {
      localStorage.setItem('masaraddi_remembered', 'true');
    } catch {}
    downloadHospitalContactCard();
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);

      // Section intersection detection
      const sections = ['home', 'services', 'doctors', 'facilities', 'official-posters', 'gallery', 'service-area', 'faq', 'contact'];
      const scrollPos = window.scrollY + 140;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll cleanly when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Handle ESC key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'Services', href: '#services', id: 'services' },
    { name: 'Doctors', href: '#doctors', id: 'doctors' },
    { name: 'Facilities', href: '#facilities', id: 'facilities' },
    { name: 'Guides', href: '#official-posters', id: 'official-posters' },
    { name: 'Gallery', href: '#gallery', id: 'gallery' },
    { name: 'Service Area', href: '#service-area', id: 'service-area' },
    { name: 'FAQ', href: '#faq', id: 'faq' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (href) => {
    // 1. Immediately close mobile menu and unlock scroll
    setMobileMenuOpen(false);
    document.body.style.overflow = '';

    // 2. Perform smooth scroll with header offset
    const targetId = href.replace('#', '');
    requestAnimationFrame(() => {
      setTimeout(() => {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          const navHeight = 82;
          const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = Math.max(0, elementPosition - navHeight);

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 40);
    });
  };

  const googleMapsUrl = data?.contact?.googleMapsDirectionsUrl || "https://share.google/kY37dzPJA6qIplc1D";

  return (
    <header className="fixed top-0 inset-x-0 z-50 font-sans">
      {/* 1. Clinical Top Utility Strip (Desktop only pre-header) */}
      <div 
        className={`hidden lg:block transition-all duration-300 bg-[#050A14]/90 backdrop-blur-md border-b border-white/[0.08] ${
          isScrolled ? 'h-0 opacity-0 overflow-hidden py-0 border-none' : 'py-1.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between text-[11px] text-slate-300">
            
            {/* Left: Live Status & OPD Hours */}
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1.5 font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-emerald-400 font-semibold tracking-wide">24/7 Acute Neuro Emergency &amp; ICU</span>
              </span>

              <span className="text-slate-700">|</span>

              <div className="flex items-center gap-1.5 text-slate-300">
                <Clock className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>OPD Hours: <strong className="text-white font-semibold">{data?.contact?.timings?.opd || '10:00 AM – 4:00 PM & 6:00 PM – 8:00 PM'}</strong></span>
              </div>
            </div>

            {/* Right: Verified Landmark, Map Link & Direct Phone */}
            <div className="flex items-center gap-4">
              <a 
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-slate-300 hover:text-sky-300 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>Godi Layout, near Rotary Circle, beside Kailash- In Hotel, Bagalkot</span>
              </a>

              <span className="text-slate-700">|</span>

              <a 
                href={`tel:${data?.contact?.phone || '+918354220000'}`}
                className="font-bold text-white hover:text-sky-300 transition-colors flex items-center gap-1"
              >
                <Phone className="w-3 h-3 text-sky-400" />
                <span>{data?.contact?.phoneDisplay || '+91 8354 220000'}</span>
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* 2. Main Glossy Glass Navigation Bar */}
      <div 
        className={`w-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#080E1A]/88 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.55),inset_0_1px_1.5px_rgba(255,255,255,0.22)] border-b border-white/15 py-2.5 sm:py-3' 
            : 'bg-[#080E1A]/72 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.18)] border-b border-white/10 py-3.5 sm:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Logo and Brand Identity */}
            <a 
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#home');
              }}
              className="flex items-center gap-2.5 sm:gap-3 group shrink-0"
              aria-label="Masaraddi Neuro Care Center Home"
            >
              <div className="relative">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full p-0.5 bg-gradient-to-tr from-sky-400/40 via-blue-500/20 to-transparent ring-1 ring-white/25 shadow-md shadow-sky-950/40 group-hover:ring-sky-400/60 transition-all duration-300">
                  <HospitalLogo className="w-full h-full object-contain" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-[#080E1A] shadow-xs" title="24/7 Emergency Active" />
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-base sm:text-lg tracking-tight text-white group-hover:text-sky-200 transition-colors uppercase font-outfit">
                    Masaraddi
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-bold text-sky-300 bg-sky-950/90 px-1.5 py-0.5 rounded border border-sky-400/40 uppercase tracking-wider">
                    Neuro Care
                  </span>
                </div>
                <span className="text-[10px] sm:text-[11px] text-slate-300 group-hover:text-slate-200 transition-colors font-medium">
                  Bagalkot &bull; Dr. Shivkumar Masaraddi
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5" aria-label="Main Navigation">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className={`relative px-3 py-1.5 text-xs font-semibold rounded-xl transition-all duration-200 ${
                      isActive
                        ? 'text-white bg-white/[0.12] shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)] ring-1 ring-sky-400/50'
                        : 'text-slate-200 hover:text-white hover:bg-white/[0.08]'
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-gradient-to-r from-sky-400 to-blue-400 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.9)]" />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Desktop Action Buttons */}
            <div className="hidden sm:flex items-center gap-2 shrink-0">
              {/* Remember Us Button */}
              <button
                type="button"
                onClick={handleRememberUs}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer border ${
                  isRemembered
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40 shadow-xs'
                    : 'bg-white/[0.08] hover:bg-white/[0.14] text-slate-200 border-white/15'
                }`}
                title="Save hospital contact card directly to your phone/device"
              >
                {isRemembered ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Saved</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-3.5 h-3.5 text-sky-400" />
                    <span>Remember</span>
                  </>
                )}
              </button>

              {/* Like Button */}
              <button
                type="button"
                onClick={handleLikeToggle}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer border ${
                  isLiked
                    ? 'bg-rose-500/20 text-rose-300 border-rose-400/50 shadow-xs'
                    : 'bg-white/[0.08] hover:bg-white/[0.14] text-slate-200 border-white/15'
                }`}
                title="Like Masaraddi Neuro Care Center"
              >
                <Heart 
                  className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-400 text-rose-400' : 'text-slate-300'}`} 
                />
                <span className="text-[11px] font-mono">{likesCount.toLocaleString()}</span>
              </button>

              <a
                href={`https://wa.me/${data?.contact?.whatsappNumber || '919448000000'}?text=${encodeURIComponent(
                  data?.contact?.whatsappMessage || 'Hello, I am contacting Masaraddi Neuro Care Center to schedule a consultation.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-400/35 transition-all duration-200 hover:border-emerald-400/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] hover:shadow-emerald-500/20 active:scale-95"
                title="Chat with Hospital Desk on WhatsApp"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>WhatsApp</span>
              </a>

              <a
                href={`tel:${data?.contact?.phone || '+918354220000'}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-lg shadow-sky-950/50 border border-sky-300/40 transition-all duration-200 hover:shadow-sky-500/30 active:scale-95"
                title="Call Masaraddi Neuro Care Center"
              >
                <Phone className="w-3.5 h-3.5 shrink-0" />
                <span>Call Hospital</span>
              </a>
            </div>

            {/* Mobile Actions & Dedicated Hamburger Toggle Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <a
                href={`tel:${data?.contact?.phone || '+918354220000'}`}
                className="flex items-center gap-1.5 px-3 py-2 min-h-[44px] rounded-xl bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 text-white text-xs font-bold border border-sky-300/40 shadow-md shadow-sky-950/40 active:scale-95 transition-all"
                aria-label="Call Hospital"
              >
                <Phone className="w-3.5 h-3.5 text-white" />
                <span className="text-[12px]">Call</span>
              </a>

              {/* Hamburger Toggle Button: Responsive & Reliable Toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className={`min-w-[44px] min-h-[44px] p-2.5 rounded-xl border flex items-center justify-center transition-all cursor-pointer focus:outline-none active:scale-90 ${
                  mobileMenuOpen
                    ? 'bg-sky-500 text-white border-sky-300 shadow-lg shadow-sky-500/30 ring-2 ring-sky-400/50'
                    : 'bg-white/[0.08] hover:bg-white/[0.16] border-white/20 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)]'
                }`}
                aria-expanded={mobileMenuOpen}
                aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-white animate-in spin-in-90 duration-200" />
                ) : (
                  <Menu className="w-5 h-5 text-slate-100" />
                )}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* 3. Mobile Navigation Clean Drawer (Essential Links Only) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end">
          {/* Backdrop with dark blur */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-200"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Sheet with Water-Glass & Clean Smooth Scrolling */}
          <div className="relative z-10 w-full bg-[#080E1A]/95 backdrop-blur-2xl border-t border-white/20 rounded-t-3xl shadow-[0_-16px_60px_rgba(0,0,0,0.9),inset_0_1px_1.5px_rgba(255,255,255,0.28)] max-h-[82vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-250">
            {/* Top Sheen */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 glossy-sheen" />

            {/* Drawer Header with Hospital Branding & Close Button */}
            <div className="relative px-5 py-3.5 border-b border-white/[0.1] flex items-center justify-between bg-[#050A14]/75 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full p-0.5 bg-gradient-to-tr from-sky-400/30 to-blue-500/20 ring-1 ring-white/20">
                  <HospitalLogo className="w-full h-full object-contain" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-extrabold text-white uppercase tracking-tight">Masaraddi</span>
                    <span className="text-[10px] font-bold text-sky-300 bg-sky-950/80 px-1.5 py-0.5 rounded border border-sky-400/40">Neuro Care</span>
                  </div>
                  <span className="text-[11px] text-slate-300 block font-medium">Bagalkot &bull; Dr. Shivkumar Masaraddi</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl bg-white/[0.08] hover:bg-white/[0.16] border border-white/15 text-slate-200 hover:text-white transition-all active:scale-90 cursor-pointer shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
                aria-label="Close menu"
              >
                <X className="w-5 h-5 text-sky-400" />
              </button>
            </div>

            {/* Emergency Status Strip in Drawer */}
            <div className="px-5 py-2 bg-emerald-950/60 border-b border-emerald-500/25 flex items-center justify-between text-xs">
              <span className="inline-flex items-center gap-1.5 text-emerald-300 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400/80" />
                24/7 Acute Neuro Emergency
              </span>
              <span className="text-slate-300 font-mono text-[11px] bg-emerald-900/50 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">7 ICU Beds</span>
            </div>

            {/* Scrollable Navigation Area: 8 Essential Navigation Items ONLY */}
            <div className="px-4 py-4 overflow-y-auto flex-1 space-y-3.5 overscroll-contain">
              {/* Primary 8 Navigation Links */}
              <nav className="grid grid-cols-2 gap-2" aria-label="Mobile Navigation">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <button
                      key={link.name}
                      type="button"
                      onClick={() => handleNavClick(link.href)}
                      className={`min-h-[48px] w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer text-left ${
                        isActive
                          ? 'bg-sky-500/30 text-white border border-sky-400/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)] ring-1 ring-sky-400/30'
                          : 'bg-white/[0.05] text-slate-200 hover:text-white hover:bg-white/[0.1] border border-white/[0.08] active:scale-[0.98]'
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-sky-300' : 'text-slate-500'}`} />
                    </button>
                  );
                })}
              </nav>

              {/* Exact Location & Directions Card */}
              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.1] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] space-y-2.5">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <p className="font-bold text-white">Hospital Location</p>
                    <p className="text-slate-300 text-[11px] leading-snug mt-0.5">
                      Godi Layout, near Rotary Circle, beside Kailash- In Hotel, Bagalkot - 587101
                    </p>
                  </div>
                </div>

                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[44px] flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-sky-950/70 hover:bg-sky-900/80 text-sky-200 border border-sky-400/40 text-xs font-semibold shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] transition-all active:scale-95"
                >
                  <Navigation className="w-3.5 h-3.5 text-sky-300" />
                  <span>Open in Google Maps</span>
                </a>
              </div>

              {/* OPD Hours Note */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.07] text-[11px] text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-sky-400" />
                  <span className="font-medium">OPD Timings</span>
                </span>
                <span className="font-bold text-white">10AM–4PM &bull; 6PM–8PM</span>
              </div>
            </div>

            {/* Drawer Bottom Quick Action Bar */}
            <div className="p-4 bg-[#050A14]/90 border-t border-white/[0.1] space-y-2.5">
              {/* Remember Us & Like Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleRememberUs}
                  className={`min-h-[42px] flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                    isRemembered
                      ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40 shadow-xs'
                      : 'bg-white/[0.08] hover:bg-white/[0.14] text-slate-200 border-white/15'
                  }`}
                >
                  {isRemembered ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Saved</span>
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-3.5 h-3.5 text-sky-400" />
                      <span>Remember Us</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleLikeToggle}
                  className={`min-h-[42px] flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                    isLiked
                      ? 'bg-rose-950/80 text-rose-300 border-rose-500/50 shadow-xs'
                      : 'bg-white/[0.08] hover:bg-white/[0.14] text-slate-200 border-white/15'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-400 text-rose-400' : 'text-slate-300'}`} />
                  <span>{isLiked ? 'Liked' : 'Like'}</span>
                  <span className="text-[11px] font-mono">({likesCount.toLocaleString()})</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={`tel:${data?.contact?.phone || '+918354220000'}`}
                  className="min-h-[48px] flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold text-xs shadow-lg shadow-sky-950/50 border border-sky-300/40 active:scale-95 transition-transform"
                >
                  <Phone className="w-4 h-4 text-white" />
                  <span>Call Hospital</span>
                </a>

                <a
                  href={`https://wa.me/${data?.contact?.whatsappNumber || '919448000000'}?text=${encodeURIComponent(
                    data?.contact?.whatsappMessage || 'Hello, I am contacting Masaraddi Neuro Care Center.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[48px] flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-emerald-600/30 border border-emerald-400/40 text-emerald-200 font-bold text-xs shadow-md shadow-emerald-950/40 active:scale-95 transition-transform"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-300" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      )}
    </header>
  );
};
