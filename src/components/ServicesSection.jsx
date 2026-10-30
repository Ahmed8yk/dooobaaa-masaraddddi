import React, { useState } from 'react';
import { 
  Activity, 
  Zap, 
  Brain, 
  ShieldAlert, 
  CheckCircle2, 
  ArrowRight, 
  Phone, 
  FileText, 
  HeartPulse, 
  Compass,
  BedDouble,
  Search,
  MessageSquare
} from 'lucide-react';
import { useHospitalData } from '../context/HospitalContext.jsx';

export const ServicesSection = () => {
  const { data } = useHospitalData();
  const [selectedService, setSelectedService] = useState(null);

  const getServiceIcon = (iconName) => {
    switch (iconName) {
      case 'Brain': return Brain;
      case 'Activity': return Activity;
      case 'ShieldAlert': return ShieldAlert;
      case 'Zap': return Zap;
      case 'FileText': return FileText;
      case 'HeartPulse': return HeartPulse;
      case 'Compass': return Compass;
      case 'BedDouble': return BedDouble;
      default: return Brain;
    }
  };

  // Everyday search phrases patients use when seeking care
  const everydaySearchTags = [
    "Brain doctor near me",
    "Doctor for headache & migraine",
    "Doctor for fits & seizures",
    "Stroke & paralysis treatment",
    "Doctor for dizziness & vertigo",
    "Nerve pain specialist",
    "Doctor for numbness & tingling",
    "Parkinson's disease doctor",
    "Memory problems & dementia",
    "Neurology hospital near Navanagar"
  ];

  return (
    <section id="services" className="py-20 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Natural Local SEO Keywords */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold tracking-wide uppercase shadow-sm">
            <Activity className="w-3.5 h-3.5 text-sky-600" />
            <span>Specialized Neurology Services in Bagalkot</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B132B] tracking-tight font-outfit">
            Comprehensive Neurological Services
          </h2>
          
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Specialized clinical evaluations, acute stroke and paralysis management, epilepsy and fits care, chronic headache relief, and 24/7 ICU inpatient monitoring in Bagalkot.
          </p>
        </div>

        {/* Everyday Patient Symptom Search Tag Cloud */}
        <div className="mt-8 max-w-4xl mx-auto p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200/80">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 mb-2.5">
            <Search className="w-3.5 h-3.5 text-sky-600" />
            <span>Common Patient Searches &amp; Clinical Conditions Evaluated:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {everydaySearchTags.map((tag, idx) => (
              <span 
                key={idx}
                className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 shadow-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {data.services.map((service) => {
            const Icon = getServiceIcon(service.icon);
            return (
              <div
                key={service.id}
                className="bg-[#F8FAFC] rounded-3xl p-6 sm:p-7 border border-slate-200/90 hover:border-sky-400 hover:bg-white hover:shadow-xl hover:shadow-sky-500/10 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-200/80 text-sky-600 flex items-center justify-center group-hover:bg-gradient-to-tr group-hover:from-sky-500 group-hover:to-blue-600 group-hover:text-white group-hover:border-transparent transition-all duration-300 shadow-xs">
                      <Icon className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    
                    <span className="text-[10px] font-bold text-sky-900 bg-sky-100/90 border border-sky-200 px-2.5 py-1 rounded-full uppercase tracking-wider text-right">
                      {service.category}
                    </span>
                  </div>

                  {/* Patient Everyday Query Badge */}
                  {service.patientQueryTag && (
                    <div className="inline-block px-2.5 py-0.5 rounded-md bg-amber-50 border border-amber-200/80 text-[10px] font-bold text-amber-900">
                      Target: {service.patientQueryTag}
                    </div>
                  )}

                  {/* Title & Short Description */}
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#0B132B] font-outfit group-hover:text-sky-600 transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                      {service.shortDescription}
                    </p>
                  </div>

                  {/* Common Symptoms / Clinical Features Preview */}
                  {Array.isArray(service.commonSymptoms) && service.commonSymptoms.length > 0 && (
                    <div className="pt-2 space-y-1.5 border-t border-slate-200/70">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 block">Common Symptoms:</span>
                      {service.commonSymptoms.slice(0, 3).map((symptom, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" />
                          <span className="leading-tight">{symptom}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Action Footnotes */}
                <div className="pt-5 mt-5 border-t border-slate-200/60 flex items-center justify-between text-xs">
                  <button
                    onClick={() => setSelectedService(service)}
                    className="inline-flex items-center gap-1.5 font-bold text-sky-600 hover:text-sky-700 group-hover:translate-x-0.5 transition-transform cursor-pointer"
                  >
                    <span>Clinical Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={`tel:${data.contact.phone}`}
                    className="p-2 rounded-xl bg-white hover:bg-sky-50 text-slate-700 hover:text-sky-600 border border-slate-200 shadow-xs transition-colors flex items-center gap-1"
                    title={`Call hospital regarding ${service.name}`}
                  >
                    <Phone className="w-3.5 h-3.5 text-sky-600" />
                    <span className="text-[11px] font-semibold hidden sm:inline">Inquire</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Appointment Process Banner */}
        <div className="mt-14 rounded-3xl bg-[#080E1A] p-6 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
          <div className="space-y-2 max-w-2xl text-center md:text-left">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-wider block">
              Consultation &amp; Appointment Instructions
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-outfit text-white">
              Schedule an Appointment with Dr. Shivakumar K. Masaraddi
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Call the hospital to confirm doctor availability before visiting. Outpatient consultations are scheduled Monday through Saturday during OPD hours ({data.contact.timings.opdSlot1} &bull; {data.contact.timings.opdSlot2}).
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            <a
              href={`tel:${data.contact.phone}`}
              className="min-h-[46px] px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-sky-600/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call: {data.contact.phoneDisplay}</span>
            </a>
            <a
              href={`https://wa.me/${data.contact.whatsappNumber}?text=${encodeURIComponent(
                data.contact.whatsappMessage
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[46px] px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs sm:text-sm border border-slate-700 transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Desk</span>
            </a>
          </div>
        </div>

      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setSelectedService(null)}
          aria-modal="true"
          role="dialog"
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-100 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-sky-600 uppercase tracking-wider block">
                  {selectedService.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#0B132B] font-outfit">
                  {selectedService.name}
                </h3>
                {selectedService.patientQueryTag && (
                  <span className="inline-block text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    Common Search: {selectedService.patientQueryTag}
                  </span>
                )}
              </div>
              <button
                onClick={() => setSelectedService(null)}
                className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer text-sm font-bold"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {selectedService.detailedDescription}
            </p>

            {Array.isArray(selectedService.commonSymptoms) && selectedService.commonSymptoms.length > 0 && (
              <div className="space-y-2 p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200/80">
                <h4 className="text-xs font-bold text-[#0B132B] uppercase tracking-wider">
                  Associated Symptoms &amp; Clinical Indicators:
                </h4>
                <ul className="space-y-1.5">
                  {selectedService.commonSymptoms.map((symptom, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0 mt-1.5" />
                      <span>{symptom}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {Array.isArray(selectedService.whatWeOffer) && selectedService.whatWeOffer.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-[#0B132B] uppercase tracking-wider">
                  What We Offer at Masaraddi Neuro Care Center:
                </h4>
                <ul className="space-y-1.5">
                  {selectedService.whatWeOffer.map((offer, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{offer}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <a
                href={`tel:${data.contact.phone}`}
                className="flex-1 min-h-[44px] inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold text-xs shadow-md shadow-sky-600/25 active:scale-95 transition-transform"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Hospital Desk</span>
              </a>
              <button
                type="button"
                onClick={() => setSelectedService(null)}
                className="min-h-[44px] py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs active:scale-95 transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
