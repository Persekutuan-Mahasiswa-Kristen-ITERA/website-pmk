import { MainLayout } from "@/components/layout/MainLayout"
import { SectionHeader } from "@/components/ui/section-header"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { management } from "@/data/management"
import Image from "next/image"

const Pengurus = () => {
    const departments = Object.entries(management)
    

    return (
        <MainLayout>
            <div className="bg-brown-100 py-20">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-brown-800 text-center">
                        Pengurus PMK ITERA
                    </h1>
                    <p className="text-center text-brown-600 mt-4 max-w-2xl mx-auto">
                        Mengenal lebih dekat para pengurus yang melayani di Persekutuan Mahasiswa Kristen ITERA periode
                        2023-2024
                    </p>
                </div>
            </div>

            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="mb-16">
                        <SectionHeader title="YESAKA" subtitle={`Kesekjenan PMK ITERA`} centered={true} />

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 place-content-center place-items-center">
                            {
                                // management.kesekjenan.map((pengurus) => (
                                //     <Card key={pengurus.id} className="border-brown-100 hover:shadow-md transition-shadow">
                                //         <CardContent className="pt-6">
                                //             <div className="flex flex-col items-center text-center">
                                //                 <Avatar className="h-32 w-32 mb-4">
                                //                     <AvatarImage src={pengurus.image} alt={pengurus.name} />
                                //                     <AvatarFallback className="bg-brown-200 text-brown-700 text-xl">
                                //                         {pengurus.name
                                //                             .split(" ")
                                //                             .map((name) => name[0])
                                //                             .join("")}
                                //                     </AvatarFallback>
                                //                 </Avatar>
                                //                 <h3 className="text-xl font-serif text-brown-800">{pengurus.name}</h3>
                                //                 <p className="text-brown-700 font-medium">{pengurus.position}</p>
                                //                 <p className="text-brown-500 text-sm mb-4">{pengurus.department}</p>
                                //                 <p className="text-brown-600 text-sm">{pengurus.description}</p>
                                //             </div>
                                //         </CardContent>
                                //     </Card>
                                // ))
                            }
                        </div>
                    </div>

                    {/* {Object.entries(management).map((department) => (
                        <div key={department[0]} className="mb-16">
                            <SectionHeader title={department[0]} subtitle={`Tim ${department} PMK ITERA`} />

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                {department.map((pengurus) => (
                                    <Card
                                        key={pengurus.id}
                                        className="border-brown-100 hover:shadow-md transition-shadow"
                                    >
                                        <CardContent className="pt-6">
                                            <div className="flex flex-col items-center text-center">
                                                <Avatar className="h-32 w-32 mb-4">
                                                    <AvatarImage src={pengurus.image} alt={pengurus.name} />
                                                    <AvatarFallback className="bg-brown-200 text-brown-700 text-xl">
                                                        {pengurus.name
                                                            .split(" ")
                                                            .map((name) => name[0])
                                                            .join("")}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <h3 className="text-xl font-serif text-brown-800">{pengurus.name}</h3>
                                                <p className="text-brown-700 font-medium">{pengurus.position}</p>
                                                <p className="text-brown-500 text-sm mb-4">{pengurus.department}</p>
                                                <p className="text-brown-600 text-sm">{pengurus.description}</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    ))} */}
                </div>
            </section>
        </MainLayout>
    )
}

export default Pengurus
