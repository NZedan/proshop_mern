import { SET_ITEMS_PER_PAGE, SET_SINGLE_PAGE, SET_MULTIPLE_PAGES, RESET_ITEMS_PER_PAGE } from '../constants/screenConstants';

export const itemsPerPageReducer = (state = { itemsPerPage: 10, singlePage: true }, { type, payload }) => {
	switch (type) {
		case SET_ITEMS_PER_PAGE:
			return {
				...state,
				itemsPerPage: payload,
			};
		case SET_SINGLE_PAGE:
			return {
				...state,
				singlePage: true,
			};
		case SET_MULTIPLE_PAGES:
			return {
				...state,
				singlePage: false,
			};
		case RESET_ITEMS_PER_PAGE:
			return {
				itemsPerPage: 10,
				singlePage: true,
			};
		default:
			return state;
	}
};
