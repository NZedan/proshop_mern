import * as UC from '../constants/userConstants';

const initialUserListState = {
	users: [],
	loading: false,
	error: null,
};

const initialUserEditState = {
	loading: false,
	success: null,
	error: null,
};

// state = initial state, destructured action into type and payload
export const userReducer = (
	state = { userInfo: {}, error: null, loading: false, updated: null, userStatus: 'guest' },
	{ type, payload }
) => {
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
				userStatus: 'loggedIn',
				error: null,
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
		case UC.USER_DETAILS_RESET:
		case UC.USER_LOGOUT_RESET:
			return {
				userInfo: {},
				error: null,
				loading: false,
				updated: null,
				userStatus: 'guest',
			};
		case UC.USER_LOGOUT:
			return {
				...state,
				userStatus: 'logout',
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
			};
		case UC.USER_LIST_SUCCESS:
			return {
				...state,
				users: payload,
			};
		case UC.USER_LIST_FAIL:
			return {
				...state,
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

export const userDeleteReducer = (state = initialUserEditState, { type, payload }) => {
	switch (type) {
		case UC.USER_DELETE_REQUEST:
			return {
				...state,
			};
		case UC.USER_DELETE_SUCCESS:
			return {
				...state,
				success: true,
			};
		case UC.USER_DELETE_FAIL:
			return {
				...state,
				error: payload,
			};
		case UC.USER_DELETE_RESET:
			return {
				...state,
				initialUserEditState,
			};
		default:
			return state;
	}
};

export const userUpdateReducer = (state = initialUserEditState, { type, payload }) => {
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
				initialUserEditState,
			};
		default:
			return state;
	}
};
