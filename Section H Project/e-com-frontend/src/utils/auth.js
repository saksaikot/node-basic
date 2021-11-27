import jwt_decode from "jwt-decode";
const isWindow = () => typeof window !== "undefined";
const getJwt = () => {
  if (!isWindow) return false;
  const localJwt = localStorage.getItem("jwt");
  let jwt = false;
  if (localJwt) {
    jwt = jwt_decode(localJwt);
    if (jwt && new Date().getTime() > jwt.exp * 1000) jwt = false;
  }

  return jwt;
};

export const authenticate = (token, cb) => {
  if (isWindow) {
    localStorage.setItem("jwt", token);
    cb();
  }
};

export const isAuthenticate = () => {
  if (!isWindow) return false;
  return getJwt();
};

export const userInfo = () => {
  const jwt = getJwt();
  return { ...jwt, token: localStorage.getItem("jwt") };
};

export const signout = (cb) => {
  if (isWindow) {
    localStorage.removeItem("jwt");
    cb();
  }
};
