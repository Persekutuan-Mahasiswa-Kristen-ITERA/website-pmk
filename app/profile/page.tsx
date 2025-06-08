import { MainLayout } from "@/components/layout/MainLayout"
import { SectionHeader } from "@/components/ui/section-header"
import { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
    title: "Profil",
    description:
        "Persekutuan Mahasiswa Kristen (PMK) ITERA resmi didirikan sebagai Unit Kegiatan Mahasiswa untuk mahasiswa Kristen Protestan. PMK ITERA menjadi wadah pertumbuhan iman, persekutuan, dan pelayanan di lingkungan kampus.",
}

const Profil = () => {
    return (
        <MainLayout>
            <div className="bg-[url('https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=700&q=80')] bg-cover bg-center py-28 relative">
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-white text-center">
                        Profil PMK ITERA
                    </h1>
                </div>
            </div>

            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        <div>
                            <SectionHeader
                                title="Sejarah PMK ITERA"
                                subtitle="Perjalanan persekutuan kami dari awal hingga saat ini"
                            />

                            <div className="prose prose-brown max-w-none">
                                <p className="text-justify">
                                    Institut Teknologi Sumatera (ITERA) didirikan pada tahun 2014 sebagai perguruan
                                    tinggi teknik negeri ketiga di Indonesia. Seiring keberagaman mahasiswa dalam suku,
                                    agama, ras, dan golongan, kebutuhan akan pembinaan kerohanian mendorong terbentuknya
                                    UKM berbasis agama.
                                </p>
                                <p className="text-justify">
                                    Awalnya, kegiatan mahasiswa Kristen difasilitasi oleh UKM Komunitas Mahasiswa
                                    Kristen Katolik (KMKK) untuk mahasiswa Kristen Protestan dan Katolik. Namun,
                                    meningkatnya jumlah mahasiswa Kristen Protestan mendorong pembentukan unit khusus.
                                </p>
                                <p className="text-justify">
                                    Maka, pada tanggal 14 Februari 2020, Persekutuan Mahasiswa Kristen (PMK) ITERA resmi
                                    didirikan sebagai Unit Kegiatan Mahasiswa untuk mahasiswa Kristen Protestan. PMK
                                    ITERA menjadi wadah pertumbuhan iman, persekutuan, dan pelayanan di lingkungan
                                    kampus.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-8 mt-8 lg:mt-0">
                            <Image
                                src="/img/image1.webp"
                                alt="PMK ITERA"
                                className="w-full h-auto rounded-lg shadow-lg"
                                width={1200}
                                height={700}
                            />

                            <div className="bg-brown-50 p-8 rounded-lg">
                                <h3 className="text-xl font-serif font-medium text-brown-800 mb-4">
                                    Tonggak Penting PMK ITERA
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex">
                                        <div className="w-24 flex-shrink-0 font-medium text-brown-700">2014</div>
                                        <div className="text-brown-600">ITERA didirikan</div>
                                    </div>
                                    <div className="flex">
                                        <div className="w-24 flex-shrink-0 font-medium text-brown-700">2015</div>
                                        <div className="text-brown-600">SK Rektor No. 188/A/SK/KM/2015 dikeluarkan</div>
                                    </div>
                                    <div className="flex">
                                        <div className="w-24 flex-shrink-0 font-medium text-brown-700">2020</div>
                                        <div className="text-brown-600">
                                            PMK ITERA resmi didirikan sebagai UKM Kristen Protestan
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 bg-brown-50">
                <div className="container mx-auto px-4">
                    <SectionHeader
                        title="Visi & Misi"
                        subtitle="Landasan yang membentuk arah pelayanan kami"
                        centered
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        <div className="bg-white p-8 rounded-lg shadow-md text-center">
                            <h3 className="text-2xl font-serif text-brown-800 mb-4">Visi</h3>
                            <p className="text-brown-700">
                                Menjadikan generasi mahasiswa Kristen PMK ITERA sebagai garam dan terang dunia, yang
                                meneladani Kristus sebagai pusat iman hidup yang berhikmat dan berpengetahuan luas untuk
                                menumbuhkan tali Persekutuan antara mahasiswa Kristen ITERA.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-lg shadow-md text-center">
                            <h3 className="text-2xl font-serif text-brown-800 mb-4">Misi</h3>
                            <ul className="text-brown-700 space-y-2 list-disc list-inside">
                                <li>Melaksanakan misi persekutuan, pembekalan, dan pengutusan.</li>
                                <li>Menjadi wadah pertumbuhan iman mahasiswa Kristen ITERA.</li>
                                <li>Menggenapi amanat agung sebagaimana yang Yesus katakan.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    )
}

export default Profil
