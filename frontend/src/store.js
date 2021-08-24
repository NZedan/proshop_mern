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
	productCreateReviewReducer,
	productTopRatedReducer,
} from './reducers/productReducers';
import { basketReducer } from './reducers/basketReducers';
import { userReducer, userListReducer, userDeleteReducer, userUpdateReducer, userEditReducer } from './reducers/userReducers';
import { orderCreateReducer, orderDetailsReducer, orderUserListReducer, orderListReducer } from './reducers/orderReducers';
import { itemsPerPageReducer } from './reducers/screenReducers';

const reducer = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
	productDelete: productDeleteReducer,
	productCreate: productCreateReducer,
	productUpdate: productUpdateReducer,
	productCreateReview: productCreateReviewReducer,
	productTopRated: productTopRatedReducer,
	basket: basketReducer,
	user: userReducer,
	userList: userListReducer,
	userEdit: userEditReducer,
	userDelete: userDeleteReducer,
	userUpdate: userUpdateReducer,
	orderCreate: orderCreateReducer,
	orderDetails: orderDetailsReducer,
	orderUserList: orderUserListReducer,
	orderList: orderListReducer,
	itemsPerPage: itemsPerPageReducer,
});

// Possibly create middleware for encrypting and storing/retrieving from local storage

const basketItemsFromStorage = localStorage.getItem('basketItems') ? JSON.parse(localStorage.getItem('basketItems')) : [];

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {};

const userStatusFromStorage = localStorage.getItem('userStatus') && localStorage.getItem('userStatus');

const deliveryAddressFromStorage = localStorage.getItem('deliveryAddress')
	? JSON.parse(localStorage.getItem('deliveryAddress'))
	: {};

const paymentMethodFromStorage = localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')) : null;

const initialState = {
	basket: {
		basketItems: basketItemsFromStorage,
		deliveryAddress: deliveryAddressFromStorage,
		paymentMethod: paymentMethodFromStorage,
	},
	user: { userInfo: userInfoFromStorage, error: null, loading: false, updated: null, userStatus: userStatusFromStorage },
	// userUpdateProfile: { success: false },
	// orderDetails: { loading: true, error: null, order: { orderItems: [], shippingAddress: {} }, success: false },
};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
