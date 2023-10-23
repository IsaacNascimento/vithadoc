import axios from "axios";
// import LogoutUser from "../../../shared/hooks/logoutUser";
import { API_LOCALHOST, publicPaths } from "../../constants";
import TokenService from "./tokenServicer";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import { authApi } from "../authApi";
import LogoutUser, { reloadPage } from "../../../shared/hooks/logoutUser";

const token = TokenService.getToken();
const bearerToken = `Bearer ${token}`;

export const axiosInstance = axios.create({
  baseURL: API_LOCALHOST,
  headers: {
    Authorization: bearerToken,
  },
});

// inserir o token no header automáticamente a cada requisição pelo axios
axiosInstance.interceptors.request.use(async (req) => {
  if (!token) {
    const token = TokenService.getToken();
    const bearerToken = `Bearer ${token}`;
    req.headers.Authorization = bearerToken;
  }

  return req;
});

// Refresh token se o token estiver expirado
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const token = TokenService.getToken();
    const bearerToken = `Bearer ${token}`;
    const user = jwt_decode(token);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if (error.response.status === 401 && !publicPaths && isExpired) {
      const { bearerRefreshToken } = TokenService.getRefreshToken();
      const response = await authApi.refresh(bearerRefreshToken);
      
      
      if (response.status === 200) {
        reloadPage();
        const { data } = response;
        TokenService.setUser(data);
        error.headers.Authorization = bearerToken;
      } else {
        LogoutUser();
      }
    }
    return error;
  }
);

// tratar erro 401 Unauthorized pelo tempo de expiração do Token
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const token = TokenService.getToken();
    const user = jwt_decode(token);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    // Desconectar usuário caso status code seja 401, esteja em rotas privadas
    // e o token não esteja expirado
    if (error.response.status === 401 && !publicPaths && !isExpired) {
      LogoutUser();
    }

    return error;
  }
);

// tratar erro 401 Unauthorized pelo tempo de expiração do refresh Token
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { refreshToken } = TokenService.getRefreshToken();
    const user = jwt_decode(refreshToken);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    // Desconectar usuário caso status code seja 401, esteja em rotas privadas
    // e o refreshToken esteja expirado
    if (error.response.status === 401 && !publicPaths && isExpired) {
      LogoutUser();
    }

    return error;
  }
);

export default axiosInstance;
