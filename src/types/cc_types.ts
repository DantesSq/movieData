type Genre = {
    GenreId: number
    Name: string
    Type: string
}

type ProgramChannel = {
    ChannelId: number
    Name: string
    Id: number
    IdKey: string
}

type Country = {
    CountryId: number
    Name: string
    Abbreviation: string
    Id: number
    IdKey: string
}

type PersonFirm = {
    PersonFirmId: number
    Name: string
    Type: string // cast, director, ...
}

export type Program = {
    Title: string
    Attributes: any[] // Dependent, EU, ContenWarning
    PersonsFirms: PersonFirm[]
    ProductionCountries: Country[]
    ProductionYearFrom: number
    ProductionYearUntil: number
    Channels: ProgramChannel[]
    Genres: Genre[]
    Duration: number

    Number: string // F009092
    OriginalNumber: string // SPI
    Id: number
    IdKey: string
    ProgramType: string
    ProductionFormat: string


    Seasons? : any[]

    ProgramVersions: {Duration: number, Id: number, Number: string, Title: string, }[]
}

export type ProgramVersion = {
    Title: string
    Attributes: any[]
    Channels: any[]
    Assets: any[]

    
    ParentalRating: string
    ParentalRatingId: string
    Language: string
    
    Number: string // SPI Code
    Id: number
    IdKey: string
    ProgramId: number
    ProgramType: string
    VersionType: string
    VersionTypeId: number
}

export enum AgeRatings {
    SUITABLE = "Suitable for all audiences",
    NU7 = 'NU7',
    NU12 = 'NU12',
    NU16 = 'NU16',
    NU18 = 'NU18',
    X = "X rated content"
}

type ParentalRating = {
    id: number
    idKey: number | null
    name: string | null
    abbreviation: string | null
    isDefault: boolean | null
    parentalRatingPress: string | null
    freeFromTime: any
}