import axios from 'axios';
import * as PC from '../constants/productConstants';

// Keyword is the search query
export const listProducts =
	(keyword = '', pageNumber = '', itemsPerPage) =>
	async (dispatch) => {
		try {
			// Pass in optional search queries with a query string (?=a&b)
			// Data gets products, pages and page (from productController)
			const { data } = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}&itemsPerPage=${itemsPerPage}`);

			dispatch({
				type: PC.PRODUCT_LIST_SUCCESS,
				payload: data,
			});
		} catch (err) {
			dispatch({
				type: PC.PRODUCT_LIST_FAIL,
				payload: err.response && err.response.data.message ? err.response.data.message : err.message,
			});
		}
	};

export const listProductDetails = (id) => async (dispatch) => {
	try {
		const { data } = await axios.get(`/api/products/${id}`);
		dispatch({
			type: PC.PRODUCT_DETAILS_SUCCESS,
			payload: data,
		});
		dispatch({ type: PC.PRODUCT_CREATE_REVIEW_RESET });
	} catch (err) {
		dispatch({
			type: PC.PRODUCT_DETAILS_FAIL,
			payload: err.response && err.response.data.message ? err.response.data.message : err.message,
		});
	}
};

export const deleteProduct = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: PC.PRODUCT_DELETE_REQUEST,
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

		dispatch({ type: PC.PRODUCT_DELETE_SUCCESS });
	} catch (err) {
		dispatch({
			type: PC.PRODUCT_DELETE_FAIL,
			payload: err.response && err.response.data.message ? err.response.data.message : err.message,
		});
	}
};

// Creates sample product
// export const createProduct = () => async (dispatch, getState) => {
// 	try {
// 		dispatch({
// 			type: PRODUCT_CREATE_REQUEST,
// 		});

// 		// Get token from state
// 		const {
// 			userLogin: { userInfo },
// 		} = getState();

// 		// Set token to header
// 		const config = {
// 			headers: {
// 				'Content-Type': 'application/json',
// 				Authorization: `Bearer ${userInfo.token}`,
// 			},
// 		};

// 		const { data } = await axios.post('/api/products', {}, config);

// 		dispatch({
// 			type: PRODUCT_CREATE_SUCCESS,
// 			payload: data,
// 		});
// 	} catch (err) {
// 		dispatch({
// 			type: PRODUCT_CREATE_FAIL,
// 			payload: err.response && err.response.data.message ? err.response.data.message : err.message,
// 		});
// 	}
// };

export const createProduct = (product) => async (dispatch, getState) => {
	try {
		dispatch({
			type: PC.PRODUCT_CREATE_REQUEST,
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
			type: PC.PRODUCT_CREATE_SUCCESS,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: PC.PRODUCT_CREATE_FAIL,
			payload: err.response && err.response.data.message ? err.response.data.message : err.message,
		});
	}
};

export const updateProduct = (product) => async (dispatch, getState) => {
	try {
		dispatch({
			type: PC.PRODUCT_UPDATE_REQUEST,
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
			type: PC.PRODUCT_UPDATE_SUCCESS,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: PC.PRODUCT_UPDATE_FAIL,
			payload: err.response && err.response.data.message ? err.response.data.message : err.message,
		});
	}
};

export const createProductReview = (productId, review) => async (dispatch, getState) => {
	try {
		dispatch({
			type: PC.PRODUCT_CREATE_REVIEW_REQUEST,
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
			type: PC.PRODUCT_CREATE_REVIEW_SUCCESS,
		});
	} catch (err) {
		dispatch({
			type: PC.PRODUCT_CREATE_REVIEW_FAIL,
			payload: err.response && err.response.data.message ? err.response.data.message : err.message,
		});
	}
};

export const listTopProducts = () => async (dispatch) => {
	try {
		const { data } = await axios.get('/api/products/top');

		dispatch({
			type: PC.PRODUCT_TOP_SUCCESS,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: PC.PRODUCT_TOP_FAIL,
			payload: err.response && err.response.data.message ? err.response.data.message : err.message,
		});
	}
};
