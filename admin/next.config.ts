import type { NextConfig } from "next";
const url = new URL(
  String(process.env.NEXT_PUBLIC_AUTH_URL ?? "http://localhost:3000")
);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: url.protocol.replace(":", "") as "http" | "https",
        hostname: url.hostname,
        port: url.port || "",
        pathname: "/api/uploads/**",
      },
    ],
  },
};

export default nextConfig;
