import {
	ORDER_CREATE_FAIL,
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_DELIVER_FAIL,
	ORDER_DELIVER_REQUEST,
	ORDER_DELIVER_SUCCESS,
	ORDER_DETAIL_FAIL,
	ORDER_DETAIL_REQUEST,
	ORDER_DETAIL_SUCCESS,
	ORDER_FAIL,
	ORDER_LIST_MY_FAIL,
	ORDER_LIST_MY_REQUEST,
	ORDER_LIST_MY_RESET,
	ORDER_LIST_MY_SUCCESS,
	ORDER_PAY_FAIL,
	ORDER_PAY_REQUEST,
	ORDER_PAY_RESET,
	ORDER_PAY_SUCCESS,
	ORDER_REQUEST,
	ORDER_RESET,
	ORDER_SUCCESS,
} from "../constants/orderConstants";

export const orderCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case ORDER_CREATE_REQUEST:
			return { loading: true, success: false, error: null };
		case ORDER_CREATE_SUCCESS:
			return { loading: false, success: true, orderInfo: action.payload };
		case ORDER_CREATE_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const getOrderReducer = (
	state = { orderItems: [], shippingAddress: {} },
	action
) => {
	switch (action.type) {
		case ORDER_DETAIL_REQUEST:
			return { ...state, loading: true, success: false };
		case ORDER_DETAIL_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
				orderInfo: action.payload,
			};
		case ORDER_DETAIL_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const payReducer = (state = {}, action) => {
	switch (action.type) {
		case ORDER_PAY_REQUEST:
			return { loading: true, success: false };
		case ORDER_PAY_SUCCESS:
			return {
				loading: false,
				success: true,
			};
		case ORDER_PAY_FAIL:
			return { loading: false, error: action.payload };
		case ORDER_PAY_RESET:
			return {};
		default:
			return state;
	}
};

export const getAllMyOrdersReducer = (state = { orders: [] }, action) => {
	switch (action.type) {
		case ORDER_LIST_MY_REQUEST:
			return { loading: true, success: false };
		case ORDER_LIST_MY_SUCCESS:
			return {
				orders: action.payload,
				loading: false,
				success: true,
			};
		case ORDER_LIST_MY_FAIL:
			return { loading: false, error: action.payload };
		case ORDER_LIST_MY_RESET:
			return { orders: [] };

		default:
			return state;
	}
};

export const getAllOrdersReducer = (state = { orders: [] }, action) => {
	switch (action.type) {
		case ORDER_REQUEST:
			return { loading: true, success: false };
		case ORDER_SUCCESS:
			return {
				orders: action.payload,
				loading: false,
				success: true,
			};
		case ORDER_FAIL:
			return { loading: false, error: action.payload };
		case ORDER_RESET:
			return { orders: [] };

		default:
			return state;
	}
};

export const updateOrderDeliver = (state = {}, action) => {
	switch (action.type) {
		case ORDER_DELIVER_REQUEST:
			return { loading: true, success: false };
		case ORDER_DELIVER_SUCCESS:
			return {
				order: action.payload,
				loading: false,
				success: true,
			};
		case ORDER_DELIVER_FAIL:
			return { loading: false, error: action.payload };
		// case ORDER_RESET:
		// 	return { orders: [] };

		default:
			return state;
	}
};
