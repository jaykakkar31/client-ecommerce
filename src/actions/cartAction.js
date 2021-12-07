import axios from "axios";

import { CART_ADD_ITEM, CART_REMOVE_ITEM ,SAVE_PAYMENT_METHOD,SAVE_SHIPPING_ADDRESS} from "../constants/cartConstants";

const API_URL = process.env.REACT_APP_API_URL;

export const addToCart = (id, qty) => async (dispatch, getState) => {
	//getState will all the items in reducer/store

	const { data } = await axios.get(`${API_URL}/api/products/${id}`);
	// console.log(data);
	dispatch({
		type: CART_ADD_ITEM,
		payload: {
			product: data._id,
			name: data.name,
			image: data.image,
			price: data.price,
			qty: qty,
			countInStock: data.countInStock,
		},
	});
	localStorage.setItem(
		"cartItems",

		JSON.stringify(getState().cartReducer.cartItems)
	);
};

export const removeFromCart=(id)=>async(dispatch,getState)=>{
    dispatch({
        type:CART_REMOVE_ITEM,
        payload:id
    })
    localStorage.setItem("cartItems",JSON.stringify(getState().cartReducer.cartItems))
}

export const saveShippingAddress = (data) => async (dispatch) => {
	dispatch({
		type: SAVE_SHIPPING_ADDRESS,
		payload: data,
	});
	localStorage.setItem(
		"shippingAddress",
		JSON.stringify(data)
	);
};

export const savePaymentMethod = (data) => async (dispatch) => {
	dispatch({
		type: SAVE_PAYMENT_METHOD,
		payload: data,
	});
	localStorage.setItem("paymentMethod", JSON.stringify(data));
};