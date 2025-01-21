import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // async redirects() {
  //   return [
  //     {
  //       source: '/course',
  //       destination: '/course/overview',
  //       permanent: false, // Use `true` for a 308 Permanent Redirect
  //     },
  //   ];
  // },
  reactStrictMode: false,
};

export default nextConfig;
