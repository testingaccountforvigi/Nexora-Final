import React from "react";
import { configureStore } from '@reduxjs/toolkit';
import { popupReducer } from "../features/Popup";
import { loaderReducer } from "../features/Loader";

export const store = configureStore({
    reducer: {
        popup: popupReducer,
        loader: loaderReducer
    }
});