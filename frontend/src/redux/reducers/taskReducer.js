import {
  fetchTaskRequest,
  fetchTaskSuccess,
  fetchTaskError,
  createTaskRequest,
  createTaskSuccess,
  createTaskError,
  deleteTaskRequest,
  deleteTaskSuccess,
  deleteTaskError,
  getTaskByIdRequest,
  getTaskByIdSuccess,
  getTaskByIdError,
  updateTaskRequest,
  updateTaskSuccess,
  updateTaskError,
  clearTaskById,
} from "../actions/taskActions";

const defaultState = {
  tarefas: [],
  tarefa: null,
  isFetching: false,
  isUpdating: false,
  error: null,
};

const taskReducer = (state = defaultState, action) => {
  const payload = action?.payload;

  switch (action.type) {
    case fetchTaskRequest?.type:
      return (state = {
        ...state,
        tarefas: null,
        isFetching: true,
        error: null,
      });
    case fetchTaskSuccess?.type:
      return (state = {
        ...state,
        tarefas: payload,
        isFetching: false,
        error: null,
      });
    case fetchTaskError?.type:
      return (state = {
        ...state,
        tarefas: null,
        isFetching: false,
        error: payload,
      });

    case createTaskRequest?.type:
      return (state = {
        ...state,
        isUpdating: true,
        error: null,
      });
    case createTaskSuccess?.type:
      return (state = {
        ...state,
        isUpdating: false,
        error: null,
      });
    case createTaskError?.type:
      return (state = {
        ...state,
        isUpdating: false,
        error: payload,
      });

    case deleteTaskRequest?.type:
      return (state = {
        ...state,
        isUpdating: true,
        error: null,
      });
    case deleteTaskSuccess?.type:
      return (state = {
        ...state,
        isUpdating: false,
        error: null,
      });
    case deleteTaskError?.type:
      return (state = {
        ...state,
        isUpdating: false,
        error: payload,
      });

    case getTaskByIdRequest?.type:
      return (state = {
        ...state,
        isFetching: true,
        tarefa: null,
        error: null,
      });
    case getTaskByIdSuccess?.type:
      return (state = {
        ...state,
        isFetching: false,
        tarefa: payload,
        error: null,
      });
    case getTaskByIdError?.type:
      return (state = {
        ...state,
        error: payload,
        isFetching: false,
        tarefa: null,
      });

    case updateTaskRequest?.type:
      return (state = {
        ...state,
        isUpdating: true,
        error: null,
      });
    case updateTaskSuccess?.type:
      return (state = {
        ...state,
        tarefa: payload,
        isUpdating: false,
        error: null,
      });
    case updateTaskError?.type:
      return (state = {
        ...state,
        isUpdating: false,
        error: payload,
      });

    case clearTaskById?.type:
      return (state = {
        ...state,
        tarefa: null,
      });
    default:
      return state;
  }
};

export default taskReducer;
