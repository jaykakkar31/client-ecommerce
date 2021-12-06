import axios from "axios";
import {
	ORDER_CREATE_FAIL,
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_DELIVER_REQUEST,
	ORDER_DELIVER_SUCCESS,
	ORDER_DELIVER_FAIL,
	ORDER_DETAIL_FAIL,
	ORDER_DETAIL_REQUEST,
	ORDER_DETAIL_SUCCESS,
	ORDER_FAIL,
	ORDER_LIST_MY_FAIL,
	ORDER_LIST_MY_REQUEST,
	ORDER_LIST_MY_SUCCESS,
	ORDER_PAY_FAIL,
	ORDER_PAY_REQUEST,
	ORDER_PAY_SUCCESS,
	ORDER_REQUEST,
	ORDER_SUCCESS,
} from "../constants/orderConstants";
//with redux-thunk we can define function inside function

export const createOrder = (order) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_CREATE_REQUEST,
		});
		const userInfo = getState().userReducer.userInfo;

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: userInfo.token,
			},
		};
		const { data } = await axios.post("/api/order", order, config);
		// console.log(data);
		dispatch({
			type: ORDER_CREATE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: ORDER_CREATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const getOrderById = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_DETAIL_REQUEST,
		});
		const userInfo = getState().userReducer.userInfo;

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: userInfo.token,
			},
		};
		const { data } = await axios.get(
			`/api/order/${id}`,

			config
		);
		// console.log(data);
		dispatch({
			type: ORDER_DETAIL_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: ORDER_DETAIL_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_PAY_REQUEST,
		});
		const userInfo = getState().userReducer.userInfo;

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: userInfo.token,
			},
		};
		const { data } = await axios.patch(
			`/api/order/${id}/pay`,
			paymentResult,
			config
		);
		// console.log(data);
		dispatch({
			type: ORDER_PAY_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: ORDER_PAY_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const getAllMyOrderAction = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_LIST_MY_REQUEST,
		});
		const userInfo = getState().userReducer.userInfo;

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: userInfo.token,
			},
		};
		console.log("ENTERED");
		const { data } = await axios.get(`/api/order/myorders`, config);

		// console.log(data);
		dispatch({
			type: ORDER_LIST_MY_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: ORDER_LIST_MY_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const getAllOrderAction = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_REQUEST,
		});
		const userInfo = getState().userReducer.userInfo;

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: userInfo.token,
			},
		};
		console.log("ENTERED");
		const { data } = await axios.get(`/api/order`, config);

		// console.log(data);
		dispatch({
			type: ORDER_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: ORDER_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const updateDeliverOrder = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_DELIVER_REQUEST,
		});
		const userInfo = getState().userReducer.userInfo;

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: userInfo.token,
			},
		};
		const { data } = await axios.patch(`/api/order/${id}/deliver`, {}, config);

		// console.log(data);
		dispatch({
			type: ORDER_DELIVER_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: ORDER_DELIVER_FAIL,

			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
