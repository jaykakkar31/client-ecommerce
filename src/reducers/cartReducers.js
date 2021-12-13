import {
	CART_ADD_ITEM,
	CART_REMOVE_ITEM,
	CART_RESET_ITEM,
	RESET_SHIPPING_ADDRESS,
	SAVE_PAYMENT_METHOD,
	SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstants";

export const cartReducer = (
	state = { cartItems: [], shippingAddress: {}, paymentMethod: {} },
	action
) => {
	switch (action.type) {
		case CART_ADD_ITEM:
			const item = action.payload;

			const exist = state.cartItems?.find((x) => x.product === item.product);
			console.log(exist);
			if (exist) {
				return {
					...state,
					cartItems: state.cartItems.map((x) =>
						x.product === item.product ? item : x
					),
				};
			} else {
				return {
					...state,
					cartItems: [...state.cartItems, item],
				};
			}
		case CART_REMOVE_ITEM:
			return {
				...state,
				cartItems: state.cartItems.filter((x) => x.product !== action.payload),
			};
		case CART_RESET_ITEM:
			return {
				cartItems: [],
			};
		case SAVE_SHIPPING_ADDRESS:
			return {
				...state,
				shippingAddress: action.payload,
			};
		case SAVE_PAYMENT_METHOD:
			return {
				...state,
				paymentMethod: action.payload,
			};
		case RESET_SHIPPING_ADDRESS:
			return { ...state, shippingAddress: {} };
		default:
			return state;
	}
};
