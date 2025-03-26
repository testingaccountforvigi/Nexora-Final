import React from "react";
import { motion } from "framer-motion";
import { createSlice } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from "react-redux";

// Create a standalone loader slice
const loaderSlice = createSlice({
  name: 'loader',
  initialState: {
    isLoading: false
  },
  reducers: {
    showLoader: (state) => {
      state.isLoading = true;
    },
    hideLoader: (state) => {
      state.isLoading = false;
    },
  },
});

export const { showLoader, hideLoader } = loaderSlice.actions;
export const selectLoading = (state) => state.loader.isLoading;
export const loaderReducer = loaderSlice.reducer;

const Loader = () => {
  const isLoading = useSelector(selectLoading);
  
  if (!isLoading) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center"
      >
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-3 text-lg font-semibold text-gray-700">Loading...</p>
      </motion.div>
    </div>
  );
};

export default Loader;
