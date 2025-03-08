import type { NextConfig } from "next";
const url = new URL(
  String(process.env.NEXT_PUBLIC_IMAGE_HOST ?? "http://localhost:8079")
);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: url.protocol.replace(":", "") as "http" | "https",
        hostname: url.hostname,
        port: url.port || "",
        pathname: "/_next/image",
      },
    ],
  },
};

export default nextConfig;
