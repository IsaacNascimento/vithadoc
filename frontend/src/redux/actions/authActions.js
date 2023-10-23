import { createAction } from "@reduxjs/toolkit";

import LogoutUser from "../../shared/hooks/logoutUser";
import { authApi } from "../../utils/api/authApi";
import TokenService from "../../utils/api/base/tokenServicer";

import { displayError, displaySuccess } from "./notificacoesActions";

export const loginRequest = createAction("LOGIN_REQUEST");
export const loginSuccess = createAction("LOGIN_SUCCESS");
export const loginError = createAction("LOGIN_ERROR");

export const isLogadoRequest = createAction("IS_LOGADO_REQUEST");
export const isLogadoSuccess = createAction("IS_LOGADO_SUCCESS");
export const isLogadoError = createAction("IS_LOGADO_ERROR");

export const logoutRequest = createAction("LOGOUT_REQUEST");
export const logoutSuccess = createAction("LOGOUT_SUCCESS");
export const logoutError = createAction("LOGOUT_ERROR");

export const createUserRequest = createAction("CREATE_USER_REQUEST");
export const createUserSuccess = createAction("CREATE_USER_SUCCESS");
export const createUserError = createAction("CREATE_USER_ERROR");

export const checkUserPermissionRequest = createAction(
  "CHECK_USER_PERMISSION_REQUEST"
);
export const checkUserPermissionSuccess = createAction(
  "CHECK_USER_PERMISSION_SUCCESS"
);
export const checkUserPermissionError = createAction(
  "CHECK_USER_PERMISSION_ERROR"
);

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    const data = await authApi.login(email, password);
    console.log("action", data);
    if (data?.status === 200) {
      delete data?.status;
      TokenService.setUser(data);
      dispatch(loginSuccess(data));
    } else {
      const message = data.message;
      dispatch(loginError({ message: message, error: true }));
      console.log(data);
    }
  } catch (error) {
    dispatch(loginError(error));
    console.log(error);
  }
};

export const logout = (isControllByUser) => async (dispatch) => {
  try {
    dispatch(logoutRequest());

    LogoutUser(isControllByUser);
  } catch (error) {
    dispatch(logoutError(error));
    console.log(error);
  }
};

export const checkUserPermission = () => async (dispatch) => {
  const token = TokenService.getToken();

  if (token) {
    try {
      dispatch(checkUserPermissionRequest());
      const data = await authApi.checkUserPermission();

      if (data.status === 200 && data?.isLoggin) {
        delete data?.status;
        dispatch(checkUserPermissionSuccess(data));
      } else {
        dispatch(displayError(data));
        checkUserPermissionError(data);
      }
    } catch (error) {
      console.log(error);
      dispatch(displayError(error));
      checkUserPermissionError(error);
    }
  }
};

export const createUserAction = (email, password, name) => async (dispatch) => {
  try {
    dispatch(createUserRequest());
    const data = await authApi.createUser(email, password, name);

    if (data.status === 200) {
      delete data?.status;
      dispatch(createUserSuccess(data));
      dispatch(displaySuccess(data));
    } else {
      dispatch(displayError(data));
      dispatch(createUserError(data));
    }
  } catch (error) {
    console.log(error);
    dispatch(displayError(error));
    dispatch(createUserError(error));
  }
};
