import axios from 'axios';
import {
	BASKET_ADD_ITEM,
	BASKET_REMOVE_ITEM,
	BASKET_RESET,
	BASKET_SAVE_PAYMENT_METHOD,
	BASKET_SAVE_DELIVERY_ADDRESS,
	BASKET_ADD_ORDER,
} from '../constants/basketConstants';

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
	// For production this data should be encrypted
	localStorage.setItem('basketItems', JSON.stringify(getState().basket.basketItems));
};

export const removeFromBasket = (id) => (dispatch, getState) => {
	dispatch({
		type: BASKET_REMOVE_ITEM,
		payload: id,
	});
	// For production this data should be encrypted
	localStorage.setItem('basketItems', JSON.stringify(getState().basket.basketItems));
};

export const saveDeliveryAddress = (data) => (dispatch) => {
	dispatch({
		type: BASKET_SAVE_DELIVERY_ADDRESS,
		payload: data,
	});
	// For production this data should be encrypted
	localStorage.setItem('deliveryAddress', JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
	dispatch({
		type: BASKET_SAVE_PAYMENT_METHOD,
		payload: data,
	});
	// For production this data should be encrypted
	localStorage.setItem('paymentMethod', JSON.stringify(data));
};

export const addOrderToBasket = (order) => (dispatch, getState) => {
	dispatch({
		type: BASKET_ADD_ORDER,
		payload: order,
	});
	// For production this data should be encrypted
	localStorage.setItem('basketItems', JSON.stringify(getState().basket.basketItems));
};

export const basketReset = () => (dispatch) => {
	dispatch({ type: BASKET_RESET });
	localStorage.removeItem('basketItems');
};
