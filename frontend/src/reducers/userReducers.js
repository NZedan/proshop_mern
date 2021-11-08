import {
	USER_DELETE_FAIL,
	USER_DELETE_REQUEST,
	USER_DELETE_RESET,
	USER_DELETE_SUCCESS,
	USER_DETAILS_FAIL,
	USER_DETAILS_REQUEST,
	USER_DETAILS_RESET,
	USER_DETAILS_SUCCESS,
	USER_EDIT_DETAILS,
	USER_EDIT_RESET,
	USER_LIST_FAIL,
	USER_LIST_REQUEST,
	USER_LIST_RESET,
	USER_LIST_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGOUT,
	USER_LOGOUT_RESET,
	USER_REFRESH_FAIL,
	USER_REFRESH_REQUEST,
	USER_REFRESH_SUCCESS,
	USER_REGISTER_FAIL,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_UPDATE_FAIL,
	USER_UPDATE_PROFILE_FAIL,
	USER_UPDATE_PROFILE_REQUEST,
	USER_UPDATE_REQUEST,
	USER_UPDATE_RESET,
	USER_UPDATE_SUCCESS,
} from '../constants/userConstants';

// state = initial state, destructured action into type and payload
export const userReducer = (
	state = { userInfo: {}, error: null, loading: false, updated: null, userStatus: 'guest' },
	{ type, payload }
) => {
	switch (type) {
		case USER_LOGIN_REQUEST:
		case USER_REGISTER_REQUEST:
		case USER_REFRESH_REQUEST:
		case USER_DETAILS_REQUEST:
		case USER_UPDATE_PROFILE_REQUEST:
			return {
				...state,
				loading: true,
			};
		case USER_LOGIN_SUCCESS:
		case USER_REGISTER_SUCCESS:
		case USER_REFRESH_SUCCESS:
		case USER_DETAILS_SUCCESS:
			return {
				...state,
				loading: false,
				userInfo: payload,
				userStatus: 'loggedIn',
				error: null,
			};
		case USER_LOGIN_FAIL:
		case USER_REGISTER_FAIL:
		case USER_REFRESH_FAIL:
		case USER_UPDATE_PROFILE_FAIL:
		case USER_DETAILS_FAIL:
			return {
				...state,
				loading: false,
				error: payload,
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
				userStatus: 'logout',
			};
		default:
			return state;
	}
};

export const userEditReducer = (state = { editUserInfo: {} }, { type, payload }) => {
	switch (type) {
		case USER_EDIT_DETAILS:
			return {
				...state,
				editUserInfo: payload,
			};
		case USER_EDIT_RESET:
			return {
				...state,
				editUserInfo: {},
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
