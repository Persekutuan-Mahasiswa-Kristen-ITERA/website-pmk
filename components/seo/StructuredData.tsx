import Script from "next/script"

interface StructuredDataProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any // Using any for schema.org types compatibility
}

export function StructuredData({ data }: StructuredDataProps) {
    return (
        <Script
            id="structured-data"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    ...data,
                }),
            }}
        />
    )
}

export default StructuredData
