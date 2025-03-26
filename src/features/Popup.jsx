import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSlice } from '@reduxjs/toolkit';

// Create a standalone popup slice
const popupSlice = createSlice({
  name: 'popup',
  initialState: {
    visible: false,
    message: '',
    duration: 3000,
    type: 'success',
  },
  reducers: {
    showPopup: (state, action) => {
      state.visible = true;
      state.message = action.payload.message;
      state.duration = action.payload.duration || 3000;
      state.type = action.payload.type || 'success';
    },
    hidePopup: (state) => {
      state.visible = false;
    },
  },
});

export const { showPopup, hidePopup } = popupSlice.actions;
export const selectPopup = (state) => state.popup;
export const popupReducer = popupSlice.reducer;

const Popup = () => {
  const dispatch = useDispatch();
  const popup = useSelector(selectPopup);

  // const popup = authPopup.visible ? authPopup : profilePopup.visible ? profilePopup : null;

  useEffect(() => {
    if (popup && popup.visible) {
      const timer = setTimeout(() => {
        // popup === authPopup ? dispatch(hidePopup()) : dispatch(hidePopup2());
        dispatch(hidePopup())
      }, popup.duration);

      return () => clearTimeout(timer);
    }
  }, [popup, dispatch]);

  if (!popup || !popup.visible) return null;

  const popupStyles = {
    success: 'bg-green-50 border-green-300 text-green-800',
    error: 'bg-red-50 border-red-300 text-red-800',
  };

  return (
    <div
      className={`fixed top-10 z-20 right-10 w-80 p-4 border rounded-lg shadow-lg flex items-center ${
        popupStyles[popup.type]
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`text-xl ${popup.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
          {popup.type === 'success' ? (
            <i className="fas fa-check-circle"></i>
          ) : (
            <i className="fas fa-exclamation-circle"></i>
          )}
        </div>
        <div className="flex-grow">
          <p className="font-semibold">{popup.message}</p>
        </div>
      </div>
      <div
        className={`absolute bottom-0 left-0 h-1 ${
          popup.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        }`}
        style={{
          animation: `popupBar ${popup.duration}ms linear`,
        }}
      ></div>
      <style>{`   
        @keyframes popupBar {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
      {/* there was jsx written after style opening */}
    </div>
  );
};

export default Popup;
