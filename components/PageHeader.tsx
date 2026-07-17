import Image from "next/image";
import { Container, Eyebrow } from "./ui";

/** İç sayfa başlığı — navbar'ı temizleyen üst boşlukla. */
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
    <section className="relative overflow-hidden bg-forest-950 pt-28 pb-16 sm:pt-36 sm:pb-20">
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/70 to-forest-950/40" />
      <Container className="relative">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight text-cream sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-lg text-cream/80">{subtitle}</p>
        )}
      </Container>
    </section>
  );
}
