# Trend Arsa (trendarsa-web)

Trend Arsa Yatırım Ofisi'nin villa projeli arsa ilanlarını tanıtan, iki dilli
(TR/EN) Next.js sitesi. İçerik **trendarsa-admin** panelinden girilir ve
trendarsa-app ile ortak Supabase veritabanından build sırasında okunur.

## Kurulum

```bash
npm install
cp .env.example .env      # Supabase URL/anon key + R2 public base URL
npm run dev               # http://localhost:3000
```

`SUPABASE_URL` / `SUPABASE_ANON_KEY` tanımlı değilse build başlar başlamaz
hata verir (bkz. `lib/supabase.ts`) — deploy ortamında da (Cloudflare Pages →
Settings → Environment variables) tanımlı olmaları gerekir.

## İçerik nereden geliyor

| Sayfa parçası | Kaynak |
| --- | --- |
| Proje kartları ve detay sayfaları | `listings` + `projects` tabloları, `publish_targets` içinde `trendarsa-web` olanlar (`data/projects.ts`) |
| Açılış (hero) ve harita bloğu | `site_sections` (`data/site-content.ts`) |
| Rakam şeridi | `site_stats` |
| Telefon, WhatsApp, e-posta, adres, harita konumu | `site_settings` |
| Diğer sabit metinler (menü, "Neden Arsa", adımlar…) | `messages/tr.json` · `messages/en.json` |
| Blog yazıları | `data/posts.ts` (hâlâ dosya tabanlı) |

DB'de satır yoksa veya alan boşsa çeviri dosyaları ile `data/site.ts`
içindeki değerlere düşülür; yani veritabanı boşken de site dolu görünür.

Görseller Cloudflare R2'de tutulur; `R2_PUBLIC_BASE_URL` hem `lib/supabase.ts`
içindeki `r2Url()` hem de `next.config.ts`'deki `images.remotePatterns` için
kullanılır.

## İçerik güncelleme akışı

1. trendarsa-admin panelinden ilan/proje veya site içeriği düzenlenir.
2. Site statik build edildiği için yeniden deploy edilmelidir (otomatik
   deploy-hook yok).
