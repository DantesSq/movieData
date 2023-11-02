import { createSlice } from "@reduxjs/toolkit"

export {}

interface License {}

interface LicenseState {
    licenses: License[]
}

const initialState: LicenseState = {
    licenses: []
}

const LicensesSlice = createSlice({
    name: "licenses", initialState, reducers: {
        addLicense: (state, action)=>{}
    }
})

export default LicensesSlice.reducer

export const {addLicense} = LicensesSlice.actions