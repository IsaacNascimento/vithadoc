import { createAction } from "@reduxjs/toolkit";

export const displayErrorRequest = createAction("DISPLAY_ERROR_REQUEST");
export const clearErrorRequest = createAction("CLEAR_ERROR_REQUEST");

export const displaySuccessRequest = createAction("DISPLAY_SUCCESS_REQUEST");
export const clearSuccessRequest = createAction("CLEAR_SUCCESS_REQUEST");

export const displayError = (error) => async (dispatch) => {
  dispatch(displayErrorRequest(error));
};

export const clearError = () => async (dispatch) => {
  dispatch(clearErrorRequest());
};

export const displaySuccess = (message) => async (dispatch) => {
  dispatch(displaySuccessRequest(message));
};

export const clearSuccess = () => async (dispatch) => {
  dispatch(clearSuccessRequest());
};
