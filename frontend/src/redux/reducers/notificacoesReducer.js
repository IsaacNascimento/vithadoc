import {
  displayErrorRequest,
  clearErrorRequest,
  displaySuccessRequest,
  clearSuccessRequest,
} from "../actions/notificacoesActions";

const defaultState = {
  error: null,
  success: null,
};

const errorHandler = (data) =>
  data?.response
    ? data?.response?.data
      ? data?.response?.data?.error
        ? data?.response?.data?.error
        : data?.response?.data?.err
        ? data?.response?.data?.err
        : data?.message
      : data?.response
    : data;

const notificacoesReducer = (state = defaultState, action) => {
  const payload = action?.payload;
  switch (action?.type) {
    case displayErrorRequest?.type:
      return (state = {
        ...state,
        error: errorHandler(payload),
      });
    case clearErrorRequest?.type:
      return (state = {
        ...state,
        error: null,
      });
    case displaySuccessRequest?.type:
      return (state = {
        ...state,
        success: payload,
      });
    case clearSuccessRequest?.type:
      return (state = {
        ...state,
        success: null,
      });
    default:
      return state;
  }
};

export default notificacoesReducer;
