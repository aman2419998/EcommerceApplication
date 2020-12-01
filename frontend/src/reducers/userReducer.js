import {
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_RESET,
  USER_DELETE_SUCCESS,
  USER_DETAIL_ADMIN_FAIL,
  USER_DETAIL_ADMIN_REQUEST,
  USER_DETAIL_ADMIN_RESET,
  USER_DETAIL_ADMIN_SUCCESS,
  USER_DETAIL_FAIL,
  USER_DETAIL_REQUEST,
  USER_DETAIL_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_ADMIN_FAIL,
  USER_UPDATE_ADMIN_REQUEST,
  USER_UPDATE_ADMIN_RESET,
  USER_UPDATE_ADMIN_SUCCESS,
  USER_UPDATE_DETAIL_FAIL,
  USER_UPDATE_DETAIL_REQUEST,
  USER_UPDATE_DETAIL_SUCCESS,
} from "../constants/userConstants";

const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };

    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };

    case USER_LOGOUT:
      return {};

    default:
      return state;
  }
};

const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };

    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };

    case USER_LOGOUT:
      return {};

    default:
      return state;
  }
};

const userDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DETAIL_REQUEST:
      return { ...state, loading: true };

    case USER_DETAIL_SUCCESS:
      return { loading: false, user: action.payload };

    case USER_DETAIL_FAIL:
      return { loading: false, error: action.payload };

    case USER_LOGOUT:
      return {};

    default:
      return state;
  }
};

const userUpdateDetailReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_UPDATE_DETAIL_REQUEST:
      return { ...state, loading: true };

    case USER_UPDATE_DETAIL_SUCCESS:
      return { loading: false, success: true, user: action.payload };

    case USER_UPDATE_DETAIL_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true };

    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload };

    case USER_LIST_FAIL:
      return { loading: false, error: action.payload };

    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true };

    case USER_DELETE_SUCCESS:
      return { loading: false, success: true };

    case USER_DELETE_FAIL:
      return { loading: false, error: action.payload };

    case USER_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

const userDetailByAdminReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DETAIL_ADMIN_REQUEST:
      return { loading: true };

    case USER_DETAIL_ADMIN_SUCCESS:
      return { loading: false, userDetail: action.payload };

    case USER_DETAIL_ADMIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_DETAIL_ADMIN_RESET:
      return {};
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

const userUpdateByAdminReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_ADMIN_REQUEST:
      return { loading: true };

    case USER_UPDATE_ADMIN_SUCCESS:
      return { loading: false, success: true, user: action.payload };

    case USER_UPDATE_ADMIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_ADMIN_RESET:
      return {};
    default:
      return state;
  }
};

export {
  userLoginReducer,
  userRegisterReducer,
  userDetailReducer,
  userUpdateDetailReducer,
  userListReducer,
  userDeleteReducer,
  userDetailByAdminReducer,
  userUpdateByAdminReducer,
};
