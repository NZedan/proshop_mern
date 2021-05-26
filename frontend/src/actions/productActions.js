import axios from 'axios';
import {
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_LIST_FAIL,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DETAILS_FAIL,
	PRODUCT_DELETE_REQUEST,
	PRODUCT_DELETE_SUCCESS,
	PRODUCT_DELETE_FAIL,
	PRODUCT_CREATE_REQUEST,
	PRODUCT_CREATE_SUCCESS,
	PRODUCT_CREATE_FAIL,
	PRODUCT_UPDATE_REQUEST,
	PRODUCT_UPDATE_SUCCESS,
	PRODUCT_UPDATE_FAIL,
} from '../constants/productConstants';

export const listProducts = () => async (dispatch) => {
	try {
		dispatch({ type: PRODUCT_LIST_REQUEST });
		const { data } = await axios.get('/api/products');
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
		dispatch({ type: PRODUCT_DETAILS_REQUEST });
		const { data } = await axios.get(`/api/products/${id}`);
		dispatch({
			type: PRODUCT_DETAILS_SUCCESS,
			payload: data,
		});
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
			userLogin: { userInfo },
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
		dispatch({
			type: PRODUCT_DELETE_FAIL,
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
			type: PRODUCT_CREATE_REQUEST,
		});

		// Get token from state
		const {
			userLogin: { userInfo },
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
		dispatch({
			type: PRODUCT_CREATE_FAIL,
			payload: err.response && err.response.data.message ? err.response.data.message : err.message,
		});
	}
};

export const updateProduct = (product) => async (dispatch, getState) => {
	try {
		dispatch({
			type: PRODUCT_UPDATE_REQUEST,
		});

		// Get token from state
		const {
			userLogin: { userInfo },
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
		dispatch({
			type: PRODUCT_UPDATE_FAIL,
			payload: err.response && err.response.data.message ? err.response.data.message : err.message,
		});
	}
};
