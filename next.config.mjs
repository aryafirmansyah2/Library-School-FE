/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080", // tambahkan port kalau kamu pakai selain 80
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
