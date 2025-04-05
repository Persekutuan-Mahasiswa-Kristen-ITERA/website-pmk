import React from "react"

interface SectionHeaderProps {
    title: string
    subtitle?: string
    centered?: boolean
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, centered = false }) => {
    return (
        <div className={`mb-12 ${centered ? "text-center" : ""}`}>
            <h2 className={`section-title ${centered ? "mx-auto after:left-1/4 after:right-1/4" : ""}`}>{title}</h2>
            {subtitle && <p className="text-brown-600 mt-4 max-w-2xl text-center">{subtitle}</p>}
        </div>
    )
}
