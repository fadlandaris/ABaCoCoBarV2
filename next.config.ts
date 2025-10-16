/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "plus.unsplash.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },

  webpack(config: { module: { rules: { test: RegExp; use: string[]; }[]; }; }) {
    // Tambahkan dukungan untuk import file SVG sebagai React component
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

module.exports = nextConfig;
