//BOILER PLATE CODE

import { createStore, combineReducers, applyMiddleware } from "redux";
//applymiddleware is used using thunk
import thunk from "redux-thunk";

import { composeWithDevTools } from "redux-devtools-extension";
import {
	productListReducer,
	productDetailReducer,
	productDeleteReducer,
	productCreateReducer,
	productUpdateReducer,
	createReviewReducer,
	topProductReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import {
	userReducer,
	userRegisterReducer,
	userDetailReducer,
	userUpdateProfileReducer,
	userListReducer,
	userDeleteReducer,
	userUpdateReducer,
    
} from "./reducers/userReducer";

import {
	orderCreateReducer,
	getOrderReducer,
	payReducer,
	getAllMyOrdersReducer,
	getAllOrdersReducer,
	updateOrderDeliver,
} from "./reducers/orderReducer";
const reducer = combineReducers({
	productListReducer: productListReducer,
	productDetailReducer: productDetailReducer,
	cartReducer: cartReducer,
	userReducer: userReducer,
	userRegisterReducer: userRegisterReducer,
	userDetailReducer: userDetailReducer,
	userUpdateProfileReducer: userUpdateProfileReducer,
	orderCreateReducer: orderCreateReducer,
	getOrderReducer: getOrderReducer,
	payReducer: payReducer,
	getAllMyOrdersReducer: getAllMyOrdersReducer,
	userListReducer: userListReducer,
	userDeleteReducer: userDeleteReducer,
	userUpdateReducer: userUpdateReducer,
	productDeleteReducer: productDeleteReducer,
	productCreateReducer: productCreateReducer,
	productUpdateReducer: productUpdateReducer,
	getAllOrdersReducer: getAllOrdersReducer,
	updateOrderDeliver: updateOrderDeliver,
	createReviewReducer: createReviewReducer,
	topProductReducer: topProductReducer,
});

const cartItemsfromStorage = localStorage.getItem("cartItems")
	? JSON.parse(localStorage.getItem("cartItems"))
	: [];

const shippingAddressfromStorage = localStorage.getItem("shippingAddress")
	? JSON.parse(localStorage.getItem("shippingAddress"))
	: {};
const userInfofromStorage = localStorage.getItem("userInfo")
	? JSON.parse(localStorage.getItem("userInfo"))
	: null;
const paymentMethodfromStorage = localStorage.getItem("paymentMethod")
	? JSON.parse(localStorage.getItem("paymentMethod"))
	: null;

const initialState = {
	cartReducer: {
		cartItems: cartItemsfromStorage,
		shippingAddress: shippingAddressfromStorage,
		paymentMethod: paymentMethodfromStorage,
	},
	userReducer: {
		userInfo: userInfofromStorage,
	},
};
const middleware = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
