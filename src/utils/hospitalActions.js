/**
 * Utility functions for Hospital downloads, vCard contact card export, 
 * and persistent Like / Remember actions.
 */

export const downloadFile = async (url, filename) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename || 'masaraddi-neuro-care.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => window.URL.revokeObjectURL(blobUrl), 1000);
    return true;
  } catch (error) {
    // Fallback: direct anchor link
    console.warn('Fallback direct download triggered', error);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename || 'masaraddi-neuro-care.png';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return true;
  }
};

export const downloadHospitalContactCard = () => {
  const vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'FN:Masaraddi Neuro Care Center',
    'N:Masaraddi Neuro Care Center;;;;',
    'ORG:Masaraddi Neuro Care Center;Neurology Hospital',
    'TITLE:Specialized Neurological Care Center (Level 2 Allopathy)',
    'TEL;TYPE=WORK,VOICE:+918354220000',
    'TEL;TYPE=CELL,VOICE:+919448000000',
    'TEL;TYPE=EMERGENCY:+918354220000',
    'EMAIL;TYPE=PREF,INTERNET:contact@masaraddineurocare.com',
    'URL:https://masaraddineurocare.com',
    'ADR;TYPE=WORK:;;Godi Layout, near Rotary Circle, beside Kailash- In Hotel;Bagalkot;Karnataka;587101;India',
    'NOTE:Dr. Shivakumar K. Masaraddi (MBBS, MD, DM Neurology - KMC Reg 69073). 24/7 ICU & Neuro Emergency. KPME Reg: BGK01185ALHL2.',
    'END:VCARD'
  ].join('\r\n');

  try {
    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Masaraddi-Neuro-Care-Center.vcf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 1000);

    // Also attempt copying contact numbers to clipboard
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(
        'Masaraddi Neuro Care Center, Bagalkot\nPhone: +91 8354 220000 / +91 94480 00000\nAddress: Godi Layout, near Rotary Circle, beside Kailash- In Hotel, Bagalkot, Karnataka 587101\nConsultant: Dr. Shivakumar K. Masaraddi (DM Neurology)'
      ).catch(() => {});
    }

    return true;
  } catch (err) {
    console.error('Failed to create vCard', err);
    return false;
  }
};
