import * as PC from '../constants/productConstants';

const intitialState = {
	loading: false,
	error: null,
	product: {},
	success: false,
};

// state = initial state, destructured action into type and payload
export const productListReducer = (state = { products: [], pages: 1, page: 1, error: null }, { type, payload }) => {
	switch (type) {
		case PC.PRODUCT_LIST_SUCCESS:
			return {
				...state,
				// Since adding pagination, now receiving an object in response thus payload items specified
				products: payload.products,
				pages: payload.pages,
				page: payload.page,
			};
		case PC.PRODUCT_LIST_FAIL:
			return {
				...state,
				error: payload,
			};
		default:
			return state;
	}
};

export const productDetailsReducer = (state = { product: { reviews: [] }, error: null }, { type, payload }) => {
	switch (type) {
		case PC.PRODUCT_DETAILS_SUCCESS:
			return {
				...state,
				product: payload,
			};
		case PC.PRODUCT_DETAILS_FAIL:
			return {
				...state,
				error: payload,
			};
		default:
			return state;
	}
};

export const productDeleteReducer = (state = intitialState, { type, payload }) => {
	switch (type) {
		case PC.PRODUCT_DELETE_REQUEST:
			return {
				...state,
				loading: true,
			};
		case PC.PRODUCT_DELETE_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
			};
		case PC.PRODUCT_DELETE_FAIL:
			return {
				...state,
				loading: false,
				error: payload,
			};
		case PC.PRODUCT_DELETE_RESET:
			return {
				...state,
				intitialState,
			};
		default:
			return state;
	}
};

export const productCreateReducer = (state = intitialState, { type, payload }) => {
	switch (type) {
		case PC.PRODUCT_CREATE_REQUEST:
			return {
				...state,
				loading: true,
			};
		case PC.PRODUCT_CREATE_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
				product: payload,
			};
		case PC.PRODUCT_CREATE_FAIL:
			return {
				...state,
				loading: false,
				error: payload,
			};
		case PC.PRODUCT_CREATE_RESET:
			return {
				...state,
				intitialState,
			};
		default:
			return state;
	}
};

export const productUpdateReducer = (state = intitialState, { type, payload }) => {
	switch (type) {
		case PC.PRODUCT_UPDATE_REQUEST:
			return {
				...state,
				loading: true,
			};
		case PC.PRODUCT_UPDATE_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
				product: payload,
			};
		case PC.PRODUCT_UPDATE_FAIL:
			return {
				...state,
				loading: false,
				error: payload,
			};
		case PC.PRODUCT_UPDATE_RESET:
			return {
				...state,
				intitialState,
			};
		default:
			return state;
	}
};

export const productCreateReviewReducer = (state = intitialState, { type, payload }) => {
	switch (type) {
		case PC.PRODUCT_CREATE_REVIEW_REQUEST:
			return {
				...state,
				loading: true,
			};
		case PC.PRODUCT_CREATE_REVIEW_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
			};
		case PC.PRODUCT_CREATE_REVIEW_FAIL:
			return {
				...state,
				loading: false,
				error: payload,
			};
		case PC.PRODUCT_CREATE_REVIEW_RESET:
			return {
				intitialState,
			};
		default:
			return state;
	}
};

export const productTopRatedReducer = (state = {products: [], error: null},  { type, payload }) => {
	switch (type) {
		case PC.PRODUCT_TOP_SUCCESS:
			return {
				...state,
				products: payload,
			};
		case PC.PRODUCT_TOP_FAIL:
			return {
				...state,
				error: payload,
			};
		default:
			return state;
	}
};
