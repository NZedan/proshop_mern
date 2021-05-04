import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
// To interact with Redux state
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../actions/orderActions';

const PlaceOrderScreen = ({ history }) => {
	// True if user logs out
	const userLogin = useSelector((state) => state.userLogin);
	const { logout } = userLogin;

	const orderCreate = useSelector((state) => state.orderCreate);
	const { order, success, error } = orderCreate;

	const basket = useSelector((state) => state.basket);
	const { basketItems, shippingAddress } = basket;

	const dispatch = useDispatch();

	useEffect(() => {
		// Redirects to home on logout
		if (logout) {
			history.push('/');
		}
		// Redirects to order payment screen if createOrder succesful
		if (success) {
			history.push(`/order/${order._id}`);
		}
	}, [logout, history, success, order]);

	// JS international number formatter - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
	const formatter = new Intl.NumberFormat('en-UK', {
		style: 'currency',
		currency: 'GBP',
		minimumFractionDigits: 2,
	});
	// // Using Intl.formatter instead, also generates £
	// // Ensures number is to 2 decimal places even when ending in 0
	// const addDecimals = (num) => {
	// 	return (Math.round(num * 100) / 100).toFixed(2);
	// };
	// basket.itemsPrice = addDecimals(basketItems.reduce((acc, item) => acc + item.price * item.qty, 0));
	// Calculate Prices
	basket.itemsPrice = basketItems.reduce((acc, item) => acc + item.price * item.qty, 0);
	basket.shippingPrice = basket.itemsPrice > 100 ? 'Free' : formatter.format(10);
	basket.taxPrice = Number((basket.itemsPrice - basket.itemsPrice / 1.2).toFixed(2));
	basket.totalPrice = Number(basket.itemsPrice) > 100 ? Number(basket.itemsPrice) : Number(basket.itemsPrice) + 10;

	const placeOrderHandler = () => {
		// SECURITY ISSUE
		// Should send only productId's and qty's and calculate prices in backend to avoid user sending false info
		// eg. totalPrice: 0.01
		let shipping;
		if (basket.shippingPrice === 'Free') {
			shipping = Number((0).toFixed(2));
		} else {
			shipping = Number(10);
		}

		dispatch(
			createOrder({
				orderItems: basketItems,
				shippingAddress,
				paymentMethod: basket.paymentMethod,
				shippingPrice: shipping,
				taxPrice: basket.taxPrice,
				totalPrice: basket.totalPrice,
			})
		);
	};

	return (
		<Fragment>
			<CheckoutSteps step1 step2 step3 step4 />
			<Row className='justify-content-md-center'>
				<Col lg={8}>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h2>Shipping</h2>
							<p>
								<strong>Address:</strong>
							</p>
							<p>{shippingAddress.address}</p>
							<p>{shippingAddress.city}</p>
							<p>{shippingAddress.postCode}</p>
							<p>{shippingAddress.country}</p>
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Items In Basket</h2>
							{basketItems.length === 0 ? (
								<Message>Your basket is empty</Message>
							) : (
								<ListGroup variant='flush'>
									{basketItems.map((item) => (
										<ListGroup.Item key={item.productId}>
											<Row>
												<Col md={3}>
													<Image src={item.image} alt={item.name} fluid rounded />
												</Col>
												<Col>
													<Link to={`/product/${item.productId}`}>{item.name}</Link>
												</Col>
												<Col md={4}>
													{item.qty} x £{item.price} = £{item.qty * item.price}
												</Col>
											</Row>
										</ListGroup.Item>
									))}
								</ListGroup>
							)}
						</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col lg={4}>
					<Card>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<h2>Order Summary</h2>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Items</Col>
									<Col>{formatter.format(basket.itemsPrice)}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Shipping</Col>
									<Col>
										{/* {basket.shippingPrice === addDecimals(10) ? '£' : ''} */}
										{basket.shippingPrice}
									</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Includes tax of</Col>
									<Col>{formatter.format(basket.taxPrice)}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Total</Col>
									<Col>{formatter.format(basket.totalPrice)}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Payment Method</Col>
									<Col>{basket.paymentMethod}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>{error && <Message variant='danger'>{error}</Message>}</ListGroup.Item>
							<ListGroup.Item>
								<Button
									type='button'
									className='btn-block'
									disabled={basketItems.length === 0}
									onClick={placeOrderHandler}
								>
									Place Order
								</Button>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</Fragment>
	);
};

export default PlaceOrderScreen;
