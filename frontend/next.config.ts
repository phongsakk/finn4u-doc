import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  
  images: {
    remotePatterns: [
      // {
      //   protocol: 'http',
      //   hostname: '10.12.60.68',  
      //   port: '3000', 
      //   pathname: '/_next/image', 
      // },
      // {
      //   protocol: 'http',
      //   hostname: 'localhost',  
      //   port: '3000',          
      //   pathname: '/_next/image', 
      // },
      {
        protocol: 'http',
        hostname: '103.22.183.137',  
        port: '8079',          
        pathname: '/_next/image', 
      }
    ],
  },
};

export default nextConfig;
