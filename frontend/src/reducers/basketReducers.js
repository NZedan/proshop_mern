import { BASKET_ADD_ITEM, BASKET_REMOVE_ITEM } from '../constants/basketConstants';

export const basketReducer = (state = { basketItems: [] }, { type, payload }) => {
	switch (type) {
		case BASKET_ADD_ITEM:
			const addedItem = payload;

			const foundItem = state.basketItems.find((basketItem) => basketItem.productId === addedItem.productId);

			if (foundItem) {
				return {
					...state,
					basketItems: state.basketItems.map((basketItem) =>
						basketItem.productId === foundItem.productId ? addedItem : basketItem
					),
				};
			} else {
				return {
					...state,
					basketItems: [...state.basketItems, addedItem],
				};
			}
		case BASKET_REMOVE_ITEM:
			return {
				...state,
				basketItems: state.basketItems.filter((item) => item.productId !== payload),
			};
		default:
			return state;
	}
};
