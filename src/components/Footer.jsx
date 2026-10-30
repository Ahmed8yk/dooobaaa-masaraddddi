import React from 'react';
import { 
  Phone, 
  MapPin, 
  Mail, 
  MessageSquare, 
  Clock, 
  ChevronRight,
  ShieldCheck,
  HeartPulse,
  Navigation,
  CheckCircle2,
  FileText,
  AlertTriangle,
  Cookie,
  CalendarClock,
  Building2
} from 'lucide-react';
import { useHospitalData } from '../context/HospitalContext.jsx';
import { HospitalLogo } from './HospitalLogo.jsx';

export const Footer = ({ onOpenLegal }) => {
  const { data } = useHospitalData();
  const currentYear = new Date().getFullYear();
  const googleMapsUrl = data?.contact?.googleMapsDirectionsUrl || "https://share.google/kY37dzPJA6qIplc1D";

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Doctors', href: '#doctors' },
    { name: 'Facilities', href: '#facilities' },
    { name: 'Hospital Guides & Posters', href: '#official-posters' },
    { name: 'Photo Gallery', href: '#gallery' },
    { name: 'Service Area', href: '#service-area' },
    { name: 'Patient FAQ', href: '#faq' },
    { name: 'Contact & Location', href: '#contact' },
  ];

  const clinicalSpecialities = [
    'Acute Stroke Care & Thrombolysis',
    'Epilepsy & Seizure Management',
    'Headache, Migraine & Vertigo',
    'Parkinson’s & Movement Disorders',
    'Peripheral Neuropathy & Nerve Pain',
    'Spine, Spondylosis & Radiculopathy',
    'Dementia, Memory & Cognitive Care',
    'Neuro-Infections & Autoimmune Care',
  ];

  const hospitalFacilities = [
    '24x7 Hi-Tech ICU (7 Beds)',
    'Advanced Operation Theater (OT)',
    'Digital X-Ray Diagnostic Unit',
    '24-Hour Blood Pathology Lab',
    '24/7 In-Hospital Pharmacy',
    'Dedicated Neuro Physiotherapy',
    'Digital Video EEG Monitoring',
    'NCS & Electromyography (EMG)',
  ];

  // The 6 verified hospital policy documents
  const hospitalPolicies = [
    { id: 'privacy-policy', label: 'Privacy Policy', icon: ShieldCheck },
    { id: 'terms', label: 'Terms & Conditions', icon: FileText },
    { id: 'medical-disclaimer', label: 'Medical Disclaimer', icon: AlertTriangle },
    { id: 'cookie-policy', label: 'Cookie Policy', icon: Cookie },
    { id: 'appointment-policy', label: 'Appointment & Cancellation', icon: CalendarClock },
    { id: 'contact-info', label: 'Contact Information', icon: Building2 },
  ];

  const handleLegalClick = (e, policyId) => {
    e.preventDefault();
    if (onOpenLegal) {
      onOpenLegal(policyId);
    } else {
      window.location.hash = policyId;
    }
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: Math.max(0, elementPosition - headerOffset),
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-[#050A14] text-slate-300 border-t border-white/[0.08] relative z-10 font-sans">
      
      {/* 1. Emergency Dispatch & Rapid Response Ribbon */}
      <div className="bg-gradient-to-r from-sky-950 via-[#0B172E] to-blue-950 border-b border-sky-500/20 py-5 sm:py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            <div className="flex items-center gap-3.5 text-center md:text-left">
              <div className="w-11 h-11 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center shrink-0">
                <HeartPulse className="w-5 h-5 text-rose-400 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400 bg-rose-950/80 px-2 py-0.5 rounded border border-rose-800">
                    24/7 Acute Neuro Emergency
                  </span>
                  <span className="text-xs text-slate-400 hidden sm:inline">&bull; 7 ICU Beds Open</span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white mt-0.5 font-outfit">
                  Time is Brain: Immediate Stroke &amp; Seizure Triage in Bagalkot
                </h3>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2.5 shrink-0">
              <a
                href={`tel:${data?.contact?.phone || '+918354220000'}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-950/60 border border-rose-400/40 transition-all hover:scale-[1.02] active:scale-95"
              >
                <Phone className="w-4 h-4" />
                <span>Call Emergency: {data?.contact?.phoneDisplay || '+91 8354 220000'}</span>
              </a>

              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-sky-200 hover:text-white font-semibold text-xs border border-white/10 transition-all"
              >
                <Navigation className="w-3.5 h-3.5 text-sky-400" />
                <span>Get Directions</span>
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* 2. Structured Main Column Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8">
          
          {/* Col 1: Hospital Identity & Mission (Span 4) */}
          <div className="lg:col-span-4 space-y-3.5">
            <div className="flex items-center gap-3">
              <div className="p-1 rounded-full bg-white/5 ring-1 ring-white/10">
                <HospitalLogo className="w-12 h-12 drop-shadow-[0_4px_12px_rgba(2,132,199,0.3)]" />
              </div>
              <div>
                <span className="font-extrabold text-lg text-white font-outfit uppercase tracking-tight block">
                  Masaraddi
                </span>
                <span className="text-sky-400 text-xs font-bold uppercase tracking-wider block">
                  Neuro Care Center &bull; Bagalkot
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Bagalkot’s trusted neurological center providing consultations, acute stroke care, epilepsy management, headache relief, movement disorder clinics, and 24/7 neuro-ICU monitoring led by <strong className="text-slate-200">Dr. Shivkumar Masaraddi</strong> (MD Medicine, DM Neurology).
            </p>

            {/* Landmark Tag */}
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs text-slate-300 space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-sky-300">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span>Verified Hospital Landmark</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                Godi Layout, near Rotary Circle, beside Kailash- In Hotel, Bagalkot - 587101
              </p>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
              <span>Serving Bagalkot, Navanagar, Vidyagiri, Mudhol, Badami, Jamkhandi &amp; Ilkal</span>
            </div>
          </div>

          {/* Col 2: Quick Links (Span 2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5 border-b border-white/[0.08] pb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              Quick Links
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="hover:text-sky-300 transition-colors flex items-center gap-1 group py-0.5 cursor-pointer"
                  >
                    <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-sky-400 group-hover:translate-x-0.5 transition-all" />
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Clinical Specialities (Span 2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5 border-b border-white/[0.08] pb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              Clinical Focus
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              {clinicalSpecialities.map((item) => (
                <li key={item} className="flex items-start gap-1.5">
                  <span className="text-sky-400/80 shrink-0 mt-0.5">&bull;</span>
                  <span className="hover:text-slate-200 transition-colors">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Hospital Facilities (Span 2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5 border-b border-white/[0.08] pb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              Facilities
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              {hospitalFacilities.map((facility) => (
                <li key={facility} className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400/80 shrink-0 mt-0.5" />
                  <span className="hover:text-slate-200 transition-colors">{facility}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Contact & Timings (Span 2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5 border-b border-white/[0.08] pb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              Contact &amp; Hours
            </h4>
            
            <div className="space-y-2.5 text-xs">
              <div>
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Direct Phone</span>
                <a 
                  href={`tel:${data?.contact?.phone || '+918354220000'}`} 
                  className="font-bold text-white hover:text-sky-300 transition-colors flex items-center gap-1.5 mt-0.5"
                >
                  <Phone className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span>{data?.contact?.phoneDisplay || '+91 8354 220000'}</span>
                </a>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 block uppercase font-bold">WhatsApp Desk</span>
                <a
                  href={`https://wa.me/${data?.contact?.whatsappNumber || '919448000000'}?text=${encodeURIComponent(
                    data?.contact?.whatsappMessage || 'Hello, I am contacting Masaraddi Neuro Care Center.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1.5 mt-0.5 font-medium"
                >
                  <MessageSquare className="w-3.5 h-3.5 shrink-0" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Official Email</span>
                <a 
                  href={`mailto:${data?.contact?.email || 'contact@masaraddineurocare.com'}`} 
                  className="text-slate-300 hover:text-sky-300 transition-colors flex items-center gap-1.5 mt-0.5 truncate"
                >
                  <Mail className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span className="truncate">{data?.contact?.email || 'contact@masaraddineurocare.com'}</span>
                </a>
              </div>

              {/* OPD Timings */}
              <div className="pt-2 border-t border-white/[0.06] space-y-1 text-[11px]">
                <div className="flex items-center gap-1 text-slate-400">
                  <Clock className="w-3 h-3 text-sky-400" />
                  <span className="font-semibold text-slate-300">OPD Timings</span>
                </div>
                <p className="text-white font-medium pl-4">{data?.contact?.timings?.opd || '10:00 AM – 4:00 PM & 6:00 PM – 8:00 PM'}</p>
                <p className="text-emerald-400 font-semibold pl-4">Emergency 24x7</p>
              </div>
            </div>
          </div>

        </div>

        {/* 3. Dedicated Section: Hospital Policies & Patient Rights */}
        <div className="mt-10 pt-6 border-t border-white/[0.1] bg-white/[0.02] p-5 sm:p-6 rounded-2xl border border-white/[0.06] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-4 border-b border-white/[0.06]">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-sky-400">
              <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
              <span>Hospital Policies &amp; Patient Rights</span>
            </div>
            <span className="text-[11px] text-slate-400">
              National Medical Commission Guidelines &amp; IT Act 2000 Compliance
            </span>
          </div>

          {/* The 6 exact legal policy buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {hospitalPolicies.map((policy) => {
              const Icon = policy.icon;
              return (
                <button
                  key={policy.id}
                  type="button"
                  onClick={(e) => handleLegalClick(e, policy.id)}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.03] hover:bg-sky-950/60 hover:border-sky-400/40 border border-white/[0.06] text-xs text-slate-300 hover:text-white transition-all text-left cursor-pointer group active:scale-95"
                >
                  <Icon className="w-3.5 h-3.5 text-sky-400 shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="truncate font-medium">{policy.label}</span>
                </button>
              );
            })}
          </div>

          {/* Official Registration & Accreditation Strip */}
          <div className="pt-3 border-t border-white/[0.06] flex items-center justify-center text-center gap-2 text-xs text-slate-400">
            <Building2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Government Accreditations: KPME Reg. BGK01185ALHL2 (Level 2 Hospital &bull; 30 Beds) &bull; KMC Reg. 69073</span>
          </div>
        </div>

        {/* 4. Medical Disclaimer & Copyright */}
        <div className="mt-8 text-center space-y-3">
          <p className="text-[11px] text-slate-400 max-w-3xl mx-auto leading-relaxed">
            <strong className="text-slate-300 font-semibold">Medical Disclaimer:</strong> The clinical information published on this website is provided solely for educational and general patient awareness. It does not substitute for individualized doctor consultations, clinical evaluations, or emergency medical treatment. In case of acute stroke symptoms, sudden weakness, speech difficulty, or severe seizures, visit Masaraddi Neuro Care Center immediately or call our 24/7 hotline.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-slate-400 pt-1">
            <span>&copy; {currentYear} Masaraddi Neuro Care Center, Bagalkot. All rights reserved.</span>
            <span className="text-slate-600 hidden sm:inline">&bull;</span>
            <span className="text-slate-400">Godi Layout, Rotary Circle, Navanagar Road, Bagalkot, Karnataka 587101</span>
          </div>

          {/* Development Credit & Contact */}
          <div className="pt-2 border-t border-white/[0.05] flex flex-wrap items-center justify-center gap-2 text-[11px] text-slate-400">
            <span>Website designed &amp; developed by <strong className="text-slate-200 font-semibold">ZORAX AI</strong></span>
            <span className="text-slate-600">&bull;</span>
            <span>Contact: <a href="tel:9481000941" className="text-sky-400 hover:text-sky-300 font-medium underline">9481000941</a></span>
          </div>
        </div>

      </div>
    </footer>
  );
};
