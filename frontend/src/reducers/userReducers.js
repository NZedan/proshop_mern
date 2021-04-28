import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT } from '../constants/userConstants';

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
			};
		case USER_LOGIN_FAIL:
			return {
				loading: false,
				error: payload,
			};
		case USER_LOGOUT:
			return {};
		default:
			return state;
	}
};
