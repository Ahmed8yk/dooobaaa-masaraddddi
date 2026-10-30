import React, { useEffect } from 'react';
import { useHospitalData } from '../context/HospitalContext.jsx';

export const StructuredData = () => {
  const { data } = useHospitalData();
  const doctor = data.doctors[0];

  useEffect(() => {
    // 1. MedicalOrganization, Hospital & MedicalBusiness Schema
    const hospitalSchema = {
      "@context": "https://schema.org",
      "@type": ["Hospital", "MedicalOrganization", "MedicalBusiness"],
      "@id": "https://masaraddineurocare.com/#hospital",
      "name": data.hospitalName,
      "alternateName": [
        "Masaraddi Neuro Care Centre Bagalkot",
        "Best Neurologist in Bagalkot — Dr. Shivakumar K. Masaraddi",
        "Masaraddi Neurology Hospital Navanagar",
        "Brain and Nerve Hospital in Bagalkot",
        "Dr Shivakumar Masaraddi Clinic"
      ],
      "description": "Masaraddi Neuro Care Center is Bagalkot's specialized neurology hospital led by Dr. Shivakumar K. Masaraddi (DM Neurology). Providing clinical consultations, acute stroke care, epilepsy management, headache relief, and 7 ICU beds for Bagalkot, Navanagar, and North Karnataka.",
      "url": "https://masaraddineurocare.com",
      "logo": "https://masaraddineurocare.com/uploads/1792874217547-Screenshot_2026-10-23_123153.png",
      "image": [
        "https://masaraddineurocare.com/uploads/1793198600472-Screenshot_2026-10-28_020350.png",
        "https://masaraddineurocare.com/uploads/1793198619889-Screenshot_2026-10-28_020614.png",
        "https://masaraddineurocare.com/uploads/1793198647459-Screenshot_2026-10-27_150521.png"
      ],
      "telephone": data.contact.phone,
      "email": data.contact.email,
      "priceRange": "$$",
      "currenciesAccepted": "INR",
      "paymentAccepted": "Cash, UPI, Credit Card, Debit Card",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": data.contact.address.street,
        "addressLocality": data.contact.address.city,
        "addressRegion": data.contact.address.state,
        "postalCode": data.contact.address.postalCode || "587101",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 16.181,
        "longitude": 75.698
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "10:00",
          "closes": "16:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "18:00",
          "closes": "20:00"
        }
      ],
      "medicalSpecialty": [
        "https://schema.org/Neurology"
      ],
      "identifier": "BGK01185ALHL2",
      "license": "Government of Karnataka KPME Act 2018 Registration No. BGK01185ALHL2 (Level 2 Allopathy Hospital, 30 Beds)",
      "numberOfBeds": 30,
      "availableService": data.services.map((s) => ({
        "@type": "MedicalProcedure",
        "name": s.name,
        "description": s.shortDescription,
        "alternateName": s.patientQueryTag || undefined
      })),
      "physician": {
        "@type": "Physician",
        "@id": "https://masaraddineurocare.com/#physician",
        "name": doctor?.name || "Dr. Shivakumar K. Masaraddi",
        "medicalSpecialty": "Neurology",
        "description": doctor?.bio,
        "jobTitle": "Consultant Neurologist",
        "identifier": "KMC-69073",
        "license": "Karnataka Medical Council Registration No. 69073"
      },
      "areaServed": [
        { "@type": "City", "name": "Bagalkot" },
        { "@type": "City", "name": "Navanagar" },
        { "@type": "City", "name": "Vidyagiri" },
        { "@type": "City", "name": "Badami" },
        { "@type": "City", "name": "Jamkhandi" },
        { "@type": "City", "name": "Mudhol" },
        { "@type": "City", "name": "Ilkal" },
        { "@type": "City", "name": "Hungund" },
        { "@type": "City", "name": "Bilagi" },
        { "@type": "City", "name": "Guledgudda" },
        { "@type": "City", "name": "Rabkavi-Banhatti" },
        { "@type": "City", "name": "Mahalingpur" },
        { "@type": "City", "name": "Lokapur" },
        { "@type": "AdministrativeArea", "name": "Bagalkot District" },
        { "@type": "AdministrativeArea", "name": "North Karnataka" }
      ]
    };

    // 2. Physician Schema for Dr. Shivakumar K. Masaraddi
    const physicianSchema = {
      "@context": "https://schema.org",
      "@type": "Physician",
      "@id": "https://masaraddineurocare.com/#physician",
      "name": doctor?.name || "Dr. Shivakumar K. Masaraddi",
      "jobTitle": "Consultant Neurologist & Brain Specialist",
      "medicalSpecialty": "https://schema.org/Neurology",
      "description": doctor?.bio,
      "identifier": "KMC-69073",
      "license": "Karnataka Medical Council Registration No. 69073 (Date: 23 July 2004)",
      "image": "https://masaraddineurocare.com/uploads/1792874313807-Screenshot_2026-10-10_013409.png",
      "telephone": data.contact.phone,
      "worksFor": {
        "@type": "Hospital",
        "name": data.hospitalName,
        "url": "https://masaraddineurocare.com"
      },
      "alumniOf": [
        {
          "@type": "EducationalOrganization",
          "name": "Jawaharlal Nehru Medical College, Belgaum (MBBS - RGUHS June 2004)"
        },
        {
          "@type": "EducationalOrganization",
          "name": "N.H.L. Municipal Medical College, Ahmedabad (MD General Medicine - Gujarat University April 2010)"
        },
        {
          "@type": "EducationalOrganization",
          "name": "Bangur Institute of Neurosciences / IPGMER, Kolkata (DM Neurology - WBUHS July 2015)"
        }
      ],
      "knowsAbout": [
        "Acute Stroke Care and Paralysis Management",
        "Epilepsy, Fits and Seizure Disorders",
        "Chronic Migraine, Cluster and Tension Headaches",
        "Peripheral Neuropathy and Diabetic Nerve Pain",
        "Parkinson's Disease and Tremors",
        "Dementia, Confusion and Memory Disorders in Elderly",
        "Dizziness, Vertigo and Balance Disorders",
        "Spinal Nerve Compression and Sciatica Pain",
        "24x7 Neuro ICU Critical Care Monitoring"
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": data.contact.address.street,
        "addressLocality": data.contact.address.city,
        "addressRegion": data.contact.address.state,
        "postalCode": data.contact.address.postalCode || "587101",
        "addressCountry": "IN"
      }
    };

    // 3. FAQPage Schema dynamically mapped from verified FAQs
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": data.faqs.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };

    // 4. BreadcrumbList Schema
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://masaraddineurocare.com/#home" },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://masaraddineurocare.com/#services" },
        { "@type": "ListItem", "position": 3, "name": "Doctors", "item": "https://masaraddineurocare.com/#doctors" },
        { "@type": "ListItem", "position": 4, "name": "Facilities", "item": "https://masaraddineurocare.com/#facilities" },
        { "@type": "ListItem", "position": 5, "name": "Gallery", "item": "https://masaraddineurocare.com/#gallery" },
        { "@type": "ListItem", "position": 6, "name": "90 km Service Area", "item": "https://masaraddineurocare.com/#service-area" },
        { "@type": "ListItem", "position": 7, "name": "Patient FAQ", "item": "https://masaraddineurocare.com/#faq" },
        { "@type": "ListItem", "position": 8, "name": "Contact & Location", "item": "https://masaraddineurocare.com/#contact" }
      ]
    };

    const script1 = document.createElement('script');
    script1.type = 'application/ld+json';
    script1.text = JSON.stringify(hospitalSchema);
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.type = 'application/ld+json';
    script2.text = JSON.stringify(physicianSchema);
    document.head.appendChild(script2);

    const script3 = document.createElement('script');
    script3.type = 'application/ld+json';
    script3.text = JSON.stringify(faqSchema);
    document.head.appendChild(script3);

    const script4 = document.createElement('script');
    script4.type = 'application/ld+json';
    script4.text = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(script4);

    return () => {
      if (document.head.contains(script1)) document.head.removeChild(script1);
      if (document.head.contains(script2)) document.head.removeChild(script2);
      if (document.head.contains(script3)) document.head.removeChild(script3);
      if (document.head.contains(script4)) document.head.removeChild(script4);
    };
  }, [data, doctor]);

  return null;
};
