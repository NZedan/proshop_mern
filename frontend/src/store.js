// Store is part of the Redux structure, applyMiddleware is for redux-thunk which allows use of async in reducers
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// Sets up Redux devtools for Chrome
import { composeWithDevTools } from 'redux-devtools-extension';
// Bring in reducers so all state can be made available through combineReducers
import {
	productListReducer,
	productDetailsReducer,
	productDeleteReducer,
	productCreateReducer,
	productUpdateReducer,
} from './reducers/productReducers';
import { basketReducer } from './reducers/basketReducers';
import {
	userLoginReducer,
	userRegisterReducer,
	userDetailsReducer,
	userUpdateProfileReducer,
	userListReducer,
	userDeleteReducer,
	userUpdateReducer,
} from './reducers/userReducers';
import {
	orderCreateReducer,
	orderDetailsReducer,
	orderPayReducer,
	orderDeliverReducer,
	orderUserListReducer,
	orderListReducer,
} from './reducers/orderReducers';

const reducer = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
	productDelete: productDeleteReducer,
	productCreate: productCreateReducer,
	productUpdate: productUpdateReducer,
	basket: basketReducer,
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userDetails: userDetailsReducer,
	userUpdateProfile: userUpdateProfileReducer,
	userList: userListReducer,
	userDelete: userDeleteReducer,
	userUpdate: userUpdateReducer,
	orderCreate: orderCreateReducer,
	orderDetails: orderDetailsReducer,
	orderPay: orderPayReducer,
	orderDeliver: orderDeliverReducer,
	orderUserList: orderUserListReducer,
	orderList: orderListReducer,
});

// Possibly create middleware for encrypting and storing/retrieving from local storage

const basketItemsFromStorage = localStorage.getItem('basketItems') ? JSON.parse(localStorage.getItem('basketItems')) : [];

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
	? JSON.parse(localStorage.getItem('shippingAddress'))
	: {};

const paymentMethodFromStorage = localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')) : null;

const initialState = {
	basket: {
		basketItems: basketItemsFromStorage,
		shippingAddress: shippingAddressFromStorage,
		paymentMethod: paymentMethodFromStorage,
	},
	userLogin: { userInfo: userInfoFromStorage, logout: false },
	userUpdateProfile: { success: false },
	orderDetails: { loading: true, error: null, order: { orderItems: [], shippingAddress: {} }, success: false },
};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
