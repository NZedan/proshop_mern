import { SET_ITEMS_PER_PAGE } from '../constants/screenConstants';

export const setItemsPerPage = (value) => (dispatch) => {
	dispatch({ type: SET_ITEMS_PER_PAGE, payload: value });
};
