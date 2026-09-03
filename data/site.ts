/**
 * Trend Arsa — merkezi site sabitleri.
 * Gerçek iletişim bilgileri firma rehberi + Instagram'dan doğrulanarak alındı.
 *
 * ⚠️ Bu değerler artık yalnızca **yedek**: gerçek kaynak Supabase'deki
 * `site_settings` tablosu ve admin panelidir (bkz. `data/site-content.ts` →
 * `getSiteInfo`). Buradaki değerler DB'de satır/alan boş olduğunda devreye
 * girer.
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

/**
 * Önceden doldurulmuş mesajla WhatsApp bağlantısı üretir. Numara verilmezse
 * yukarıdaki statik değer kullanılır; sayfalar admin panelden gelen numarayı
 * (bkz. `data/site-content.ts` → `getSiteInfo`) ikinci parametreyle geçer.
 */
export function whatsappLink(message?: string, whatsapp: string = site.whatsapp): string {
  const base = `https://wa.me/${whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function telLink(phoneIntl: string = site.phoneIntl): string {
  return `tel:${phoneIntl}`;
}
