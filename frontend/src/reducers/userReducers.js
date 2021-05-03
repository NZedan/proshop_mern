import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGOUT,
	USER_LOGOUT_RESET,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAIL,
	USER_DETAILS_REQUEST,
	USER_DETAILS_SUCCESS,
	USER_DETAILS_FAIL,
	USER_DETAILS_RESET,
	USER_UPDATE_PROFILE_RESET,
	USER_UPDATE_PROFILE_REQUEST,
	USER_UPDATE_PROFILE_SUCCESS,
	USER_UPDATE_PROFILE_FAIL,
} from '../constants/userConstants';

// state = initial state, destructured action into type and payload
export const userLoginReducer = (state = {}, { type, payload }) => {
	switch (type) {
		case USER_LOGIN_REQUEST:
			return {
				loading: true,
			};
		case USER_LOGIN_SUCCESS:
			return {
				loading: false,
				userInfo: payload,
				logout: false,
			};
		case USER_LOGIN_FAIL:
			return {
				loading: false,
				error: payload,
			};
		case USER_LOGOUT:
			return {
				logout: true,
			};
		case USER_LOGOUT_RESET:
			return {
				logout: false,
			};
		default:
			return state;
	}
};

export const userRegisterReducer = (state = {}, { type, payload }) => {
	switch (type) {
		case USER_REGISTER_REQUEST:
			return {
				loading: true,
			};
		case USER_REGISTER_SUCCESS:
			return {
				loading: false,
				userInfo: payload,
				logout: false,
			};
		case USER_REGISTER_FAIL:
			return {
				loading: false,
				error: payload,
			};
		default:
			return state;
	}
};

export const userDetailsReducer = (state = { user: {} }, { type, payload }) => {
	switch (type) {
		case USER_DETAILS_REQUEST:
			return {
				...state,
				loading: true,
			};
		case USER_DETAILS_SUCCESS:
			return {
				loading: false,
				user: payload,
			};
		case USER_DETAILS_FAIL:
			return {
				loading: false,
				error: payload,
			};
		case USER_DETAILS_RESET:
			return {};
		default:
			return state;
	}
};

export const userUpdateProfileReducer = (state = {}, { type, payload }) => {
	switch (type) {
		case USER_UPDATE_PROFILE_REQUEST:
			return {
				loading: true,
			};
		case USER_UPDATE_PROFILE_SUCCESS:
			return {
				loading: false,
				success: true,
				userInfo: payload,
			};
		case USER_UPDATE_PROFILE_FAIL:
			return {
				loading: false,
				error: payload,
			};
		case USER_UPDATE_PROFILE_RESET:
			return {};
		default:
			return state;
	}
};
