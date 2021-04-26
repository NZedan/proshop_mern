import {
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_LIST_FAIL,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DETAILS_FAIL,
} from '../constants/productConstants';

// state = initial state, destructured action into type and payload
export const productListReducer = (state = { products: [] }, { type, payload }) => {
	switch (type) {
		case PRODUCT_LIST_REQUEST:
			return {
				loading: true,
				products: [],
			};
		case PRODUCT_LIST_SUCCESS:
			return {
				loading: false,
				products: payload,
			};
		case PRODUCT_LIST_FAIL:
			return {
				loading: false,
				error: payload,
			};
		default:
			return state;
	}
};

export const productDetailsReducer = (state = { product: { reviews: [] } }, { type, payload }) => {
	switch (type) {
		case PRODUCT_DETAILS_REQUEST:
			return {
				loading: true,
				...state,
			};
		case PRODUCT_DETAILS_SUCCESS:
			return {
				loading: false,
				product: payload,
			};
		case PRODUCT_DETAILS_FAIL:
			return {
				loading: false,
				error: payload,
			};
		default:
			return state;
	}
};
