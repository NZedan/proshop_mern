import {
	ORDER_CREATE_FAIL,
	ORDER_CREATE_REMOVE_ERROR,
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_RESET,
	ORDER_CREATE_SUCCESS,
	ORDER_DELIVER_FAIL,
	ORDER_DELIVER_REMOVE_ERROR,
	ORDER_DELIVER_REQUEST,
	ORDER_DELIVER_RESET,
	ORDER_DELIVER_SUCCESS,
	ORDER_DETAILS_FAIL,
	ORDER_DETAILS_REMOVE_ERROR,
	ORDER_DETAILS_REQUEST,
	ORDER_DETAILS_RESET,
	ORDER_DETAILS_SUCCESS,
	ORDER_LIST_FAIL,
	ORDER_LIST_REMOVE_ERROR,
	ORDER_LIST_REQUEST,
	ORDER_LIST_SUCCESS,
	ORDER_PAY_FAIL,
	ORDER_PAY_REMOVE_ERROR,
	ORDER_PAY_REQUEST,
	ORDER_PAY_RESET,
	ORDER_PAY_SUCCESS,
	ORDER_USER_LIST_FAIL,
	ORDER_USER_LIST_REMOVE_ERROR,
	ORDER_USER_LIST_REQUEST,
	ORDER_USER_LIST_RESET,
	ORDER_USER_LIST_SUCCESS,
} from '../constants/orderConstants';

export const orderCreateReducer = (
	state = { status: 'idle', success: null, order: { orderItems: [], deliveryAddress: {}, user: {} }, orders: [], error: null },
	{ type, payload }
) => {
	switch (type) {
		case ORDER_CREATE_REQUEST:
			return {
				...state,
			};
		case ORDER_CREATE_SUCCESS:
			return {
				...state,
				success: true,
				order: payload,
			};
		case ORDER_CREATE_FAIL:
			return {
				...state,
				error: payload,
			};
		case ORDER_CREATE_REMOVE_ERROR:
			return {
				...state,
				error: null,
			};
		case ORDER_CREATE_RESET:
			return {
				status: 'idle',
				success: null,
				order: {
					orderItems: [],
					shippingAddress: {},
					user: {},
				},
				orders: [],
				error: null,
			};
		default:
			return state;
	}
};

export const orderDetailsReducer = (
	state = { status: 'idle', success: null, order: { orderItems: [], deliveryAddress: {}, user: {} }, orders: [], error: null },
	{ type, payload }
) => {
	switch (type) {
		case ORDER_DETAILS_REQUEST:
		case ORDER_PAY_REQUEST:
		case ORDER_DELIVER_REQUEST:
			return {
				...state,
				status: 'pending',
			};
		case ORDER_DETAILS_SUCCESS:
			return {
				...state,
				order: payload,
				status: 'resolved',
			};
		case ORDER_PAY_SUCCESS:
		case ORDER_DELIVER_SUCCESS:
			return {
				...state,
				success: true,
				status: 'resolved',
			};
		case ORDER_DETAILS_FAIL:
		case ORDER_PAY_FAIL:
		case ORDER_DELIVER_FAIL:
			return {
				...state,
				error: payload,
				status: 'rejected',
			};
		case ORDER_DETAILS_REMOVE_ERROR:
		case ORDER_PAY_REMOVE_ERROR:
		case ORDER_DELIVER_REMOVE_ERROR:
			return {
				...state,
				error: null,
			};
		case ORDER_PAY_RESET:
		case ORDER_DELIVER_RESET:
			return {
				...state,
				status: 'idle',
				success: null,
				error: null,
			};
		case ORDER_DETAILS_RESET:
			return {
				status: 'idle',
				success: null,
				order: {
					orderItems: [],
					deliveryAddress: {},
					user: {},
				},
				orders: [],
				error: null,
			};
		default:
			return state;
	}
};

export const orderUserListReducer = (state = { status: 'idle', orders: [], error: null }, { type, payload }) => {
	switch (type) {
		case ORDER_USER_LIST_REQUEST:
			return {
				...state,
				status: 'pending',
			};
		case ORDER_USER_LIST_SUCCESS:
			return {
				...state,
				status: 'resolved',
				orders: payload,
			};
		case ORDER_USER_LIST_FAIL:
			return {
				...state,
				status: 'rejected',
				error: payload,
			};
		case ORDER_USER_LIST_REMOVE_ERROR:
			return {
				...state,
				error: null,
			};
		case ORDER_USER_LIST_RESET:
			return {
				status: 'idle',
				orders: [],
				error: null,
			};
		default:
			return state;
	}
};

export const orderListReducer = (
	state = { status: 'idle', success: null, order: { orderItems: [], deliveryAddress: {}, user: {} }, orders: [], error: null },
	{ type, payload }
) => {
	switch (type) {
		case ORDER_LIST_REQUEST:
			return {
				...state,
			};
		case ORDER_LIST_SUCCESS:
			return {
				...state,
				orders: payload,
			};
		case ORDER_LIST_FAIL:
			return {
				...state,
				error: payload,
			};
		case ORDER_LIST_REMOVE_ERROR:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};
