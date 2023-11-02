import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { ExcelData } from "../../types/types"
import { fileListToArray } from "../../utils/fileListToArray"
import { arrayToFileList } from "../../utils/arrayToFileList"

export {}

export type excelFile = {name: string, data: ExcelData[], index: number, tmdb_requested: boolean}

interface FileState{
    rawFiles: {index: number, file: File}[]
    files: excelFile[]
    openMenu: boolean
    isProcessing: boolean
    currentFile: excelFile | null
}

const initialState: FileState = {
    rawFiles: [],
    files: [],
    openMenu: true,
    isProcessing: false,
    currentFile: null,
}

export const FileSlice = createSlice({
    name: "files",
    initialState,
    reducers: {
        setRawFiles: (state, action: PayloadAction<FileList>)=>{
            const rawFiles = fileListToArray(action.payload)
            state.rawFiles = rawFiles
        },

        addRawFiles: (state, action: PayloadAction<FileList>)=>{
            const rawFiles = fileListToArray(action.payload)
            state.rawFiles.push(...rawFiles)
        },

        removeRawFiles: (state, action: PayloadAction<number>)=>{
            const index = action.payload
            const filesArr = state.rawFiles.filter(item=>item.index!==index)
            state.rawFiles = filesArr
        },

        changeOpenMenu: (state, action: PayloadAction<boolean>)=>{
            const value = action.payload
            state.openMenu = value
        },

        submitRawFile: (state, action: PayloadAction<excelFile>)=>{
            const file = action.payload
            state.files.push(file)
        },

        setCurrentFile: (state, action: PayloadAction<number>)=>{
            const file = state.files.filter(file=>file.index===action.payload)[0]
            state.currentFile = file
        },

        updateFile: (state, action: PayloadAction<{file: excelFile}>)=>{
            const {file} = action.payload
            const {index} = file

            for (let i = 0; i<state.files.length; i++) {
                const item = state.files[i]
                if (item.index === file.index) {
                    state.files[i] = file
                }
            } 
            state.currentFile = file
        },

        requestTmdb: (state, action: PayloadAction<number>)=>{
            const index = action.payload

            for (let i = 0; i<state.files.length; i++) {
                const item = state.files[i]
                if (item.index === index) {
                    state.files[i].tmdb_requested = true
                }
            }
            
            if (state.currentFile?.index === index) {
                state.currentFile.tmdb_requested = true
            }
        }, 
        setIsProcessing: (state, action: PayloadAction<boolean>)=>{
            state.isProcessing=action.payload
        }
    }
})

export default FileSlice.reducer

export const {setRawFiles, addRawFiles, removeRawFiles, submitRawFile, changeOpenMenu, setCurrentFile, updateFile, requestTmdb, setIsProcessing} = FileSlice.actions