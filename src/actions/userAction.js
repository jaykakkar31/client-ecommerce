import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_FAIL,
	USER_LOGIN_SUCCESS,
	USER_LOGOUT,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAIL,
	USER_REGISTER_REQUEST,
	USER_DETAIL_REQUEST,
	USER_DETAIL_SUCCESS,
	USER_DETAIL_FAIL,
	USER_UPDATE_PROFILE_FAIL,
	
	USER_UPDATE_PROFILE_REQUEST,
	USER_UPDATE_PROFILE_SUCCESS,
	USER_DETAIL_RESET,
	USER_LIST_REQUEST,
	USER_LIST_SUCCESS,
	USER_LIST_FAIL,
	USER_LIST_RESET,
	USER_DELETE_REQUEST,
	USER_DELETE_SUCCESS,
	USER_DELETE_FAIL,
	USER_UPDATE_SUCCESS,
	USER_UPDATE_FAIL,
	USER_UPDATE_REQUEST,
} from "../constants/userConstants";
import axios from "axios";
import { ORDER_LIST_MY_RESET } from "../constants/orderConstants";

export const userAction = (email, password) => async (dispatch) => {
	try {
		dispatch({
			type: USER_LOGIN_REQUEST,
		});
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		const { data } = await axios.post(
			"/api/user/login",
			{ email: email, password: password },
			config
		);
		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data,
		});
		localStorage.setItem("userInfo", JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: USER_LOGIN_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
export const register = (email, password, name) => async (dispatch) => {
	try {
		dispatch({
			type: USER_REGISTER_REQUEST,
		});
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		const { data } = await axios.post(
			"/api/user/register",
			{ email: email, password: password, name: name },
			config
		);
		console.log(data);
		dispatch({
			type: USER_REGISTER_SUCCESS,
			payload: data,
		});
		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data,
		});
		localStorage.setItem("userInfo", JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: USER_REGISTER_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const getDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_DETAIL_REQUEST,
		});

		const user = getState().userReducer.userInfo;
		// console.log(user);
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: user.token,
			},
		};
		const { data } = await axios.get(`/api/user/${id}`, config);
		dispatch({
			type: USER_DETAIL_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: USER_DETAIL_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const updateProfileDetails = (user) => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_UPDATE_PROFILE_REQUEST,
		});

		const userInfo = getState().userReducer.userInfo;
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: userInfo.token,
			},
		};
		const { data } = await axios.patch(`/api/user/profile`, user, config);
		dispatch({
			type: USER_UPDATE_PROFILE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: USER_UPDATE_PROFILE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
export const logout = () => (dispatch) => {
	localStorage.removeItem("userInfo");
	dispatch({
		type: USER_LOGOUT,
	});
	dispatch({
		type: ORDER_LIST_MY_RESET,
	});
	dispatch({ type: USER_DETAIL_RESET });
	dispatch({ type: USER_LIST_RESET });
};

export const listUsers = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_LIST_REQUEST,
		});

		const userInfo = getState().userReducer.userInfo;
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: userInfo.token,
			},
		};
		const { data } = await axios.get(`/api/user/`, config);
		dispatch({
			type: USER_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: USER_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const deleteUsers = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_DELETE_REQUEST,
		});

		const userInfo = getState().userReducer.userInfo;
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: userInfo.token,
			},
		};
		 await axios.delete(`/api/user/${id}`, config);
		dispatch({
			type: USER_DELETE_SUCCESS,
		});
	} catch (error) {
		dispatch({
			type: USER_DELETE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const updateUser = (user) => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_UPDATE_REQUEST,
		});

		const userInfo = getState().userReducer.userInfo;
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: userInfo.token,
			},
		};
		const { data } = await axios.patch(`/api/user/${user._id}`, user, config);
		dispatch({
			type: USER_UPDATE_SUCCESS,
			payload: data,
		});
		dispatch({
			type: USER_DETAIL_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: USER_UPDATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
