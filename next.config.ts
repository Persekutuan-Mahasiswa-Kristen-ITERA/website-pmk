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
        optimizePackageImports: ["@google/genai", "undici"],
        // serverActions: true,
        // serverComponentsExternalPackages: ["@google/genai", "undici"],
    },
}

const withBundleAnalyzer = bundleAnalyzer({
    enabled: process.env.ANALYZE === "true",
})

module.exports = withBundleAnalyzer(nextConfig)
