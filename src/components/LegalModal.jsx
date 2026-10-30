import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShieldCheck, 
  FileText, 
  AlertTriangle, 
  Cookie, 
  CalendarClock, 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import { HospitalLogo } from './HospitalLogo.jsx';
import { useHospitalData } from '../context/HospitalContext.jsx';

export const LegalModal = ({ activePolicy, onClose, onSelectPolicy }) => {
  const { data } = useHospitalData();
  const [copiedEmail, setCopiedEmail] = useState(false);

  const contactEmail = data?.contact?.email || 'contact@masaraddineurocare.com';
  const hospitalPhone = data?.contact?.phone || '+918354220000';
  const phoneDisplay = data?.contact?.phoneDisplay || '+91 8354 220000';
  const addressFull = data?.contact?.address?.full || 'Masaraddi Neuro Care Center, Godi Layout, near Rotary Circle, beside Kailash- In Hotel, Bagalkot, Karnataka 587101';

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const policies = [
    { id: 'privacy-policy', label: 'Privacy Policy', icon: ShieldCheck },
    { id: 'terms', label: 'Terms & Conditions', icon: FileText },
    { id: 'medical-disclaimer', label: 'Medical Disclaimer', icon: AlertTriangle },
    { id: 'cookie-policy', label: 'Cookie Policy', icon: Cookie },
    { id: 'appointment-policy', label: 'Appointment & Cancellation', icon: CalendarClock },
    { id: 'contact-info', label: 'Contact Information', icon: Building2 },
  ];

  const currentPolicy = activePolicy || 'privacy-policy';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
    >
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#050A14]/80 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div className="relative z-10 w-full max-w-4xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[88vh] text-slate-700 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header Bar */}
        <div className="px-5 sm:px-8 py-4 sm:py-5 bg-gradient-to-r from-[#080E1A] to-[#0F172A] text-white flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 p-1 ring-1 ring-white/20 shrink-0">
              <HospitalLogo className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm sm:text-base tracking-tight uppercase font-outfit">
                  Masaraddi Neuro Care Center
                </span>
                <span className="text-[10px] bg-sky-500/30 text-sky-300 px-2 py-0.5 rounded-full border border-sky-400/30 hidden sm:inline-block">
                  Verified Hospital Governance
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                Bagalkot, Karnataka &bull; Official Clinical Policies &amp; Terms
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-white/10"
              aria-label="Close policy dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Policy Tab Navigation Bar */}
        <div className="bg-slate-50 border-b border-slate-200 px-4 sm:px-8 py-2 overflow-x-auto scrollbar-none flex items-center gap-2 shrink-0">
          {policies.map((p) => {
            const Icon = p.icon;
            const isSelected = currentPolicy === p.id;
            return (
              <button
                key={p.id}
                onClick={() => onSelectPolicy(p.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-sky-600 text-white shadow-sm shadow-sky-600/30'
                    : 'bg-white text-slate-600 hover:bg-slate-200/80 hover:text-slate-900 border border-slate-200/80'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-slate-500'}`} />
                <span>{p.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Body Content (Scrollable) */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-8 py-6 text-sm leading-relaxed space-y-6">
          
          {/* 1. Privacy Policy */}
          {currentPolicy === 'privacy-policy' && (
            <div className="space-y-4">
              <div className="border-b border-slate-200 pb-3">
                <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">Patient Trust &amp; Confidentiality</span>
                <h3 id="legal-modal-title" className="text-xl sm:text-2xl font-extrabold text-[#0B132B] font-outfit mt-0.5">
                  Privacy Policy
                </h3>
                <p className="text-xs text-slate-500 mt-1">Last Updated: October 2026 &bull; Compliant with Indian Medical Ethics &amp; IT Act 2000</p>
              </div>

              <div className="space-y-3.5 text-slate-700">
                <p>
                  At <strong>Masaraddi Neuro Care Center</strong>, protecting patient medical confidentiality, sensitive personal information, and digital privacy is paramount to our medical ethics. This policy explains how we collect, store, and safeguard visitor and patient data.
                </p>

                <div className="bg-sky-50/70 p-4 rounded-2xl border border-sky-100 space-y-1.5">
                  <h4 className="font-bold text-sky-950 text-xs uppercase tracking-wide">Key Privacy Commitment:</h4>
                  <p className="text-xs text-sky-900">
                    We do <strong>not</strong> sell, rent, commercialize, or share patient medical records or personal contact data with any third-party marketing companies, brokers, or advertisers under any circumstances.
                  </p>
                </div>

                <h4 className="text-base font-bold text-[#0B132B] pt-2">1. Information We Collect</h4>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-600 text-xs sm:text-sm">
                  <li><strong>Clinical Information:</strong> Medical history, neurological symptoms, diagnostic neuro-imaging reports, EEG, lab investigations, and prescription records submitted during in-person visits or appointment scheduling.</li>
                  <li><strong>Contact Details:</strong> Patient name, age, phone number, residential town or city, and emergency family contact provided when contacting the hospital desk.</li>
                  <li><strong>Technical Website Data:</strong> Non-identifying browser data, device screen metrics, and session cookies used exclusively to render our website smoothly and remember user dismissal of dialog prompts.</li>
                </ul>

                <h4 className="text-base font-bold text-[#0B132B] pt-2">2. How Patient Information Is Used</h4>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-600 text-xs sm:text-sm">
                  <li>To provide direct clinical evaluations, acute stroke assessments, and treatments under Dr. Shivakumar K. Masaraddi (DM Neurology).</li>
                  <li>To coordinate ICU admissions, inpatient monitoring, diagnostic investigations, and emergency triage.</li>
                  <li>To verify OPD consultation appointments, doctor availability, and communicate follow-up reminders.</li>
                  <li>To satisfy statutory medical record keeping mandated under Indian healthcare laws and regulatory bodies.</li>
                </ul>

                <h4 className="text-base font-bold text-[#0B132B] pt-2">3. Medical Confidentiality &amp; Storage Security</h4>
                <p>
                  All patient physical and electronic case sheets are stored in secure hospital facilities with role-based clinical access. Access is restricted exclusively to authorized medical professionals, nursing staff, and hospital administration involved in patient care.
                </p>

                <h4 className="text-base font-bold text-[#0B132B] pt-2">4. Patient Rights &amp; Grievance Redressal</h4>
                <p>
                  Patients or their legally authorized representatives retain the right to review their diagnostic records and request clarification regarding their stored details. For questions or privacy matters, contact our administrative desk at:
                </p>
                <div className="p-3.5 bg-slate-100 rounded-xl text-xs space-y-1 text-slate-800">
                  <p><strong>Hospital Privacy &amp; Data Desk:</strong> Masaraddi Neuro Care Center</p>
                  <p><strong>Official Email:</strong> <a href={`mailto:${contactEmail}`} className="text-sky-600 hover:underline font-semibold">{contactEmail}</a></p>
                  <p><strong>Hospital Phone:</strong> <a href={`tel:${hospitalPhone}`} className="text-sky-600 hover:underline font-semibold">{phoneDisplay}</a></p>
                  <p><strong>Address:</strong> Godi Layout, near Rotary Circle, beside Kailash- In Hotel, Bagalkot - 587101</p>
                </div>
              </div>
            </div>
          )}

          {/* 2. Terms & Conditions */}
          {currentPolicy === 'terms' && (
            <div className="space-y-4">
              <div className="border-b border-slate-200 pb-3">
                <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">Website Usage Agreement</span>
                <h3 id="legal-modal-title" className="text-xl sm:text-2xl font-extrabold text-[#0B132B] font-outfit mt-0.5">
                  Terms &amp; Conditions
                </h3>
                <p className="text-xs text-slate-500 mt-1">Official Terms of Service for masaraddineurocare.com</p>
              </div>

              <div className="space-y-3.5 text-slate-700">
                <p>
                  Welcome to the official website of <strong>Masaraddi Neuro Care Center</strong>. By browsing, accessing, or utilizing any portion of this website, you agree to comply with and be bound by the following terms and conditions.
                </p>

                <h4 className="text-base font-bold text-[#0B132B] pt-2">1. Nature of Website Information</h4>
                <p>
                  All text, photographs, doctor profiles, service descriptions, and facility details provided on this website are for general patient awareness, hospital orientation, and educational reference. They do not constitute an offer of contract or a substitute for personal clinical consultation.
                </p>

                <h4 className="text-base font-bold text-[#0B132B] pt-2">2. Doctor-Patient Relationship</h4>
                <p>
                  Visiting this website, submitting an inquiry via WhatsApp, or reading published clinical material does <strong>not</strong> create a formal doctor-patient relationship. A formal clinical relationship is established only upon in-person registration, physical examination, and documentation at the hospital desk in Bagalkot.
                </p>

                <h4 className="text-base font-bold text-[#0B132B] pt-2">3. Intellectual Property Rights</h4>
                <p>
                  The official hospital branding, logo, hospital exterior/interior photography, doctor photographs, and verified informational texts are the exclusive intellectual property of Masaraddi Neuro Care Center. Reproduction, redistribution, or unauthorized mirroring without written consent is strictly prohibited.
                </p>

                <h4 className="text-base font-bold text-[#0B132B] pt-2">4. External Navigation &amp; Third-Party Services</h4>
                <p>
                  This website provides navigation links to Google Maps for clinic transit and WhatsApp for messaging. These third-party services operate under their respective terms and privacy policies. Masaraddi Neuro Care Center is not liable for technical interruptions caused by third-party platforms.
                </p>

                <h4 className="text-base font-bold text-[#0B132B] pt-2">5. Governing Law &amp; Legal Jurisdiction</h4>
                <p>
                  These terms are governed in all respects by the laws of India. Any legal dispute, claim, or proceeding arising in connection with the website or services shall fall under the exclusive jurisdiction of the competent courts of <strong>Bagalkot, Karnataka</strong>.
                </p>
              </div>
            </div>
          )}

          {/* 3. Medical Disclaimer */}
          {currentPolicy === 'medical-disclaimer' && (
            <div className="space-y-4">
              <div className="border-b border-slate-200 pb-3">
                <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">Critical Clinical Notice</span>
                <h3 id="legal-modal-title" className="text-xl sm:text-2xl font-extrabold text-[#0B132B] font-outfit mt-0.5">
                  Medical Disclaimer
                </h3>
                <p className="text-xs text-slate-500 mt-1">Please read carefully before using information from this website</p>
              </div>

              <div className="space-y-3.5 text-slate-700">
                <div className="bg-rose-50 border-l-4 border-rose-500 p-4 rounded-r-2xl space-y-2">
                  <div className="flex items-center gap-2 text-rose-900 font-bold text-xs uppercase tracking-wide">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>Not a Substitute for Emergency or Clinical Medical Care</span>
                  </div>
                  <p className="text-xs sm:text-sm text-rose-950 font-medium">
                    The medical content on this website does not constitute clinical diagnosis, personalized medical advice, or formal treatment protocol. If you or someone around you is experiencing sudden paralysis, severe headache, seizures, speech difficulty, or stroke symptoms, seek immediate emergency care.
                  </p>
                </div>

                <h4 className="text-base font-bold text-[#0B132B] pt-2">1. Educational &amp; Informational Scope</h4>
                <p>
                  Information relating to acute stroke, epilepsy, migraines, neuropathy, tremors, and dementia is provided solely to assist patients and families in recognizing common warning signs and understanding available facilities in Bagalkot. It must never be used to self-diagnose or alter ongoing prescription medications.
                </p>

                <h4 className="text-base font-bold text-[#0B132B] pt-2">2. Mandatory Clinical Examination</h4>
                <p>
                  Neurological diagnosis requires thorough in-person evaluation, cranial nerve testing, motor and sensory assessments, reflex checks, and frequently confirmatory diagnostic investigations such as MRI, CT scans, Video EEG, or Nerve Conduction Studies (NCS). No website or digital communication can substitute for a physical medical consultation.
                </p>

                <h4 className="text-base font-bold text-[#0B132B] pt-2">3. Acute Neuro Emergency Protocol</h4>
                <p>
                  In neurological emergencies, <em>Time is Brain</em>. Every minute of delayed intervention during acute ischemic stroke or prolonged seizures can lead to permanent neuronal loss. For emergency triage, contact our 24/7 hotline directly or arrive immediately at our hospital:
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-1">
                  <a
                    href={`tel:${hospitalPhone}`}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 text-white font-bold text-xs shadow-md shadow-rose-950/20 hover:bg-rose-500 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Emergency Hotline: {phoneDisplay}</span>
                  </a>
                  <a
                    href={data?.contact?.googleMapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors"
                  >
                    <MapPin className="w-3.5 h-3.5 text-sky-400" />
                    <span>Emergency GPS: Rotary Circle, Bagalkot</span>
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* 4. Cookie Policy */}
          {currentPolicy === 'cookie-policy' && (
            <div className="space-y-4">
              <div className="border-b border-slate-200 pb-3">
                <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">Browser Storage &amp; Transparency</span>
                <h3 id="legal-modal-title" className="text-xl sm:text-2xl font-extrabold text-[#0B132B] font-outfit mt-0.5">
                  Cookie &amp; Local Storage Policy
                </h3>
                <p className="text-xs text-slate-500 mt-1">How we respect visitor privacy and manage website preferences</p>
              </div>

              <div className="space-y-3.5 text-slate-700">
                <p>
                  This Cookie Policy explains how <strong>Masaraddi Neuro Care Center</strong> utilizes cookies and modern browser storage technologies (such as <code>localStorage</code> and <code>sessionStorage</code>) on our website.
                </p>

                <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-100 flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-emerald-950">
                    <strong>Zero Third-Party Advertising Trackers:</strong> We do not deploy third-party advertising cookies, retargeting pixels, cross-site trackers, or commercial surveillance scripts on our patients.
                  </p>
                </div>

                <h4 className="text-base font-bold text-[#0B132B] pt-2">1. Types of Storage We Use</h4>
                <ul className="list-disc pl-5 space-y-2 text-slate-600 text-xs sm:text-sm">
                  <li>
                    <strong>Essential Functional Storage:</strong> Temporary session memory used to manage user interaction states, such as recording that a visitor has closed the appointment reminder popup so it does not repeatedly interrupt their browsing session.
                  </li>
                  <li>
                    <strong>Performance &amp; Cache:</strong> Browser caching of static images, hospital photography, and stylesheet resources to speed up page load times on subsequent visits and low-bandwidth mobile connections.
                  </li>
                </ul>

                <h4 className="text-base font-bold text-[#0B132B] pt-2">2. How You Can Control Cookies</h4>
                <p>
                  You can set or modify your web browser controls to accept or refuse cookies. If you choose to reject cookies or clear local storage, you can still use our website without restriction, though preference states (such as dismissed popups) may reset.
                </p>
              </div>
            </div>
          )}

          {/* 5. Appointment & Cancellation Policy */}
          {currentPolicy === 'appointment-policy' && (
            <div className="space-y-4">
              <div className="border-b border-slate-200 pb-3">
                <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">Consultation Scheduling Guidelines</span>
                <h3 id="legal-modal-title" className="text-xl sm:text-2xl font-extrabold text-[#0B132B] font-outfit mt-0.5">
                  Appointment &amp; Cancellation Policy
                </h3>
                <p className="text-xs text-slate-500 mt-1">Consultation token bookings, OPD timings, rescheduling, and doctor availability</p>
              </div>

              <div className="space-y-3.5 text-slate-700">
                <p>
                  To ensure smooth consultation flow and avoid unnecessary waiting times for patients and their families, <strong>Masaraddi Neuro Care Center</strong> follows structured consultation scheduling practices.
                </p>

                <h4 className="text-base font-bold text-[#0B132B] pt-2">1. Scheduling an OPD Consultation</h4>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-600 text-xs sm:text-sm">
                  <li>Consultations can be scheduled by calling the hospital desk directly at <strong>{phoneDisplay}</strong> or messaging our official WhatsApp desk.</li>
                  <li>Direct walk-in patient registrations are also accommodated at the hospital reception counter during regular OPD hours on a first-come, first-served token basis.</li>
                  <li><strong>OPD Timings:</strong> Morning: 10:00 AM – 4:00 PM | Evening: 6:00 PM – 8:00 PM (Monday to Saturday).</li>
                </ul>

                <h4 className="text-base font-bold text-[#0B132B] pt-2">2. Emergency &amp; Acute Priority Care</h4>
                <p>
                  Patients arriving with acute neurological emergencies (such as acute stroke, active status epilepticus seizures, altered consciousness, or traumatic neuro injuries) receive <strong>immediate priority triage and ICU admission 24/7</strong>. In such critical instances, routine scheduled appointments may experience brief delays. We request the patience and cooperation of our visitors in emergency life-saving situations.
                </p>

                <h4 className="text-base font-bold text-[#0B132B] pt-2">3. Rescheduling &amp; Cancellations</h4>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-600 text-xs sm:text-sm">
                  <li>If you are unable to attend your scheduled consultation, please notify our reception team by phone at least 2 hours in advance so the slot may be allocated to another waiting patient.</li>
                  <li>There are no cancellation penalties or fees for rescheduling consultation appointments.</li>
                  <li>Doctor consultation schedules may occasionally be adjusted due to emergency neurological procedures or critical inpatient emergencies. In such cases, our staff will contact registered patients to reschedule at their earliest convenience.</li>
                </ul>
              </div>
            </div>
          )}

          {/* 6. Verified Contact Information */}
          {currentPolicy === 'contact-info' && (
            <div className="space-y-4">
              <div className="border-b border-slate-200 pb-3">
                <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">Hospital Administration &amp; Helpdesk</span>
                <h3 id="legal-modal-title" className="text-xl sm:text-2xl font-extrabold text-[#0B132B] font-outfit mt-0.5">
                  Verified Contact Information
                </h3>
                <p className="text-xs text-slate-500 mt-1">Official contact channels for patients, medical correspondence, and legal notices</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 text-sky-700 font-bold text-xs uppercase tracking-wider">
                    <Building2 className="w-4 h-4 text-sky-600" />
                    <span>Hospital Identity</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">Masaraddi Neuro Care Center</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Lead Consultant: <strong>Dr. Shivakumar K. Masaraddi</strong><br />
                    Qualifications: MD (General Medicine), DM (Neurology)<br />
                    Specialization: Consultant Neurologist &bull; Brain, Spine &amp; Nerve Specialist
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 text-sky-700 font-bold text-xs uppercase tracking-wider">
                    <MapPin className="w-4 h-4 text-sky-600" />
                    <span>Postal Address &amp; Landmark</span>
                  </div>
                  <p className="text-xs text-slate-700 font-medium leading-relaxed">
                    Godi Layout, near Rotary Circle, beside Kailash- In Hotel, Bagalkot - 587101, Karnataka, India
                  </p>
                  <a
                    href={data?.contact?.googleMapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:underline pt-1"
                  >
                    <span>View Exact Location on Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 text-sky-700 font-bold text-xs uppercase tracking-wider">
                    <Phone className="w-4 h-4 text-sky-600" />
                    <span>Direct Telephone Numbers</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Hospital Desk: <a href={`tel:${hospitalPhone}`} className="font-bold text-slate-900 hover:text-sky-600">{phoneDisplay}</a>
                  </p>
                  <p className="text-xs text-slate-600">
                    Alternate Hotline: <a href={`tel:${data?.contact?.alternatePhone || '+919448000000'}`} className="font-bold text-slate-900 hover:text-sky-600">{data?.contact?.alternatePhoneDisplay || '+91 94480 00000'}</a>
                  </p>
                  <p className="text-[11px] text-emerald-700 font-semibold pt-1">
                    Emergency Hotline Available 24 Hours, 7 Days a Week
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 text-sky-700 font-bold text-xs uppercase tracking-wider">
                    <Mail className="w-4 h-4 text-sky-600" />
                    <span>Official Email Correspondence</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <a href={`mailto:${contactEmail}`} className="font-bold text-slate-900 hover:text-sky-600 text-xs sm:text-sm truncate">
                      {contactEmail}
                    </a>
                    <button
                      onClick={handleCopyEmail}
                      className="px-2 py-0.5 rounded bg-slate-200 hover:bg-slate-300 text-[10px] font-semibold text-slate-700 transition-colors cursor-pointer"
                    >
                      {copiedEmail ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Official email for clinical inquiries, patient feedback, and legal communications.
                  </p>
                </div>
              </div>

              {/* Consultation Timings Summary */}
              <div className="p-4 rounded-2xl bg-sky-950 text-white space-y-2 mt-2">
                <div className="flex items-center gap-2 text-sky-300 font-bold text-xs">
                  <Clock className="w-4 h-4" />
                  <span>Verified Operating Hours</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                  <p><strong>OPD Timings:</strong> 10:00 AM – 4:00 PM &amp; 6:00 PM – 8:00 PM</p>
                  <p><strong>Acute Neuro Emergency &amp; ICU:</strong> Open 24/7 (All Days)</p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Bar */}
        <div className="px-5 sm:px-8 py-3.5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <p className="text-[11px] text-slate-500 text-center sm:text-left">
            &copy; {new Date().getFullYear()} Masaraddi Neuro Care Center &bull; Bagalkot, Karnataka
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all cursor-pointer"
            >
              Close Policy
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
