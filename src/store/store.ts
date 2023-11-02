import { configureStore } from "@reduxjs/toolkit";
import filesSlice from "./features/filesSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import languagesSlice from "./features/languagesSlice";

export const store = configureStore({
    reducer:{
        files:filesSlice,
        languages:languagesSlice
    }
})


export const useAppDispatch:()=>typeof store.dispatch=useDispatch
export const useAppSelector:TypedUseSelectorHook<ReturnType<typeof store.getState>>=useSelector