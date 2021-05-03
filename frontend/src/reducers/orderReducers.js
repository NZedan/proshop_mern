import {
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_CREATE_FAIL,
	ORDER_DETAILS_RESET,
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
		default:
			return state;
	}
};

export const orderDetailsReducer = (state = {}, { type }) => {
	switch (type) {
		case ORDER_DETAILS_RESET:
			return {};
		default:
			return state;
	}
};
