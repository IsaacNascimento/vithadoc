import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../../shared/hooks/useAuth";

// <--- COMPONENTES  --->
import { Login } from "../pages/Authentication/Login";
import { Tasks } from "../pages/Tasks/Tasks";
import { ProtectedRoutes } from "./PrivateRoute";
import { CreateUser } from "../pages/CreateUser/CreateUser";

const rotasPrivadas = [
  {
    id: "tarefa-route",
    title: "Rota Tarefa",
    path: "/tarefas",
    component: <Tasks />,
  },
];

const rotasPublicas = [
  {
    id: "root-route",
    title: "Root route",
    path: "/",
    component: <Login />,
  },
  {
    id: "login-route",
    title: "Login Route",
    path: "/login",
    component: <Login />,
  },
  {
    id: "create-route",
    title: "create Route",
    path: "/criar/usuario",
    component: <CreateUser />,
  },
];

export const Router = () => {
  const isAuth = useAuth();

  return (
    <main>
      <Routes>
        {/*  --------- ROTAS PUBLICAS ---------  */}

        {rotasPublicas.map((item, key) => (
          <Route
            key={item.id}
            path={item.path}
            element={!isAuth ? item.component : <Navigate to={"/tarefas"} />}
          />
        ))}

        {/*  --------- ROTAS PRIVADAS ---------  */}

        <Route element={<ProtectedRoutes />}>
          {rotasPrivadas.map((item, key) => (
            <Route key={item.id} path={item.path} element={item.component} />
          ))}
          <Route path="*" element={<div>404 Page not Found</div>} />
        </Route>
      </Routes>
    </main>
  );
};
