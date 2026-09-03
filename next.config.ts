import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

// İlan görselleri Supabase üzerinden gelen R2 URL'leri.
const r2Hostname = process.env.R2_PUBLIC_BASE_URL
  ? new URL(process.env.R2_PUBLIC_BASE_URL).hostname
  : undefined;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Placeholder / dış görseller (örn. Unsplash) için — üretimde daraltılır
      { protocol: "https", hostname: "images.unsplash.com" },
      ...(r2Hostname ? [{ protocol: "https" as const, hostname: r2Hostname }] : []),
    ],
  },
};

export default withNextIntl(nextConfig);
