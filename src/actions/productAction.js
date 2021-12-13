import {
	PRODUCT_LIST_FAIL,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_LIST_REQUEST,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DETAILS_FAIL,
	PRODUCT_DELETE_REQUEST,
	PRODUCT_DELETE_SUCCESS,
	PRODUCT_CREATE_SUCCESS,
	PRODUCT_CREATE_FAIL,
	PRODUCT_CREATE_REQUEST,
	PRODUCT_UPDATE_REQUEST,
	PRODUCT_UPDATE_SUCCESS,
	PRODUCT_UPDATE_FAIL,
	PRODUCT_CREATE_REVIEW_REQUEST,
	PRODUCT_CREATE_REVIEW_SUCCESS,
	PRODUCT_CREATE_REVIEW_FAIL,
	PRODUCT_TOP_REQUEST,
	PRODUCT_TOP_SUCCESS,
	PRODUCT_TOP_FAIL,
} from "../constants/productConstants";
//with redux-thunk we can define function inside function
import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL;

export const listProducts =
	(keyword = "") =>
	async (dispatch) => {
        console.log("LIST");
		try {
			dispatch({
				type: PRODUCT_LIST_REQUEST,
			});
			const { data } = await axios.get(`${API_URL}/api/products?keyword=${keyword}`);
			// console.log(data);
			dispatch({
				type: PRODUCT_LIST_SUCCESS,
				payload: data,
			});
		} catch (error) {
			dispatch({
				type: PRODUCT_LIST_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};

export const productDetail = (id) => async (dispatch) => {
	try {
		dispatch({
			type: PRODUCT_DETAILS_REQUEST,
		});
		// console.log("PRODUCT");
		const { data } = await axios.get(`${API_URL}/api/products/${id}`);
		// console.log(data);
		dispatch({
			type: PRODUCT_DETAILS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: PRODUCT_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const deleteProduct = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: PRODUCT_DELETE_REQUEST,
		});
		const userInfo = getState().userReducer.userInfo;

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: userInfo.token,
			},
		};
		 await axios.delete(`${API_URL}/api/products/${id}`, config);

		// console.log(data);
		dispatch({
			type: PRODUCT_DELETE_SUCCESS,
		});
	} catch (error) {
		dispatch({
			type: PRODUCT_DELETE_SUCCESS,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const createProduct = (product) => async (dispatch, getState) => {
    console.log("REACHED");
	try {
		dispatch({
			type: PRODUCT_CREATE_REQUEST,
		});
		const userInfo = getState().userReducer.userInfo;

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: userInfo.token,
			},
		};
		const { data } = await axios.post(`${API_URL}/api/products/`, product, config);

		// console.log(data);
		dispatch({
			type: PRODUCT_CREATE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: PRODUCT_CREATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const updateProduct = (product) => async (dispatch, getState) => {
	try {
		dispatch({
			type: PRODUCT_UPDATE_REQUEST,
		});
		const userInfo = getState().userReducer.userInfo;

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: userInfo.token,
			},
		};
		const { data } = await axios.patch(
			`${API_URL}/api/products/${product._id}/`,
			product,
			config
		);

		// console.log(data);
		dispatch({
			type: PRODUCT_UPDATE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: PRODUCT_UPDATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const createReview =
	(productId, review) => async (dispatch, getState) => {
		try {
			dispatch({
				type: PRODUCT_CREATE_REVIEW_REQUEST,
			});
			const userInfo = getState().userReducer.userInfo;

			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: userInfo.token,
				},
			};
			const { data } = await axios.post(
				`${API_URL}/api/products/${productId}/review`,
				review,
				config
			);

			// console.log(data);
			dispatch({
				type: PRODUCT_CREATE_REVIEW_SUCCESS,
				payload: data,
			});
		} catch (error) {
			dispatch({
				type: PRODUCT_CREATE_REVIEW_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};

export const listTopProduct = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: PRODUCT_TOP_REQUEST,
		});

		const { data } = await axios.get(`${API_URL}/api/products/top/products`);

		dispatch({
			type: PRODUCT_TOP_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: PRODUCT_TOP_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
