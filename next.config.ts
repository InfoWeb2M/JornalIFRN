import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    remotePatterns: [new URL('https://ecejzvtwgbqddmqnbapx.supabase.co/storage/v1/object/public/imagens-noticias/**')]
  }
};

export default nextConfig;
