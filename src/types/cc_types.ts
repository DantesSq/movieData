export type Program = {
    Attributes: any[]
    Channels: any[]
    Genres: any[]
    Id: number
    IdKey: string
    Number: string
    PersonsFirms: any[]
    ProductionCountries: any[]
    ProductionFormat: string
    ProductionYearFrom: number
    ProductionYearUntil: number
    ProgramType: string

}

export type ProgramVersion = {
    ProgramId: number
    Id: number
    Number: string
    ParentalRating: string
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