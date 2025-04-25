interface Person {
    name: string
    photoUrl: string
}

interface CoreMember extends Person {
    role:
        | "Ketua Umum"
        | "Sekretaris Jendral"
        | "Sekretaris Umum 1"
        | "Sekretaris Umum 2"
        | "Bendahara Umum 1"
        | "Bendahara Umum 2"
}

interface Division {
    head: Person
    staff: Person[]
    name: string
}

interface Department {
    name: string
    head: Person
    secretary: Person
    divisions: Division[]
}

interface OrganizationStructure {
    core: CoreMember[]
    departments: Department[]
}
