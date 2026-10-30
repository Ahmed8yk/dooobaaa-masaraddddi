import React from 'react';
import { 
  Award, 
  Clock, 
  Phone, 
  GraduationCap, 
  ShieldCheck, 
  CheckCircle2,
  Brain,
  Activity,
  Zap,
  HeartPulse,
  Compass,
  FileText
} from 'lucide-react';
import { useHospitalData } from '../context/HospitalContext.jsx';

export const DoctorsSection = () => {
  const { data } = useHospitalData();
  const doctor = data.doctors[0];
  const registration = doctor.registration || {
    council: "Karnataka Medical Council, Bengaluru",
    regNo: "69073",
    regDate: "23 Jul 2004"
  };

  // Natural everyday patient search conditions evaluated by Dr. Shivakumar K. Masaraddi
  const conditionsEvaluated = [
    { title: "Headache & Severe Migraine", query: "Doctor for headache & migraine", icon: Zap },
    { title: "Fits, Seizures & Epilepsy", query: "Doctor for fits & seizures", icon: ShieldCheck },
    { title: "Stroke & Paralysis Recovery", query: "Stroke treatment in Bagalkot", icon: Activity },
    { title: "Dizziness, Vertigo & Loss of Balance", query: "Doctor for dizziness & vertigo", icon: Compass },
    { title: "Nerve Pain, Numbness & Tingling", query: "Nerve pain specialist", icon: FileText },
    { title: "Diabetic Neuropathy & Burning Feet", query: "Burning feet & diabetic nerve care", icon: Activity },
    { title: "Parkinson's Disease & Hand Tremors", query: "Parkinson's disease specialist", icon: HeartPulse },
    { title: "Memory Loss & Dementia in Elderly", query: "Memory problems doctor", icon: Brain },
  ];

  return (
    <section id="doctors" className="py-20 sm:py-24 bg-[#F8FAFC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Natural Search SEO Keywords */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100/90 border border-sky-200 text-sky-800 text-xs font-bold tracking-wide uppercase shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
            <span>Consultant Neurologist &bull; Bagalkot &amp; Navanagar</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B132B] tracking-tight font-outfit">
            Medical Leadership &amp; Neurologist Profile
          </h2>
          
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Direct clinical consultations, reflex evaluations, and individualized brain, nerve, and spine treatment under <strong>{doctor.name}</strong> (DM Neurology &bull; KMC Reg. No. 69073).
          </p>
        </div>

        {/* Doctor Profile Card */}
        <div className="mt-12 sm:mt-14 max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-200/90 shadow-[0_15px_45px_rgba(0,0,0,0.04)]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              
              {/* Doctor Photo & Badges */}
              <div className="md:col-span-4 flex flex-col items-center text-center">
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-3xl overflow-hidden border-4 border-white shadow-xl bg-slate-900 mb-4 group">
                  <img
                    src={doctor.image}
                    alt={`${doctor.name} - Neurologist and Brain Doctor in Bagalkot (KMC Reg. 69073)`}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#080E1A] to-transparent p-2.5">
                    <span className="text-[11px] text-white font-bold block">{doctor.qualificationsSummary}</span>
                    <span className="text-[10px] text-sky-300 font-medium">KMC Reg: 69073 &bull; Bagalkot</span>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold shadow-xs">
                  <Award className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{doctor.experience}</span>
                </div>
                
                <span className="text-[11px] text-slate-600 mt-2 font-medium">
                  {data.established}
                </span>
              </div>

              {/* Doctor Details & Verified Qualifications */}
              <div className="md:col-span-8 space-y-5">
                
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-sky-700 bg-sky-50 border border-sky-200 px-3 py-1 rounded-full uppercase tracking-wider">
                      {doctor.specialization} Specialist &bull; Bagalkot
                    </span>
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      KMC Reg. No. 69073
                    </span>
                    <span className="text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-full">
                      24/7 ICU Backup
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B132B] font-outfit mt-2">
                    {doctor.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-0.5">
                    {doctor.qualificationsSummary} &bull; Consultant Neurologist
                  </p>
                </div>

                {/* Verified Medical Registration & Qualifications Card */}
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-50 via-sky-50/40 to-slate-50 border border-sky-200/90 shadow-xs space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-sky-100 pb-2.5">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#0B132B] uppercase tracking-wider">
                      <GraduationCap className="w-4 h-4 text-sky-600 shrink-0" />
                      <span>Medical Registration &amp; Verified Qualifications</span>
                    </div>
                    <span className="text-[11px] font-mono font-bold text-sky-900 bg-white px-2 py-0.5 rounded-lg border border-sky-200 shadow-2xs">
                      Reg: {registration.regNo} (23 Jul 2004)
                    </span>
                  </div>

                  <div className="space-y-2">
                    {doctor.qualificationsDetailed ? (
                      doctor.qualificationsDetailed.map((q, index) => (
                        <div key={index} className="p-2.5 rounded-xl bg-white/90 border border-slate-200/80 flex items-start justify-between gap-2 text-xs">
                          <div className="space-y-0.5">
                            <div className="font-bold text-[#0B132B] flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span>{q.degree}</span>
                              <span className="text-[10px] font-semibold text-slate-500">({q.passingYear})</span>
                            </div>
                            <p className="text-slate-600 pl-5 text-[11px]">
                              {q.college} &bull; <span className="text-slate-500">{q.university}</span>
                            </p>
                          </div>
                          <span className="text-[10px] font-mono text-slate-500 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200 shrink-0 hidden sm:inline-block">
                            Reg: {q.councilRegDate}
                          </span>
                        </div>
                      ))
                    ) : (
                      <ul className="space-y-1.5 pt-1">
                        {doctor.qualificationsList.map((qual, index) => (
                          <li key={index} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 font-medium">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{qual}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Official KMC Registration Note */}
                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-white/80 p-3 rounded-xl border border-sky-100">
                    <div className="text-[11px] text-slate-600">
                      <span className="font-semibold text-slate-800 block">Karnataka Medical Council (KMC) Registration</span>
                      <span>Verified under Karnataka Medical Registration Act 34 of 1961 &bull; Reg. No. 69073</span>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Medical Council Verified</span>
                    </span>
                  </div>
                </div>

                {/* Professional Bio & Clinical Philosophy */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                  {doctor.bio}
                </p>

                {/* OPD Timings Display */}
                <div className="p-3.5 sm:p-4 rounded-2xl bg-sky-50/80 border border-sky-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0B132B]">
                    <Clock className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>OPD Consultation Timings:</span>
                  </div>
                  <span className="text-xs sm:text-sm font-extrabold text-sky-950 bg-white px-3 py-1 rounded-xl border border-sky-200 shadow-xs">
                    {doctor.timings}
                  </span>
                </div>

                {/* Call to Consult CTA */}
                <div className="pt-2">
                  <a
                    href={`tel:${data.contact.phone}`}
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-sky-600/25 transition-all hover:scale-[1.01] active:scale-95 text-center"
                    aria-label={`Call to schedule appointment with ${doctor.name}`}
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call to Check Doctor Availability &amp; Schedule Visit</span>
                  </a>
                  <p className="text-[11px] text-slate-500 text-center mt-2">
                    Consultations are scheduled via direct phone call at <strong className="text-slate-700">{data.contact.phoneDisplay}</strong>.
                  </p>
                </div>

              </div>

            </div>

            {/* Everyday Patient Symptoms Evaluated Strip */}
            <div className="mt-8 pt-8 border-t border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0B132B]">
                  Frequently Evaluated Neurological Symptoms:
                </span>
                <span className="text-[11px] text-sky-700 font-semibold">
                  Bagalkot &bull; Navanagar &bull; Vidyagiri &bull; 90 km Catchment
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                {conditionsEvaluated.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div 
                      key={idx}
                      className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-start gap-2.5 hover:bg-sky-50/60 hover:border-sky-300 transition-colors"
                    >
                      <Icon className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-bold text-slate-800 leading-tight">{item.title}</p>
                        <p className="text-[10px] text-slate-500 mt-0.5">{item.query}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
