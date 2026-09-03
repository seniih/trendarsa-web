import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/data/projects";
import { getProjects } from "@/data/projects";
import { routing } from "@/i18n/routing";
import { Container, Section } from "@/components/ui";
import { PageHeader } from "@/components/PageHeader";
import { ProjectsExplorer } from "@/components/ProjectsExplorer";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projectsPage" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  setRequestLocale(rawLocale);
  const locale = rawLocale as Locale;
  const t = await getTranslations("projectsPage");
  const projects = await getProjects();

  return (
    <>
      <PageHeader title={t("title")} subtitle={t("subtitle")} />
      <Section className="bg-cream">
        <Container>
          <ProjectsExplorer projects={projects} locale={locale} />
        </Container>
      </Section>
    </>
  );
}
