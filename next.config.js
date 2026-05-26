// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "place-hold.it",
      },
    ],
  },
  transpilePackages: ["lucide-react"], // to enable dynamic icons
};

export default nextConfig;
