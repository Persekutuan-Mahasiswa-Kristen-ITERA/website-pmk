import clsx from "clsx"
import React from "react"
import AOSWrapper from "./ui/aos-wrapper"
import Link from "next/link"

interface DailyVerseProps {
    text: string
    verse: string
    id: string
    className: string | undefined
}

const DailyVerse: React.FC<DailyVerseProps> = ({ text, verse, id, className }) => {
    return (
        <AOSWrapper>
            <Link href={`/devotinal/${id}`} className="group">
                <div
                    className={clsx(
                        "italic text-brown-300 !font-serif border-l-4 border-brown-300 pl-4 py-3 my-4 group",
                        className
                    )}
                    data-aos="fade-right"
                    data-aos-duration="2000"
                >
                    <h4 className="not-italic text-sm font-semibold text-brown-200 mb-4 group-hover:underline">
                        Renungan Hari Ini
                    </h4>
                    <h6 className="font-semibold group-hover:underline">&quot;{text}&quot;</h6>
                    <span className="!font-serif block mt-1 text-sm group-hover:underline">— {verse}</span>
                </div>
            </Link>
        </AOSWrapper>
    )
}

export default DailyVerse
