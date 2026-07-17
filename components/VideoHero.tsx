"use client";

import Image from "next/image";
import { useReducedMotion } from "motion/react";
import { GrainOverlay, Scrim } from "./ui";

/**
 * Tam ekran sinematik video hero.
 * - videoSrc verilirse sessiz/otomatik/döngülü oynar.
 * - video yoksa veya reduced-motion ise poster görseli (yavaş zoom) gösterilir.
 * Gerçek videolar public/videos altına eklenip `videoSrc` ile geçilir.
 */
export function VideoHero({
  poster,
  videoSrc,
  children,
}: {
  poster: string;
  videoSrc?: string;
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  const useVideo = Boolean(videoSrc) && !reduce;

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-forest-950">
      {/* Medya katmanı */}
      <div className="absolute inset-0">
        {useVideo ? (
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={poster}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={poster}
            alt=""
            fill
            priority
            sizes="100vw"
            className={`object-cover ${reduce ? "" : "animate-[kenburns_26s_ease-in-out_infinite_alternate]"}`}
          />
        )}
        {/* Karartma / vinyet — metin okunabilirliği */}
        <Scrim />
        {/* Yaprak parıltısı — sinematik marka ışıması */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-40 top-1/3 h-[38rem] w-[38rem] rounded-full opacity-40 blur-[120px] [background:radial-gradient(circle,rgba(97,188,69,0.55),transparent_65%)]"
        />
        <GrainOverlay />
      </div>

      {/* İçerik */}
      <div className="relative z-10 w-full">{children}</div>

      {/* Scroll göstergesi */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-7 z-10 flex justify-center"
      >
        <span className="flex h-9 w-6 items-start justify-center rounded-full border border-cream/30 p-1.5">
          <span
            className={`h-1.5 w-1.5 rounded-full bg-leaf-400 ${reduce ? "" : "animate-[scrollcue_1.8s_ease-in-out_infinite]"}`}
          />
        </span>
      </div>

      <style>{`
        @keyframes kenburns {
          from { transform: scale(1) translateY(0); }
          to { transform: scale(1.12) translateY(-1.5%); }
        }
        @keyframes scrollcue {
          0% { transform: translateY(0); opacity: 0.3; }
          50% { transform: translateY(9px); opacity: 1; }
          100% { transform: translateY(0); opacity: 0.3; }
        }
      `}</style>
    </section>
  );
}
