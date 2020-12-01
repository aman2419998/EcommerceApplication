import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_RESET,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELIVERED_REQUEST,
  ORDER_DELIVERED_SUCCESS,
  ORDER_DELIVERED_FAIL,
} from "../constants/orderConstants";

import { USER_LOGOUT } from "../constants/userConstants";

const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true };

    case ORDER_CREATE_SUCCESS:
      return { loading: false, success: true, order: action.payload };

    case ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case USER_LOGOUT:
      return {};

    default:
      return state;
  }
};

const orderDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { loading: true };

    case ORDER_DETAILS_SUCCESS:
      return { loading: false, orderDetail: action.payload, user: action.user };

    case ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case USER_LOGOUT:
      return {};

    default:
      return state;
  }
};

const updateOrderToPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return { loading: true };

    case ORDER_PAY_SUCCESS:
      return { loading: false, success: true, updatedOrder: action.payload };

    case ORDER_PAY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case ORDER_PAY_RESET:
      return {};

    default:
      return state;
  }
};

const getMyOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_MY_REQUEST:
      return { loading: true };

    case ORDER_LIST_MY_SUCCESS:
      return { loading: false, orders: action.payload };

    case ORDER_LIST_MY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

const getOrdersReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return { loading: true };

    case ORDER_LIST_SUCCESS:
      return { loading: false, orders: action.payload };

    case ORDER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

const updateOrderToDelivered = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELIVERED_REQUEST:
      return { loading: true };

    case ORDER_DELIVERED_SUCCESS:
      return { loading: false, success: true, order: action.payload };

    case ORDER_DELIVERED_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export {
  orderCreateReducer,
  orderDetailReducer,
  updateOrderToPayReducer,
  getMyOrdersReducer,
  getOrdersReducer,
  updateOrderToDelivered,
};
