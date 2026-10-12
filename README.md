# Trend Arsa (trendarsa-web)

**Trend Arsa Yatırım Ofisi'nin villa projeli arsa ilanlarını tanıtan, iki dilli (TR/EN) Next.js sitesi.** İçerik **trendarsa-admin** panelinden girilir ve trendarsa-app ile ortak Supabase veritabanından build sırasında okunur.

![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Postgres-3FCF8E?logo=supabase&logoColor=white)
![Cloudflare](https://img.shields.io/badge/Deploy-Cloudflare-F38020?logo=cloudflare&logoColor=white)

> 🚧 **Durum:** Aktif geliştirme. Site yayında; içerik ve özellikler sürekli güncelleniyor.

---

## TrendArsa ekosistemi

Bu repo, ortak bir Supabase veritabanını ve Cloudflare R2 görsel deposunu paylaşan dört parçalı bir sistemin parçasıdır:

| Repo | Rol |
|---|---|
| [trendarsa-app](https://github.com/seniih/trendarsa-app) | Flutter mobil uygulama (iOS/Android); Supabase şeması, RLS ve Edge Function'ların kaynağı |
| [trendarsa-admin](https://github.com/seniih/trendarsa-admin) | Web içerik paneli — ilanlar, villa projeleri, site içeriği |
| **trendarsa-web** (bu repo) | Arsa projeleri sitesi (TR/EN) |
| [trendev-web](https://github.com/seniih/trendev-web) | Villa projeleri sitesi (TR/EN) |

## Özellikler

- **Arsa projeleri** — bölgeye göre filtrelenebilir proje listesi ve detay sayfaları (görseller, konum, emsal, etiketler)
- **İki dil** — `next-intl` ile TR/EN, locale bazlı yönlendirme (`proxy.ts`, `i18n/`)
- **Admin panelinden yönetilen içerik** — ilanlar, açılış (hero) bölümü, rakam şeridi, harita ve iletişim bilgileri
- **Statik üretim** — tüm sayfalar build sırasında `generateStaticParams` ile üretilir
- **Blog** — arsa yatırımı rehber yazıları (TR/EN)
- **SEO** — `sitemap.ts`, `robots.ts`, JSON-LD yapılandırılmış veri (`components/JsonLd.tsx`)

## İçerik nereden geliyor

| Sayfa parçası | Kaynak |
|---|---|
| Proje kartları ve detay sayfaları | `listings` + `projects` tabloları, `publish_targets` içinde `trendarsa-web` olanlar (`data/projects.ts`) |
| Açılış (hero) ve harita bloğu | `site_sections` (`data/site-content.ts`) |
| Rakam şeridi | `site_stats` |
| Telefon, WhatsApp, e-posta, adres, harita konumu | `site_settings` |
| Diğer sabit metinler (menü, "Neden Arsa", adımlar…) | `messages/tr.json` · `messages/en.json` |
| Blog yazıları | `data/posts.ts` (dosya tabanlı) |

Veritabanında satır yoksa veya alan boşsa çeviri dosyaları ile `data/site.ts` içindeki değerlere düşülür; yani veritabanı boşken de site dolu görünür.

Görseller Cloudflare R2'de tutulur; `R2_PUBLIC_BASE_URL` hem `lib/supabase.ts` içindeki `r2Url()` hem de `next.config.ts`'deki `images.remotePatterns` için kullanılır.

## Proje yapısı

```
app/[locale]/     # sayfalar: ana sayfa, projeler, neden-arsa, blog, hakkimizda, iletisim
components/       # UI bileşenleri (ProjectCard, ProjectsExplorer, MapEmbed, ...)
data/             # Supabase'den veri okuma (projects, site-content) + blog yazıları
i18n/, messages/  # next-intl yapılandırması ve çeviri dosyaları
lib/              # Supabase istemcisi, R2 URL yardımcıları
```

## Kurulum

### Gereksinimler

- Node.js 20+
- trendarsa-app migration'ları uygulanmış bir Supabase projesi

### Çalıştırma

```bash
git clone https://github.com/seniih/trendarsa-web.git
cd trendarsa-web
npm install
cp .env.example .env      # Supabase URL/anon key + R2 public base URL
npm run dev               # http://localhost:3000
```

`SUPABASE_URL` / `SUPABASE_ANON_KEY` tanımlı değilse build başlar başlamaz hata verir (bkz. `lib/supabase.ts`).

| Komut | Açıklama |
|---|---|
| `npm run dev` | Geliştirme sunucusu (port 3000) |
| `npm run build` / `npm start` | Production build ve sunucu |
| `npm run lint` | ESLint |

## Deploy

Site **Cloudflare** üzerinde yayınlanır. Build ortamında tanımlanması gereken değişkenler:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `R2_PUBLIC_BASE_URL`

### İçerik güncelleme akışı

1. trendarsa-admin panelinden ilan/proje veya site içeriği düzenlenir.
2. Site build sırasında statik üretildiği için değişikliklerin yansıması için yeniden deploy edilmelidir.

## Yol haritası

- [x] İçeriğin statik dosyalardan Supabase'e taşınması
- [x] Hero, rakam şeridi, harita ve iletişim bilgilerinin admin panelinden yönetilmesi
- [ ] ISR ile yeniden deploy gerektirmeyen içerik güncellemesi (trendev-web'de uygulandı)
- [ ] Blog yazılarının veritabanına ve admin paneline taşınması
- [ ] Placeholder (Unsplash) sayfa görsellerinin gerçek proje görselleriyle değiştirilmesi

## Lisans

Bu proje özel (proprietary) bir projedir; tüm hakları saklıdır.
