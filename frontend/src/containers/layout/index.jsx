import React from "react";
import { Notificationbar } from "./notificationbar/Notificationbar";
import { Header } from "./topBar/Header";

export const Layout = () => {
  return (
    <React.Fragment>
      <Notificationbar />
      <Header />
    </React.Fragment>
  );
};
