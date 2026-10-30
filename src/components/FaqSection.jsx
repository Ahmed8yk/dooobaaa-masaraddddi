import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Phone, MapPin, Clock, MessageSquare } from 'lucide-react';
import { useHospitalData } from '../context/HospitalContext.jsx';

export const FaqSection = () => {
  const { data } = useHospitalData();
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = Array.isArray(data.faqs) && data.faqs.length > 0 ? data.faqs : [];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 sm:py-24 bg-[#F8FAFC] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with local SEO keywords */}
        <div className="text-center space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100/90 border border-sky-200 text-sky-800 text-xs font-bold tracking-wide uppercase shadow-sm">
            <HelpCircle className="w-3.5 h-3.5 text-sky-600" />
            <span>Neurology FAQ &bull; Patient Search Guide</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B132B] tracking-tight font-outfit">
            Frequently Asked Patient Questions
          </h2>
          
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Essential answers for patients seeking the best neurologist, stroke care, epilepsy clinic, headache relief, and 24/7 ICU in Bagalkot, Navanagar, and North Karnataka.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="mt-12 sm:mt-14 space-y-3.5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.id || index}
                className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.02)] transition-all duration-200 hover:border-sky-300"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full p-4 sm:p-5 flex items-start justify-between gap-4 text-left cursor-pointer transition-colors hover:bg-slate-50/80"
                  aria-expanded={isOpen}
                >
                  <div className="space-y-1 pr-2">
                    {faq.category && (
                      <span className="text-[10px] font-bold text-sky-700 uppercase tracking-wider block">
                        {faq.category}
                      </span>
                    )}
                    <h3 className="text-sm sm:text-base font-bold text-[#0B132B] font-outfit leading-snug">
                      {faq.question}
                    </h3>
                  </div>

                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-all duration-200 mt-0.5 ${
                    isOpen 
                      ? 'bg-sky-600 text-white border-sky-600 rotate-180' 
                      : 'bg-slate-50 text-slate-500 border-slate-200'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-[#FAFCFE] pt-3 animate-in fade-in duration-150">
                    <p className="whitespace-pre-line">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Contact Box for Patients */}
        <div className="mt-10 sm:mt-12 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="text-base font-bold text-[#0B132B] font-outfit">
              Have questions regarding doctor availability or symptoms?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600">
              Our hospital desk is available to assist you with OPD timings, directions, and emergency admissions.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`tel:${data.contact.phone}`}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-sky-600/20 active:scale-95 transition-all inline-flex items-center gap-1.5"
            >
              <Phone className="w-4 h-4" />
              <span>Call Hospital</span>
            </a>
            <a
              href={`https://wa.me/${data.contact.whatsappNumber}?text=${encodeURIComponent(
                data.contact.whatsappMessage
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-semibold text-xs sm:text-sm active:scale-95 transition-all inline-flex items-center gap-1.5"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
