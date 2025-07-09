import type { NextConfig } from "next"
import bundleAnalyzer from "@next/bundle-analyzer"

const nextConfig: NextConfig = {
    // Performance and SEO optimizations
    compress: true,
    poweredByHeader: false,

    // Bun compatibility
    transpilePackages: [],

    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
                pathname: "/**",
            },
        ],
        formats: ["image/webp", "image/avif"],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        minimumCacheTTL: 60,
    },

    // Security headers
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    {
                        key: "X-DNS-Prefetch-Control",
                        value: "on",
                    },
                    {
                        key: "X-XSS-Protection",
                        value: "1; mode=block",
                    },
                    {
                        key: "X-Frame-Options",
                        value: "SAMEORIGIN",
                    },
                    {
                        key: "X-Content-Type-Options",
                        value: "nosniff",
                    },
                    {
                        key: "Referrer-Policy",
                        value: "origin-when-cross-origin",
                    },
                ],
            },
        ]
    },

    experimental: {
        optimizePackageImports: ["@radix-ui/react-icons", "lucide-react"],
        // optimizePackageImports: ["@google/genai", "undici", "firebase/firestore", "firebase/storage", "firebase-admin"],
        // serverActions: true,
    },
    serverExternalPackages: ["firebase-admin"],
    webpack: (config, { isServer }) => {
        if (isServer) {
            // Add fallbacks for modules that might not be available in serverless environments
            config.resolve.fallback = {
                ...config.resolve.fallback,
                ws: false,
                "utf-8-validate": false,
                bufferutil: false,
            }
        }

        // Optimize bundle size
        config.optimization = {
            ...config.optimization,
            splitChunks: {
                ...config.optimization.splitChunks,
                cacheGroups: {
                    ...config.optimization.splitChunks?.cacheGroups,
                    firebase: {
                        test: /[\\/]node_modules[\\/](firebase|@firebase)[\\/]/,
                        name: "firebase",
                        chunks: "all",
                        priority: 10,
                    },
                    ui: {
                        test: /[\\/]node_modules[\\/](@radix-ui|lucide-react)[\\/]/,
                        name: "ui",
                        chunks: "all",
                        priority: 10,
                    },
                },
            },
        }

        return config
    },
}

const withBundleAnalyzer = bundleAnalyzer({
    enabled: process.env.ANALYZE === "true",
})

module.exports = withBundleAnalyzer(nextConfig)
