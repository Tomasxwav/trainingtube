/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NextConfig } from "next";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config, { dev, isServer }) => {
    // Only use mini-css-extract-plugin on the client side and in production
    if (!isServer) {
      config.plugins = config.plugins || [];
      config.plugins.push(
        new MiniCssExtractPlugin({
          filename: 'static/css/[contenthash].css',
          chunkFilename: 'static/css/[contenthash].css',
        })
      );
    }
    return config;
  },
  images: {
    remotePatterns: [
      {
        hostname: 'storage.googleapis.com',
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // Ajusta este valor según tus necesidades
    },
  },
  publicRuntimeConfig: {
    // Disponible tanto en servidor como cliente
    publicBackendUrl: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001'
  }
  
};

export default nextConfig;
