"use client"
import React, { useEffect, useState } from "react"

function TimeCounter() {
    function getDateTime() {
        const date = new Date()
        const time = date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
        const datetime = `${date.toLocaleDateString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        })} ${time}`
        return datetime
    }

    const [timedate, settimedate] = useState(getDateTime())

    useEffect(() => {
        const interval = setInterval(() => {
            settimedate(getDateTime())
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div>
            <span>{timedate}</span>
        </div>
    )
}

export default TimeCounter
