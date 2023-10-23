import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import {
  loginReducer,
  taskReducer,
  notificacoesReducer,
} from "../../redux/reducers";

const reducer = combineReducers({
  login: loginReducer,
  tarefas: taskReducer,
  notificacoes: notificacoesReducer,
});

const store = configureStore({
  reducer,
  middleware: [thunk],
});

export default store;
