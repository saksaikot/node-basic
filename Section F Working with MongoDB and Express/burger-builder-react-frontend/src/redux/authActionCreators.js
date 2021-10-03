import axios from "axios";
import { fetchOrders } from "./actionCreators";
import * as actionTypes from "./actionTypes";
import jwt_decode from "jwt-decode";

// const API_KEY = "AIzaSyAq99GLVWPqHfNWgL4NPw0_pDpaDv4s-VU";

export const authSuccess = ({ userId, token }) => ({
  type: actionTypes.AUTH_SUCCESS,
  payload: { userId, token },
});

export const auth =
  ({ email, password, isLogin }) =>
  (dispatch) => {
    const authData = { email, password };
    const API_BASE_URI = process.env.REACT_APP_API_ENDPOINT_BASE;

    const authUri = isLogin ? "users/auth" : "users";

    const apiEndPoint = API_BASE_URI + authUri;
    console.log(apiEndPoint, "apiEndPoint", authData);
    dispatch(authLoading(true));
    axios
      .post(apiEndPoint, authData)
      .then((response) => {
        dispatch(authLoading(false));
        dispatch(authLoadingFailedMessage(null));
        console.log(response);
        const { data } = response;

        // const { idToken, localId, expiresIn } = data.data;

        const idToken = data.token;
        const localId = data.data._id;
        const decoded = jwt_decode(idToken);
        const expiresIn = decoded.exp;
        localStorage.setItem("token", idToken);
        localStorage.setItem("userId", localId);
        const expires = new Date(new Date().getTime() + expiresIn * 1000);
        localStorage.setItem("expires", expires);
        dispatch(authSuccess({ token: idToken, userId: localId }));
        dispatch(fetchOrders(localId, idToken));
      })
      .catch((error) => {
        // console.log("auth loading error", error.message);
        // console.log("response", error.response);
        dispatch(authLoading(false));
        dispatch(authLoadingFailedMessage(error.response.data.message));
      });
  };

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expires");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const localAuthCheck = () => (dispatch) => {
  const token = localStorage.getItem("token");
  const expires = localStorage.getItem("expires");
  const userId = localStorage.getItem("userId");
  // console.log("calling localAuthCheck");
  if (!token && !expires) return dispatch(logout());
  if (new Date() > new Date(expires)) return dispatch(logout());
  // console.log("calling localAuthCheck");
  dispatch(authSuccess({ token: token, userId: userId }));

  dispatch(fetchOrders(userId, token));
};

export const authLoading = (isLoading) => {
  return {
    type: actionTypes.AUTH_LOADING,
    payload: isLoading,
  };
};

export const authLoadingFailedMessage = (message) => ({
  type: actionTypes.AUTH_FAILED_MESSAGE,
  payload: message,
});
