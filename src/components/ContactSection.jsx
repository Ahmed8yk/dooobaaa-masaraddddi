import React, { useState } from 'react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Navigation, 
  MessageSquare, 
  Mail, 
  Check, 
  Copy, 
  CalendarCheck,
  Building2,
  Compass,
  AlertCircle,
  CheckCircle2,
  Send,
  Loader2,
  ShieldCheck
} from 'lucide-react';
import { useHospitalData } from '../context/HospitalContext.jsx';

export const ContactSection = ({ onOpenLegal }) => {
  const { data } = useHospitalData();
  const [copied, setCopied] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    city: 'Bagalkot',
    slot: 'Morning Slot (10:00 AM – 4:00 PM)',
    condition: 'General Neurological Consultation',
    notes: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastSubmissionTime, setLastSubmissionTime] = useState(0);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(data.contact.address.full);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const nearbyLocations = [
    'Bagalkot',
    'Navanagar',
    'Vidyagiri',
    'Badami',
    'Jamkhandi',
    'Mudhol',
    'Ilkal',
    'Hungund',
    'Bilagi',
    'Guledgudda',
    'Rabkavi-Banhatti',
    'Mahalingpur',
    'Lokapur',
    'Kerur',
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const errors = {};
    const nameTrimmed = formData.fullName.trim();
    if (!nameTrimmed || nameTrimmed.length < 2) {
      errors.fullName = 'Please enter patient full name (minimum 2 characters)';
    }

    const cleanPhone = formData.phone.replace(/[\s-]/g, '');
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!cleanPhone) {
      errors.phone = 'Mobile number is required to confirm appointment';
    } else if (!phoneRegex.test(cleanPhone)) {
      errors.phone = 'Please enter a valid 10-digit Indian mobile number';
    }

    return errors;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Prevent duplicate submissions within 5 seconds
    const now = Date.now();
    if (isSubmitting || now - lastSubmissionTime < 5000) {
      return;
    }

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setFormErrors({});

    // Simulate reliable client-side processing
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setLastSubmissionTime(now);
    }, 700);
  };

  const formattedWhatsAppUrl = `https://wa.me/${data.contact.whatsappNumber}?text=${encodeURIComponent(
    `*Appointment Token Request - Masaraddi Neuro Care Center*\n` +
    `• Patient Name: ${formData.fullName.trim()}\n` +
    `• Mobile: ${formData.phone}\n` +
    `• City/Town: ${formData.city}\n` +
    `• Preferred Timing: ${formData.slot}\n` +
    `• Neurological Condition: ${formData.condition}\n` +
    (formData.notes.trim() ? `• Notes: ${formData.notes.trim()}\n` : '') +
    `Please check doctor availability and confirm consultation schedule.`
  )}`;

  const resetForm = () => {
    setFormData({
      fullName: '',
      phone: '',
      city: 'Bagalkot',
      slot: 'Morning Slot (10:00 AM – 4:00 PM)',
      condition: 'General Neurological Consultation',
      notes: '',
    });
    setIsSubmitted(false);
    setFormErrors({});
  };

  return (
    <section id="contact" className="py-20 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Local SEO Keywords */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold tracking-wide uppercase shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-sky-600" />
            <span>Neurology Hospital in Bagalkot</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B132B] tracking-tight font-outfit">
            Visit Masaraddi Neuro Care Center
          </h2>
          
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Conveniently located at Godi Layout, near Rotary Circle, beside Kailash- In Hotel, Bagalkot (587101). Accessible for patients seeking specialized neuro care across North Karnataka.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="mt-12 sm:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Contact Cards & Address */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Address Card */}
            <div className="bg-[#F8FAFC] rounded-3xl p-6 sm:p-7 border border-slate-200/80 space-y-4 shadow-sm">
              <div className="flex items-start gap-3.5">
                <img
                  src={data.logo || "/logo.png"}
                  alt="Masaraddi Neuro Care Centre Official Logo"
                  className="w-14 h-14 rounded-full object-cover border-2 border-sky-400/40 bg-white shadow-md shadow-sky-500/10 shrink-0"
                />
                <div>
                  <h3 className="text-base font-bold text-[#0B132B] font-outfit">
                    Hospital Address
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed font-medium">
                    {data.contact.address.street}
                    <br />
                    {data.contact.address.city}, {data.contact.address.state} — {data.contact.address.postalCode || '587101'}, {data.contact.address.country}
                  </p>
                  <p className="text-xs text-sky-700 font-semibold mt-1.5">
                    Landmark: {data.contact.address.landmark}
                  </p>
                </div>
              </div>

              {/* Action Buttons for Address */}
              <div className="pt-2 flex flex-wrap gap-2.5">
                <a
                  href={data.contact.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs shadow-md shadow-sky-600/20 transition-all hover:scale-[1.01]"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get GPS Directions</span>
                </a>
                <button
                  onClick={handleCopyAddress}
                  className="inline-flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl bg-white hover:bg-slate-100 text-[#0B132B] font-semibold text-xs border border-slate-200 shadow-xs transition-all cursor-pointer"
                  title="Copy full address"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Calling & WhatsApp Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Primary Phone */}
              <a
                href={`tel:${data.contact.phone}`}
                className="bg-[#F8FAFC] hover:bg-sky-50/60 p-5 rounded-3xl border border-slate-200/80 hover:border-sky-300 transition-all shadow-sm group block"
              >
                <div className="w-10 h-10 rounded-2xl bg-white text-sky-600 flex items-center justify-center shrink-0 border border-slate-200 shadow-xs mb-3 group-hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Hospital Desk</h4>
                <p className="text-sm font-bold text-[#0B132B] group-hover:text-sky-600 transition-colors mt-0.5">
                  {data.contact.phoneDisplay}
                </p>
                <span className="text-[11px] text-sky-600 font-semibold mt-1 inline-block">
                  Click to call &rarr;
                </span>
              </a>

              {/* WhatsApp Card */}
              <a
                href={`https://wa.me/${data.contact.whatsappNumber}?text=${encodeURIComponent(
                  data.contact.whatsappMessage
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#F8FAFC] hover:bg-emerald-50/60 p-5 rounded-3xl border border-slate-200/80 hover:border-emerald-300 transition-all shadow-sm group block"
              >
                <div className="w-10 h-10 rounded-2xl bg-white text-emerald-600 flex items-center justify-center shrink-0 border border-slate-200 shadow-xs mb-3 group-hover:scale-105 transition-transform">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">WhatsApp Desk</h4>
                <p className="text-sm font-bold text-[#0B132B] group-hover:text-emerald-600 transition-colors mt-0.5">
                  {data.contact.whatsappDisplay}
                </p>
                <span className="text-[11px] text-emerald-600 font-semibold mt-1 inline-block">
                  Message on WhatsApp &rarr;
                </span>
              </a>
            </div>

            {/* Email Card with verified official contact email */}
            <div className="bg-[#F8FAFC] rounded-3xl p-5 border border-slate-200/80 flex items-center gap-3.5 shadow-sm">
              <div className="w-10 h-10 rounded-2xl bg-white text-sky-600 flex items-center justify-center shrink-0 border border-slate-200 shadow-xs">
                <Mail className="w-5 h-5" />
              </div>
              <div className="overflow-hidden">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Official Email</h4>
                <a
                  href={`mailto:${data.contact.email}`}
                  className="text-xs sm:text-sm font-bold text-[#0B132B] hover:text-sky-600 transition-colors truncate block"
                >
                  {data.contact.email}
                </a>
              </div>
            </div>

            {/* Verified Timings Card */}
            <div className="bg-[#F8FAFC] rounded-3xl p-6 border border-slate-200/80 space-y-3 text-xs shadow-sm">
              <div className="flex items-center gap-2 text-[#0B132B] font-bold">
                <Clock className="w-4 h-4 text-sky-600" />
                <span>Verified Hospital Timings</span>
              </div>
              <div className="space-y-2 text-slate-600 pl-6 border-l-2 border-sky-200">
                <div>
                  <span className="font-semibold text-slate-500 block">OPD / Consultation Hours:</span>
                  <p className="font-bold text-[#0B132B] text-sm">
                    {data.contact.timings.opdSlot1}
                  </p>
                  <p className="font-bold text-[#0B132B] text-sm">
                    {data.contact.timings.opdSlot2}
                  </p>
                </div>
                <div className="pt-1">
                  <span className="font-semibold text-slate-500 block">Emergency Care:</span>
                  <p className="font-bold text-emerald-700">
                    {data.contact.timings.emergency}
                  </p>
                </div>
              </div>
            </div>

            {/* Local Areas Served Pill Strip (Local SEO) */}
            <div className="bg-[#F8FAFC] rounded-3xl p-5 border border-slate-200/80 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#0B132B]">
                <Compass className="w-3.5 h-3.5 text-sky-600" />
                <span>Serving Bagalkot District &amp; Nearby Areas:</span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {nearbyLocations.map((loc, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-semibold bg-white px-2.5 py-1 rounded-lg border border-slate-200 text-slate-700 shadow-xs"
                  >
                    {loc}
                  </span>
                ))}
              </div>
              <div className="pt-1.5">
                <a
                  href="#service-area"
                  className="text-xs font-bold text-sky-600 hover:text-sky-700 hover:underline inline-flex items-center gap-1"
                >
                  <span>View 90 km Travel &amp; Transit Guide for Patients</span>
                  <span>&rarr;</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Appointment Form, Booking & Google Maps Embed */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Consultation Booking & Request Form */}
            <div className="bg-gradient-to-br from-[#080E1A] to-[#0F172A] rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-slate-800 space-y-5">
              
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-bold border border-sky-400/30">
                  <CalendarCheck className="w-3.5 h-3.5 text-sky-400" />
                  <span>Consultation Scheduling</span>
                </div>
                
                {onOpenLegal && (
                  <button
                    onClick={() => onOpenLegal('appointment-policy')}
                    className="text-[11px] text-sky-300 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <ShieldCheck className="w-3 h-3 text-sky-400" />
                    <span>View Appointment Policy</span>
                  </button>
                )}
              </div>

              <div className="space-y-1.5">
                <h3 className="text-2xl font-bold font-outfit text-white">
                  Schedule Consultation &bull; Dr. Shivakumar K. Masaraddi
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Call the hospital directly or complete the verified appointment request form below. Our reception desk will verify doctor availability and confirm your consultation token.
                </p>
              </div>

              {/* Doctor Details Bar */}
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Doctor</span>
                  <span className="text-white font-bold">{data.doctors[0]?.name || 'Dr. Shivkumar Masaraddi'}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Specialization</span>
                  <span className="text-sky-300 font-bold">DM Neurology</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Morning OPD</span>
                  <span className="text-white font-medium">{data.contact.timings.opdSlot1}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Evening OPD</span>
                  <span className="text-white font-medium">{data.contact.timings.opdSlot2}</span>
                </div>
              </div>

              {/* Form Section */}
              {!isSubmitted ? (
                <form onSubmit={handleFormSubmit} className="space-y-4 pt-1" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    
                    {/* Patient Name */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1" htmlFor="patient-name">
                        Patient Full Name <span className="text-rose-400">*</span>
                      </label>
                      <input
                        id="patient-name"
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="e.g. Ramesh Patil"
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-white/10 border text-white text-xs sm:text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all ${
                          formErrors.fullName ? 'border-rose-400 bg-rose-950/20' : 'border-white/15'
                        }`}
                        disabled={isSubmitting}
                      />
                      {formErrors.fullName && (
                        <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{formErrors.fullName}</span>
                        </p>
                      )}
                    </div>

                    {/* Patient Phone */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1" htmlFor="patient-phone">
                        Mobile Phone Number <span className="text-rose-400">*</span>
                      </label>
                      <input
                        id="patient-phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="e.g. 9876543210"
                        maxLength={10}
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-white/10 border text-white text-xs sm:text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all ${
                          formErrors.phone ? 'border-rose-400 bg-rose-950/20' : 'border-white/15'
                        }`}
                        disabled={isSubmitting}
                      />
                      {formErrors.phone && (
                        <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{formErrors.phone}</span>
                        </p>
                      )}
                    </div>

                    {/* City / Location */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1" htmlFor="patient-city">
                        Patient City / Town
                      </label>
                      <select
                        id="patient-city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#0B1426] border border-white/15 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
                        disabled={isSubmitting}
                      >
                        {nearbyLocations.map((loc) => (
                          <option key={loc} value={loc} className="bg-[#0B1426] text-white">
                            {loc}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Preferred Slot */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1" htmlFor="patient-slot">
                        Preferred OPD Timing Slot
                      </label>
                      <select
                        id="patient-slot"
                        name="slot"
                        value={formData.slot}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#0B1426] border border-white/15 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
                        disabled={isSubmitting}
                      >
                        <option value="Morning Slot (10:00 AM – 4:00 PM)" className="bg-[#0B1426] text-white">
                          Morning: 10:00 AM – 4:00 PM
                        </option>
                        <option value="Evening Slot (6:00 PM – 8:00 PM)" className="bg-[#0B1426] text-white">
                          Evening: 6:00 PM – 8:00 PM
                        </option>
                        <option value="Acute Neuro Emergency (Immediate)" className="bg-[#0B1426] text-white">
                          Acute Emergency (Immediate Triage)
                        </option>
                      </select>
                    </div>

                  </div>

                  {/* Reason / Condition */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1" htmlFor="patient-condition">
                      Neurological Condition / Symptoms
                    </label>
                    <select
                      id="patient-condition"
                      name="condition"
                      value={formData.condition}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#0B1426] border border-white/15 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
                      disabled={isSubmitting}
                    >
                      <option value="Headache, Severe Migraine &amp; Facial Pain">Headache, Severe Migraine &amp; Facial Pain</option>
                      <option value="Fits, Seizures &amp; Epilepsy Evaluation">Fits, Seizures &amp; Epilepsy Evaluation</option>
                      <option value="Stroke, Paralysis &amp; Weakness Follow-up">Stroke, Paralysis &amp; Weakness Follow-up</option>
                      <option value="Nerve Pain, Tingling &amp; Burning Feet">Nerve Pain, Tingling &amp; Burning Feet</option>
                      <option value="Dizziness, Vertigo &amp; Loss of Balance">Dizziness, Vertigo &amp; Loss of Balance</option>
                      <option value="Parkinson's Disease, Tremors &amp; Walking Difficulty">Parkinson's Disease, Tremors &amp; Walking Difficulty</option>
                      <option value="Memory Loss, Forgetfulness &amp; Dementia">Memory Loss, Forgetfulness &amp; Dementia</option>
                      <option value="General Neurological Consultation">General Neurological Consultation</option>
                    </select>
                  </div>

                  {/* Submit Button & Direct Call Alternatives */}
                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 min-h-[46px] py-3 px-6 rounded-xl bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-sky-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-white" />
                          <span>Validating &amp; Formatting Request...</span>
                        </>
                      ) : (
                        <>
                          <CalendarCheck className="w-4 h-4 text-white" />
                          <span>Submit Appointment Request</span>
                        </>
                      )}
                    </button>

                    <a
                      href={`tel:${data.contact.phone}`}
                      className="min-h-[46px] py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold text-xs sm:text-sm border border-slate-700 transition-all flex items-center justify-center gap-2"
                    >
                      <Phone className="w-4 h-4 text-sky-400" />
                      <span>Direct Call</span>
                    </a>
                  </div>

                  <p className="text-[11px] text-slate-400 text-center pt-1">
                    Emergency acute stroke cases receive immediate 24/7 priority triage without advance booking.
                  </p>
                </form>
              ) : (
                /* Success Confirmation State */
                <div className="p-6 rounded-2xl bg-emerald-950/50 border border-emerald-500/40 space-y-4 animate-in fade-in zoom-in-95 duration-200">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white">
                        Appointment Request Formatted Successfully!
                      </h4>
                      <p className="text-xs text-emerald-200 mt-1 leading-relaxed">
                        Thank you, <strong>{formData.fullName}</strong>. Your consultation details for <strong>{formData.slot}</strong> ({formData.city}) have been prepared.
                      </p>
                    </div>
                  </div>

                  {/* Dispatch Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    <a
                      href={formattedWhatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[46px] py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-950/50 transition-all flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4 text-white" />
                      <span>Confirm on WhatsApp Desk</span>
                    </a>

                    <a
                      href={`tel:${data.contact.phone}`}
                      className="min-h-[46px] py-2.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md shadow-sky-950/50 transition-all flex items-center justify-center gap-2"
                    >
                      <Phone className="w-4 h-4 text-white" />
                      <span>Call Hospital: {data.contact.phoneDisplay}</span>
                    </a>
                  </div>

                  <div className="pt-2 text-center">
                    <button
                      onClick={resetForm}
                      className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
                    >
                      Submit another consultation request
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Interactive Google Maps Frame */}
            <div className="bg-[#F8FAFC] rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-sm overflow-hidden space-y-3">
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0B132B]">
                  <MapPin className="w-4 h-4 text-sky-600" />
                  <span>Google Maps — Godi Layout, near Rotary Circle, beside Kailash- In Hotel, Bagalkot (587101)</span>
                </div>
                <a
                  href={data.contact.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-sky-600 hover:underline font-bold"
                >
                  Open in Maps
                </a>
              </div>
              
              <div className="w-full h-72 sm:h-80 rounded-2xl overflow-hidden border border-slate-200 relative bg-slate-200">
                <iframe
                  title="Masaraddi Neuro Care Center Location Map"
                  src={data.contact.googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
