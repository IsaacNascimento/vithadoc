import axiosInstance from "./base/axiosInstance";

const taskEndpoint = "Tasks/Application/Action";

export const tasksApi = {
  getTask: async (id) => {
    let status;
    return await axiosInstance(`${taskEndpoint}/GetTaskById.php?id=${id}`, {
      method: "GET",
    })
      .then((response) => {
        if (response?.status === 200) {
          return {
            response: response,
            data: response?.data,
            status: response.status,
            message: response.statusText,
          };
        }

        const res = response?.response;
        status = res.status;
        return {
          res,
          status,
        };
      })
      .catch((reason) => {
        return {
          response: reason.response,
          status: status,
          message: reason?.message,
        };
      });
  },

  fetchAll: async () => {
    return await axiosInstance(`${taskEndpoint}/GetTask.php`, { method: "GET" })
      .then((response) => {
        console.log(response);
        return {
          response: response,
          data: response?.data,
          status: response?.status,
          message: response?.statusText,
        };
      })
      .catch((reason) => {
        return {
          response: reason?.response,
          status: reason?.response?.status,
          message: reason?.response?.statusText,
        };
      });
  },

  createTask: async (name, description) => {
    const data = { nome: name, descricao: description };
    return await axiosInstance(`${taskEndpoint}/CreateTask.php`, {
      method: "POST",
      data: data,
    })
      .then((response) => {
        return {
          response: response,
          data: response?.data,
          status: response?.status,
        };
      })
      .catch((error) => {
        return {
          response: error?.response,
          status: error?.response?.status,
          message: error?.response?.statusText,
        };
      });
  },

  updateTask: async (data) => {
    const id = data?.idtask;
    const name = data?.name;
    const description = data?.description;
    const body = { nome: name, descricao: description };

    let status;
    return await axiosInstance(`${taskEndpoint}/UpdateTask.php?id=${id}`, {
      method: "PUT",
      data: body,
    })
      .then((response) => {
        // console.log("response", response);
        if (response?.status === 204) {
          return {
            response,
            status: response?.status,
            data: response?.data,
          };
        }

        status = response.status;
        return {
          response,
          status: status,
          data: response.data,
        };
      })
      .catch((error) => {
        return {
          response: error?.response,
          status: error?.response.status,
          message: error?.response.statusText,
        };
      });
  },

  deleteTask: async (id) => {
    let status;
    return await axiosInstance(`${taskEndpoint}/DeleteTask.php?id=${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        status = response.status;
        return {
          response: response,
          data: response?.data,
          status: response?.status,
        };
      })
      .catch((error) => {
        return {
          response: error.response,
          status: status,
          message: error?.message,
        };
      });
  },
};
