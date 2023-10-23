import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { checkUserPermission } from "../../redux/actions/authActions";
import { useAuth } from "../../shared/hooks/useAuth";
import { publicPaths } from "../../utils/constants";
import { Layout } from "../layout";

export const ProtectedRoutes = () => {
  const isAuth = useAuth();
  const dispatch = useDispatch();

  // Força uma chamada de Verificação de Login assim que entra na aplicação;
  useEffect(() => {
    if (isAuth && !publicPaths) {
      dispatch(checkUserPermission());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <>
      {isAuth ? (
        <>
          <Layout />
          <div className="margin-main-content">
            <div id="container" data-testid="container">
              <Outlet />
            </div>
          </div>
        </>
      ) : (
        <Navigate to={"/"} />
      )}
    </>
  );
};
