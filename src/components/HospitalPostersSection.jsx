import React, { useState, useEffect } from 'react';
import { 
  Download, 
  Heart, 
  Bookmark, 
  Eye, 
  X, 
  Check, 
  Share2, 
  Sparkles, 
  ShieldCheck, 
  FileDown, 
  ExternalLink,
  ChevronRight,
  Phone
} from 'lucide-react';
import { useHospitalData } from '../context/HospitalContext.jsx';
import { downloadFile, downloadHospitalContactCard } from '../utils/hospitalActions.js';

export const HospitalPostersSection = () => {
  const { data } = useHospitalData();
  const posters = data.hospitalPosters || [];

  // Like & Remember state (persisted in localStorage)
  const [likesCount, setLikesCount] = useState(1482);
  const [isLiked, setIsLiked] = useState(false);
  const [isRemembered, setIsRemembered] = useState(false);
  const [activeToast, setActiveToast] = useState(null);
  const [previewPoster, setPreviewPoster] = useState(null);
  const [downloadingId, setDownloadingId] = useState(null);

  // Initialize from localStorage
  useEffect(() => {
    try {
      const storedLiked = localStorage.getItem('masaraddi_liked') === 'true';
      const storedLikesCount = parseInt(localStorage.getItem('masaraddi_likes_count') || '1482', 10);
      const storedRemembered = localStorage.getItem('masaraddi_remembered') === 'true';

      setIsLiked(storedLiked);
      setLikesCount(storedLiked ? Math.max(1482, storedLikesCount) : 1482);
      setIsRemembered(storedRemembered);
    } catch {
      // LocalStorage fallback
    }
  }, []);

  const triggerToast = (message) => {
    setActiveToast(message);
    setTimeout(() => {
      setActiveToast((curr) => (curr === message ? null : curr));
    }, 4000);
  };

  const handleLikeToggle = () => {
    const nextState = !isLiked;
    const nextCount = nextState ? likesCount + 1 : Math.max(1482, likesCount - 1);

    setIsLiked(nextState);
    setLikesCount(nextCount);

    try {
      localStorage.setItem('masaraddi_liked', String(nextState));
      localStorage.setItem('masaraddi_likes_count', String(nextCount));
    } catch {}

    if (nextState) {
      triggerToast('Thank you for liking & recommending Masaraddi Neuro Care Center!');
    } else {
      triggerToast('Removed recommendation.');
    }
  };

  const handleRememberUs = () => {
    setIsRemembered(true);
    try {
      localStorage.setItem('masaraddi_remembered', 'true');
    } catch {}

    // Download hospital vCard for instant phone contacts saving
    downloadHospitalContactCard();
    triggerToast('Hospital Contact Card saved! Emergency & OPD phone numbers downloaded to your device.');
  };

  const handleDownloadPoster = async (poster, e) => {
    if (e) e.stopPropagation();
    setDownloadingId(poster.id);
    await downloadFile(poster.imageUrl, poster.downloadFileName);
    setDownloadingId(null);
    triggerToast(`Downloaded "${poster.shortTitle}" in high-resolution.`);
  };

  return (
    <section id="official-posters" className="py-20 bg-gradient-to-b from-[#080E1A] via-[#0B132B] to-[#080E1A] text-white relative overflow-hidden">
      {/* Decorative ambient radial glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Top Header: Section Title & Subheading */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-950/80 border border-sky-400/30 text-sky-300 text-xs font-bold tracking-wide uppercase shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>Official Hospital Brochures &amp; Patient Infographics</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-outfit">
            Official Hospital Guides &amp; Facilities
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            View and download official Masaraddi Neuro Care Center infographics detailing our 24x7 Hi-Tech ICU, clinical facilities, comprehensive neurological treatments, and consultant profile.
          </p>

          {/* Action Ribbon: "Remember Us" & "Like" Interactive Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            {/* Remember Us Button */}
            <button
              type="button"
              onClick={handleRememberUs}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300 shadow-md cursor-pointer border ${
                isRemembered
                  ? 'bg-emerald-600 text-white border-emerald-400 shadow-emerald-500/20'
                  : 'bg-white/10 hover:bg-white/15 text-slate-100 border-white/20 hover:border-white/40'
              }`}
              title="Save hospital contact & emergency details directly to your phone/device"
            >
              {isRemembered ? (
                <>
                  <Check className="w-4 h-4 text-emerald-200" />
                  <span>Remembered on Device</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-4 h-4 text-sky-400" />
                  <span>Remember Us (Save Contact)</span>
                </>
              )}
            </button>

            {/* Like / Recommend Button */}
            <button
              type="button"
              onClick={handleLikeToggle}
              className={`inline-flex items-center gap-2.5 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300 shadow-md cursor-pointer border ${
                isLiked
                  ? 'bg-rose-600 text-white border-rose-400 shadow-rose-500/30 scale-105'
                  : 'bg-white/10 hover:bg-white/15 text-slate-100 border-white/20 hover:border-white/40'
              }`}
              title="Like & recommend Masaraddi Neuro Care Center"
            >
              <Heart 
                className={`w-4 h-4 transition-transform duration-300 ${
                  isLiked ? 'fill-white text-white scale-110' : 'text-rose-400'
                }`} 
              />
              <span>{isLiked ? 'Liked' : 'Like'}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                isLiked ? 'bg-white/25 text-white' : 'bg-white/10 text-slate-300'
              }`}>
                {likesCount.toLocaleString()}
              </span>
            </button>
          </div>
        </div>

        {/* 3 Official Posters Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {posters.map((poster, index) => (
            <div
              key={poster.id}
              className="group bg-slate-900/90 rounded-3xl border border-slate-800 hover:border-sky-500/50 shadow-xl hover:shadow-2xl hover:shadow-sky-500/10 transition-all duration-300 flex flex-col overflow-hidden"
            >
              {/* Image Container with Hover Overlay & Preview Trigger */}
              <div 
                onClick={() => setPreviewPoster(poster)}
                className="relative aspect-[16/11] sm:aspect-[4/3] bg-black cursor-pointer overflow-hidden"
              >
                <img
                  src={poster.imageUrl}
                  alt={poster.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  loading="lazy"
                />

                {/* Subtle top & bottom vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/40 opacity-70 group-hover:opacity-60 transition-opacity" />

                {/* Category Badge */}
                <div className="absolute top-3.5 left-3.5 z-10">
                  <span className="text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full bg-[#080E1A]/85 backdrop-blur-md text-sky-300 border border-white/10">
                    {poster.badge}
                  </span>
                </div>

                {/* Hover Preview Button Overlay */}
                <div className="absolute inset-0 z-20 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/40 backdrop-blur-xs">
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-slate-950 font-bold text-xs shadow-lg">
                    <Eye className="w-4 h-4 text-sky-600" />
                    <span>View Fullscreen</span>
                  </span>
                </div>
              </div>

              {/* Poster Card Details */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-base sm:text-lg font-bold text-white font-outfit group-hover:text-sky-300 transition-colors line-clamp-2">
                    {poster.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                    {poster.description}
                  </p>
                </div>

                {/* Action Buttons: Preview & Direct Download */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPreviewPoster(poster)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-semibold border border-white/10 transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-sky-400" />
                    <span>Inspect</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => handleDownloadPoster(poster, e)}
                    disabled={downloadingId === poster.id}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white text-xs font-bold shadow-md shadow-sky-600/30 transition-all cursor-pointer active:scale-95 disabled:opacity-50"
                  >
                    <Download className={`w-3.5 h-3.5 ${downloadingId === poster.id ? 'animate-bounce' : ''}`} />
                    <span>{downloadingId === poster.id ? 'Downloading...' : 'Download Image'}</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Hospital Contact Prompt */}
        <div className="mt-12 bg-slate-900/60 rounded-3xl p-5 sm:p-7 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="text-sm sm:text-base font-bold text-white font-outfit">
              Need these posters or emergency patient guides for your clinic or family?
            </h4>
            <p className="text-xs text-slate-400">
              Free to download and share. For emergency hospital admission in Bagalkot, call our 24/7 desk directly.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handleRememberUs}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold border border-white/15 cursor-pointer"
            >
              <Bookmark className="w-3.5 h-3.5 text-sky-400" />
              <span>{isRemembered ? 'Saved to Contacts' : 'Remember Us'}</span>
            </button>

            <a
              href={`tel:${data.contact.phone}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white text-xs font-bold shadow-md hover:from-sky-400 hover:to-blue-500 transition-all"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call 24/7 Desk</span>
            </a>
          </div>
        </div>

      </div>

      {/* Fullscreen Poster Inspection & High-Res Download Modal */}
      {previewPoster && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-md animate-in fade-in duration-200">
          
          {/* Top Bar with Title, Download Button, and Close */}
          <div className="absolute top-4 inset-x-4 sm:inset-x-8 flex items-center justify-between z-30">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300 bg-black/70 px-3.5 py-1.5 rounded-full border border-white/10 backdrop-blur-md max-w-[70%] sm:max-w-md truncate">
              <span className="text-sky-400 font-bold shrink-0">{previewPoster.badge}</span>
              <span className="text-slate-500">•</span>
              <span className="truncate">{previewPoster.shortTitle}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleDownloadPoster(previewPoster)}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-sky-600/30 cursor-pointer active:scale-95 transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download High-Res</span>
              </button>

              <button
                type="button"
                onClick={() => setPreviewPoster(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer border border-white/10"
                aria-label="Close poster preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Image Stage */}
          <div className="max-w-5xl w-full max-h-[85vh] flex flex-col items-center justify-center space-y-4 px-2 sm:px-4">
            <div className="relative rounded-2xl overflow-hidden max-h-[72vh] border border-white/10 shadow-2xl bg-black">
              <img
                src={previewPoster.imageUrl}
                alt={previewPoster.title}
                className="max-h-[72vh] w-auto max-w-full object-contain mx-auto"
              />
            </div>

            <div className="text-center space-y-1 max-w-2xl px-2">
              <h3 className="text-sm sm:text-base font-bold text-white font-outfit">
                {previewPoster.title}
              </h3>
              <p className="text-xs text-slate-300">
                {previewPoster.description}
              </p>
            </div>
          </div>

        </div>
      )}

      {/* Floating Feedback Toast Notification */}
      {activeToast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-slate-900/95 text-white p-4 rounded-2xl border border-sky-500/40 shadow-2xl backdrop-blur-md animate-in slide-in-from-bottom-5 duration-300 flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center shrink-0">
            <Check className="w-4 h-4 text-sky-400" />
          </div>
          <div className="flex-1 text-xs sm:text-sm">
            <p className="font-semibold">{activeToast}</p>
          </div>
          <button
            type="button"
            onClick={() => setActiveToast(null)}
            className="text-slate-400 hover:text-white p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

    </section>
  );
};
