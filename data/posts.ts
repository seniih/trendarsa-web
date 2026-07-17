/**
 * Blog yazıları — çift dilli, dosya tabanlı.
 * İçerik paragraf dizisi olarak tutulur (ileride MDX/CMS'e taşınabilir).
 */

import type { Locale } from "./projects";

export interface Post {
  slug: string;
  date: string; // ISO
  cover: string;
  title: Record<Locale, string>;
  excerpt: Record<Locale, string>;
  body: Record<Locale, string[]>;
  readMinutes: number;
}

const U = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=70`;

export const posts: Post[] = [
  {
    slug: "sakarya-arsa-yatirimi-nerede-nasil",
    date: "2026-05-12",
    cover: U("photo-1500382017468-9049fed747ef"),
    readMinutes: 5,
    title: {
      tr: "Sakarya'da Arsa Yatırımı Nerede ve Nasıl Yapılır?",
      en: "Where and How to Invest in Land in Sakarya?",
    },
    excerpt: {
      tr: "Sapanca çevresi, Kaynarca ve Erenler hattında değerlenen bölgeler ve doğru arsa seçiminin püf noktaları.",
      en: "Appreciating areas around Sapanca, Kaynarca and Erenler, plus tips for choosing the right plot.",
    },
    body: {
      tr: [
        "Sakarya, İstanbul'a yakınlığı, doğal güzellikleri ve gelişen ulaşım ağı sayesinde son yılların en dikkat çeken arsa yatırımı bölgelerinden biri haline geldi.",
        "Özellikle Sapanca Gölü çevresi, Kaynarca ve Erenler hattı; villa projeli, göl ve orman manzaralı arsalarla yatırımcıların ilgisini çekiyor.",
        "Doğru yatırım için imar durumu, ifraz (parselleme) durumu, tapu kaydı ve altyapı (yol-su-elektrik) mutlaka kontrol edilmelidir. Trend Arsa olarak tüm projelerimizde bu güvenceleri sağlıyoruz.",
      ],
      en: [
        "Thanks to its proximity to Istanbul, natural beauty and developing transport network, Sakarya has become one of the most notable land-investment regions of recent years.",
        "The area around Lake Sapanca and the Kaynarca–Erenler line, in particular, attracts investors with villa-project plots offering lake and forest views.",
        "For a sound investment, always check the zoning status, subdivision, title deed and infrastructure (road, water, electricity). At Trend Arsa, we secure all of these across our projects.",
      ],
    },
  },
  {
    slug: "hizli-ve-karli-arsa-satisi-5-yontem",
    date: "2026-04-02",
    cover: U("photo-1454165804606-c3d57bc86b40"),
    readMinutes: 4,
    title: {
      tr: "Hızlı ve Karlı Arsa Satışı için 5 Etkili Yöntem",
      en: "5 Effective Methods for a Fast and Profitable Land Sale",
    },
    excerpt: {
      tr: "Arsanızı değerinde ve hızlıca satmanın yollarını uzman gözüyle derledik.",
      en: "An expert roundup of ways to sell your land quickly and at its true value.",
    },
    body: {
      tr: [
        "Arsa satışında doğru fiyatlama, profesyonel görseller ve güçlü bir tanıtım stratejisi belirleyicidir.",
        "1) Güncel rayiç analizi yapın. 2) Drone ve video ile arsayı öne çıkarın. 3) İmar ve tapu belgelerini hazır tutun. 4) Doğru kanallarda ilan verin. 5) Güvenilir bir danışmanla çalışın.",
        "Trend Arsa uzman ekibi, arsanızın değerini en üst seviyeye taşımak için tüm süreçte yanınızda.",
      ],
      en: [
        "In land sales, correct pricing, professional visuals and a strong marketing strategy are decisive.",
        "1) Run a current market analysis. 2) Showcase the plot with drone and video. 3) Keep zoning and title documents ready. 4) List on the right channels. 5) Work with a reliable advisor.",
        "The Trend Arsa expert team is with you throughout the process to maximize your land's value.",
      ],
    },
  },
  {
    slug: "arsa-alirken-yapilan-hatalar",
    date: "2026-02-18",
    cover: U("photo-1560518883-ce09059eeffa"),
    readMinutes: 6,
    title: {
      tr: "Arsa Alırken Sıkça Yapılan Hatalar ve Kaçınma Yolları",
      en: "Common Mistakes When Buying Land and How to Avoid Them",
    },
    excerpt: {
      tr: "Tapu, imar ve altyapı konularında yatırımcıların en sık düştüğü tuzaklar.",
      en: "The pitfalls investors most often fall into regarding title, zoning and infrastructure.",
    },
    body: {
      tr: [
        "Arsa yatırımı büyük fırsatlar sunar, ancak bilinçsiz alımlar ciddi kayıplara yol açabilir.",
        "En sık hatalar: tapu kaydını incelememek, imar durumunu teyit etmemek, ifraz edilmemiş hisseli tapu almak ve altyapı olmayan bölgeleri değerlendirmek.",
        "Trend Arsa'nın tüm projeleri ifrazlı, tapulu ve altyapısı hazır olduğundan yatırımınız devlet güvencesi altındadır.",
      ],
      en: [
        "Land investment offers great opportunities, but uninformed purchases can lead to serious losses.",
        "The most common mistakes: not examining the title record, not confirming zoning status, buying unsubdivided shared titles, and considering areas without infrastructure.",
        "Since all Trend Arsa projects are subdivided, title-deeded and infrastructure-ready, your investment is under public guarantee.",
      ],
    },
  },
];

export function getPosts(): Post[] {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
