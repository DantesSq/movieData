import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export {}

type language ={
    english_name: string
    iso_639_1: string
    iso_3166_1: string
    checked: boolean
}

interface LanguagesState {
    languages: language[][]
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
    ]
}

const LanguagesSlice = createSlice({
    name: "languages", initialState, reducers: {
    setChecked: (state, action: PayloadAction<{checked: boolean, iso_3166_1: string}>)=>{
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
    }
    }
})

export default LanguagesSlice.reducer

export const {setChecked} = LanguagesSlice.actions