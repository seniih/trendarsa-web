import Image from "next/image";
import { Container, Eyebrow, GrainOverlay } from "./ui";

/** İç sayfa başlığı — navbar'ı temizleyen üst boşlukla, sinematik derinlikte. */
export function PageHeader({
  eyebrow,
  title,
  subtitle,
  image = "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=2000&q=70",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-forest-950 pt-32 pb-20 sm:pt-40 sm:pb-24">
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/75 to-forest-950/50" />
      <div className="absolute inset-0 bg-gradient-to-r from-forest-950/60 to-transparent" />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-16 h-80 w-80 rounded-full opacity-35 blur-[110px] [background:radial-gradient(circle,rgba(97,188,69,0.55),transparent_65%)]"
      />
      <GrainOverlay className="opacity-[0.08]" />
      <Container className="relative">
        {eyebrow && <Eyebrow tone="leaf">{eyebrow}</Eyebrow>}
        <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.05] text-cream sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-cream/80">
            {subtitle}
          </p>
        )}
      </Container>
    </section>
  );
}
