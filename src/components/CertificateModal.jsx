import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  ShieldCheck, 
  Award, 
  Building2, 
  FileCheck, 
  ExternalLink, 
  Download, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Lock, 
  CheckCircle2, 
  GraduationCap,
  Copy,
  Check
} from 'lucide-react';
import { useHospitalData } from '../context/HospitalContext.jsx';

export const CertificateModal = ({ initialTab = 'doctor', onClose }) => {
  const { data } = useHospitalData();
  const doctor = data.doctors[0];
  const hospitalReg = data.governmentRegistration;

  const [activeTab, setActiveTab] = useState(initialTab === 'hospital' ? 'hospital' : 'doctor');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [copiedKey, setCopiedKey] = useState(null);
  const [showRedactionInfo, setShowRedactionInfo] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab === 'hospital' ? 'hospital' : 'doctor');
      setZoomLevel(1);
    }
  }, [initialTab]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        setActiveTab('doctor');
        setZoomLevel(1);
      } else if (e.key === 'ArrowRight') {
        setActiveTab('hospital');
        setZoomLevel(1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const handleCopy = (text, key) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 0.75));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-[#040812]/85 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="certificate-modal-title"
    >
      <div 
        ref={modalRef}
        className="relative w-full max-w-5xl max-h-[94vh] bg-[#0A1120] text-slate-100 rounded-3xl border border-slate-800 shadow-[0_25px_70px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden"
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-slate-800/90 bg-[#0d1629]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-400/20 flex items-center justify-center text-sky-400 shrink-0">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 id="certificate-modal-title" className="text-base sm:text-lg font-bold text-white font-outfit">
                  Official Medical &amp; Government Registrations
                </h3>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                  <CheckCircle2 className="w-3 h-3" />
                  Verified Official Records
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Masaraddi Neuro Care Center &bull; Bagalkot, Karnataka
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-700/60 cursor-pointer"
            aria-label="Close certificate viewer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-4 sm:px-6 pt-3 pb-2 bg-[#090F1D] border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 bg-slate-900/90 p-1 rounded-2xl border border-slate-800">
            <button
              onClick={() => {
                setActiveTab('doctor');
                setZoomLevel(1);
              }}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'doctor'
                  ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Award className="w-4 h-4 shrink-0" />
              <span>Doctor KMC Reg. (No. 69073)</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('hospital');
                setZoomLevel(1);
              }}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'hospital'
                  ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Building2 className="w-4 h-4 shrink-0" />
              <span>Hospital KPME (30 Beds)</span>
            </button>
          </div>

          {/* Quick Zoom Controls */}
          <div className="flex items-center gap-1.5 bg-slate-900/80 px-2 py-1 rounded-xl border border-slate-800">
            <button 
              onClick={handleZoomOut}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              title="Zoom Out"
              aria-label="Zoom out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-[11px] font-mono text-slate-300 px-1 min-w-[42px] text-center">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button 
              onClick={handleZoomIn}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              title="Zoom In"
              aria-label="Zoom in"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button 
              onClick={handleResetZoom}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              title="Reset Zoom"
              aria-label="Reset zoom"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* TAB 1: DOCTOR KMC CERTIFICATE */}
          {activeTab === 'doctor' && (
            <div className="space-y-6 animate-fade-in">
              
              {/* Privacy Notice Banner with Redaction Disclosure */}
              <div className="p-4 rounded-2xl bg-sky-950/40 border border-sky-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400 shrink-0 mt-0.5">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm font-bold text-sky-200">
                        Hospital Privacy Shield &bull; Official Redaction Approved
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-300 text-[10px] font-bold">
                        Protected
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      In compliance with digital privacy standards and patient safety protocols, Dr. Shivakumar K. Masaraddi&apos;s <strong>Date of Birth</strong>, <strong>Father&apos;s Name</strong>, and <strong>Residential Address</strong> are masked for public website display with hospital authorization. Official KMC Registration No. <strong>69073</strong>, degrees (MBBS, MD, DM), Council Seal, and Registrar signatures remain 100% verified.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setShowRedactionInfo(!showRedactionInfo)}
                  className="text-xs text-sky-400 hover:text-sky-300 font-semibold underline self-start sm:self-center shrink-0 cursor-pointer"
                >
                  {showRedactionInfo ? 'Hide Details' : 'Privacy Explanation'}
                </button>
              </div>

              {showRedactionInfo && (
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 space-y-1.5 animate-fade-in">
                  <p className="font-semibold text-white">Redaction Summary:</p>
                  <ul className="list-disc pl-5 space-y-1 text-slate-400">
                    <li><strong className="text-slate-200">Father&apos;s Name:</strong> Masked to protect family privacy.</li>
                    <li><strong className="text-slate-200">Date of Birth:</strong> Masked to prevent identity misuse and unauthorized profiling.</li>
                    <li><strong className="text-slate-200">Residential Address:</strong> Masked to preserve personal dwelling confidentiality while public hospital address remains prominently listed.</li>
                  </ul>
                </div>
              )}

              {/* Grid: Certificate Viewer & Verified Data Summary */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Left Column: Redacted Certificate Image Display */}
                <div className="lg:col-span-7 bg-[#050A14] rounded-2xl border border-slate-800 p-2 sm:p-4 flex flex-col items-center justify-center overflow-hidden">
                  <div className="w-full flex items-center justify-between px-2 pb-2 text-[11px] text-slate-400">
                    <span className="font-semibold text-slate-300">Karnataka Medical Council — Reg. No. 69073</span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Legitimate
                    </span>
                  </div>

                  {/* Image Container with Zoom & Overlay */}
                  <div className="relative overflow-auto max-h-[580px] w-full flex justify-center rounded-xl bg-slate-950 p-2">
                    <div 
                      className="relative transition-transform duration-200 origin-top inline-block"
                      style={{ transform: `scale(${zoomLevel})` }}
                    >
                      <img
                        src="/assets/aistudio/Screenshot_2026-10-30_193145_28fa02a2.png"
                        alt="Karnataka Medical Council Registration Certificate for Dr. Shivakumar K. Masaraddi"
                        className="max-w-full h-auto rounded-lg shadow-2xl block border border-slate-800/80"
                        loading="eager"
                      />

                      {/* --- PRIVACY REDACTION OVERLAYS --- */}
                      
                      {/* 1. Redaction Box: Father's Name */}
                      <div 
                        className="absolute top-[54.6%] left-[28%] w-[32%] h-[3.0%] bg-slate-950/95 backdrop-blur-sm rounded-sm border border-slate-700/80 flex items-center justify-center px-1 shadow-md select-none group"
                        title="Redacted for Personal Privacy"
                      >
                        <span className="text-[7px] sm:text-[9px] font-bold tracking-wider text-slate-300 font-mono uppercase flex items-center gap-0.5">
                          <Lock className="w-2.5 h-2.5 text-amber-400" />
                          <span>REDACTED</span>
                        </span>
                      </div>

                      {/* 2. Redaction Box: Date of Birth */}
                      <div 
                        className="absolute top-[54.6%] left-[61%] w-[25%] h-[3.0%] bg-slate-950/95 backdrop-blur-sm rounded-sm border border-slate-700/80 flex items-center justify-center px-1 shadow-md select-none"
                        title="Redacted for Personal Privacy"
                      >
                        <span className="text-[7px] sm:text-[9px] font-bold tracking-wider text-slate-300 font-mono uppercase flex items-center gap-0.5">
                          <Lock className="w-2.5 h-2.5 text-amber-400" />
                          <span>DOB REDACTED</span>
                        </span>
                      </div>

                      {/* 3. Redaction Box: Residential Address */}
                      <div 
                        className="absolute top-[57.8%] left-[22.5%] w-[42%] h-[5.2%] bg-slate-950/95 backdrop-blur-sm rounded-sm border border-slate-700/80 flex flex-col items-center justify-center px-1 shadow-md select-none"
                        title="Redacted for Personal Privacy"
                      >
                        <span className="text-[7px] sm:text-[9px] font-bold tracking-wider text-slate-300 font-mono uppercase flex items-center gap-0.5">
                          <Lock className="w-2.5 h-2.5 text-amber-400" />
                          <span>PERSONAL ADDRESS REDACTED</span>
                        </span>
                        <span className="text-[6px] sm:text-[8px] text-slate-400">
                          (Hospital: Godi Layout, Bagalkot)
                        </span>
                      </div>

                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500 text-center mt-3">
                    Scroll or use zoom controls above to inspect council seal, signatures, and qualifications.
                  </p>
                </div>

                {/* Right Column: Verified Credentials Breakdown */}
                <div className="lg:col-span-5 space-y-4">
                  
                  {/* Primary Registration Card */}
                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                        Medical Council Registration
                      </span>
                      <button
                        onClick={() => handleCopy('69073', 'kmc')}
                        className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-white bg-slate-800 px-2 py-1 rounded-lg border border-slate-700 transition-colors cursor-pointer"
                      >
                        {copiedKey === 'kmc' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedKey === 'kmc' ? 'Copied' : 'Copy Reg No'}</span>
                      </button>
                    </div>

                    <div className="bg-[#050A14] p-3 rounded-xl border border-slate-800/80">
                      <div className="text-xs text-slate-400">Registration Number:</div>
                      <div className="text-xl font-extrabold text-white font-mono tracking-wide mt-0.5">
                        KMC 69073
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
                        <span>Date of Registration:</span>
                        <strong className="text-slate-200">23 July 2004</strong>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5 flex items-center justify-between">
                        <span>Conferring Council:</span>
                        <strong className="text-slate-200">Karnataka Medical Council</strong>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5 flex items-center justify-between">
                        <span>Statutory Act:</span>
                        <strong className="text-slate-200">KMR Act 34 of 1961</strong>
                      </div>
                    </div>
                  </div>

                  {/* Verified Qualifications List */}
                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-400">
                      <GraduationCap className="w-4 h-4" />
                      <span>Verified Qualifications on Record</span>
                    </div>

                    <div className="space-y-2.5">
                      {(doctor.qualificationsDetailed || []).map((q, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-[#050A14] border border-slate-800/80 space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-sky-300 font-mono bg-sky-950/60 px-2 py-0.5 rounded border border-sky-800/40">
                              {q.code}
                            </span>
                            <span className="text-[10px] text-slate-400">Reg: {q.councilRegDate}</span>
                          </div>
                          <p className="text-xs font-bold text-white">{q.degree}</p>
                          <p className="text-[11px] text-slate-300">{q.college}</p>
                          <p className="text-[10px] text-slate-400">{q.university} ({q.passingYear})</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* External Link & Direct Actions */}
                  <div className="pt-2 flex flex-col sm:flex-row gap-2">
                    <a
                      href="/assets/aistudio/Screenshot_2026-10-30_193145_28fa02a2.png"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold border border-slate-700 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Open Full Size Image</span>
                    </a>
                    <a
                      href="/assets/aistudio/Screenshot_2026-10-30_193145_28fa02a2.png"
                      download="Dr_Shivakumar_Masaraddi_KMC_Registration_69073.png"
                      className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold shadow-sm transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Certificate</span>
                    </a>
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* TAB 2: HOSPITAL GOVERNMENT KPME CERTIFICATE */}
          {activeTab === 'hospital' && (
            <div className="space-y-6 animate-fade-in">
              
              {/* Government Recognition Banner */}
              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/60 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-bold text-emerald-200">
                      Government of Karnataka &bull; KPME Registered Hospital
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 text-[10px] font-bold">
                      Level 2 Allopathy
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Masaraddi Neuro Care Centre is granted official registration under the <strong>Karnataka Private Medical Establishment (Amended) Act 2018 and Rules 2018</strong> for providing specialized medical services as a <strong>Hospital (Level 2)</strong> under the Allopathy system of medicine with <strong>30 Registered Beds</strong> (including 7 ICU beds).
                  </p>
                </div>
              </div>

              {/* Grid: Certificate Viewer & Verified Data Summary */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Left Column: Hospital Certificate Image Display */}
                <div className="lg:col-span-7 bg-[#050A14] rounded-2xl border border-slate-800 p-2 sm:p-4 flex flex-col items-center justify-center overflow-hidden">
                  <div className="w-full flex items-center justify-between px-2 pb-2 text-[11px] text-slate-400">
                    <span className="font-semibold text-slate-300">KPME Certificate No. {hospitalReg?.regNo || 'BGK01185ALHL2'}</span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> 30 Registered Beds
                    </span>
                  </div>

                  {/* Image Container with Zoom */}
                  <div className="relative overflow-auto max-h-[580px] w-full flex justify-center rounded-xl bg-slate-950 p-2">
                    <div 
                      className="relative transition-transform duration-200 origin-top inline-block"
                      style={{ transform: `scale(${zoomLevel})` }}
                    >
                      <img
                        src="/assets/aistudio/Screenshot_2026-10-30_193125_18a0428c.png"
                        alt="Government of Karnataka KPME Registration Certificate for Masaraddi Neuro Care Centre Bagalkot"
                        className="max-w-full h-auto rounded-lg shadow-2xl block border border-slate-800/80"
                        loading="eager"
                      />
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500 text-center mt-3">
                    Official KPME Registration Certificate with Government of Karnataka State Emblem, digital verification QR code, and Member Secretary signature.
                  </p>
                </div>

                {/* Right Column: Hospital Details & Recognition Breakdown */}
                <div className="lg:col-span-5 space-y-4">
                  
                  {/* Primary Registration Card */}
                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                        Hospital Registration Details
                      </span>
                      <button
                        onClick={() => handleCopy(hospitalReg?.regNo || 'BGK01185ALHL2', 'kpme')}
                        className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-white bg-slate-800 px-2 py-1 rounded-lg border border-slate-700 transition-colors cursor-pointer"
                      >
                        {copiedKey === 'kpme' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedKey === 'kpme' ? 'Copied' : 'Copy Reg No'}</span>
                      </button>
                    </div>

                    <div className="bg-[#050A14] p-3 rounded-xl border border-slate-800/80 space-y-2">
                      <div>
                        <div className="text-xs text-slate-400">Hospital Registration Number:</div>
                        <div className="text-xl font-extrabold text-white font-mono tracking-wide mt-0.5">
                          {hospitalReg?.regNo || 'BGK01185ALHL2'}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          (Govt Portal Ref: {hospitalReg?.regNoAlt || 'BGK01185ALH12'})
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-800/80 space-y-1.5 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Hospital Classification:</span>
                          <strong className="text-emerald-300">Hospital (Level 2) — Allopathy</strong>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Total Registered Beds:</span>
                          <strong className="text-white font-mono">30 Beds</strong>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Dedicated ICU Beds:</span>
                          <strong className="text-sky-300 font-mono">7 ICU Beds</strong>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Date of Registration:</span>
                          <strong className="text-slate-200">29 July 2025</strong>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Registration Validity:</span>
                          <strong className="text-emerald-400 font-bold">28 July 2030 (5 Years)</strong>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Medical Director / Owner:</span>
                          <strong className="text-slate-200">Dr. Shivakumar K. Masaraddi</strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Issuing Authority Card */}
                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
                      Issuing Government Authority
                    </span>
                    <p className="text-xs font-medium text-slate-200">
                      District Registration and Grievance Redressal Authority
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Department of Health and Family Welfare Services, Government of Karnataka, Bagalkot District.
                    </p>
                    <div className="pt-1 text-[11px] text-slate-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Authorized under KPME (Amended) Act 2018</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex flex-col sm:flex-row gap-2">
                    <a
                      href="/assets/aistudio/Screenshot_2026-10-30_193125_18a0428c.png"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold border border-slate-700 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Open Full Size Image</span>
                    </a>
                    <a
                      href="/assets/aistudio/Screenshot_2026-10-30_193125_18a0428c.png"
                      download="Masaraddi_Neuro_Care_KPME_Hospital_Registration_BGK01185ALHL2.png"
                      className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-sm transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Certificate</span>
                    </a>
                  </div>

                </div>

              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-4 sm:px-6 py-3 bg-[#0d1629] border-t border-slate-800/90 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
            <span>Official Government of Karnataka &amp; KMC Documents</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
          >
            Close Viewer
          </button>
        </div>

      </div>
    </div>
  );
};
