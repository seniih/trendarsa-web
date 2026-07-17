import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Target, Eye, Check } from "lucide-react";
import { routing } from "@/i18n/routing";
import { Container, Section, SectionHeading } from "@/components/ui";
import { PageHeader } from "@/components/PageHeader";
import { VideoPlayer } from "@/components/VideoPlayer";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("title"), description: t("lead") };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const trust = await getTranslations("trust");

  return (
    <>
      <PageHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("lead")}
        image="https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=2000&q=70"
      />

      <Section className="bg-cream">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <VideoPlayer
              poster="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1400&q=70"
              label={t("title")}
            />
            <div className="space-y-4 text-lg leading-relaxed text-ink-soft">
              <p>{t("p1")}</p>
              <p>{t("p2")}</p>
              <p>{t("p3")}</p>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-forest-900 text-cream !py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-cream/10 bg-forest-950/40 p-8">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500/15 text-gold-400">
                <Target className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold text-cream">
                {t("missionTitle")}
              </h3>
              <p className="mt-2 text-cream/75">{t("mission")}</p>
            </div>
            <div className="rounded-2xl border border-cream/10 bg-forest-950/40 p-8">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500/15 text-gold-400">
                <Eye className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold text-cream">
                {t("visionTitle")}
              </h3>
              <p className="mt-2 text-cream/75">{t("vision")}</p>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-sand">
        <Container>
          <SectionHeading
            eyebrow={trust("eyebrow")}
            title={trust("title")}
            align="center"
          />
          <ul className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-2">
            {["one", "two", "three", "four", "five", "six"].map((k) => (
              <li
                key={k}
                className="flex items-start gap-3 rounded-xl bg-cream p-4"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-forest-700 text-cream">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span className="text-forest-900">{trust(`items.${k}`)}</span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
