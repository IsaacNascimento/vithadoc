import { createAction } from "@reduxjs/toolkit";
import { tasksApi } from "../../utils/api/taskApi";
import { displayError, displaySuccess } from "./notificacoesActions";

export const getTaskByIdRequest = createAction("GET_TASK_BY_ID_REQUEST");
export const getTaskByIdSuccess = createAction("GET_TASK_BY_ID_SUCCESS");
export const getTaskByIdError = createAction("GET_TASK_BY_ID_ERROR");

export const fetchTaskRequest = createAction("FETCH_TASK_REQUEST");
export const fetchTaskSuccess = createAction("FETCH_TASK_SUCCESS");
export const fetchTaskError = createAction("FETCH_TASK_ERROR");

export const createTaskRequest = createAction("CREATE_TASK_REQUEST");
export const createTaskSuccess = createAction("CREATE_TASK_SUCCESS");
export const createTaskError = createAction("CREATE_TASK_ERROR");

export const updateTaskRequest = createAction("UPDATE_TASK_REQUEST");
export const updateTaskSuccess = createAction("UPDATE_TASK_SUCCESS");
export const updateTaskError = createAction("UPDATE_TASK_ERROR");

export const deleteTaskRequest = createAction("DELETE_TASK_REQUEST");
export const deleteTaskSuccess = createAction("DELETE_TASK_SUCCESS");
export const deleteTaskError = createAction("DELETE_TASK_ERROR");

export const clearTaskById = createAction("CLEAR_TASK_BY_ID");

export const fetchTask = () => async (dispatch) => {
  try {
    dispatch(fetchTaskRequest());
    const data = await tasksApi.fetchAll();
    if (data.status === 200) {
      dispatch(fetchTaskSuccess(data?.data));
    } else {
      dispatch(fetchTaskError(data));
      dispatch(displayError("Tarefas não Encontradas"));
      // console.log(data);
    }
  } catch (error) {
    dispatch(fetchTaskError(error));
    console.log(error);
  }
};

export const getTaskById = (id) => async (dispatch) => {
  try {
    dispatch(getTaskByIdRequest());
    const data = await tasksApi.getTask(id);
    if (data.status === 200) {
      dispatch(getTaskByIdSuccess(data));
    } else {
      dispatch(fetchTaskError(data));
      dispatch(displayError(`Tarefa ${id} não Encontrada`));
    }
  } catch (error) {
    dispatch(getTaskByIdError(error));
    console.log(error);
  }
};

export const createTask =
  ({ ...values }) =>
  async (dispatch) => {
    console.log("form", values);
    const name = values.name;
    const description = values.description;
    try {
      dispatch(createTaskRequest());
      const data = await tasksApi.createTask(name, description);
      if (data?.status === 200) {
        dispatch(displaySuccess("Tarefa incluída com sucesso!"));
      } else {
        dispatch(displayError(`Ocorreu um erro ${data} ao criar Tarefa`));
      }
      dispatch(createTaskSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(displayError(`Ocorreu um erro ${error}`));
      dispatch(createTaskError(error));
    }
  };

export const updateTask = (data) => async (dispatch) => {
  // console.log("data", data);
  try {
    dispatch(updateTaskRequest());
    const value = await tasksApi.updateTask(data);
    if (value?.status === 204) {
      dispatch(displaySuccess("Tarefa editada com sucesso!"));
    } else {
      dispatch(
        displayError(
          `Ocorreu um erro: "${value?.data}" ao atualizar Tarefa ${data?.id}`
        )
      );
    }
    dispatch(updateTaskSuccess(value));
  } catch (error) {
    dispatch(displayError(error));
    dispatch(updateTaskError(error));
    console.log(error);
  }
};

export const deleteTask = (id) => async (dispatch) => {
  try {
    dispatch(deleteTaskRequest());
    const data = await tasksApi.deleteTask(id);
    if (data?.status === 204) {
      dispatch(displaySuccess("Tarefa deletada com sucesso!"));
    } else {
      dispatch(
        displayError(`Ocorreu um erro ${data} ao deletar o Tarefa ${id}`)
      );
    }
    dispatch(deleteTaskSuccess(data));
  } catch (error) {
    dispatch(displayError(error));
    dispatch(deleteTaskError(error));
    console.log(error);
  }
};
