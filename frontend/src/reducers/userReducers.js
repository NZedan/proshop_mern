import {
	USER_DELETE_FAIL,
	USER_DELETE_REMOVE_ERROR,
	USER_DELETE_REQUEST,
	USER_DELETE_RESET,
	USER_DELETE_SUCCESS,
	USER_DETAILS_FAIL,
	USER_DETAILS_REMOVE_ERROR,
	USER_DETAILS_REQUEST,
	USER_DETAILS_RESET,
	USER_DETAILS_SUCCESS,
	USER_LIST_FAIL,
	USER_LIST_REMOVE_ERROR,
	USER_LIST_REQUEST,
	USER_LIST_RESET,
	USER_LIST_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGIN_REMOVE_ERROR,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGOUT,
	USER_LOGOUT_RESET,
	USER_REGISTER_FAIL,
	USER_REGISTER_REMOVE_ERROR,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_UPDATE_PROFILE_FAIL,
	USER_UPDATE_PROFILE_REMOVE_ERROR,
	USER_UPDATE_PROFILE_REQUEST,
	USER_UPDATE_REMOVE_ERROR,
	USER_UPDATE_REQUEST,
	USER_UPDATE_SUCCESS,
	USER_UPDATE_FAIL,
	USER_UPDATE_RESET,
	USER_UNAUTHORISED,
	USER_UPDATE_PROFILE_SUCCESS,
	USER_UPDATE_PROFILE_RESET,
} from '../constants/userConstants';

// state = initial state, destructured action into type and payload
export const userReducer = (
	state = { userInfo: {}, error: null, loading: false, updated: null, userStatus: 'guest', success: false },
	{ type, payload }
) => {
	switch (type) {
		case USER_LOGIN_REQUEST:
		case USER_REGISTER_REQUEST:
		case USER_DETAILS_REQUEST:
		case USER_UPDATE_PROFILE_REQUEST:
			return {
				...state,
				loading: true,
			};
		case USER_LOGIN_SUCCESS:
		case USER_REGISTER_SUCCESS:
		case USER_DETAILS_SUCCESS:
			return {
				...state,
				loading: false,
				userInfo: payload,
				userStatus: 'loggedIn',
				error: null,
			};
		case USER_UPDATE_PROFILE_SUCCESS:
			return {
				...state,
				success: true,
			};
		case USER_LOGIN_FAIL:
		case USER_REGISTER_FAIL:
		case USER_UPDATE_PROFILE_FAIL:
		case USER_DETAILS_FAIL:
			return {
				...state,
				loading: false,
				error: payload,
			};
		case USER_LOGIN_REMOVE_ERROR:
		case USER_REGISTER_REMOVE_ERROR:
		case USER_UPDATE_PROFILE_REMOVE_ERROR:
		case USER_DETAILS_REMOVE_ERROR:
			return {
				...state,
				error: null,
			};
		case USER_UPDATE_PROFILE_RESET:
			return {
				...state,
				success: false,
			};
		case USER_DETAILS_RESET:
		case USER_LOGOUT_RESET:
			return {
				userInfo: {},
				error: null,
				loading: false,
				updated: null,
				userStatus: 'guest',
			};
		case USER_LOGOUT:
			return {
				...state,
				loading: false,
				userStatus: 'logout',
			};
		case USER_UNAUTHORISED:
			return {
				...state,
				loading: false,
				error: payload,
				userStatus: 'unauthorised',
			};
		default:
			return state;
	}
};

export const userListReducer = (state = { users: [], loading: false, error: null }, { type, payload }) => {
	switch (type) {
		case USER_LIST_REQUEST:
			return {
				...state,
			};
		case USER_LIST_SUCCESS:
			return {
				...state,
				users: payload,
			};
		case USER_LIST_FAIL:
			return {
				...state,
				error: payload,
			};
		case USER_LIST_REMOVE_ERROR:
			return {
				...state,
				error: null,
			};
		case USER_LIST_RESET:
			return {
				users: [],
				loading: false,
				error: null,
			};
		default:
			return state;
	}
};

export const userDeleteReducer = (state = { loading: false, success: null, error: null }, { type, payload }) => {
	switch (type) {
		case USER_DELETE_REQUEST:
			return {
				...state,
			};
		case USER_DELETE_SUCCESS:
			return {
				...state,
				success: true,
			};
		case USER_DELETE_FAIL:
			return {
				...state,
				error: payload,
			};
		case USER_DELETE_REMOVE_ERROR:
			return {
				...state,
				error: null,
			};
		case USER_DELETE_RESET:
			return {
				...state,
				loading: false,
				success: null,
				error: null,
			};
		default:
			return state;
	}
};

export const userUpdateReducer = (state = { loading: false, success: null, error: null }, { type, payload }) => {
	switch (type) {
		case USER_UPDATE_REQUEST:
			return {
				...state,
				loading: true,
			};
		case USER_UPDATE_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
			};
		case USER_UPDATE_FAIL:
			return {
				...state,
				loading: false,
				error: payload,
			};
		case USER_UPDATE_REMOVE_ERROR:
			return {
				...state,
				error: null,
			};
		case USER_UPDATE_RESET:
			return {
				...state,
				loading: false,
				success: null,
				error: null,
			};
		default:
			return state;
	}
};
