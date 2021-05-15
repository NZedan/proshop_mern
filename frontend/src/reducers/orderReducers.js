import {
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_CREATE_FAIL,
	ORDER_CREATE_RESET,
	ORDER_DETAILS_RESET,
	ORDER_DETAILS_REQUEST,
	ORDER_DETAILS_SUCCESS,
	ORDER_DETAILS_FAIL,
	ORDER_PAY_REQUEST,
	ORDER_PAY_SUCCESS,
	ORDER_PAY_FAIL,
	ORDER_PAY_RESET,
	ORDER_USER_LIST_REQUEST,
	ORDER_USER_LIST_SUCCESS,
	ORDER_USER_LIST_FAIL,
	ORDER_USER_LIST_RESET,
} from '../constants/orderConstants';

export const orderCreateReducer = (state = {}, { type, payload }) => {
	switch (type) {
		case ORDER_CREATE_REQUEST:
			return {
				loading: true,
			};
		case ORDER_CREATE_SUCCESS:
			return {
				loading: false,
				success: true,
				order: payload,
			};
		case ORDER_CREATE_FAIL:
			return {
				loading: false,
				error: payload,
			};
		case ORDER_CREATE_RESET:
			return {};
		default:
			return state;
	}
};

export const orderDetailsReducer = (
	state = { loading: true, error: null, order: { orderItems: [], shippingAddress: {} }, success: false },
	{ type, payload }
) => {
	switch (type) {
		case ORDER_DETAILS_REQUEST:
			return {
				...state,
				loading: true,
			};
		case ORDER_DETAILS_SUCCESS:
			return {
				loading: false,
				order: payload,
			};
		case ORDER_DETAILS_FAIL:
			return {
				loading: false,
				error: payload,
			};
		case ORDER_DETAILS_RESET:
			return {
				loading: true,
				error: null,
				order: {
					orderItems: [],
					shippingAddress: {},
				},
				success: false,
			};
		default:
			return state;
	}
};

export const orderPayReducer = (state = {}, { type, payload }) => {
	switch (type) {
		case ORDER_PAY_REQUEST:
			return {
				loading: true,
			};
		case ORDER_PAY_SUCCESS:
			return {
				loading: false,
				success: true,
			};
		case ORDER_PAY_FAIL:
			return {
				loading: false,
				error: payload,
			};
		case ORDER_PAY_RESET:
			return {};
		default:
			return state;
	}
};

export const orderUserListReducer = (state = { orders: [] }, { type, payload }) => {
	switch (type) {
		case ORDER_USER_LIST_REQUEST:
			return {
				loading: true,
			};
		case ORDER_USER_LIST_SUCCESS:
			return {
				loading: false,
				orders: payload,
			};
		case ORDER_USER_LIST_FAIL:
			return {
				loading: false,
				error: payload,
			};
		case ORDER_USER_LIST_RESET:
			return { orders: [] };
		default:
			return state;
	}
};
