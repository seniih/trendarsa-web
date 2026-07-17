import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/data/projects";
import { getPost, getPosts } from "@/data/posts";
import { routing } from "@/i18n/routing";
import { Container, Section, buttonClass, GrainOverlay } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { whatsappLink } from "@/data/site";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getPosts().map((p) => ({ locale, slug: p.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const l = locale as Locale;
  return {
    title: post.title[l],
    description: post.excerpt[l],
    openGraph: { images: [post.cover], type: "article" },
  };
}

export default async function BlogDetail({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  setRequestLocale(rawLocale);
  const locale = rawLocale as Locale;
  const post = getPost(slug);
  if (!post) notFound();

  const nav = await getTranslations("nav");
  const common = await getTranslations("common");
  const cta = await getTranslations("finalCta");
  const contact = await getTranslations("contact");
  const date = new Date(post.date).toLocaleDateString(
    locale === "tr" ? "tr-TR" : "en-US",
    { year: "numeric", month: "long", day: "numeric" },
  );

  return (
    <article>
      <div className="pt-24 sm:pt-28">
        <Section className="bg-cream !pt-8">
          <Container className="max-w-3xl">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-forest-700 transition-colors hover:text-leaf-800"
            >
              <ArrowLeft className="h-4 w-4" />
              {nav("blog")}
            </Link>

            <div className="mt-6 flex items-center gap-2 text-sm text-ink-soft">
              <time>{date}</time>
              <span aria-hidden>•</span>
              <span>
                {post.readMinutes} {common("minRead")}
              </span>
            </div>
            <h1 className="mt-3 font-display text-3xl font-semibold leading-tight text-forest-900 sm:text-4xl">
              {post.title[locale]}
            </h1>

            <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl shadow-cine">
              <Image
                src={post.cover}
                alt={post.title[locale]}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
            </div>

            <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink-soft">
              {post.body[locale].map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <Reveal>
              <div className="relative mt-12 overflow-hidden rounded-2xl bg-forest-900 p-8 text-center text-cream">
                <div
                  aria-hidden
                  className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[90px] [background:radial-gradient(circle,rgba(97,188,69,0.6),transparent_65%)]"
                />
                <GrainOverlay className="opacity-[0.08]" />
                <div className="relative">
                  <h2 className="font-display text-2xl font-semibold text-cream">
                    {cta("title")}
                  </h2>
                  <p className="mt-2 text-cream/80">{cta("subtitle")}</p>
                  <a
                    href={whatsappLink(contact("whatsappMsg"))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonClass("primary", "mt-6")}
                  >
                    {cta("whatsapp")}
                  </a>
                </div>
              </div>
            </Reveal>
          </Container>
        </Section>
      </div>
    </article>
  );
}
