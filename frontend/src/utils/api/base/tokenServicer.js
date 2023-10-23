import { JWT } from "../../constants";

const getSession = () => {
  const user = localStorage.getItem(JWT);
  const session = user ? JSON.parse(user) : null;
  return session;
};

const setUser = (user) => {
  localStorage.setItem(JWT, JSON.stringify(user));
};

const removeUser = () => {
  localStorage.removeItem(JWT);
};

const getToken = () => {
  const user = getSession();
  const token = user ? user.access : null;
  return token;
};

const getRefreshToken = () => {
  const user = getSession();
  const refreshToken = user ? user.refresh : null;
  return { refreshToken, bearerRefreshToken: `Bearer ${refreshToken}` };
};

const TokenService = {
  getToken,
  getSession,
  setUser,
  removeUser,
  getRefreshToken,
};

export default TokenService;
