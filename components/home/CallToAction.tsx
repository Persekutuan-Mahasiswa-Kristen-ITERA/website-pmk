import { Button } from "@/components/ui/button"
import Link from "next/link"

export const CallToAction = () => {
    return (
        <section className="relative py-40 overflow-hidden">
            <div
                className="absolute inset-0 z-0 bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1473177104440-ffee2f376098?ixlib=rb-1.2.1&auto=format&fit=crop&w=1800&h=900&q=80')",
                    filter: "brightness(0.3)",
                }}
            ></div>

            <div className="container mx-auto px-4 relative z-10 text-center">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-12">Bergabunglah Bersama Kami</h2>
                <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-8">
                    Mari bertumbuh bersama dalam persekutuan dan pelayanan untuk mewujudkan kasih Kristus di kampus
                    ITERA.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Button asChild size="lg" className="bg-brown-700 hover:bg-brown-800 text-white">
                        <Link href="/profile">Pelajari Lebih Lanjut</Link>
                    </Button>
                    <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="border-white/30 text-white hover:bg-white/10"
                    >
                        <Link href="/contribution">Dukung Pelayanan Kami</Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
