import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Stethoscope, 
  BedDouble, 
  Award,
  Heart,
  Bookmark,
  Check,
  FileDown,
  Sparkles
} from 'lucide-react';
import { useHospitalData } from '../context/HospitalContext.jsx';
import { downloadHospitalContactCard } from '../utils/hospitalActions.js';

export const TrustStatsBar = () => {
  const { data } = useHospitalData();
  const doctor = data.doctors[0];
  const hospitalReg = data.governmentRegistration;

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

  return (
    <section className="relative z-20 -mt-6 sm:-mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-3xl p-5 sm:p-7 lg:p-8 shadow-[0_20px_50px_rgba(15,23,42,0.08)] border border-slate-200/80 transition-all duration-300">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 lg:divide-x divide-slate-100">
          
          {/* Stat 1: Verified Specialist Doctor */}
          <div className="flex items-center gap-3.5 pt-3 first:pt-0 sm:pt-0 lg:px-3">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center shrink-0">
              <Stethoscope className="w-5 h-5 sm:w-6 sm:h-6 text-sky-600" />
            </div>
            <div className="min-w-0">
              <div className="text-sm sm:text-base font-extrabold text-[#0B132B] font-outfit truncate">
                {doctor?.name || 'Dr. Shivkumar Masaraddi'}
              </div>
              <p className="text-xs font-semibold text-sky-700 truncate mt-0.5">
                {doctor?.qualificationsSummary || 'MBBS, MD (Gen Med), DM (Neuro)'}
              </p>
              <div className="text-[11px] font-semibold text-slate-500 flex items-center gap-1 mt-0.5">
                <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0" />
                <span>KMC Reg. No. 69073</span>
              </div>
            </div>
          </div>

          {/* Stat 2: Verified Clinical Experience */}
          <div className="flex items-center gap-3.5 pt-3 sm:pt-0 lg:px-3">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
            </div>
            <div className="min-w-0">
              <div className="text-sm sm:text-base font-extrabold text-[#0B132B] font-outfit">
                {doctor?.experience || '12+ Years Experience'}
              </div>
              <p className="text-xs font-semibold text-slate-700 mt-0.5">
                Clinical Medical Practice
              </p>
              <p className="text-[11px] text-slate-500">
                Practicing Since 2014 &bull; KMC 2004
              </p>
            </div>
          </div>

          {/* Stat 3: 30 Beds & 7 ICU KPME Certified */}
          <div className="flex items-center gap-3.5 pt-3 sm:pt-0 lg:px-3">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
              <BedDouble className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
            </div>
            <div className="min-w-0">
              <div className="text-sm sm:text-base font-extrabold text-[#0B132B] font-outfit">
                30 Beds &bull; 7 ICU Care
              </div>
              <p className="text-xs font-semibold text-slate-700 mt-0.5">
                Level 2 Allopathy Hospital
              </p>
              <div className="text-[11px] font-semibold text-slate-500 flex items-center gap-1 mt-0.5">
                <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0" />
                <span>KPME Reg: {hospitalReg?.regNo || 'BGK01185ALHL2'}</span>
              </div>
            </div>
          </div>

          {/* Stat 4: Verified Location */}
          <div className="flex items-center gap-3.5 pt-3 sm:pt-0 lg:px-3">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
            </div>
            <div className="min-w-0">
              <div className="text-sm sm:text-base font-extrabold text-[#0B132B] font-outfit">
                Bagalkot, Karnataka
              </div>
              <p className="text-xs font-semibold text-slate-700 mt-0.5 truncate">
                Near Rotary Circle, beside Kailash- In Hotel
              </p>
              <a
                href={data.contact?.googleMapsDirectionsUrl || "https://share.google/kY37dzPJA6qIplc1D"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-bold text-sky-600 hover:underline inline-flex items-center gap-1"
              >
                <span>Open in Google Maps</span>
                <span>&rarr;</span>
              </a>
            </div>
          </div>

        </div>

        {/* Interactive Patient Actions Strip: Remember Us & Like Masaraddi Neuro Care */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-500 font-medium text-center sm:text-left">
            <Sparkles className="w-3.5 h-3.5 text-sky-600 shrink-0" />
            <span>Official Patient Resources &bull; 24/7 Bagalkot Neuro Care Center</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {/* Remember Us Button */}
            <button
              type="button"
              onClick={handleRememberUs}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer border ${
                isRemembered
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300 shadow-xs'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
              title="Download hospital vCard & emergency numbers to your device"
            >
              {isRemembered ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Saved to Contacts</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-3.5 h-3.5 text-sky-600" />
                  <span>Remember Us</span>
                </>
              )}
            </button>

            {/* Like Button */}
            <button
              type="button"
              onClick={handleLikeToggle}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer border ${
                isLiked
                  ? 'bg-rose-50 text-rose-700 border-rose-300 shadow-xs'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
              title="Like & recommend Masaraddi Neuro Care Center"
            >
              <Heart 
                className={`w-3.5 h-3.5 transition-transform ${
                  isLiked ? 'fill-rose-500 text-rose-500 scale-110' : 'text-slate-400'
                }`} 
              />
              <span>{isLiked ? 'Liked' : 'Like'}</span>
              <span className="text-[11px] text-slate-500 font-normal">
                ({likesCount.toLocaleString()})
              </span>
            </button>

            {/* Link to Posters & Guides */}
            <a
              href="#official-posters"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 font-bold transition-colors"
            >
              <FileDown className="w-3.5 h-3.5 text-sky-600" />
              <span>Official Guides &amp; Posters</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
