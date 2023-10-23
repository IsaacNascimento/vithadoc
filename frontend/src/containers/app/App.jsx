import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import { Provider } from "react-redux";
import store from "./store";

/*  Estilos globais da aplicação */
import "../../styles/_app.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

export const App = () => {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <div data-testid="content">
            <Router />
          </div>
        </BrowserRouter>
      </Provider>
    </>
  );
};
