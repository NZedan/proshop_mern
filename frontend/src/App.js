import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import BasketScreen from './screens/BasketScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import DeliveryScreen from './screens/DeliveryScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import ProductCreateScreen from './screens/ProductCreateScreen';
import OrderListScreen from './screens/OrderListScreen';

const App = () => {
	return (
		<Router>
			<Header />
			<main className='py-3'>
				<Container>
					<Route exact path='/' component={HomeScreen} />
					<Route exact path='/search/:keyword' component={HomeScreen} />
					{/* Routes for pagination (must use exact or will render duplicate screens on one page) */}
					<Route exact path='/page/:pageNumber/:itemsPerPage' component={HomeScreen} />
					<Route exact path='/search/:keyword/page/:pageNumber/:itemsPerPage' component={HomeScreen} />
					<Route exact path='/admin/productlist/:pageNumber/:itemsPerPage' component={ProductListScreen} />

					<Route path='/login' component={LoginScreen} />
					<Route path='/register' component={RegisterScreen} />
					<Route path='/profile' component={ProfileScreen} />
					<Route path='/product/:id' component={ProductScreen} />
					{/* the question mark denotes the placeholder as optional as /basket route can be accessed without an id */}
					<Route path='/basket/:id?' component={BasketScreen} />
					<Route exact path='/delivery' component={DeliveryScreen} />
					<Route exact path='/payment' component={PaymentScreen} />
					<Route exact path='/placeorder' component={PlaceOrderScreen} />
					<Route path='/orders/:id' component={OrderScreen} />
					<Route path='/admin/userlist' component={UserListScreen} />
					<Route path='/admin/users/:id/edit' component={UserEditScreen} />
					<Route exact path='/admin/productlist' component={ProductListScreen} />
					<Route path='/admin/products/newproduct' component={ProductCreateScreen} />
					<Route path='/admin/products/:id/edit' component={ProductEditScreen} />
					<Route path='/admin/orderlist' component={OrderListScreen} />
				</Container>
			</main>
			<Footer />
		</Router>
	);
};

export default App;
