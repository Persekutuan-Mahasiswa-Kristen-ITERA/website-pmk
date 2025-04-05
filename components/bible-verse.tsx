import clsx from "clsx"
import React from "react"

interface BibleVerseProps {
    text: string
    verse: string
    className: string | undefined
}

const BibleVerse: React.FC<BibleVerseProps> = ({ text, verse, className }) => {
    return (
        <div className={clsx("italic text-brown-700 border-l-4 border-brown-300 pl-4 py-2 my-4 tracking-[0.02em]", className)}>
            &quot;{text}&quot;
            <span className="block mt-1 text-sm">— {verse}</span>
        </div>
    )
}

export default BibleVerse
