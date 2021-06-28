import * as OC from '../constants/orderConstants';

const inititalState = {
  loading: false,
  success: null,
  order: {
    orderItems: [],
    shippingAddress: {},
  },
  orders: [],
  error: null
}

export const orderCreateReducer = (state = inititalState, { type, payload }) => {
	switch (type) {
		case OC.ORDER_CREATE_REQUEST:
			return {
        ...state,
			};
		case OC.ORDER_CREATE_SUCCESS:
			return {
        ...state,
				success: true,
				order: payload,
			};
		case OC.ORDER_CREATE_FAIL:
			return {
        ...state,
				error: payload,
			};
		case OC.ORDER_CREATE_RESET:
			return {
        inititalState
      };
		default:
			return state;
	}
};

export const orderDetailsReducer = (state = inititalState, { type, payload }) => {
	switch (type) {
		case OC.ORDER_DETAILS_REQUEST:
    case OC.ORDER_PAY_REQUEST:
    case OC.ORDER_DELIVER_REQUEST:
			return {
				...state,
			};
		case OC.ORDER_DETAILS_SUCCESS:
			return {
        ...state,
				order: payload,
			};
      case OC.ORDER_PAY_SUCCESS:
      case OC.ORDER_DELIVER_SUCCESS:
			return {
        ...state,
				success: true,
			};
		case OC.ORDER_DETAILS_FAIL:
    case OC.ORDER_PAY_FAIL:
    case OC.ORDER_DELIVER_FAIL:
			return {
        ...state,
				error: payload,
			};
		case OC.ORDER_DETAILS_RESET:
    case OC.ORDER_PAY_RESET:
    case OC.ORDER_DELIVER_RESET:
			return {
				inititalState
			};
		default:
			return state;
	}
};

export const orderUserListReducer = (state = inititalState, { type, payload }) => {
	switch (type) {
		case OC.ORDER_USER_LIST_REQUEST:
			return {
        ...state,
        loading: true,
			};
		case OC.ORDER_USER_LIST_SUCCESS:
			return {
        ...state,
        loading: false,
				orders: payload,
			};
		case OC.ORDER_USER_LIST_FAIL:
			return {
        ...state,
        loading: false,
				error: payload,
			};
		case OC.ORDER_USER_LIST_RESET:
			return {
        inititalState
      };
		default:
			return state;
	}
};

export const orderListReducer = (state = inititalState, { type, payload }) => {
	switch (type) {
		case OC.ORDER_LIST_REQUEST:
			return {
        ...state,
			};
		case OC.ORDER_LIST_SUCCESS:
			return {
        ...state,
				orders: payload,
			};
		case OC.ORDER_LIST_FAIL:
			return {
        ...state,
				error: payload,
			};
		default:
			return state;
	}
};
