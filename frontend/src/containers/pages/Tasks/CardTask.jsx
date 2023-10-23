import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardText,
  CardTitle,
} from "reactstrap";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "reactstrap";
import * as Icon from "react-icons/bi";
import { fetchTask, getTaskById } from "../../../redux/actions/taskActions";
import { DeleteModal } from "../../layout/topBar/components/DeleteModal";
import { ModalForm } from "./ModalForm";

export const CardTasks = () => {
  // Outras váriaveis
  const dispatch = useDispatch();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isModalFormOpen, setIsModalFormOpen] = useState(false);

  // Váriaveis no Store - Redux
  const isFetching = useSelector((store) => store.tarefas?.isFetching);
  const isUpdating = useSelector((store) => store.tarefas?.isUpdating);
  const tarefas = useSelector((store) => store.tarefas?.tarefas?.result);

  useEffect(() => {
    dispatch(fetchTask());
  }, [dispatch, isUpdating]);

  const handleDeleteModal = (item, getItemById = true) => {
    const id = item?.idtask;
    setIsDeleteOpen((prev) => !prev);
    if (getItemById) {
      dispatch(getTaskById(id));
    }
  };

  const handleModalForm = (item) => {
    const id = item?.idtask;
    setIsModalFormOpen((prev) => !prev);
    if (item) {
      dispatch(getTaskById(id));
    }
  };

  return (
    <div>
      {isFetching && isUpdating && tarefas ? (
        <div className="">
          <Spinner />
        </div>
      ) : (
        <div className="row">
          <>
            <div className="col-md-11">
              <h4 className="titulo ">Tarefas</h4>
              <p className="descricao">Listagem das Tarefas Cadastradas </p>
            </div>
            <div className="col-md-1">
              <Button color="primary" onClick={() => handleModalForm(null)}>
                Criar <b>+</b>
              </Button>
              <ModalForm
                isModalOpen={isModalFormOpen}
                handleModal={handleModalForm}
              />
            </div>
            {tarefas &&
              tarefas?.map((tarefa, index) => (
                <div className="col-xl-3 col-xxl-2 mt-4 mx-3" key={index}>
                  <Card
                    style={{
                      border: "0",
                      width: "300px",
                      height: "300px",
                      position: "relative",
                    }}
                  >
                    <CardBody>
                      <CardTitle tag="h5">{tarefa?.name}</CardTitle>
                      <hr></hr>
                      <CardText>{tarefa?.description}</CardText>

                      <div
                        style={{
                          position: "absolute",
                          bottom: "0",
                          left: "10px",
                          right: "0px",
                          width: "100%",
                          height: "75px",
                        }}
                      >
                        <small>Data: {tarefa?.created_at}</small>
                      </div>

                      <div
                        style={{
                          position: "absolute",
                          bottom: "0",
                          left: "0px",
                          right: "0px",
                          width: "100%",
                          height: "40px",
                        }}
                      >
                        <CardFooter>
                          <span className="mx-1">
                            <Icon.BiPencil
                              size={25}
                              style={{ cursor: "pointer" }}
                              onClick={() => handleModalForm(tarefa)}
                            />
                          </span>

                          <span className="mx-3">
                            <Icon.BiTrash
                              style={{ cursor: "pointer" }}
                              size={25}
                              onClick={() => handleDeleteModal(tarefa)}
                            />
                          </span>
                          <DeleteModal
                            handleModal={handleDeleteModal}
                            isOpen={isDeleteOpen}
                          />
                        </CardFooter>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              ))}
          </>
        </div>
      )}
    </div>
  );
};
