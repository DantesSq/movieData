export type ExcelData = {
    spi_code: string | null
    title: string | null
    genre: string | null        
    production_year: string | null
    country: string | null
    duration: string | null
    director: string | null 
    cast: string | null
    imdb: string | null
    imdb_id: string|null
    tmdb: string | null
    tmdb_id: string | null
    type: string | null
    Synopsis: string | null
}

export interface Translation {
    iso_3166_1: string,
      iso_639_1:string | null,
      name: string | null,
      english_name:string | null,
      data: {
        name:string | null,
        title: string | null,
        overview:string | null,
        homepage:string | null,
        tagline: string
      } | null
}

export interface Season {
    air_date: string
    episodes?: Episode[]

    episode_count?: number //tv-series-details

    id: number
    overview: string
    season_number: number
    name: string
}

export interface Episode {
    air_date: string
    episode_number: number
    id: number
    name: string
    overview: string
    runtime: number
    show_id: number
    crew: Person[]
}

export interface Person {
    adult: boolean
    character: string
    credit_id: string
    gender: number
    id: number
    name: string
    original_name: string
    known_for_department: string | null // cast

    department: string | null // crew
    job: string // crew
}

type genre = {
    id: number;
    name: string;
  };
  
type production_country = {
    iso_3166_1: string;
    name: string;
  };

type production_company = {
  id: number
  name: string
  origin_country: string
}

export interface tmdbMovieDetails {
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    genres: genre[];
    production_countries: production_country[];
    production_companies: production_company[]
    runtime: number;
    release_date: string;
    overview: string
  }

export interface tmdbSeriesDetails {
  id: number
  imdb_id: string
  original_language: string

  name: string // en title
  original_name: string // original title

  genres: genre[]
  production_countries: production_country[];
    production_companies: production_company[]

  first_air_date: string
  last_air_date: string
  number_of_episodes: number
  number_of_seasons: number
  episode_run_time: number[]
overview: string

homepage: string

    seasons: Season[]
    status: string
    tagline: string
    spoken_languages: {english_name: string, iso_639_1: string, name: string}[]

}