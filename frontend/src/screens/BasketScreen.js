import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, ListGroupItem, Image, Form, Button, Card } from 'react-bootstrap';
import Message from '../components/Message';
import { addToBasket, removeFromBasket } from '../actions/basketActions';

// match, location and history are from react-router and give access to the route attributes like URL
const BasketScreen = ({ match, location, history }) => {
	// If the basket screen is reached with an id and quantity in the URL then
	// the add to basket action will be fired, otherwise just the basket will be shown
	const productId = match.params.id;

	// Make items in state available to component
	const basket = useSelector((state) => state.basket);
	const { basketItems } = basket;
	// True if user logs out
	const user = useSelector((state) => state.user);
	const { userStatus } = user;

	const dispatch = useDispatch();

	// No longer required, addToBasket dispatched in productScreen
	// Search query (?qty=x) (added in productScreen addToBasketHandler)
	// Accessed with location.search returns ?qty=x
	// split('=') returns array [?qty, x] so the query is accessed at array position 1
	// const qty = location.search ? Number(location.search.split('=')[1]) : 1;

	// JS international number formatter - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
	const formatter = new Intl.NumberFormat('en-UK', {
		style: 'currency',
		currency: 'GBP',
		minimumFractionDigits: 2,
	});

	// If route accessed from product screen (URL contains productId) add product to basket
	useEffect(() => {
		// Redirects to home on logout
		if (userStatus === 'logout') {
			history.push('/');
		}
		// Now handled in productScreen
		// if (productId) {
		// 	dispatch(addToBasket(productId, qty));
		// }
	}, [userStatus, history, dispatch, productId]);

	// Items in basket
	const items = basketItems.reduce((acc, item) => acc + item.qty, 0);

	const removeFromBasketHandler = (id) => {
		dispatch(removeFromBasket(id));
	};

	const continueShoppingHandler = () => {
		history.push('/');
	};

	const checkoutHandler = () => {
		// Redirects to login, if logged in useEffect in LoginScreen sees userInfo and redirects to shipping
		history.push('/login?redirect=delivery');
	};

	return (
		<Row className='justify-content-md-center'>
			<Col lg={10}>
				<h1>Shopping Basket</h1>
				{basketItems.length === 0 ? (
					<Message>
						Your basket is empty <Link to='/'>Go Back</Link>
					</Message>
				) : (
					<ListGroup variant='flush'>
						{basketItems.map((item) => (
							<ListGroupItem key={item.productId}>
								<Row>
									<Col sm={6}>
										<Image src={item.image} alt={item.name} fluid rounded />
									</Col>
									<Col md={3}>
										<Link to={`/product/${item.productId}`}>{item.name}</Link>
									</Col>
									<Col md={2}>{formatter.format(item.price)}</Col>
									<Col lg={3}>
										<Form.Control
											className='qty-selector'
											as='select'
											value={item.qty}
											onChange={(e) => dispatch(addToBasket(item.productId, Number(e.target.value)))}
										>
											{/* Spread operator with array constructor taking in the countInStock value then taking the key of that
                          item and mapping it ++ to give a list from 1 up */}
											{[...Array(item.countInStock).keys()].map((key) => (
												<option key={key + 1} value={key + 1}>
													{key + 1}
												</option>
											))}
										</Form.Control>
									</Col>
									<Col lg={3}>
										<Button
											type='button'
											variant='light'
											className='remove-item'
											onClick={() => removeFromBasketHandler(item.productId)}
										>
											<i className='fas fa-trash'></i>
											&nbsp;Remove Item
										</Button>
									</Col>
								</Row>
							</ListGroupItem>
						))}
					</ListGroup>
				)}
			</Col>
			<Col lg={10}>
				<Card>
					<ListGroup variant='flush'>
						<ListGroupItem>
							<h2>
								Subtotal ({items}) {items === 0 || items > 1 ? ' items' : ' item'}
							</h2>
							{formatter.format(basketItems.reduce((acc, item) => acc + item.qty * item.price, 0))}
						</ListGroupItem>
						<ListGroupItem>
							<Button type='button' className='btn-block btn-light' onClick={continueShoppingHandler}>
								Continue Shopping
							</Button>
						</ListGroupItem>
						<ListGroupItem>
							<Button type='button' className='btn-block' disabled={basketItems.length === 0} onClick={checkoutHandler}>
								Proceed to Checkout
							</Button>
						</ListGroupItem>
					</ListGroup>
				</Card>
			</Col>
		</Row>
	);
};

export default BasketScreen;
