import { setRequestLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import {
  ArrowRight,
  Phone,
  TrendingUp,
  ShieldCheck,
  Route,
  Wallet,
  Search,
  MessageCircle,
  MapPinned,
  FileCheck,
  Check,
  Quote,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/data/projects";
import { getFeaturedProjects } from "@/data/projects";
import { getPosts } from "@/data/posts";
import { site, whatsappLink, telLink } from "@/data/site";
import {
  Container,
  Section,
  SectionHeading,
  Eyebrow,
  buttonClass,
} from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { VideoHero } from "@/components/VideoHero";
import { VideoPlayer } from "@/components/VideoPlayer";
import { ProjectCard } from "@/components/ProjectCard";
import { BlogCard } from "@/components/BlogCard";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  setRequestLocale(rawLocale);
  const locale = rawLocale as Locale;

  const t = await getTranslations();
  const featured = getFeaturedProjects();
  const posts = getPosts().slice(0, 3);

  // Hero videosu eklendiğinde: videoSrc="/videos/hero.mp4"
  return (
    <>
      {/* HERO */}
      <VideoHero poster="https://images.unsplash.com/photo-1501084817091-a4f3d1d19e07?auto=format&fit=crop&w=2000&q=75">
        <Container className="pt-20">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-cream/25 bg-cream/10 px-4 py-1.5 text-sm font-medium text-cream backdrop-blur-sm">
              {t("hero.eyebrow")}
            </span>
            <h1 className="mt-6 text-4xl font-semibold leading-[1.05] text-cream sm:text-6xl">
              {t("hero.title")}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/85">
              {t("hero.subtitle")}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/projeler" className={buttonClass("gold")}>
                {t("hero.ctaPrimary")}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={telLink()} className={buttonClass("ghost")}>
                <Phone className="h-4 w-4" />
                {t("hero.ctaSecondary")}
              </a>
            </div>
          </div>
        </Container>
      </VideoHero>

      {/* STATS */}
      <div className="border-b border-forest-900/10 bg-cream">
        <Container>
          <dl className="grid grid-cols-2 divide-forest-900/10 py-8 sm:grid-cols-4 sm:divide-x">
            {[
              { v: t("stats.projectsValue"), l: t("stats.projects") },
              { v: t("stats.regionValue"), l: t("stats.region") },
              { v: t("stats.secureValue"), l: t("stats.secure") },
              { v: t("stats.infraValue"), l: t("stats.infra") },
            ].map((s, i) => (
              <div key={i} className="px-2 py-3 text-center sm:px-6">
                <dt className="font-display text-2xl font-semibold text-forest-900 sm:text-3xl">
                  {s.v}
                </dt>
                <dd className="mt-1 text-sm text-ink-soft">{s.l}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </div>

      {/* FEATURED PROJECTS */}
      <Section id="projeler" className="bg-cream">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow={t("featured.eyebrow")}
              title={t("featured.title")}
              subtitle={t("featured.subtitle")}
            />
            <Link
              href="/projeler"
              className={buttonClass("outline", "hidden sm:inline-flex")}
            >
              {t("common.viewAll")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08}>
                <ProjectCard project={p} locale={locale} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* WHY LAND */}
      <Section className="bg-forest-900 text-cream">
        <Container>
          <SectionHeading
            eyebrow={t("why.eyebrow")}
            title={t("why.title")}
            subtitle={t("why.subtitle")}
            align="center"
            invert
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: TrendingUp, k: "value" },
              { icon: ShieldCheck, k: "secure" },
              { icon: Route, k: "infra" },
              { icon: Wallet, k: "payment" },
            ].map(({ icon: Icon, k }, i) => (
              <Reveal key={k} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-cream/10 bg-forest-950/40 p-6">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500/15 text-gold-400">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold text-cream">
                    {t(`why.items.${k}.title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/70">
                    {t(`why.items.${k}.text`)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* STEPS */}
      <Section className="bg-cream">
        <Container>
          <SectionHeading
            eyebrow={t("steps.eyebrow")}
            title={t("steps.title")}
            align="center"
          />
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Search, k: "one" },
              { icon: MessageCircle, k: "two" },
              { icon: MapPinned, k: "three" },
              { icon: FileCheck, k: "four" },
            ].map(({ icon: Icon, k }, i) => (
              <Reveal key={k} delay={i * 0.08}>
                <div className="relative">
                  <span className="font-display text-5xl font-semibold text-sand">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="absolute left-14 top-2 flex h-10 w-10 items-center justify-center rounded-full bg-forest-800 text-cream">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-forest-900">
                    {t(`steps.items.${k}.title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {t(`steps.items.${k}.text`)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* TRUST + VIDEO */}
      <Section className="bg-sand">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <VideoPlayer
                poster="https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1400&q=70"
                label={t("trust.title")}
              />
            </Reveal>
            <div>
              <SectionHeading eyebrow={t("trust.eyebrow")} title={t("trust.title")} />
              <ul className="mt-8 space-y-4">
                {["one", "two", "three", "four", "five", "six"].map((k) => (
                  <li key={k} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-forest-700 text-cream">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-forest-900">{t(`trust.items.${k}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* TESTIMONIALS */}
      <Section className="bg-cream">
        <Container>
          <SectionHeading
            eyebrow={t("testimonials.eyebrow")}
            title={t("testimonials.title")}
            align="center"
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {["one", "two", "three"].map((k, i) => (
              <Reveal key={k} delay={i * 0.08}>
                <figure className="flex h-full flex-col rounded-2xl border border-forest-900/10 bg-cream p-7 shadow-[0_2px_20px_-12px_rgba(15,46,34,0.25)]">
                  <Quote className="h-8 w-8 text-gold-500" />
                  <blockquote className="mt-4 flex-1 text-forest-900">
                    “{t(`testimonials.items.${k}.text`)}”
                  </blockquote>
                  <figcaption className="mt-6 border-t border-forest-900/10 pt-4">
                    <span className="font-display font-semibold text-forest-900">
                      {t(`testimonials.items.${k}.name`)}
                    </span>
                    <span className="ml-2 text-sm text-ink-soft">
                      {t(`testimonials.items.${k}.role`)}
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* BLOG PREVIEW */}
      <Section className="bg-sand">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow={t("blogPreview.eyebrow")}
              title={t("blogPreview.title")}
              subtitle={t("blogPreview.subtitle")}
            />
            <Link
              href="/blog"
              className={buttonClass("outline", "hidden sm:inline-flex")}
            >
              {t("common.viewAll")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08}>
                <BlogCard post={p} locale={locale} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* FINAL CTA */}
      <Section className="relative overflow-hidden bg-forest-950 text-cream">
        <Image
          src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=2000&q=70"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-20"
        />
        <Container className="relative">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>{site.name}</Eyebrow>
            <h2 className="mt-4 text-3xl font-semibold text-cream sm:text-4xl">
              {t("finalCta.title")}
            </h2>
            <p className="mt-4 text-lg text-cream/80">{t("finalCta.subtitle")}</p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={whatsappLink(t("contact.whatsappMsg"))}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClass("gold")}
              >
                {t("finalCta.whatsapp")}
              </a>
              <a href={telLink()} className={buttonClass("ghost")}>
                <Phone className="h-4 w-4" />
                {site.phoneDisplay}
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
