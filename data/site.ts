/**
 * Trend Arsa — merkezi site sabitleri.
 * Gerçek iletişim bilgileri firma rehberi + Instagram'dan doğrulanarak alındı.
 * Güncelleme gerektiğinde tek yer burasıdır.
 */

export const site = {
  name: "Trend Arsa",
  legalName: "Trend Arsa Yatırım Ofisi",
  domain: "trendarsa.net",
  url: "https://trendarsa.net",
  // Uluslararası biçim (tel: ve wa.me için)
  phoneIntl: "+905541165154",
  phoneDisplay: "+90 554 116 51 54",
  whatsapp: "905541165154",
  email: "trendarsayatirimofisi@gmail.com",
  address: {
    line: "Erenler Mah. 1201 Sok. Meydan 54 İş Merkezi, B Blok No:28",
    district: "Erenler",
    city: "Sakarya",
    country: "Türkiye",
    // Erenler / Sakarya yaklaşık konumu (harita için)
    lat: 40.7639,
    lng: 30.4368,
  },
  social: {
    instagram: "https://www.instagram.com/trendarsayatirimofisi/",
    facebook: "https://www.facebook.com/trendarsa.com.tr",
  },
} as const;

/** Önceden doldurulmuş mesajla WhatsApp bağlantısı üretir. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${site.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function telLink(): string {
  return `tel:${site.phoneIntl}`;
}
