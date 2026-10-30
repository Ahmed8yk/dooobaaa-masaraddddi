import React from 'react';
import { 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  HeartHandshake, 
  Activity,
  BedDouble,
  Brain,
  Stethoscope,
  Award,
  Building2,
  GraduationCap
} from 'lucide-react';
import { useHospitalData } from '../context/HospitalContext.jsx';

export const AboutSection = () => {
  const { data } = useHospitalData();
  const doctor = data.doctors[0];
  const hospitalReg = data.governmentRegistration || {
    regNo: "BGK01185ALHL2",
    regNoAlt: "BGK01185ALH12",
    authority: "District Registration and Grievance Redressal Authority, Bagalkot",
    actShort: "KPME Act 2018",
    classification: "Hospital (Level 2) under Allopathy system of medicine",
    totalBeds: 30,
    icuBeds: 7,
    issueDate: "29 July 2025",
    validTill: "28 July 2030"
  };

  const clinicalPillars = [
    {
      icon: ShieldCheck,
      title: 'Neurologist in Bagalkot',
      desc: `Led by ${doctor?.name || 'Dr. Shivakumar K. Masaraddi'}, MBBS, MD, DM (Neurology), KMC Reg. 69073, with ${doctor?.experience || '12+ years'} of clinical expertise.`,
      badgeColor: 'bg-sky-50 text-sky-600 border-sky-100',
    },
    {
      icon: Activity,
      title: 'Dedicated Stroke & Epilepsy Care',
      desc: 'Structured clinical protocols for acute stroke stabilization, paralysis recovery, and anti-epileptic drug titration for fits and seizures.',
      badgeColor: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    },
    {
      icon: BedDouble,
      title: '30 Registered Beds (7 ICU)',
      desc: 'Officially certified 30-bed Allopathy Hospital (Level 2) with 7-bed 24/7 ICU vital monitoring, deluxe special rooms, and hygienic wards.',
      badgeColor: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    },
    {
      icon: HeartHandshake,
      title: 'Patient-First Clinical Neurology',
      desc: 'Thorough reflex testing, cranial nerve examinations, and compassionate care for headache, vertigo, nerve pain, and elderly dementia.',
      badgeColor: 'bg-amber-50 text-amber-600 border-amber-100',
    },
  ];

  const confirmedCapabilities = [
    "Complete Neurological Services in Bagalkot",
    "Emergency Stroke & Paralysis Care",
    "Epilepsy & Seizure Assessment",
    "24/7 Hi-Tech ICU (7 Dedicated Beds)",
    "On-site Pharmacy & Diagnostic Blood Lab",
    "Physiotherapy & Digital X-Ray Diagnostic Unit"
  ];

  return (
    <section className="py-20 sm:py-24 bg-[#F8FAFC] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with local SEO keywords */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100/90 border border-sky-200 text-sky-800 text-xs font-bold tracking-wide uppercase shadow-sm">
            <Brain className="w-3.5 h-3.5 text-sky-600" />
            <span>Brain &amp; Nerve Specialist Hospital in Bagalkot</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B132B] tracking-tight font-outfit">
            About {data.hospitalName}
          </h2>
          
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {data.established} in Bagalkot, offering structured clinical consultations, specialized nerve and brain evaluations, and 30 registered hospital beds (including 7 ICU beds) across Navanagar, Vidyagiri, and North Karnataka.
          </p>
        </div>

        {/* 2-Column Content Grid: Story & Visual Highlights */}
        <div className="mt-12 sm:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Hospital Overview Card */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-[0_10px_35px_rgba(0,0,0,0.03)] space-y-6">
              
              <div className="flex items-start gap-4">
                <img
                  src={data.logo || "/logo.png"}
                  alt="Masaraddi Neuro Care Centre Official Seal"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-sky-400/40 bg-white shadow-md shadow-sky-500/15 shrink-0"
                />
                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-sky-600 uppercase tracking-wider block">
                    Clinical Leadership &amp; Medical Focus
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0B132B] font-outfit">
                    Patient-Centered Neurological Care for Bagalkot &amp; Surrounding Towns
                  </h3>
                </div>
              </div>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                <strong>{data.hospitalName}</strong> is a dedicated neurology hospital established in May 2025. Led by Consultant Neurologist <strong>{doctor?.name}</strong> ({doctor?.qualificationsSummary}), the center is committed to providing evidence-based outpatient consultations, acute stroke care, epilepsy and seizure management, and inpatient monitoring for patients in Bagalkot, Navanagar, Vidyagiri, Badami, Jamkhandi, Mudhol, and surrounding regions.
              </p>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Whether you are seeking a <em>doctor for headache and migraine</em>, an evaluation for <em>dizziness and vertigo</em>, guidance for <em>nerve pain, numbness, and burning feet</em>, or specialized management for <em>Parkinson’s disease and tremors</em>, Masaraddi Neuro Care Center provides compassionate, comprehensive neurological consultations.
              </p>

              {/* Confirmed Capabilities */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {confirmedCapabilities.map((item, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-100"
                  >
                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                    <span className="text-xs font-semibold text-slate-700 leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* Verified Location Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-50 to-indigo-50 border border-sky-100/80 flex items-start gap-3">
                <MapPin className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-700">
                  <span className="font-bold text-[#0B132B] block">Hospital Location in Bagalkot</span>
                  {data.contact.address.full}
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: 4 Pillars & Quick Cert Trigger */}
          <div className="lg:col-span-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {clinicalPillars.map((p, i) => {
                const Icon = p.icon;
                return (
                  <div
                    key={i}
                    className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-[0_4px_16px_rgba(0,0,0,0.02)] hover:border-sky-200 transition-all duration-200"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border ${p.badgeColor}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm sm:text-base font-bold text-[#0B132B] font-outfit">
                          {p.title}
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {p.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Accreditation Box */}
            <div className="bg-gradient-to-br from-emerald-950 via-[#0B132B] to-slate-900 text-white p-5 sm:p-6 rounded-3xl border border-emerald-800/40 shadow-lg space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                    Official Recognition
                  </span>
                </div>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded-full font-mono font-bold">
                  Verified &bull; 2025–2030
                </span>
              </div>

              <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Hospital KPME:</strong> Reg. No. <strong className="text-white font-mono">{hospitalReg.regNo}</strong> (30 Beds, Level 2)</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-sky-400 shrink-0" />
                  <span><strong>Doctor KMC:</strong> Reg. No. <strong className="text-white font-mono">69073</strong> (MBBS, MD, DM Neurology)</span>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10 text-[11px] text-slate-400">
                Department of Health &amp; Family Welfare Services &bull; Govt of Karnataka
              </div>
            </div>

          </div>

        </div>

        {/* OFFICIAL HOSPITAL & DOCTOR REGISTRATION */}
        <div className="mt-14 bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/90 shadow-[0_10px_30px_rgba(0,0,0,0.03)] space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Government of Karnataka &amp; Medical Council</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B132B] font-outfit uppercase tracking-tight">
            ( OFFICIAL HOSPITAL &amp; DOCTOR REGISTRATION )
          </h3>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-4xl">
            <strong>Masaraddi Neuro Care Center</strong> is an officially licensed and registered healthcare facility under the Karnataka Private Medical Establishment (KPME) Act 2018 with Government Registration No. <strong className="text-slate-900 font-mono">BGK01185ALHL2</strong>, authorized as a Level 2 Allopathy Hospital with 30 registered beds (including 7 dedicated ICU beds) valid through 28 July 2030 by the District Registration and Grievance Redressal Authority, Bagalkot. The hospital is directed by Chief Consultant Neurologist <strong>Dr. Shivakumar K. Masaraddi</strong>, formally registered with the Karnataka Medical Council (KMC Registration No. <strong className="text-slate-900 font-mono">69073</strong>) holding verified qualifications of MBBS, MD (General Medicine), and DM (Neurology).
          </p>

          <div className="pt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-500 border-t border-slate-100">
            <span className="flex items-center gap-1.5 font-medium text-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              KPME Hospital Reg. No: BGK01185ALHL2 (Level 2 &bull; 30 Beds)
            </span>
            <span className="flex items-center gap-1.5 font-medium text-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" />
              KMC Doctor Reg. No: 69073 (Dr. Shivakumar K. Masaraddi)
            </span>
            <span className="text-slate-400">
              Government of Karnataka Statutory Compliance
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
