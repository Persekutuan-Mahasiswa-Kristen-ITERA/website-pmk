import type { NextConfig } from "next"
import bundleAnalyzer from "@next/bundle-analyzer"

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
                pathname: "/**",
            },
        ],
    },
    experimental: {
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
        return config
    },
}

const withBundleAnalyzer = bundleAnalyzer({
    enabled: process.env.ANALYZE === "true",
})

module.exports = withBundleAnalyzer(nextConfig)
