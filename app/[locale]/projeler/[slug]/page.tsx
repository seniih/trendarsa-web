import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import {
  MapPin,
  Maximize,
  Layers,
  Wallet,
  Phone,
  ArrowLeft,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/data/projects";
import { getProject, getProjects } from "@/data/projects";
import { whatsappLink, telLink } from "@/data/site";
import { getSiteInfo } from "@/data/site-content";
import { formatPriceTRY } from "@/lib/utils";
import { Container, Section, Badge, buttonClass } from "@/components/ui";
import { VideoPlayer } from "@/components/VideoPlayer";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { ProjectCard } from "@/components/ProjectCard";
import { MapEmbed } from "@/components/MapEmbed";
import { Reveal } from "@/components/Reveal";
import { routing } from "@/i18n/routing";
import { WhatsAppIcon } from "@/components/FloatingContact";

export async function generateStaticParams() {
  const projects = await getProjects();
  return routing.locales.flatMap((locale) =>
    projects.map((p) => ({ locale, slug: p.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};
  const l = locale as Locale;
  return {
    title: project.title[l],
    description: project.excerpt[l],
    openGraph: project.poster ? { images: [project.poster] } : undefined,
  };
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  setRequestLocale(rawLocale);
  const locale = rawLocale as Locale;
  const project = await getProject(slug);
  if (!project) notFound();

  const t = await getTranslations("projectDetail");
  const c = await getTranslations("common");
  const others = (await getProjects()).filter((p) => p.slug !== slug).slice(0, 3);
  const site = await getSiteInfo();
  const waMsg = t("whatsappMsg", { project: project.title[locale] });

  const specs = [
    { icon: MapPin, label: c("region"), value: `${project.region} · ${project.city}` },
    { icon: Maximize, label: c("area"), value: `${project.area} m²` },
    ...(project.emsal
      ? [{ icon: Layers, label: c("emsal"), value: String(project.emsal) }]
      : []),
    { icon: Wallet, label: c("price"), value: formatPriceTRY(project.priceTRY) },
  ];

  return (
    <>
      <div className="pt-24 sm:pt-28">
        <Section className="bg-cream !pt-8 !pb-10">
          <Container>
            <Link
              href="/projeler"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-forest-700 transition-colors hover:text-leaf-800"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("back")}
            </Link>

            <div className="mt-6 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
              {/* Sol: medya + açıklama */}
              <div>
                {project.poster ? (
                  <VideoPlayer
                    poster={project.poster}
                    videoSrc={project.video}
                    label={project.title[locale]}
                  />
                ) : (
                  <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
                    <ImagePlaceholder />
                  </div>
                )}

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags[locale].map((tag) => (
                    <Badge key={tag} tone="green">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="mt-8 space-y-4 text-lg leading-relaxed text-ink-soft">
                  {project.description[locale].map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                {project.gallery.length > 1 && (
                  <div className="mt-10">
                    <h2 className="font-display text-xl font-semibold text-forest-900">
                      {t("gallery")}
                    </h2>
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      {project.gallery.map((img, i) => (
                        <Reveal key={i} delay={i * 0.06}>
                          <div className="group relative aspect-[4/3] overflow-hidden rounded-xl">
                            <Image
                              src={img}
                              alt={`${project.title[locale]} ${i + 1}`}
                              fill
                              sizes="(max-width: 768px) 100vw, 40vw"
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                          </div>
                        </Reveal>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sağ: özet + CTA (yapışkan) */}
              <aside className="lg:sticky lg:top-28 lg:self-start">
                <div className="relative overflow-hidden rounded-2xl border border-forest-900/10 bg-cream p-6 shadow-cine">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-leaf-600 via-leaf-500 to-leaf-400" />
                  <h1 className="font-display text-2xl font-semibold leading-snug text-forest-900">
                    {project.title[locale]}
                  </h1>
                  <p className="mt-4 font-display text-3xl font-semibold text-forest-900">
                    {formatPriceTRY(project.priceTRY)}
                  </p>
                  {project.installment && (
                    <p className="mt-1 text-sm font-medium text-gold-700">
                      {c("installment")}
                    </p>
                  )}

                  <dl className="mt-6 space-y-3 border-t border-forest-900/10 pt-6">
                    {specs.map(({ icon: Icon, label, value }) => (
                      <div
                        key={label}
                        className="flex items-center justify-between text-sm"
                      >
                        <dt className="flex items-center gap-2 text-ink-soft">
                          <Icon className="h-4 w-4 text-leaf-600" />
                          {label}
                        </dt>
                        <dd className="font-medium text-forest-900">{value}</dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-6 space-y-3 border-t border-forest-900/10 pt-6">
                    <p className="text-sm font-medium text-forest-900">
                      {t("ctaText")}
                    </p>
                    <a
                      href={whatsappLink(waMsg, site.whatsapp)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={buttonClass("gold", "w-full bg-[#25D366] text-white hover:bg-[#20bd5a]")}
                    >
                      <WhatsAppIcon className="h-5 w-5" />
                      {c("whatsappCta")}
                    </a>
                    <a href={telLink(site.phoneIntl)} className={buttonClass("primary", "w-full")}>
                      <Phone className="h-4 w-4" />
                      {site.phoneDisplay}
                    </a>
                  </div>
                </div>
              </aside>
            </div>

            {/* Konum */}
            {project.coords && (
              <div className="mt-12">
                <h2 className="font-display text-xl font-semibold text-forest-900">
                  {t("location")}
                </h2>
                <div className="mt-4 overflow-hidden rounded-2xl border border-forest-900/10">
                  <MapEmbed
                    lat={project.coords.lat}
                    lng={project.coords.lng}
                    label={project.title[locale]}
                  />
                </div>
              </div>
            )}
          </Container>
        </Section>
      </div>

      {/* Diğer projeler */}
      <Section className="bg-sand !pt-14">
        <Container>
          <h2 className="font-display text-2xl font-semibold text-forest-900">
            {t("otherProjects")}
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08}>
                <ProjectCard project={p} locale={locale} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
