import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/about",
        destination: "/company",
        permanent: true,
      },
      {
        source: "/blog",
        destination: "/resources/blog",
        permanent: true,
      },
      {
        source: "/blog/:slug",
        destination: "/resources/blog/:slug",
        permanent: true,
      },
      {
        source: "/resources/webinars",
        destination: "/resources/webinars-conferences",
        permanent: true,
      },
      {
        source: "/resources/community",
        destination: "/resources/events",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
