import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { InstagramIcon, FacebookIcon } from "@/components/BrandIcons";
import { routing } from "@/i18n/routing";
import { site, whatsappLink, telLink } from "@/data/site";
import { Container, Section, buttonClass } from "@/components/ui";
import { PageHeader } from "@/components/PageHeader";
import { MapEmbed } from "@/components/MapEmbed";
import { WhatsAppIcon } from "@/components/FloatingContact";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  const rows = [
    {
      icon: Phone,
      label: t("phone"),
      value: site.phoneDisplay,
      href: telLink(),
    },
    {
      icon: Mail,
      label: t("email"),
      value: site.email,
      href: `mailto:${site.email}`,
    },
    {
      icon: MapPin,
      label: t("address"),
      value: `${site.address.line}, ${site.address.district} / ${site.address.city}`,
    },
    { icon: Clock, label: t("hours"), value: t("hoursValue") },
  ];

  return (
    <>
      <PageHeader
        title={t("title")}
        subtitle={t("subtitle")}
        image="https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=2000&q=70"
      />

      <Section className="bg-cream">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <ul className="space-y-6">
                {rows.map(({ icon: Icon, label, value, href }) => (
                  <li key={label} className="flex items-start gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-forest-700/10 text-forest-700">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-sm font-medium uppercase tracking-wide text-ink-soft">
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          className="mt-1 block font-display text-lg text-forest-900 hover:text-gold-600"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="mt-1 font-display text-lg text-forest-900">
                          {value}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={whatsappLink(t("whatsappMsg"))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClass(
                    "gold",
                    "bg-[#25D366] text-white hover:bg-[#20bd5a]",
                  )}
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  {t("whatsapp")}
                </a>
                <a href={telLink()} className={buttonClass("primary")}>
                  <Phone className="h-4 w-4" />
                  {t("phone")}
                </a>
              </div>

              <div className="mt-8">
                <p className="text-sm font-medium uppercase tracking-wide text-ink-soft">
                  {t("social")}
                </p>
                <div className="mt-3 flex gap-3">
                  <a
                    href={site.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-forest-800 text-cream hover:bg-gold-500 hover:text-forest-950"
                  >
                    <InstagramIcon className="h-5 w-5" />
                  </a>
                  <a
                    href={site.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-forest-800 text-cream hover:bg-gold-500 hover:text-forest-950"
                  >
                    <FacebookIcon className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-forest-900/10 shadow-soft">
              <MapEmbed
                lat={site.address.lat}
                lng={site.address.lng}
                label={site.name}
                zoom={15}
              />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
