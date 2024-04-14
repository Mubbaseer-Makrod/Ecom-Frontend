import { configureStore } from "@reduxjs/toolkit";
import authReducers from "./authSlice";

export const authStore = configureStore({
    reducer: authReducers
})