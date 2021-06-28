import { SET_ITEMS_PER_PAGE, SET_SINGLE_PAGE, SET_MULTIPLE_PAGES } from '../constants/screenConstants';

export const itemsPerPageReducer = (state = { itemsPerPage: 10 }, { type, payload }) => {
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
		default:
			return state;
	}
};
