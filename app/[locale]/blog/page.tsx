import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/data/projects";
import { getPosts } from "@/data/posts";
import { routing } from "@/i18n/routing";
import { Container, Section } from "@/components/ui";
import { PageHeader } from "@/components/PageHeader";
import { BlogCard } from "@/components/BlogCard";
import { Reveal } from "@/components/Reveal";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blogPage" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  setRequestLocale(rawLocale);
  const locale = rawLocale as Locale;
  const t = await getTranslations("blogPage");
  const posts = getPosts();

  return (
    <>
      <PageHeader
        title={t("title")}
        subtitle={t("subtitle")}
        image="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=2000&q=70"
      />
      <Section className="bg-cream">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.06}>
                <BlogCard post={p} locale={locale} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
