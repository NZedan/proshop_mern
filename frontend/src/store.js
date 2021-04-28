// Store is part of the Redux structure, applyMiddleware is for redux-thunk which allows use of async in reducers
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// Sets up Redux devtools for Chrome
import { composeWithDevTools } from 'redux-devtools-extension';
// Bring in reducers so all state can be made available through combineReducers
import { productListReducer, productDetailsReducer } from './reducers/productReducers';
import { basketReducer } from './reducers/basketReducers';
import { userLoginReducer } from './reducers/userReducers';

const reducer = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
	basket: basketReducer,
	userLogin: userLoginReducer,
});

const basketItemsFromStorage = localStorage.getItem('basketItems')
	? JSON.parse(localStorage.getItem('basketItems'))
	: [];

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const initialState = {
	basket: { basketItems: basketItemsFromStorage },
	userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
