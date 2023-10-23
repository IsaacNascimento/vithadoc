import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { deleteTask } from "../../../../redux/actions/taskActions";

export function DeleteModal({ handleModal, isOpen }) {
  const dispatch = useDispatch();
  const itemById = useSelector((store) => store.tarefas.tarefa?.data?.result);

  const deleteItem = async (item) => {
    const id = item?.idtask;
    // console.log(item);
    await dispatch(deleteTask(id));
    handleModal(null, false);
  };

  return (
    <div>
      <Modal isOpen={isOpen} fade={false}>
        <ModalHeader toggle={() => handleModal(null, false)}>
          Remover Tarefa {itemById?.idtask}
        </ModalHeader>
        <ModalBody>
          <h6>
            Você realmente desejar excluir o item <b>{itemById?.name}</b>?
          </h6>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => handleModal(null, false)}>
            Cancelar
          </Button>
          <Button color="danger" onClick={() => deleteItem(itemById)}>
            Remover
          </Button>{" "}
        </ModalFooter>
      </Modal>
    </div>
  );
}
