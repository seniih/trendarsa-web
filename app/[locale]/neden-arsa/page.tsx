import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { TrendingUp, ShieldCheck, Route, Wallet } from "lucide-react";
import { routing } from "@/i18n/routing";
import { Container, Section, SectionHeading } from "@/components/ui";
import { PageHeader } from "@/components/PageHeader";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "whyPage" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function WhyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("whyPage");
  const why = await getTranslations("why");

  const faq = ["1", "2", "3", "4"];

  return (
    <>
      <PageHeader
        title={t("title")}
        subtitle={t("subtitle")}
        image="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2000&q=70"
      />

      <Section className="bg-cream">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: TrendingUp, k: "value" },
              { icon: ShieldCheck, k: "secure" },
              { icon: Route, k: "infra" },
              { icon: Wallet, k: "payment" },
            ].map(({ icon: Icon, k }) => (
              <div
                key={k}
                className="rounded-2xl border border-forest-900/10 bg-cream p-6 shadow-[0_2px_20px_-12px_rgba(15,46,34,0.25)]"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest-700/10 text-forest-700">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-forest-900">
                  {why(`items.${k}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {why(`items.${k}.text`)}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section className="bg-sand !pt-4">
        <Container className="max-w-3xl">
          <SectionHeading title={t("faqTitle")} align="center" />
          <div className="mt-10 space-y-4">
            {faq.map((n) => (
              <details
                key={n}
                className="group rounded-2xl border border-forest-900/10 bg-cream p-5 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-display text-lg font-medium text-forest-900">
                  {t(`faq.q${n}`)}
                  <span className="text-gold-600 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 leading-relaxed text-ink-soft">
                  {t(`faq.a${n}`)}
                </p>
              </details>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
