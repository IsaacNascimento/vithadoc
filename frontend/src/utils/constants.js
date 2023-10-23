export const JWT = "VITHADOC";
export const EMAIL = "EMAIL";

export const oneMinute = 60 * 1000;

export const API_LOCALHOST = "http://localhost:8080/src";

let path = window.location.pathname;
export const publicPaths =
  path === "/" && path === "/login" && path === "/l/criar/usuario";
