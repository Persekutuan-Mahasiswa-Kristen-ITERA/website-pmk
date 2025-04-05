import React from "react"

interface SectionHeaderProps {
    title: string
    subtitle?: string
    centered?: boolean
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, centered = false }) => {
    return (
        <div className={`mb-8 ${centered ? "text-center" : ""}`}>
            <h2
                className={`font-serif text-brown-800 text-3xl md:text-4xl relative inline-block ${
                    centered ? "mx-auto" : ""
                }`}
            >
                {title}
                {
                    <span
                        className={`absolute -bottom-1 h-[3px] bg-brown-600 w-3/4 ${centered ? "left-1/8" : "left-0"}`}
                    ></span>
                }
            </h2>

            <p className={`text-brown-600 mt-6 max-w-2xl ${centered ? "text-center mx-auto" : ""}`}>{subtitle}</p>
        </div>
    )
}
