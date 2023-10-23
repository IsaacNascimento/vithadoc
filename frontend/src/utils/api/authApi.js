import { API_LOCALHOST } from "../constants";
import axiosInstance from "./base/axiosInstance";

const userApi = "User/Application/Action";

export const authApi = {
  // retornar status e de acordo com a resposta tomar as
  login: async (email, password) => {
    const body = { email: email, password: password };
    let status;
    return fetch(`${API_LOCALHOST}/${userApi}/LoginUser.php`, {
      body: JSON.stringify(body),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        status = response.status;
        return response.json();
      })
      .then((data) => {
        const value = { ...data, status: status };
        return value;
      })
      .catch((error) => {
        return error;
      });
  },
  checkUserPermission: async () => {
    return await axiosInstance(`${API_LOCALHOST}/${userApi}/ValidateUser.php`, {
      method: "POST",
    }).then((response) => {
      if (response.status === 200) {
        return {
          status: response.status,
          isLoggin: true,
        };
      }

      const data = response.data;
      return {
        data,
        message: data?.detail,
        status: response.status,
        isLoggin: false,
      };
    });
  },

  refresh: async (refreshToken) => {
    const body = { refresh: refreshToken };
    const separeted = body.refresh.split(" ");

    let status;
    return fetch(`${API_LOCALHOST}/${userApi}/RefreshToken.php`, {
      method: "POST",
      body: JSON.stringify({ refresh: separeted[1] }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        status = response.status;
        return response.json();
      })
      .then((data) => {
        if (status === 200) {
          return {
            data,
            status,
          };
        }
        return data;
      })
      .catch((error) => {
        return {
          error,
          response: error?.response,
          status: error?.response?.status,
        };
      });
  },

  createUser: async (email, password, name) => {
    const body = { name: name, email: email, password: password };

    let status;
    return fetch(`${API_LOCALHOST}/${userApi}/CreateUser.php`, {
      body: JSON.stringify(body),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        status = response.status;
        return response.json();
      })
      .then((data) => {
        const value = { ...data, status: status };
        return value;
      })
      .catch((error) => {
        return error;
      });
  },
};
