import * as UC from '../../constants/userConstants';

const intitialUserState = {
	userInfo: null,
	error: null,
	loading: false,
	updated: null,
};

const initialUserListState = {
	users: [],
	loading: false,
	error: null,
};

// state = initial state, destructured action into type and payload
export const userReducer = (state = intitialUserState, { type, payload }) => {
	switch (type) {
		case UC.USER_LOGIN_REQUEST:
		case UC.USER_REGISTER_REQUEST:
		case UC.USER_DETAILS_REQUEST:
		case UC.USER_UPDATE_PROFILE_REQUEST:
			return {
				...state,
				loading: true,
			};
		case UC.USER_LOGIN_SUCCESS:
		case UC.USER_REGISTER_SUCCESS:
		case UC.USER_DETAILS_SUCCESS:
			return {
				...state,
				loading: false,
				userInfo: payload,
				logout: false,
			};
		case UC.USER_LOGIN_FAIL:
		case UC.USER_REGISTER_FAIL:
		case UC.USER_UPDATE_PROFILE_FAIL:
		case UC.USER_DETAILS_FAIL:
			return {
				...state,
				loading: false,
				error: payload,
			};
		case UC.USER_LOGOUT:
			return {
				...intitialUserState,
				logout: true,
			};
		case UC.USER_LOGOUT_RESET:
			return {
				...state,
				logout: false,
			};
		default:
			return state;
	}
};

export const userListReducer = (state = initialUserListState, { type, payload }) => {
	switch (type) {
		case UC.USER_LIST_REQUEST:
			return {
				...state,
				loading: true,
			};
		case UC.USER_LIST_SUCCESS:
			return {
				...state,
				loading: false,
				users: payload,
			};
		case UC.USER_LIST_FAIL:
			return {
				...state,
				loading: false,
				error: payload,
			};
		case UC.USER_LIST_RESET:
			return {
				initialUserListState,
			};
		default:
			return state;
	}
};

export const userDeleteReducer = (state = {}, { type, payload }) => {
	switch (type) {
		case UC.USER_DELETE_REQUEST:
			return {
				...state,
				loading: true,
			};
		case UC.USER_DELETE_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
			};
		case UC.USER_DELETE_FAIL:
			return {
				...state,
				loading: false,
				error: payload,
			};
		case UC.USER_DELETE_RESET:
			return {
				...state,
				success: false,
			};
		default:
			return state;
	}
};

export const userUpdateReducer = (state = {}, { type, payload }) => {
	switch (type) {
		case UC.USER_UPDATE_REQUEST:
			return {
				...state,
				loading: true,
			};
		case UC.USER_UPDATE_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
			};
		case UC.USER_UPDATE_FAIL:
			return {
				...state,
				loading: false,
				error: payload,
			};
		case UC.USER_UPDATE_RESET:
			return {
				...state,
				success: false,
			};
		default:
			return state;
	}
};
