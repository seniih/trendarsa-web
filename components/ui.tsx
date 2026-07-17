import { cn } from "@/lib/utils";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}

export function Section({
  className,
  children,
  id,
}: {
  className?: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-20 sm:py-28", className)}>
      {children}
    </section>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-gold-600">
      <span className="h-px w-6 bg-gold-500" aria-hidden />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  invert = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  invert?: boolean;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
      )}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2
        className={cn(
          "mt-4 text-3xl font-semibold leading-tight sm:text-4xl",
          invert ? "text-cream" : "text-forest-900",
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-lg leading-relaxed",
            invert ? "text-cream/80" : "text-ink-soft",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

type Variant = "primary" | "gold" | "outline" | "ghost";

export function buttonClass(variant: Variant = "primary", className?: string) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-cream";
  const variants: Record<Variant, string> = {
    primary:
      "bg-forest-800 text-cream hover:bg-forest-700 shadow-[0_8px_24px_-8px_rgba(15,46,34,0.5)]",
    gold: "bg-gold-500 text-forest-950 hover:bg-gold-400 shadow-[0_8px_24px_-8px_rgba(201,162,75,0.6)]",
    outline:
      "border border-forest-800/30 text-forest-900 hover:border-forest-800 hover:bg-forest-800 hover:text-cream",
    ghost: "text-cream/90 hover:text-cream border border-cream/25 hover:border-cream/60",
  };
  return cn(base, variants[variant], className);
}

export function Badge({
  children,
  tone = "sand",
}: {
  children: React.ReactNode;
  tone?: "sand" | "gold" | "green" | "muted";
}) {
  const tones: Record<string, string> = {
    sand: "bg-sand text-forest-800",
    gold: "bg-gold-500/15 text-gold-600 ring-1 ring-gold-500/30",
    green: "bg-forest-600/12 text-forest-700 ring-1 ring-forest-600/20",
    muted: "bg-ink/8 text-ink-soft",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        tones[tone],
      )}
    >
      {children}
    </span>
  );
}
