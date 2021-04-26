import axios from 'axios';
import { BASKET_ADD_ITEM } from '../constants/basketConstants';

// getState makes all state available to the action
export const addToBasket = (id, qty) => async (dispatch, getState) => {
	const { data } = await axios.get(`/api/products/${id}`);

	dispatch({
		type: BASKET_ADD_ITEM,
		payload: {
			productId: data._id,
			name: data.name,
			image: data.image,
			price: data.price,
			countInStock: data.countInStock,
			qty,
		},
	});

	// Saves basketItems to local storage, local storage only takes strings so JSON object is stringified
	localStorage.setItem('basketItems', JSON.stringify(getState().basket.basketItems));
};
