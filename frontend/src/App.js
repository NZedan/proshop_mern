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
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';

const App = () => {
	return (
		<Router>
			<Header />
			<main className='py-3'>
				<Container>
					<Route path='/login' component={LoginScreen} />
					<Route path='/register' component={RegisterScreen} />
					<Route path='/profile' component={ProfileScreen} />
					<Route path='/product/:id' component={ProductScreen} />
					{/* the question mark denotes the placeholder as optional as /basket route can be accessed without an id */}
					<Route path='/basket/:id?' component={BasketScreen} />
					<Route exact path='/' component={HomeScreen} />
					<Route exact path='/shipping' component={ShippingScreen} />
					<Route exact path='/payment' component={PaymentScreen} />
					<Route exact path='/placeorder' component={PlaceOrderScreen} />
					<Route path='/orders/:id' component={OrderScreen} />
					<Route path='/admin/userlist' component={UserListScreen} />
				</Container>
			</main>
			<Footer />
		</Router>
	);
};

export default App;
