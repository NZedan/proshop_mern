import React, { Fragment, useEffect } from 'react';
// dispatch to call an action and selector to select parts of state, eg. productList from store
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { basketReset } from '../actions/basketActions';
import { orderDetailsReset } from '../actions/orderActions';
import { userLogoutReset } from '../actions/userActions';
// Now handled in reducer
// import axios from 'axios';
import { Col, Row } from 'react-bootstrap';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';

const HomeScreen = () => {
	// Now handled in reducer
	// const [products, setProducts] = useState([]);

	// useSelector makes state accessible to the component
	// Selector takes in arrow function and then selects from state, in this case productList and sets to variable productList
	const productList = useSelector((state) => state.productList);
	// Destructured to get individual elements that may be passed from productListReducer
	const { loading, error, products } = productList;

	const userLogin = useSelector((state) => state.userLogin);
	const { logout } = userLogin;

	const dispatch = useDispatch();

	useEffect(() => {
		// Now handled in reducer
		// const fetchProducts = async () => {
		// 	// Destructured variable to make data directly available rather than res.data
		// 	const { data } = await axios.get('/api/products');

		// 	setProducts(data);
		// };
		// fetchProducts();
		// * eslint-disable-next-line *
		if (logout) {
			dispatch(basketReset());
			dispatch(orderDetailsReset());
			dispatch(userLogoutReset());
		}
		dispatch(listProducts());
	}, [logout, dispatch]);

	return (
		<Fragment>
			<h1>Latest Products</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Row>
					{/* Specifies col width from breakpoint up (out of 12) */}
					{products.map((product) => (
						<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
							<Product product={product} />
						</Col>
					))}
				</Row>
			)}
		</Fragment>
	);
};

export default HomeScreen;
