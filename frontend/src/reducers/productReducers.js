import {
	PRODUCT_CREATE_FAIL,
	PRODUCT_CREATE_REMOVE_ERROR,
	PRODUCT_CREATE_REQUEST,
	PRODUCT_CREATE_RESET,
	PRODUCT_CREATE_REVIEW_FAIL,
	PRODUCT_CREATE_REVIEW_REMOVE_ERROR,
	PRODUCT_CREATE_REVIEW_REQUEST,
	PRODUCT_CREATE_REVIEW_RESET,
	PRODUCT_CREATE_REVIEW_SUCCESS,
	PRODUCT_CREATE_SUCCESS,
	PRODUCT_DELETE_FAIL,
	PRODUCT_DELETE_REMOVE_ERROR,
	PRODUCT_DELETE_REQUEST,
	PRODUCT_DELETE_RESET,
	PRODUCT_DELETE_SUCCESS,
	PRODUCT_DETAILS_FAIL,
	PRODUCT_DETAILS_REMOVE_ERROR,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_LIST_FAIL,
	PRODUCT_LIST_REMOVE_ERROR,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_TOP_FAIL,
	PRODUCT_TOP_REMOVE_ERROR,
	PRODUCT_TOP_SUCCESS,
	PRODUCT_UPDATE_FAIL,
	PRODUCT_UPDATE_REMOVE_ERROR,
	PRODUCT_UPDATE_REQUEST,
	PRODUCT_UPDATE_RESET,
	PRODUCT_UPDATE_SUCCESS,
} from '../constants/productConstants';

// state = initial state, destructured action into type and payload
export const productListReducer = (state = { products: [], pages: 1, page: 1, error: null }, { type, payload }) => {
	switch (type) {
		case PRODUCT_LIST_SUCCESS:
			return {
				...state,
				// Since adding pagination, now receiving an object in response thus payload items specified
				products: payload.products,
				pages: payload.pages,
				page: payload.page,
			};
		case PRODUCT_LIST_FAIL:
			return {
				...state,
				error: payload,
			};
		case PRODUCT_LIST_REMOVE_ERROR:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};

export const productDetailsReducer = (state = { product: { reviews: [] }, error: null }, { type, payload }) => {
	switch (type) {
		case PRODUCT_DETAILS_SUCCESS:
			return {
				...state,
				product: payload,
			};
		case PRODUCT_DETAILS_FAIL:
			return {
				...state,
				error: payload,
			};
		case PRODUCT_DETAILS_REMOVE_ERROR:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};

export const productDeleteReducer = (state = { loading: false, error: null, product: {}, success: false }, { type, payload }) => {
	switch (type) {
		case PRODUCT_DELETE_REQUEST:
			return {
				...state,
				loading: true,
			};
		case PRODUCT_DELETE_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
			};
		case PRODUCT_DELETE_FAIL:
			return {
				...state,
				loading: false,
				error: payload,
			};
		case PRODUCT_DELETE_REMOVE_ERROR:
			return {
				...state,
				error: null,
			};
		case PRODUCT_DELETE_RESET:
			return {
				...state,
				loading: false,
				error: null,
				product: {},
				success: false,
			};
		default:
			return state;
	}
};

export const productCreateReducer = (state = { loading: false, error: null, product: {}, success: false }, { type, payload }) => {
	switch (type) {
		case PRODUCT_CREATE_REQUEST:
			return {
				...state,
				loading: true,
			};
		case PRODUCT_CREATE_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
				product: payload,
			};
		case PRODUCT_CREATE_FAIL:
			return {
				...state,
				loading: false,
				error: payload,
			};
		case PRODUCT_CREATE_REMOVE_ERROR:
			return {
				...state,
				error: null,
			};
		case PRODUCT_CREATE_RESET:
			return {
				...state,
				loading: false,
				error: null,
				product: {},
				success: false,
			};
		default:
			return state;
	}
};

export const productUpdateReducer = (state = { loading: false, error: null, product: {}, success: false }, { type, payload }) => {
	switch (type) {
		case PRODUCT_UPDATE_REQUEST:
			return {
				...state,
				loading: true,
			};
		case PRODUCT_UPDATE_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
				product: payload,
			};
		case PRODUCT_UPDATE_FAIL:
			return {
				...state,
				loading: false,
				error: payload,
			};
		case PRODUCT_UPDATE_REMOVE_ERROR:
			return {
				...state,
				error: null,
			};
		case PRODUCT_UPDATE_RESET:
			return {
				...state,
				loading: false,
				error: null,
				product: {},
				success: false,
			};
		default:
			return state;
	}
};

export const productCreateReviewReducer = (
	state = { loading: false, error: null, product: {}, success: false },
	{ type, payload }
) => {
	switch (type) {
		case PRODUCT_CREATE_REVIEW_REQUEST:
			return {
				...state,
				loading: true,
			};
		case PRODUCT_CREATE_REVIEW_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
			};
		case PRODUCT_CREATE_REVIEW_FAIL:
			return {
				...state,
				loading: false,
				error: payload,
			};
		case PRODUCT_CREATE_REVIEW_REMOVE_ERROR:
			return {
				...state,
				error: null,
			};
		case PRODUCT_CREATE_REVIEW_RESET:
			return {
				loading: false,
				error: null,
				product: {},
				success: false,
			};
		default:
			return state;
	}
};

export const productTopRatedReducer = (state = { products: [], error: null }, { type, payload }) => {
	switch (type) {
		case PRODUCT_TOP_SUCCESS:
			return {
				...state,
				products: payload,
			};
		case PRODUCT_TOP_FAIL:
			return {
				...state,
				error: payload,
			};
		case PRODUCT_TOP_REMOVE_ERROR:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};
