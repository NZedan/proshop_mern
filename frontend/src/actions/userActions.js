import axios from 'axios';
import { ORDER_USER_LIST_RESET } from '../constants/orderConstants';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';
import * as UC from '../constants/userConstants';

export const login = (email, password) => async (dispatch) => {
	try {
		dispatch({
			type: UC.USER_LOGIN_REQUEST,
		});

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const { data } = await axios.post('/api/users/login', { email, password }, config);

		dispatch({
			type: UC.USER_LOGIN_SUCCESS,
			payload: data,
		});

		localStorage.setItem('userInfo', JSON.stringify(data));
	} catch (err) {
		dispatch({
			type: UC.USER_LOGIN_FAIL,
			payload: err.response && err.response.data.message ? err.response.data.message : err.message,
		});
	}
};

export const logout = () => (dispatch) => {
	localStorage.clear();
	dispatch({ type: UC.USER_LOGOUT });
	dispatch({ type: ORDER_USER_LIST_RESET });
	dispatch({ type: UC.USER_LIST_RESET });
	dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
};

export const userLogoutReset = () => (dispatch) => {
	dispatch({ type: UC.USER_LOGOUT_RESET });
};

export const register = (name, email, password) => async (dispatch) => {
	try {
		dispatch({
			type: UC.USER_REGISTER_REQUEST,
		});

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const { data } = await axios.post('/api/users', { name, email, password }, config);

		dispatch({
			type: UC.USER_REGISTER_SUCCESS,
			payload: data,
		});

		dispatch({
			type: UC.USER_LOGIN_SUCCESS,
			payload: data,
		});

		localStorage.setItem('userInfo', JSON.stringify(data));
	} catch (err) {
		dispatch({
			type: UC.USER_REGISTER_FAIL,
			payload: err.response && err.response.data.message ? err.response.data.message : err.message,
		});
	}
};

export const getUserDetails = (idOrProfile) => async (dispatch, getState) => {
	try {
		dispatch({
			type: UC.USER_DETAILS_REQUEST,
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

		// Hits users/id or users/profile endpoints
		const { data } = await axios.get(`/api/users/${idOrProfile}`, config);

		dispatch({
			type: UC.USER_DETAILS_SUCCESS,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: UC.USER_DETAILS_FAIL,
			payload: err.response && err.response.data.message ? err.response.data.message : err.message,
		});
	}
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
	try {
		dispatch({
			type: UC.USER_UPDATE_PROFILE_REQUEST,
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

		const { data } = await axios.put('/api/users/profile', user, config);
		// Sets success and outputs errors for updateProfile messages
		dispatch({
			type: UC.USER_UPDATE_PROFILE_SUCCESS,
			payload: data,
		});
		// Only necessary to keep user details consistent
		dispatch({
			type: UC.USER_LOGIN_SUCCESS,
			payload: data,
		});
		// Used to fill form fields and set loading, could easily be refactored into single state
		dispatch({
			type: UC.USER_DETAILS_SUCCESS,
			payload: data,
		});

		localStorage.setItem('userInfo', JSON.stringify(data));
	} catch (err) {
		dispatch({
			type: UC.USER_UPDATE_PROFILE_FAIL,
			payload: err.response && err.response.data.message ? err.response.data.message : err.message,
		});
	}
};

export const listUsers = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: UC.USER_LIST_REQUEST,
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

		const { data } = await axios.get('/api/users', config);

		dispatch({
			type: UC.USER_LIST_SUCCESS,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: UC.USER_LIST_FAIL,
			payload: err.response && err.response.data.message ? err.response.data.message : err.message,
		});
	}
};

export const deleteUser = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: UC.USER_DELETE_REQUEST,
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

		await axios.delete(`/api/users/${id}`, config);

		dispatch({ type: UC.USER_DELETE_SUCCESS });
	} catch (err) {
		dispatch({
			type: UC.USER_DELETE_FAIL,
			payload: err.response && err.response.data.message ? err.response.data.message : err.message,
		});
	}
};

export const updateUser = (user) => async (dispatch, getState) => {
	try {
		dispatch({
			type: UC.USER_UPDATE_REQUEST,
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

		const { data } = await axios.put(`/api/users/${user._id}`, user, config);

		dispatch({ type: UC.USER_UPDATE_SUCCESS });
		dispatch({ type: UC.USER_DETAILS_SUCCESS, payload: data });
	} catch (err) {
		dispatch({
			type: UC.USER_UPDATE_FAIL,
			payload: err.response && err.response.data.message ? err.response.data.message : err.message,
		});
	}
};
