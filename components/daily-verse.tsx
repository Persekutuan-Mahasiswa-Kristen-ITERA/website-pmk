import clsx from "clsx"
import React from "react"
import AOSWrapper from "./ui/aos-wrapper"

interface DailyVerseProps {
    text: string
    verse: string
    className: string | undefined
}

const DailyVerse: React.FC<DailyVerseProps> = ({ text, verse, className }) => {
    return (
        <AOSWrapper>
            <div
                className={clsx(
                    "italic text-brown-500 !font-serif border-l-4 border-brown-300 pl-4 py-3 my-4",
                    className
                )}
                data-aos="fade-right" data-aos-duration="2000"
            >
                <h4 className="not-italic text-sm font-semibold text-brown-200 mb-4">Renungan Hari Ini</h4>
                <h6 className="">&quot;{text}&quot;</h6>
                <span className="!font-serif block mt-1 text-sm">— {verse}</span>
            </div>
        </AOSWrapper>
    )
}

export default DailyVerse
