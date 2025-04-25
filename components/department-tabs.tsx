import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { departmentNames, management } from "@/data/management"
import Image from "next/image"
import { SectionHeader } from "./ui/section-header"

export function DepartmentTabs() {
    return (
        <Tabs defaultValue="account" className="w-full">
            <Card className="bg-brown-700 p-0">
                <TabsList className="grid w-full h-full grid-cols-4 gap-2 p-2">
                    {departmentNames.map((department) => (
                        <TabsTrigger
                            key={department}
                            value={department}
                            className="text-white data-[state=active]:text-white data-[state=active]:bg-brown-600 p-2"
                        >
                            {department}
                        </TabsTrigger>
                    ))}
                </TabsList>
            </Card>

            {management.departments.map((department) => (
                <TabsContent key={department.name} value={department.name} className="h-full">
                    <Card>
                        <CardHeader className="text-center">
                            <CardTitle>{department.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="flex gap-6 place-content-center w-full">
                                <Card
                                    key={department.head.name}
                                    className="border-brown-100 w-48 h-64 hover:shadow-md transition-shadow overflow-hidden rounded-sm"
                                >
                                    <CardContent className="pt-6 p-0">
                                        <div className="flex flex-col items-center text-center">
                                            <Image
                                                src={department.head.photoUrl}
                                                alt={department.head.name}
                                                width={300}
                                                height={256}
                                                className="w-full h-36 object-center"
                                            />
                                            <div className="p-4">
                                                <h3 className="text-lg font-serif text-brown-800">
                                                    {department.head.name}
                                                </h3>
                                                <p className="text-brown-700 text-sm font-medium">
                                                    Kepala {department.name.split(" ")[0]}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card
                                    key={department.secretary.name}
                                    className="border-brown-100 w-48 h-64 hover:shadow-md transition-shadow overflow-hidden rounded-sm"
                                >
                                    <CardContent className="pt-6 p-0">
                                        <div className="flex flex-col items-center text-center">
                                            <Image
                                                src={department.secretary.photoUrl}
                                                alt={department.secretary.name}
                                                width={300}
                                                height={256}
                                                className="w-full h-36 object-center"
                                            />
                                            <div className="p-4">
                                                <h3 className="text-lg font-serif text-brown-800">
                                                    {department.secretary.name}
                                                </h3>
                                                <p className="text-brown-700 text-sm font-medium">
                                                    Sekretaris {department.name.split(" ")[0]}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </CardContent>
                    </Card>

                    <SectionHeader title="Divisi dan Staff" subtitle={`Kesekjenan PMK ITERA`} centered={true} />
            
                    

                </TabsContent>
            ))}
        </Tabs>
    )
}
