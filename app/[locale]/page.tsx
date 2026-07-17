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
  GrainOverlay,
} from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { Stat } from "@/components/Stat";
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
      <VideoHero poster="https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=2000&q=75">
        <Container className="pt-20">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-cream/20 bg-cream/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.22em] text-cream backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-leaf-400 shadow-[0_0_10px_2px_var(--leaf-glow)]" />
              {t("hero.eyebrow")}
            </span>
            <h1 className="mt-7 text-[2.6rem] font-semibold leading-[1.03] text-cream sm:text-6xl lg:text-7xl">
              {t("hero.title")}
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-cream/85">
              {t("hero.subtitle")}
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link href="/projeler" className={buttonClass("primary")}>
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
      <div className="relative border-b border-forest-900/10 bg-cream">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-leaf-500/60 to-transparent" />
        <Container>
          <dl className="grid grid-cols-2 divide-forest-900/10 py-10 sm:grid-cols-4 sm:divide-x">
            <Stat value={t("stats.projectsValue")} label={t("stats.projects")} />
            <Stat value={t("stats.regionValue")} label={t("stats.region")} />
            <Stat value={t("stats.secureValue")} label={t("stats.secure")} />
            <Stat value={t("stats.infraValue")} label={t("stats.infra")} />
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
      <Section className="relative overflow-hidden bg-forest-950 text-cream">
        <Image
          src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=2000&q=70"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-950 via-forest-950/85 to-forest-950" />
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-1/4 h-96 w-96 rounded-full opacity-30 blur-[110px] [background:radial-gradient(circle,rgba(97,188,69,0.5),transparent_65%)]"
        />
        <GrainOverlay className="opacity-[0.08]" />
        <Container className="relative">
          <SectionHeading
            eyebrow={t("why.eyebrow")}
            title={t("why.title")}
            subtitle={t("why.subtitle")}
            align="center"
            invert
          />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: TrendingUp, k: "value" },
              { icon: ShieldCheck, k: "secure" },
              { icon: Route, k: "infra" },
              { icon: Wallet, k: "payment" },
            ].map(({ icon: Icon, k }, i) => (
              <Reveal key={k} delay={i * 0.08}>
                <div className="group h-full rounded-2xl border border-cream/10 bg-cream/[0.04] p-6 backdrop-blur-sm transition-colors duration-300 hover:border-leaf-500/40">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-leaf-500/15 text-leaf-400 ring-1 ring-leaf-500/20 shadow-[0_0_24px_-6px_var(--leaf-glow)] transition-transform duration-300 group-hover:scale-110">
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
          <div className="relative mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {/* Adımları bağlayan ince çizgi (masaüstü) */}
            <div
              aria-hidden
              className="absolute left-0 right-0 top-5 hidden h-px bg-gradient-to-r from-transparent via-leaf-500/30 to-transparent lg:block"
            />
            {[
              { icon: Search, k: "one" },
              { icon: MessageCircle, k: "two" },
              { icon: MapPinned, k: "three" },
              { icon: FileCheck, k: "four" },
            ].map(({ icon: Icon, k }, i) => (
              <Reveal key={k} delay={i * 0.08} className="relative">
                <div className="relative">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-leaf-500 text-forest-950 shadow-[var(--shadow-leaf)] ring-4 ring-cream">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="pointer-events-none absolute -top-3 right-2 font-display text-6xl font-semibold text-forest-900/[0.06]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold text-forest-900">
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
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-leaf-500 text-forest-950 shadow-[0_0_16px_-4px_var(--leaf-glow)]">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
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
                <figure className="flex h-full flex-col rounded-2xl border border-forest-900/10 bg-cream p-7 shadow-[0_2px_20px_-12px_rgba(6,26,16,0.25)] transition-all duration-500 hover:-translate-y-1 hover:border-leaf-500/30 hover:shadow-cine">
                  <Quote className="h-8 w-8 fill-current text-gold-400/80" />
                  <blockquote className="mt-4 flex-1 leading-relaxed text-forest-900">
                    “{t(`testimonials.items.${k}.text`)}”
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-forest-900/10 pt-5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest-900 font-display text-lg font-semibold text-leaf-400">
                      {t(`testimonials.items.${k}.name`).charAt(0)}
                    </span>
                    <span className="flex flex-col">
                      <span className="font-display font-semibold text-forest-900">
                        {t(`testimonials.items.${k}.name`)}
                      </span>
                      <span className="text-sm text-ink-soft">
                        {t(`testimonials.items.${k}.role`)}
                      </span>
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
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-950/85 via-forest-950/70 to-forest-950/95" />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-full h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-[130px] [background:radial-gradient(circle,rgba(97,188,69,0.6),transparent_65%)]"
        />
        <GrainOverlay className="opacity-[0.08]" />
        <Container className="relative">
          <div className="mx-auto max-w-2xl text-center">
            <div className="flex justify-center">
              <Eyebrow tone="leaf" invert>
                {site.name}
              </Eyebrow>
            </div>
            <h2 className="mt-5 text-3xl font-semibold text-cream sm:text-[2.6rem]">
              {t("finalCta.title")}
            </h2>
            <p className="mt-5 text-lg text-cream/80">{t("finalCta.subtitle")}</p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={whatsappLink(t("contact.whatsappMsg"))}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClass("primary")}
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
