import { PayloadAction, createSlice } from "@reduxjs/toolkit"

type language ={
    english_name: string
    iso_639_1: string
    iso_3166_1: string
    checked: boolean
}

type metadataItem = {
    name: string
    checked: boolean
    key: string
}

interface LanguagesState {
    languages: language[][]
    main_data: metadataItem[]
    secondary_data: metadataItem[]
}

const initialState: LanguagesState = {
    languages: [
        [
            { english_name: 'German', iso_639_1: 'de', iso_3166_1: 'DE', checked: false },
            { english_name: 'Spanish', iso_639_1: 'es', iso_3166_1: 'ES', checked: false },
            { english_name: 'French', iso_639_1: 'fr', iso_3166_1: 'FR', checked: false },
            { english_name: 'Italian', iso_639_1: 'it', iso_3166_1: 'IT', checked: false }
        ],
        [
            { english_name: 'Netherlands', iso_639_1: 'nl', iso_3166_1: 'NL', checked: false },
            { english_name: 'Danish', iso_639_1: 'da', iso_3166_1: 'DK', checked: false },
            { english_name: 'Polish', iso_639_1: 'pl', iso_3166_1: 'PL', checked: false }
        ],
        [
            { english_name: 'Hungarian', iso_639_1: 'hu', iso_3166_1: 'HU', checked: false },
            { english_name: 'Romanian', iso_639_1: 'ro', iso_3166_1: 'RO', checked: false },
            { english_name: 'Bulgarian', iso_639_1: 'bg', iso_3166_1: 'BG', checked: false },
            { english_name: 'Czech', iso_639_1: 'cs', iso_3166_1: 'CZ', checked: false }
        ],
        [
            { english_name: 'Arabic', iso_639_1: 'ar', iso_3166_1: 'AE', checked: false },
            { english_name: 'Portuguese', iso_639_1: 'pt', iso_3166_1: 'PT', checked: false },
            { english_name: 'Turkish', iso_639_1: 'tr', iso_3166_1: 'TR', checked: false }
        ]
    ],
        main_data: [
            {name: 'year', checked: true, key: 'production_year'},
            {name: 'genres', checked: true,  key: 'genre'},
            {name: 'countries', checked: true, key: 'country'},
            {name: 'duration', checked: true, key: 'duration'},
        ],
        secondary_data: [
            {name: 'synopsis', checked: false,  key: "synopsis"},
            {name: 'original title', checked: false,  key: "original_title"},
            {name: 'original language', checked: false,  key: "original_language"},
            {name: 'production companies', checked: false,  key: "production_companies"},
            {name: 'EU/NonEU (in development)', checked: false,  key: "eu"},
        ]
}

const LanguagesSlice = createSlice({
    name: "languages", initialState, reducers: {
    setCheckedLanguage: (state, action: PayloadAction<{checked: boolean, iso_3166_1: string}>)=>{
        const {checked, iso_3166_1} = action.payload
        for (let i = 0; i<state.languages.length; i++) {
            const languagesGroup = state.languages[i]
            for (let x = 0; x<languagesGroup.length; x++) {
                const language = languagesGroup[x]
                if (language.iso_3166_1 === iso_3166_1) {
                    state.languages[i][x].checked=checked
                    return
                }
            }
        }
    },
    setCheckedMetadata: (state, action: PayloadAction<{checked: boolean, name: string}>)=>{
        const {checked, name} = action.payload
        for (let i =0; i<state.main_data.length; i++) {
            const item = state.main_data[i]
            if (item.name === name) state.main_data[i].checked = checked
        }
        for (let i =0; i<state.secondary_data.length; i++) {
            const item = state.secondary_data[i]
            if (item.name === name) state.secondary_data[i].checked = checked
        }
    }
    }
})

export default LanguagesSlice.reducer

export const {setCheckedLanguage, setCheckedMetadata} = LanguagesSlice.actions