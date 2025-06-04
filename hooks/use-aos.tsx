// "use client"

import { useEffect } from "react"
import AOS from "aos"
import "aos/dist/aos.css"
export function useAOS() {
    useEffect(() => {
        AOS.init({
            duration: 1000, // Animation duration in milliseconds
            once: true, // Whether animation should happen only once
            mirror: false, // Whether elements should animate out while scrolling past them
        })

        // Refresh AOS on route change
        const handleRouteChange = () => {
            AOS.refresh()
        }

        window.addEventListener("popstate", handleRouteChange)
        return () => {
            window.removeEventListener("popstate", handleRouteChange)
        }
    }, [])
}

export default useAOS
