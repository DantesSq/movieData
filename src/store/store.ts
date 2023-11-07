import { configureStore } from "@reduxjs/toolkit";
import filesSlice from "./features/filesSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import requestOptionsSlice from "./features/requestOptionsSlice";

export const store = configureStore({
    reducer:{
        files:filesSlice,
        options:requestOptionsSlice,
    }
})


export const useAppDispatch:()=>typeof store.dispatch=useDispatch
export const useAppSelector:TypedUseSelectorHook<ReturnType<typeof store.getState>>=useSelector