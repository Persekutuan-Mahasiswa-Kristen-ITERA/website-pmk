import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { departmentNames, management } from "@/data/management"
import Image from "next/image"
import { SectionHeader } from "./ui/section-header"
import { Division, Person, Department } from "@/types/management"

interface DivisionTabsProps {
    divisions: Division[]
}

export function DivisionTabs({ divisions }: DivisionTabsProps) {
    return (
        <Tabs defaultValue={divisions[0]?.name} className="w-full">
            <div className="flex gap-2 flex-wrap mb-6">
                {divisions.map((division) => (
                    <TabsTrigger key={division.name} value={division.name} asChild>
                        <Button variant="outline" className="bg-brown-50 border-brown-200 hover:bg-brown-100">
                            {division.name}
                        </Button>
                    </TabsTrigger>
                ))}
            </div>

            {divisions.map((division) => (
                <TabsContent key={division.name} value={division.name}>
                    <div className="mb-8">
                        <Card className="mb-6">
                            <CardHeader>
                                <CardTitle className="text-center text-xl">{division.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col items-center">
                                    <div className="w-32 h-32 mb-4 overflow-hidden rounded-full">
                                        <Image
                                            src={division.head.photoUrl}
                                            alt={division.head.name}
                                            width={128}
                                            height={128}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <h4 className="font-serif text-xl text-brown-800">{division.head.name}</h4>
                                    <p className="text-brown-600">Kepala Divisi</p>
                                </div>
                            </CardContent>
                        </Card>

                        <h5 className="text-lg font-medium text-brown-800 mb-4 text-center">Staff Divisi</h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {division.staff.map((staff: Person) => (
                                <Card key={staff.name} className="overflow-hidden">
                                    <CardContent className="p-4">
                                        <div className="flex flex-col items-center text-center">
                                            <div className="w-24 h-24 mb-3 overflow-hidden rounded-full">
                                                <Image
                                                    src={staff.photoUrl}
                                                    alt={staff.name}
                                                    width={96}
                                                    height={96}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <h6 className="font-medium text-brown-800">{staff.name}</h6>
                                            <p className="text-sm text-brown-600">Staff</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </TabsContent>
            ))}
        </Tabs>
    )
}

export function DepartmentTabs() {
    return (
        <Tabs defaultValue={departmentNames[0]} className="w-full">
            <Card className="bg-brown-700 p-0">
                <TabsList className="grid w-full h-full grid-cols-4 gap-2 p-2">
                    {departmentNames.map((department: string) => (
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

            {management.departments.map((department: Department) => (
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
                    <div className="mt-8">
                        <DivisionTabs divisions={department.divisions} />
                    </div>
                </TabsContent>
            ))}
        </Tabs>
    )
}
