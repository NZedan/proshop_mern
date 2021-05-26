import axios from 'axios';
import {
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_CREATE_FAIL,
	ORDER_DETAILS_REQUEST,
	ORDER_DETAILS_SUCCESS,
	ORDER_DETAILS_FAIL,
	ORDER_DETAILS_RESET,
	ORDER_PAY_REQUEST,
	ORDER_PAY_SUCCESS,
	ORDER_PAY_FAIL,
	ORDER_USER_LIST_REQUEST,
	ORDER_USER_LIST_SUCCESS,
	ORDER_USER_LIST_FAIL,
	ORDER_LIST_REQUEST,
	ORDER_LIST_SUCCESS,
	ORDER_LIST_FAIL,
	ORDER_DELIVER_REQUEST,
	ORDER_DELIVER_SUCCESS,
	ORDER_DELIVER_FAIL,
} from '../constants/orderConstants';

export const createOrder = (order) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_CREATE_REQUEST,
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

		const { data } = await axios.post('/api/orders', order, config);

		dispatch({
			type: ORDER_CREATE_SUCCESS,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: ORDER_CREATE_FAIL,
			payload: err.response && err.response.data.message ? err.response.data.message : err.message,
		});
	}
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_DETAILS_REQUEST,
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

		const { data } = await axios.get(`/api/orders/${id}`, config);

		dispatch({
			type: ORDER_DETAILS_SUCCESS,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: ORDER_DETAILS_FAIL,
			payload: err.response && err.response.data.message ? err.response.data.message : err.message,
		});
	}
};

export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_PAY_REQUEST,
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

		const { data } = await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config);

		dispatch({
			type: ORDER_PAY_SUCCESS,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: ORDER_PAY_FAIL,
			payload: err.response && err.response.data.message ? err.response.data.message : err.message,
		});
	}
};

export const deliverOrder = (order) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_DELIVER_REQUEST,
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

		const { data } = await axios.put(`/api/orders/${order._id}/deliver`, {}, config);

		dispatch({
			type: ORDER_DELIVER_SUCCESS,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: ORDER_DELIVER_FAIL,
			payload: err.response && err.response.data.message ? err.response.data.message : err.message,
		});
	}
};

export const orderDetailsReset = () => (dispatch) => {
	dispatch({ type: ORDER_DETAILS_RESET });
};

export const listUserOrders = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_USER_LIST_REQUEST,
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

		const { data } = await axios.get('/api/orders/myorders', config);

		dispatch({
			type: ORDER_USER_LIST_SUCCESS,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: ORDER_USER_LIST_FAIL,
			payload: err.response && err.response.data.message ? err.response.data.message : err.message,
		});
	}
};

export const getOrders = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_LIST_REQUEST,
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

		const { data } = await axios.get('/api/orders', config);

		dispatch({
			type: ORDER_LIST_SUCCESS,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: ORDER_LIST_FAIL,
			payload: err.response && err.response.data.message ? err.response.data.message : err.message,
		});
	}
};
