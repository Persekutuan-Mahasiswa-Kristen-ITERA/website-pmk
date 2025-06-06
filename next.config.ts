import type { NextConfig } from "next"

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
    serverExternalPackages: [
        "@google/genai",
    ],
}

export default nextConfig
