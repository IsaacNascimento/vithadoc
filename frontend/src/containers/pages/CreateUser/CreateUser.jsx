import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import { useAuth } from "../../../shared/hooks/useAuth";
import { CreateUserForm } from "./components/CreateUserForm";

export const CreateUser = () => {
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
                        <h4 className="account__logo-accent">
                          Criar novo Usuário
                        </h4>
                      </div>
                      <CreateUserForm />
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
