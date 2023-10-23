import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import { useAuth } from "../../../shared/hooks/useAuth";
import { LoginForm } from "./components/LoginForm";

export const Login = () => {
  const isAuth = useAuth();
  const navigate = useNavigate();
  // const previousOrientation = window.orientation;
  const widthScreen = window.screen.width;

  // console.log(previousOrientation);

  // garantir que o usuario não tenha acesso a rotas publicas quando estiver conectado
  useEffect(() => {
    if (isAuth) {
      navigate("/tarefas");
    }
  }, [isAuth, navigate]);

  return (
    <>
      <Container>
        <Row className="justify-content-center">
          <Col sm={12} md={10} lg={6} xl={5}>
            <Card className="mb-4">
              <CardBody className={widthScreen > 520 ? "p-5" : "p-1"}>
                <div className="account">
                  <div className="account__wrapper">
                    <div className="account__card">
                      <div className="account__head">
                        <h3 className="account_title">
                          Bem Vindo ao
                          <br />
                          <span className="account__logo">
                            {" "}
                            <span className="account__logo-accent">
                              Vithadoc DashBoard
                            </span>
                          </span>
                        </h3>
                        <h4 className="account__subhead">
                          Área Administrativa
                        </h4>
                      </div>
                      <LoginForm />
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
