import axios from "axios";
import * as actionType from "./actionTypes";

export const updateIngredientAmount = (ingredientAmount) => {
  return {
    type: actionType.UPDATE_INGREDIENT_AMOUNT,
    payload: ingredientAmount,
  };
};

export const updateCheckoutForm = (checkout) => ({
  type: actionType.UPDATE_CHECKOUT_FORM,
  payload: checkout,
});

export const resetBurgerState = () => ({
  type: actionType.RESET_BURGER_STATE,
});

export const loadOrders = (orders) => ({
  type: actionType.LOAD_ORDERS,
  payload: orders,
});

export const orderLoadFailed = () => ({
  type: actionType.ORDER_LOAD_FAILED,
});

export const fetchOrders = (userId, token) => (dispatch) => {
  const API_BASE_URI = process.env.REACT_APP_API_ENDPOINT_BASE;

  const orderEnd = API_BASE_URI + "orders";
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  axios
    .get(orderEnd)
    .then((response) => {
      console.log(response);
      dispatch(loadOrders(response.data));
    })
    .catch((error) => {
      dispatch(orderLoadFailed());
    });
};

export const saveOrder = (order) => ({
  type: actionType.SAVE_ORDER,
  payload: order,
});
