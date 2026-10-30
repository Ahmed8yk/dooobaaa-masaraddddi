import React, { useState, useEffect, useCallback } from 'react';
import { HospitalProvider } from './context/HospitalContext.jsx';
import { StructuredData } from './components/StructuredData.jsx';
import { Navbar } from './components/Navbar.jsx';
import { HeroSlideshow } from './components/HeroSlideshow.jsx';
import { TrustStatsBar } from './components/TrustStatsBar.jsx';
import { AboutSection } from './components/AboutSection.jsx';
import { ServicesSection } from './components/ServicesSection.jsx';
import { DoctorsSection } from './components/DoctorsSection.jsx';
import { FacilitiesSection } from './components/FacilitiesSection.jsx';
import { HospitalPostersSection } from './components/HospitalPostersSection.jsx';
import { PhotoGallery } from './components/PhotoGallery.jsx';
import { ServiceAreaSection } from './components/ServiceAreaSection.jsx';
import { FaqSection } from './components/FaqSection.jsx';
import { ContactSection } from './components/ContactSection.jsx';
import { Footer } from './components/Footer.jsx';
import { MobileStickyBar } from './components/MobileStickyBar.jsx';
import { LegalModal } from './components/LegalModal.jsx';
import { AppointmentCallPopup } from './components/AppointmentCallPopup.jsx';

export default function App() {
  const [activeLegalPolicy, setActiveLegalPolicy] = useState(null);

  const legalPolicyKeys = [
    'privacy-policy',
    'terms',
    'medical-disclaimer',
    'cookie-policy',
    'appointment-policy',
    'contact-info'
  ];

  // Sync with browser URL hash
  useEffect(() => {
    const handleHashCheck = () => {
      const hash = window.location.hash.replace('#', '');
      if (legalPolicyKeys.includes(hash)) {
        setActiveLegalPolicy(hash);
      }
    };

    handleHashCheck();
    window.addEventListener('hashchange', handleHashCheck);
    return () => window.removeEventListener('hashchange', handleHashCheck);
  }, []);

  const handleOpenLegal = useCallback((policyId) => {
    setActiveLegalPolicy(policyId);
    window.history.pushState(null, '', `#${policyId}`);
  }, []);

  const handleCloseLegal = useCallback(() => {
    setActiveLegalPolicy(null);
    if (legalPolicyKeys.includes(window.location.hash.replace('#', ''))) {
      window.history.pushState(null, '', window.location.pathname);
    }
  }, []);

  return (
    <HospitalProvider>
      <div className="min-h-screen bg-[#F8FAFC] text-slate-700 flex flex-col selection:bg-sky-500 selection:text-white font-sans overflow-x-hidden">
        {/* Search Engine Structured Data (JSON-LD) */}
        <StructuredData />

        {/* Sticky Header Navigation with Mobile Drawer */}
        <Navbar />

        {/* Main Public Content Area */}
        <main className="flex-1">
          {/* 1. Hero Section with Hospital Photo Slideshow (#home) */}
          <HeroSlideshow />

          {/* 2. Quick Verified Facts & Clinical Bar */}
          <TrustStatsBar />

          {/* 3. Hospital Overview & Government Recognition Section (#about) */}
          <AboutSection />

          {/* 4. Complete Neurological Services, Stroke & Epilepsy (#services) */}
          <ServicesSection />

          {/* 5. Doctor Profile with KMC Reg 69073 & Qualifications (#doctors) */}
          <DoctorsSection />

          {/* 6. Hospital Infrastructure: 7 ICU, Pharmacy, Lab, Physiotherapy, X-Ray, OT (#facilities) */}
          <FacilitiesSection />

          {/* 7. Official Hospital Posters & Patient Infographics with High-Res Download & Actions (#official-posters) */}
          <HospitalPostersSection />

          {/* 8. Upgraded Photo Gallery with Lightbox & Hover Effects (#gallery) */}
          <PhotoGallery />

          {/* 8. Regional 90 km Catchment & Travel Guide (#service-area) */}
          <ServiceAreaSection />

          {/* 9. Patient FAQ Section (#faq) */}
          <FaqSection />

          {/* 10. Hospital Address, Verified Timings & Contact (#contact) */}
          <ContactSection onOpenLegal={handleOpenLegal} />
        </main>

        {/* Hospital Footer with Legal Governance Links & Accreditations */}
        <Footer onOpenLegal={handleOpenLegal} />

        {/* Mobile Sticky Bottom Bar */}
        <MobileStickyBar />

        {/* First-Time Visitor Appointment & Call Popup with Session Frequency Control */}
        <AppointmentCallPopup />

        {/* Comprehensive Legal & Patient Policies Modal */}
        {activeLegalPolicy && (
          <LegalModal
            activePolicy={activeLegalPolicy}
            onClose={handleCloseLegal}
            onSelectPolicy={handleOpenLegal}
          />
        )}
      </div>
    </HospitalProvider>
  );
}
