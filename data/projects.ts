/**
 * Arsa projeleri — çift dilli veri.
 *
 * Kaynak artık Supabase: admin panelden (trendarsa-admin) girilen içerik,
 * "TrendArsa sitesi" yayın hedefi seçildiğinde burada görünür. İki tablodan
 * beslenir:
 *   - `listings`  → arsa ilanları (trendarsa-app ile ortak; siteye özel
 *     alanlar migration 20260903120100 ile eklendi)
 *   - `projects`  → proje kayıtları (aynı içerik trendev-web'de de
 *     yayınlanabilir)
 *
 * Bu dosya sadece tipleri tanımlar ve satırları `Project` şekline eşler.
 */

import { supabase, r2Url } from "@/lib/supabase";

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
  /** R2 kapak görseli — admin panelden eklenene kadar `null`. */
  poster: string | null;
  gallery: string[];
  video?: string; // /videos/xxx.mp4 (opsiyonel)
  coords?: { lat: number; lng: number };
}

/** Bu sitenin yayın hedefi kimliği. */
const TARGET = "trendarsa-web";

/** Tek parça metni paragraflara böler (ilanların `description` alanı için). */
function paragraphs(value: string | null): string[] {
  return (value ?? "")
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
}

function bilingual(tr: string | null, en: string | null): Record<Locale, string> {
  const trValue = tr?.trim() ?? "";
  const enValue = en?.trim();
  return { tr: trValue, en: enValue || trValue };
}

function bilingualList(tr: string[] | null, en: string[] | null): Record<Locale, string[]> {
  const trValue = tr ?? [];
  const enValue = en ?? [];
  return { tr: trValue, en: enValue.length > 0 ? enValue : trValue };
}

function galleryUrls(keys: { storage_key: string; position: number }[]): string[] {
  return [...keys]
    .sort((a, b) => a.position - b.position)
    .map((img) => r2Url(img.storage_key))
    .filter((url): url is string => url !== null);
}

interface ListingRow {
  slug: string | null;
  featured: boolean;
  sale_status: Project["status"] | null;
  title: string;
  title_en: string | null;
  description: string | null;
  description_en: string[] | null;
  excerpt_tr: string | null;
  excerpt_en: string | null;
  tags_tr: string[] | null;
  tags_en: string[] | null;
  emsal: number | null;
  installment: boolean;
  price: number;
  size_m2: number | null;
  il: string;
  ilce: string;
  mahalle: string | null;
  latitude: number;
  longitude: number;
  created_at: string;
  listing_images: { storage_key: string; position: number }[];
}

interface ProjectRow {
  slug: string | null;
  featured: boolean;
  status: Project["status"] | null;
  title_tr: string | null;
  title_en: string | null;
  excerpt_tr: string | null;
  excerpt_en: string | null;
  description_tr: string[] | null;
  description_en: string[] | null;
  highlights_tr: string[] | null;
  highlights_en: string[] | null;
  district: string | null;
  neighborhood: string | null;
  city: string | null;
  parcel_area_min: number | null;
  price_range_min: number | null;
  cover_image_key: string | null;
  created_at: string;
  project_images: { storage_key: string; position: number }[];
}

function mapListing(row: ListingRow): Project {
  const gallery = galleryUrls(row.listing_images);
  const descriptionTr = paragraphs(row.description);
  return {
    slug: row.slug ?? "",
    featured: row.featured,
    status: row.sale_status ?? "available",
    title: bilingual(row.title, row.title_en),
    region: row.mahalle?.trim() || row.ilce,
    city: row.il,
    area: row.size_m2 ?? 0,
    emsal: row.emsal ?? undefined,
    priceTRY: row.price,
    installment: row.installment,
    tags: bilingualList(row.tags_tr, row.tags_en),
    excerpt: bilingual(row.excerpt_tr || descriptionTr[0] || "", row.excerpt_en),
    description: {
      tr: descriptionTr,
      en: row.description_en?.length ? row.description_en : descriptionTr,
    },
    poster: gallery[0] ?? null,
    gallery,
    coords: { lat: row.latitude, lng: row.longitude },
  };
}

function mapProject(row: ProjectRow): Project {
  const gallery = galleryUrls(row.project_images);
  const cover = r2Url(row.cover_image_key);
  return {
    slug: row.slug ?? "",
    featured: row.featured,
    status: row.status ?? "available",
    title: bilingual(row.title_tr, row.title_en),
    region: row.neighborhood?.trim() || row.district || "",
    city: row.city ?? "Sakarya",
    area: row.parcel_area_min ?? 0,
    priceTRY: row.price_range_min ?? 0,
    installment: true,
    tags: bilingualList(row.highlights_tr, row.highlights_en),
    excerpt: bilingual(row.excerpt_tr, row.excerpt_en),
    description: {
      tr: row.description_tr ?? [],
      en: row.description_en?.length ? row.description_en : (row.description_tr ?? []),
    },
    poster: cover ?? gallery[0] ?? null,
    gallery: cover ? [cover, ...gallery.filter((g) => g !== cover)] : gallery,
  };
}

let projectsCache: Promise<Project[]> | null = null;

async function fetchAll(): Promise<Project[]> {
  if (!projectsCache) {
    projectsCache = (async () => {
      const [listings, projects] = await Promise.all([
        supabase
          .from("listings")
          .select(
            `slug, featured, sale_status, title, title_en, description, description_en,
             excerpt_tr, excerpt_en, tags_tr, tags_en, emsal, installment, price, size_m2,
             il, ilce, mahalle, latitude, longitude, created_at,
             listing_images ( storage_key, position )`,
          )
          .contains("publish_targets", [TARGET])
          .eq("status", "active")
          .not("slug", "is", null),
        supabase
          .from("projects")
          .select(
            `slug, featured, status, title_tr, title_en, excerpt_tr, excerpt_en,
             description_tr, description_en, highlights_tr, highlights_en,
             district, neighborhood, city, parcel_area_min, price_range_min,
             cover_image_key, created_at,
             project_images ( storage_key, position )`,
          )
          .contains("publish_targets", [TARGET])
          .not("slug", "is", null),
      ]);

      if (listings.error) {
        throw new Error(`Supabase arsa ilanları sorgusu başarısız: ${listings.error.message}`);
      }
      if (projects.error) {
        throw new Error(`Supabase proje sorgusu başarısız: ${projects.error.message}`);
      }

      const rows: { createdAt: string; project: Project }[] = [
        ...(listings.data as unknown as ListingRow[]).map((row) => ({
          createdAt: row.created_at,
          project: mapListing(row),
        })),
        ...(projects.data as unknown as ProjectRow[]).map((row) => ({
          createdAt: row.created_at,
          project: mapProject(row),
        })),
      ];

      // İki tablodan gelen kayıtlar tek listede: önce öne çıkanlar, sonra en yeniler.
      rows.sort((a, b) => {
        if (a.project.featured !== b.project.featured) return a.project.featured ? -1 : 1;
        return a.createdAt < b.createdAt ? 1 : -1;
      });
      return rows.map((r) => r.project);
    })();
  }
  return projectsCache;
}

export async function getProjects(): Promise<Project[]> {
  return fetchAll();
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return (await fetchAll()).filter((p) => p.featured);
}

export async function getProject(slug: string): Promise<Project | undefined> {
  return (await fetchAll()).find((p) => p.slug === slug);
}
