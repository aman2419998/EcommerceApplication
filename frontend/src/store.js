import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {
  productListReducer,
  productDetailReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productCreateReviewReducer,
  getTopProductReducer,
} from "./reducers/productReducers";
import { composeWithDevTools } from "redux-devtools-extension";
import { cartReducer } from "./reducers/cartReducers";
import {
  userDeleteReducer,
  userDetailByAdminReducer,
  userDetailReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateByAdminReducer,
  userUpdateDetailReducer,
} from "./reducers/userReducer";
import {
  getMyOrdersReducer,
  getOrdersReducer,
  orderCreateReducer,
  orderDetailReducer,
  updateOrderToDelivered,
  updateOrderToPayReducer,
} from "./reducers/orderReducers";

const reducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productCreateReview: productCreateReviewReducer,
  topProducts: getTopProductReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userRegister: userRegisterReducer,
  userDetail: userDetailReducer,
  userUpdateDetail: userUpdateDetailReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailReducer,
  orderPay: updateOrderToPayReducer,
  orderMyList: getMyOrdersReducer,
  orderDelivered: updateOrderToDelivered,
  orderList: getOrdersReducer,
  userDetailByAdmin: userDetailByAdminReducer,
  userUpdateByAdmin: userUpdateByAdminReducer,
});

const cartItemsfromLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfofromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : {};

const shippingAddressfromLocalStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : null;

const paymentMethodfromLocalStorage = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : null;

const initialState = {
  cart: {
    cartItems: cartItemsfromLocalStorage,
    shippingAddress: shippingAddressfromLocalStorage,
    paymentMethod: paymentMethodfromLocalStorage,
  },
  userLogin: { userInfo: userInfofromLocalStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
