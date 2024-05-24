import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",

  // ... other options you like
});

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/*/**",
      },
    ],
  },
});

export default nextConfig;
