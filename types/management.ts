export interface Person {
    name: string
    photoUrl: string
}

export interface CoreMember extends Person {
    role:
        | "Ketua Umum"
        | "Sekretaris Jendral"
        | "Sekretaris Umum 1"
        | "Sekretaris Umum 2"
        | "Bendahara Umum 1"
        | "Bendahara Umum 2"
}

export interface Division {
    head: Person
    staff: Person[]
    name: string
}

export interface Department {
    name: string
    head: Person
    secretary: Person
    divisions: Division[]
}

export interface OrganizationStructure {
    core: CoreMember[]
    departments: Department[]
}
