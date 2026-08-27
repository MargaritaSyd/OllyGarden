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
        source: "/resources/webinars",
        destination: "/resources/webinars-conferences",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
