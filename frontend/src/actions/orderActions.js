import axios from 'axios';
import * as OC from '../constants/orderConstants';

export const createOrder = (order) => async (dispatch, getState) => {
	try {
		dispatch({
			type: OC.ORDER_CREATE_REQUEST,
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

		const { data } = await axios.post('/api/orders', order, config);

		dispatch({
			type: OC.ORDER_CREATE_SUCCESS,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: OC.ORDER_CREATE_FAIL,
			payload: err.response && err.response.data.message ? err.response.data.message : err.message,
		});
	}
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: OC.ORDER_DETAILS_REQUEST,
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

		const { data } = await axios.get(`/api/orders/${id}`, config);

		dispatch({
			type: OC.ORDER_DETAILS_SUCCESS,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: OC.ORDER_DETAILS_FAIL,
			payload: err.response && err.response.data.message ? err.response.data.message : err.message,
		});
	}
};

export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
	try {
		dispatch({
			type: OC.ORDER_PAY_REQUEST,
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

		const { data } = await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config);

		dispatch({
			type: OC.ORDER_PAY_SUCCESS,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: OC.ORDER_PAY_FAIL,
			payload: err.response && err.response.data.message ? err.response.data.message : err.message,
		});
	}
};

export const deliverOrder = (order) => async (dispatch, getState) => {
	try {
		dispatch({
			type: OC.ORDER_DELIVER_REQUEST,
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

		const { data } = await axios.put(`/api/orders/${order._id}/deliver`, {}, config);

		dispatch({
			type: OC.ORDER_DELIVER_SUCCESS,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: OC.ORDER_DELIVER_FAIL,
			payload: err.response && err.response.data.message ? err.response.data.message : err.message,
		});
	}
};

export const orderDetailsReset = () => (dispatch) => {
	dispatch({ type: OC.ORDER_DETAILS_RESET });
};

export const listUserOrders = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: OC.ORDER_USER_LIST_REQUEST,
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

		const { data } = await axios.get('/api/orders/myorders', config);

		dispatch({
			type: OC.ORDER_USER_LIST_SUCCESS,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: OC.ORDER_USER_LIST_FAIL,
			payload: err.response && err.response.data.message ? err.response.data.message : err.message,
		});
	}
};

export const getOrders = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: OC.ORDER_LIST_REQUEST,
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

		const { data } = await axios.get('/api/orders', config);

		dispatch({
			type: OC.ORDER_LIST_SUCCESS,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: OC.ORDER_LIST_FAIL,
			payload: err.response && err.response.data.message ? err.response.data.message : err.message,
		});
	}
};
