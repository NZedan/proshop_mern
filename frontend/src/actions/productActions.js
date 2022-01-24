import axios from 'axios';
import {
	PRODUCT_CREATE_FAIL,
	PRODUCT_CREATE_REMOVE_ERROR,
	PRODUCT_CREATE_REQUEST,
	PRODUCT_CREATE_REVIEW_FAIL,
	PRODUCT_CREATE_REVIEW_REMOVE_ERROR,
	PRODUCT_CREATE_REVIEW_REQUEST,
	PRODUCT_CREATE_REVIEW_RESET,
	PRODUCT_CREATE_REVIEW_SUCCESS,
	PRODUCT_CREATE_SUCCESS,
	PRODUCT_DELETE_FAIL,
	PRODUCT_DELETE_REMOVE_ERROR,
	PRODUCT_DELETE_REQUEST,
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
	PRODUCT_UPDATE_SUCCESS,
} from '../constants/productConstants';
import { USER_UNAUTHORISED } from '../constants/userConstants';

// Keyword is the search query
export const listProducts =
	(keyword = '', pageNumber = '', itemsPerPage) =>
	async (dispatch) => {
		try {
			// Pass in optional search queries with a query string (?=a&b)
			// Data gets products, pages and page (from productController)
			const { data } = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}&itemsPerPage=${itemsPerPage}`);

			dispatch({
				type: PRODUCT_LIST_SUCCESS,
				payload: data,
			});
		} catch (err) {
			dispatch({
				type: PRODUCT_LIST_FAIL,
				payload: err.response && err.response.data.message ? err.response.data.message : err.message,
			});
		}
	};

export const listProductDetails = (id) => async (dispatch) => {
	try {
		const { data } = await axios.get(`/api/products/${id}`);
		dispatch({
			type: PRODUCT_DETAILS_SUCCESS,
			payload: data,
		});
		dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
	} catch (err) {
		dispatch({
			type: PRODUCT_DETAILS_FAIL,
			payload: err.response && err.response.data.message ? err.response.data.message : err.message,
		});
	}
};

export const deleteProduct = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: PRODUCT_DELETE_REQUEST,
		});

		// Get token from state
		const {
			user: { userInfo },
		} = getState();

		// Set token to header
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		await axios.delete(`/api/products/${id}`, config);

		dispatch({ type: PRODUCT_DELETE_SUCCESS });
	} catch (err) {
		// If status unauthorised eg. token expired, trigger logout
		if (err.response && err.response.status === 401) {
			dispatch({
				type: USER_UNAUTHORISED,
				payload: err.response && err.response.data.message ? err.response.data.message : err.message,
			});
		} else {
			dispatch({
				type: PRODUCT_DELETE_FAIL,
				payload: err.response && err.response.data.message ? err.response.data.message : err.message,
			});
		}
	}
};

export const createProduct = (product) => async (dispatch, getState) => {
	try {
		dispatch({
			type: PRODUCT_CREATE_REQUEST,
		});

		// Get token from state
		const {
			user: { userInfo },
		} = getState();

		// Set token to header
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.post('/api/products', product, config);

		dispatch({
			type: PRODUCT_CREATE_SUCCESS,
			payload: data,
		});
	} catch (err) {
		if (err.response && err.response.status === 401) {
			dispatch({
				type: USER_UNAUTHORISED,
				payload: err.response && err.response.data.message ? err.response.data.message : err.message,
			});
		} else {
			dispatch({
				type: PRODUCT_CREATE_FAIL,
				payload: err.response && err.response.data.message ? err.response.data.message : err.message,
			});
		}
	}
};

export const updateProduct = (product) => async (dispatch, getState) => {
	try {
		dispatch({
			type: PRODUCT_UPDATE_REQUEST,
		});

		// Get token from state
		const {
			user: { userInfo },
		} = getState();

		// Set token to header
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.put(`/api/products/${product._id}`, product, config);

		dispatch({
			type: PRODUCT_UPDATE_SUCCESS,
			payload: data,
		});
	} catch (err) {
		if (err.response && err.response.status === 401) {
			dispatch({
				type: USER_UNAUTHORISED,
				payload: err.response && err.response.data.message ? err.response.data.message : err.message,
			});
		} else {
			dispatch({
				type: PRODUCT_UPDATE_FAIL,
				payload: err.response && err.response.data.message ? err.response.data.message : err.message,
			});
		}
	}
};

export const createProductReview = (productId, review) => async (dispatch, getState) => {
	try {
		dispatch({
			type: PRODUCT_CREATE_REVIEW_REQUEST,
		});

		// Get token from state
		const {
			user: { userInfo },
		} = getState();

		// Set token to header
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		await axios.post(`/api/products/${productId}/reviews`, review, config);

		dispatch({
			type: PRODUCT_CREATE_REVIEW_SUCCESS,
		});
	} catch (err) {
		if (err.response && err.response.status === 401) {
			dispatch({
				type: USER_UNAUTHORISED,
				payload: err.response && err.response.data.message ? err.response.data.message : err.message,
			});
		} else {
			dispatch({
				type: PRODUCT_CREATE_REVIEW_FAIL,
				payload: err.response && err.response.data.message ? err.response.data.message : err.message,
			});
		}
	}
};

export const listTopProducts = () => async (dispatch) => {
	try {
		const { data } = await axios.get('/api/products/top');

		dispatch({
			type: PRODUCT_TOP_SUCCESS,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: PRODUCT_TOP_FAIL,
			payload: err.response && err.response.data.message ? err.response.data.message : err.message,
		});
	}
};

export const removeProductErrors = () => (dispatch) => {
	dispatch({ type: PRODUCT_LIST_REMOVE_ERROR });
	dispatch({ type: PRODUCT_DETAILS_REMOVE_ERROR });
	dispatch({ type: PRODUCT_DELETE_REMOVE_ERROR });
	dispatch({ type: PRODUCT_CREATE_REMOVE_ERROR });
	dispatch({ type: PRODUCT_UPDATE_REMOVE_ERROR });
	dispatch({ type: PRODUCT_CREATE_REVIEW_REMOVE_ERROR });
	dispatch({ type: PRODUCT_TOP_REMOVE_ERROR });
};
