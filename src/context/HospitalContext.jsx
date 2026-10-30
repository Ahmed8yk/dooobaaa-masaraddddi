import React, { createContext, useContext, useEffect } from 'react';
import { hospitalConfig } from '../config/hospitalConfig.js';

const HospitalContext = createContext(undefined);

export const updateBrowserFavicon = (logoUrl) => {
  if (typeof document === 'undefined') return;
  const url = logoUrl || '/logo.svg';

  // 1. Standard / Shortcut Icon
  let link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }
  link.href = url;
  if (url.endsWith('.svg')) {
    link.type = 'image/svg+xml';
  } else if (url.endsWith('.png')) {
    link.type = 'image/png';
  } else if (url.endsWith('.ico')) {
    link.type = 'image/x-icon';
  } else if (url.endsWith('.webp')) {
    link.type = 'image/webp';
  }

  // 2. Apple Touch Icon
  let appleLink = document.querySelector("link[rel='apple-touch-icon']");
  if (!appleLink) {
    appleLink = document.createElement('link');
    appleLink.rel = 'apple-touch-icon';
    document.head.appendChild(appleLink);
  }
  appleLink.href = url;
};

export const HospitalProvider = ({ children }) => {
  // Synchronize browser favicon on mount
  useEffect(() => {
    const activeLogo = hospitalConfig.branding?.logoUrl || hospitalConfig.logo || '/logo.svg';
    updateBrowserFavicon(activeLogo);
  }, []);

  const value = {
    data: hospitalConfig,
    isLoading: false,
  };

  return (
    <HospitalContext.Provider value={value}>
      {children}
    </HospitalContext.Provider>
  );
};

export const useHospitalData = () => {
  const context = useContext(HospitalContext);
  if (!context) {
    throw new Error('useHospitalData must be used within a HospitalProvider');
  }
  return context;
};
