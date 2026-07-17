/**
 * Arsa projeleri — çift dilli veri.
 * Şimdilik dosya tabanlı; ileride CMS'e taşınacak şekilde tiplenmiştir.
 * Görseller placeholder (Unsplash); video alanı doldurulunca oynatıcı videoyu kullanır,
 * boşsa poster görseli gösterilir. Gerçek video dosyaları public/videos altına eklenir.
 */

export type Locale = "tr" | "en";

export interface Project {
  slug: string;
  featured: boolean;
  status: "available" | "reserved" | "sold";
  title: Record<Locale, string>;
  region: string; // konum etiketi (Kırkpınar, Kaynarca Turnalı vb.)
  city: string;
  area: number; // m²
  emsal?: number; // yapılaşma katsayısı
  priceTRY: number;
  installment: boolean; // kolay ödeme / taksit
  tags: Record<Locale, string[]>; // "Göl manzaralı", "İmarlı" vb.
  excerpt: Record<Locale, string>;
  description: Record<Locale, string[]>; // paragraflar
  poster: string; // kapak görseli
  gallery: string[];
  video?: string; // /videos/xxx.mp4 (opsiyonel)
  coords?: { lat: number; lng: number };
}

const U = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=70`;

export const projects: Project[] = [
  {
    slug: "kaynarca-turnali-gol-manzarali",
    featured: true,
    status: "available",
    title: {
      tr: "Kaynarca Turnalı — Göl Manzaralı Villa Arsaları",
      en: "Kaynarca Turnalı — Lake-View Villa Plots",
    },
    region: "Kaynarca Turnalı",
    city: "Sakarya",
    area: 447,
    emsal: 0.4,
    priceTRY: 2350000,
    installment: true,
    tags: {
      tr: ["Göl manzaralı", "Villa projeli", "İfrazlı", "Tapu güvenceli"],
      en: ["Lake view", "Villa project", "Subdivided", "Title-deed secured"],
    },
    excerpt: {
      tr: "Kaynarca Turnalı'da göl manzaralı, 0.40 emsalli, altyapısı hazır villa projeli arsalar. 447 m²'den başlayan seçenekler.",
      en: "Lake-view, ready-infrastructure villa plots in Kaynarca Turnalı with 0.40 emsal. Options starting from 447 m².",
    },
    description: {
      tr: [
        "Doğanın kalbinde, göl manzarasına hâkim bir konumda yer alan bu proje; villa yaşamının huzurunu yatırımın güvencesiyle birleştiriyor.",
        "Tüm parseller ifrazlı ve tapuludur. Yol, su ve elektrik altyapısı hazırdır. Belediye onaylı imar durumu ve 0.40 emsal ile hayalinizdeki villayı inşa etmeye uygundur.",
        "Kolay ödeme planları ile bütçenize uygun koşullarda sahip olma imkânı sunulmaktadır.",
      ],
      en: [
        "Set on a lake-facing location in the heart of nature, this project combines the serenity of villa living with the security of investment.",
        "All plots are subdivided with individual title deeds. Road, water and electricity infrastructure is ready. With municipality-approved zoning and 0.40 emsal, it is suitable for building your dream villa.",
        "Flexible installment plans make ownership possible on terms that fit your budget.",
      ],
    },
    poster: U("photo-1500382017468-9049fed747ef"),
    gallery: [
      U("photo-1500382017468-9049fed747ef"),
      U("photo-1416879595882-3373a0480b5b"),
      U("photo-1470252649378-9c29740c9fa8"),
    ],
    coords: { lat: 41.0361, lng: 30.3061 },
  },
  {
    slug: "kaynarca-turnali-genis-parsel",
    featured: true,
    status: "available",
    title: {
      tr: "Kaynarca Turnalı — Geniş Parsel (954 m²)",
      en: "Kaynarca Turnalı — Large Plot (954 m²)",
    },
    region: "Kaynarca Turnalı",
    city: "Sakarya",
    area: 954,
    emsal: 0.4,
    priceTRY: 4350000,
    installment: true,
    tags: {
      tr: ["Geniş parsel", "Villa projeli", "Altyapı hazır"],
      en: ["Large plot", "Villa project", "Ready infrastructure"],
    },
    excerpt: {
      tr: "954 m² geniş parsel, 0.40 emsal, bahçeli villa yaşamına ve yatırıma uygun.",
      en: "954 m² large plot with 0.40 emsal, ideal for garden villa living and investment.",
    },
    description: {
      tr: [
        "Geniş bahçeli bir villa hayali kuranlar için ideal, 954 m² tek parsel.",
        "İfrazlı ve tapulu; altyapısı tamamlanmış proje kapsamındadır.",
        "Yatırım değeri her geçen gün artan bölgede sınırlı sayıda parsel kalmıştır.",
      ],
      en: [
        "An ideal 954 m² single plot for those dreaming of a villa with a large garden.",
        "Subdivided and title-deeded, within a project with completed infrastructure.",
        "A limited number of plots remain in this region of steadily rising investment value.",
      ],
    },
    poster: U("photo-1416879595882-3373a0480b5b"),
    gallery: [
      U("photo-1416879595882-3373a0480b5b"),
      U("photo-1501084817091-a4f3d1d19e07"),
    ],
    coords: { lat: 41.037, lng: 30.31 },
  },
  {
    slug: "kirkpinar-gol-cephesi",
    featured: true,
    status: "available",
    title: {
      tr: "Kırkpınar — Göl Cepheli Yatırım Arsaları",
      en: "Kırkpınar — Lakefront Investment Plots",
    },
    region: "Kırkpınar",
    city: "Sakarya",
    area: 500,
    emsal: 0.3,
    priceTRY: 3100000,
    installment: true,
    tags: {
      tr: ["Sapanca Gölü yakını", "Doğayla iç içe", "İmarlı"],
      en: ["Near Sapanca Lake", "In nature", "Zoned"],
    },
    excerpt: {
      tr: "Sapanca çevresinin gözde bölgesi Kırkpınar'da doğayla iç içe, değerlenen arsalar.",
      en: "Appreciating plots surrounded by nature in Kırkpınar, a favorite area around Sapanca.",
    },
    description: {
      tr: [
        "Sapanca Gölü'ne yakınlığı ve doğal dokusuyla Kırkpınar, hem yaşam hem yatırım için öne çıkıyor.",
        "Parseller imarlı ve tapuludur; bölge turizm ve ikinci konut talebiyle sürekli değer kazanmaktadır.",
      ],
      en: [
        "With its proximity to Lake Sapanca and natural setting, Kırkpınar stands out for both living and investment.",
        "Plots are zoned and title-deeded; the region continuously gains value driven by tourism and second-home demand.",
      ],
    },
    poster: U("photo-1470252649378-9c29740c9fa8"),
    gallery: [U("photo-1470252649378-9c29740c9fa8"), U("photo-1441974231531-c6227db76b6e")],
    coords: { lat: 40.703, lng: 30.28 },
  },
  {
    slug: "kurtkoy-villa-projeli",
    featured: false,
    status: "available",
    title: {
      tr: "Kurtköy — Villa Projeli Parseller",
      en: "Kurtköy — Villa-Project Plots",
    },
    region: "Kurtköy",
    city: "Sakarya",
    area: 420,
    emsal: 0.35,
    priceTRY: 1950000,
    installment: true,
    tags: {
      tr: ["Uygun fiyat", "Villa projeli", "Kolay ödeme"],
      en: ["Affordable", "Villa project", "Easy payment"],
    },
    excerpt: {
      tr: "Her bütçeye uygun, villa projeli parsellerle Kurtköy'de arsa sahibi olun.",
      en: "Own land in Kurtköy with budget-friendly, villa-project plots.",
    },
    description: {
      tr: [
        "Kurtköy, uygun giriş fiyatları ve güçlü değer artış potansiyeliyle ilk yatırım için ideal.",
        "İfrazlı ve tapulu parseller, kolay ödeme seçenekleriyle sunulmaktadır.",
      ],
      en: [
        "Kurtköy is ideal for a first investment with affordable entry prices and strong appreciation potential.",
        "Subdivided, title-deeded plots are offered with easy payment options.",
      ],
    },
    poster: U("photo-1441974231531-c6227db76b6e"),
    gallery: [U("photo-1441974231531-c6227db76b6e")],
    coords: { lat: 40.74, lng: 30.4 },
  },
  {
    slug: "hacimercan-doga-icinde",
    featured: false,
    status: "reserved",
    title: {
      tr: "Hacımercan — Doğa İçinde Villa Arsaları",
      en: "Hacımercan — Villa Plots in Nature",
    },
    region: "Hacımercan",
    city: "Sakarya",
    area: 600,
    emsal: 0.3,
    priceTRY: 2750000,
    installment: true,
    tags: {
      tr: ["Orman manzarası", "Sakin bölge", "İmarlı"],
      en: ["Forest view", "Quiet area", "Zoned"],
    },
    excerpt: {
      tr: "Orman manzaralı, sakin bir yaşam ve sağlam yatırım için Hacımercan parselleri.",
      en: "Forest-view Hacımercan plots for a quiet life and a solid investment.",
    },
    description: {
      tr: [
        "Şehrin gürültüsünden uzak, orman manzaralı Hacımercan; huzurlu bir villa yaşamı vaat ediyor.",
        "Parseller imarlı ve tapuludur. Bölgedeki talep nedeniyle bazı parseller rezerve edilmiştir.",
      ],
      en: [
        "Away from the city noise and with forest views, Hacımercan promises a peaceful villa life.",
        "Plots are zoned and title-deeded. Due to demand, some plots are already reserved.",
      ],
    },
    poster: U("photo-1501084817091-a4f3d1d19e07"),
    gallery: [U("photo-1501084817091-a4f3d1d19e07")],
    coords: { lat: 40.72, lng: 30.36 },
  },
];

export function getProjects(): Project[] {
  return projects;
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
