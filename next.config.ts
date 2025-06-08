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
    serverExternalPackages: ["@google/genai", "firebase-admin"],
}

const withBundleAnalyzer = bundleAnalyzer({
    enabled: process.env.ANALYZE === "true",
})

module.exports = withBundleAnalyzer(nextConfig)
