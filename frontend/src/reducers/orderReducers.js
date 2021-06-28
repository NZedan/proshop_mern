import * as OC from '../constants/orderConstants';

const initialState = {
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

export const orderCreateReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case OC.ORDER_CREATE_REQUEST:
			return {
				...state,
			};
		case OC.ORDER_CREATE_SUCCESS:
			return {
				...state,
				success: true,
				order: payload,
			};
		case OC.ORDER_CREATE_FAIL:
			return {
				...state,
				error: payload,
			};
		case OC.ORDER_CREATE_RESET:
			return {
				initialState,
			};
		default:
			return state;
	}
};

export const orderDetailsReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case OC.ORDER_DETAILS_REQUEST:
		case OC.ORDER_PAY_REQUEST:
		case OC.ORDER_DELIVER_REQUEST:
			return {
				...state,
			};
		case OC.ORDER_DETAILS_SUCCESS:
			return {
				...state,
				order: payload,
			};
		case OC.ORDER_PAY_SUCCESS:
		case OC.ORDER_DELIVER_SUCCESS:
			return {
				...state,
				success: true,
			};
		case OC.ORDER_DETAILS_FAIL:
		case OC.ORDER_PAY_FAIL:
		case OC.ORDER_DELIVER_FAIL:
			return {
				...state,
				error: payload,
			};
		case OC.ORDER_DETAILS_RESET:
		case OC.ORDER_PAY_RESET:
		case OC.ORDER_DELIVER_RESET:
			return {
				initialState,
			};
		default:
			return state;
	}
};

export const orderUserListReducer = (state = { status: 'idle', orders: [], error: null }, { type, payload }) => {
	switch (type) {
		case OC.ORDER_USER_LIST_REQUEST:
			return {
				...state,
				status: 'pending',
			};
		case OC.ORDER_USER_LIST_SUCCESS:
			return {
				...state,
				status: 'resolved',
				orders: payload,
			};
		case OC.ORDER_USER_LIST_FAIL:
			return {
				...state,
				status: 'rejected',
				error: payload,
			};
		case OC.ORDER_USER_LIST_RESET:
			return {
				status: 'idle',
				orders: [],
				error: null,
			};
		default:
			return state;
	}
};

export const orderListReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case OC.ORDER_LIST_REQUEST:
			return {
				...state,
			};
		case OC.ORDER_LIST_SUCCESS:
			return {
				...state,
				orders: payload,
			};
		case OC.ORDER_LIST_FAIL:
			return {
				...state,
				error: payload,
			};
		default:
			return state;
	}
};
