"use client";

import Image from "next/image";
import { useReducedMotion } from "motion/react";

/**
 * Tam ekran video hero.
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
            className={`object-cover ${reduce ? "" : "animate-[kenburns_24s_ease-in-out_infinite_alternate]"}`}
          />
        )}
        {/* Karartma / degrade — metin okunabilirliği */}
        <div className="absolute inset-0 bg-gradient-to-b from-forest-950/70 via-forest-950/45 to-forest-950/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-950/60 to-transparent" />
      </div>

      {/* İçerik */}
      <div className="relative z-10 w-full">{children}</div>

      <style>{`
        @keyframes kenburns {
          from { transform: scale(1) translateY(0); }
          to { transform: scale(1.12) translateY(-1.5%); }
        }
      `}</style>
    </section>
  );
}
