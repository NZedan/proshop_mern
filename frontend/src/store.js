// Store is part of the Redux structure, applyMiddleware is for redux-thunk which allows use of async in reducers
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer, productDetailsReducer } from './reducers/productReducers';
import { basketReducer } from './reducers/basketReducers';

const reducer = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
	basket: basketReducer,
});

const basketItemsFromStorage = localStorage.getItem('basketItems')
	? JSON.parse(localStorage.getItem('basketItems'))
	: [];

const initialState = {
	basket: { basketItems: basketItemsFromStorage },
};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
