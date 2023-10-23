import React from "react";
import { Modal, ModalBody, ModalHeader, Spinner } from "reactstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  clearTaskById,
  createTask,
  updateTask,
} from "../../../redux/actions/taskActions";
import { useEffect } from "react";
// import { cnpjMask } from "../../../utils/helpers";

export const ModalForm = ({ isModalOpen, handleModal, ...args }) => {
  const dispatch = useDispatch();
  const isFetching = useSelector((store) => store.tarefas?.isFetching);
  const isUpdating = useSelector((store) => store.tarefas?.isUpdating);
  const itemById = useSelector((store) => store.tarefas.tarefa?.data?.result);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // Popular campo do Modal para editar tarefa
    if (itemById && !isFetching && !isUpdating) {
      for (let campo in itemById) {
        setValue(campo, itemById[campo]);
      }
    }
    // Limpar campo do Modal para novo tarefa
    if (!itemById) {
      reset();
    }
  }, [isFetching, isUpdating, itemById, setValue, reset]);

  // Limpar o estado toda vez que o modal for fechado
  useEffect(() => {
    if (!isModalOpen && itemById) {
      // console.log('entrou no clear campos');
      dispatch(clearTaskById());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isModalOpen]);

  const onSubmit = (value) => {
    const values = value;

    if (itemById) {
      // Atualiza tarefa
      // const id = itemById?.id;
      dispatch(updateTask(values));
      handleModal();
    } else {
      // Cria tarefa
      dispatch(createTask(values));
      handleModal();
    }
  };

  const Titulo = () => {
    if (!itemById) {
      return <div>Criar Tarefa</div>;
    }
    return (
      <div>
        Editar <b>{itemById.name}</b>
      </div>
    );
  };

  return (
    <>
      <Modal isOpen={isModalOpen} toggle={() => handleModal()}>
        {(isFetching || isUpdating) && (
          <ModalBody className="center-spinner-progress">
            <Spinner />
          </ModalBody>
        )}
        {(!isFetching || !isUpdating) && (
          <>
            <ModalHeader toggle={() => handleModal()}>
              <Titulo />
            </ModalHeader>
            <ModalBody>
              <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-md-12 my-2">
                    <h6>Nome da Tarefa</h6>
                    <input
                      {...register("name", { required: true })}
                      placeholder="Nome da Tarefa"
                      className="input-modal-form"
                      type="text"
                    />
                    {errors.name && (
                      <span className="span-validation">
                        O campo nome é obrigatório
                      </span>
                    )}
                  </div>

                  <div className="col-md-12 my-2">
                    <h6>Descrição da Tarefa</h6>
                    <input
                      {...register("description", { required: true })}
                      placeholder="Descrição"
                      className="input-modal-form"
                      type="input"
                      // value={cnpjMask((e) => e.target.value)}
                    />
                    {errors.description && (
                      <span className="span-validation">
                        O campo Descrição é obrigatório
                      </span>
                    )}
                  </div>
                </div>

                <div style={{ marginTop: "8px" }} className="row mt-3">
                  <div className="col-md-6 col-sm-6 ">
                    <button
                      className="primary-button"
                      type="submit"
                      color="primary"
                    >
                      Salvar
                    </button>
                  </div>

                  <div className="col-md-6 col-sm-6">
                    <button
                      type="button"
                      className="secondary-button"
                      onClick={() => {
                        handleModal();
                      }}
                      color="secondary"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </form>
            </ModalBody>
          </>
        )}
      </Modal>
    </>
  );
};
