import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Post } from "@/data/posts";
import type { Locale } from "@/data/projects";

export function BlogCard({ post, locale }: { post: Post; locale: Locale }) {
  const t = useTranslations("common");
  const date = new Date(post.date).toLocaleDateString(
    locale === "tr" ? "tr-TR" : "en-US",
    { year: "numeric", month: "long", day: "numeric" },
  );

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-forest-900/10 bg-cream shadow-[0_2px_20px_-12px_rgba(6,26,16,0.25)] transition-all duration-500 hover:-translate-y-1.5 hover:border-leaf-500/40 hover:shadow-cine"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={post.cover}
          alt={post.title[locale]}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-950/45 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 text-xs text-ink-soft">
          <time>{date}</time>
          <span aria-hidden>•</span>
          <span>
            {post.readMinutes} {t("minRead")}
          </span>
        </div>
        <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-forest-900">
          {post.title[locale]}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm text-ink-soft">
          {post.excerpt[locale]}
        </p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-leaf-800 transition-transform group-hover:translate-x-0.5">
          {t("readMore")}
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
