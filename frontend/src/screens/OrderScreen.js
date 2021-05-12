import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
// Moment formats date
import Moment from 'react-moment';
import { PayPalButton } from 'react-paypal-button-v2';
import { Link } from 'react-router-dom';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
// To interact with Redux state
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getOrderDetails, payOrder } from '../actions/orderActions';
import { ORDER_PAY_RESET } from '../constants/orderConstants';

const OrderScreen = ({ history, match }) => {
	const orderId = match.params.id;

	// PayPal SDK
	const [sdkReady, setSdkReady] = useState(false);

	const dispatch = useDispatch();

	// True if user logs out
	const userLogin = useSelector((state) => state.userLogin);
	const { logout } = userLogin;

	const orderDetails = useSelector((state) => state.orderDetails);
	const { order, loading, error } = orderDetails;

	// Syntax to rename destructured state to avoid duplicates
	const orderPay = useSelector((state) => state.orderPay);
	const { loading: loadingPay, success: successPay } = orderPay;

	// JS international number formatter - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
	const formatter = new Intl.NumberFormat('en-UK', {
		style: 'currency',
		currency: 'GBP',
		minimumFractionDigits: 2,
	});

	// Calculate Prices
	if (!loading) {
		order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0);
	}

	// Dynamically build and insert PayPal SDK script
	const addPayPalScript = async () => {
		const { data: clientId } = await axios.get('/api/config/paypal');
		// (Vanilla JavaScript)
		const script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
		script.async = true;
		// State true when script loaded
		script.onload = () => {
			setSdkReady(true);
		};
		// Adds script to document body
		document.body.appendChild(script);
	};

	useEffect(() => {
		// Redirects to home on logout
		if (logout) {
			history.push('/');
		}
	}, [logout, history]);

	useEffect(() => {
		// Gets order details if no order, order id's don't match (if coming from a different order page) or after a successful payment
		if (!order || order._id !== orderId || successPay) {
			dispatch({ type: ORDER_PAY_RESET });
			dispatch(getOrderDetails(orderId));
		} else if (!order.isPaid) {
			// If the order is not paid and the PayPal script is not in the document
			// The Window interface represents a window containing a DOM document - https://developer.mozilla.org/en-US/docs/Web/API/Window
			if (!window.paypal) {
				addPayPalScript();
			} else {
				setSdkReady(true);
			}
		}
	}, [dispatch, order, orderId, successPay]);

	const successPaymentHandler = (paymentResult) => {
		console.log(paymentResult);
		dispatch(payOrder(orderId, paymentResult));
	};

	return loading ? (
		<Loader />
	) : loadingPay ? (
		<Row className='justify-content-md-center'>
			<Message variant='secondary'>Processing Payment</Message>
		</Row>
	) : error ? (
		<Message variant='danger'>{error}</Message>
	) : (
		<Fragment>
			<h2>Order {order._id}</h2>
			<Row className='justify-content-md-center'>
				<Col lg={8}>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h2>Order Items</h2>
							{order.orderItems.length === 0 ? (
								<Message>Order is empty</Message>
							) : (
								<ListGroup variant='flush'>
									{order.orderItems.map((item) => (
										<ListGroup.Item key={item.productId}>
											<Row>
												<Col md={3}>
													<Image src={item.image} alt={item.name} fluid rounded />
												</Col>
												<Col>
													<Link to={`/product/${item.productId}`}>{item.name}</Link>
												</Col>
												<Col md={4}>
													{item.qty} x {formatter.format(item.price)} = {formatter.format(item.qty * item.price)}
												</Col>
											</Row>
										</ListGroup.Item>
									))}
								</ListGroup>
							)}
						</ListGroup.Item>
					</ListGroup>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h2>Shipping Details</h2>
							<p>
								<strong>Name: </strong> {order.user.name}
							</p>
							<p>
								<strong>Email: </strong>
								<a href={`mailto:${order.user.email}`}>{order.user.email}</a>
							</p>
							<p>
								<strong>Address:</strong>
							</p>
							<p>{order.shippingAddress.address}</p>
							<p>{order.shippingAddress.city}</p>
							<p>{order.shippingAddress.postCode}</p>
							<p>{order.shippingAddress.country}</p>
							{order.isDelivered ? (
								<Message variant='success'>Delivered on {order.deliveredOn}</Message>
							) : (
								<Message variant='danger'>Not Delivered</Message>
							)}
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Payment</h2>
							<p>Payment Method: {order.paymentMethod}</p>
							{order.isPaid ? (
								<Message variant='success'>
									Paid at <Moment format='h:mm:ss a, MMMM do YYYY'>{order.paidAt}</Moment>
								</Message>
							) : (
								<Message variant='danger'>Not paid</Message>
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
									<Col>{formatter.format(order.itemsPrice)}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Shipping</Col>
									<Col>{formatter.format(order.shippingPrice)}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Includes tax of</Col>
									<Col>{formatter.format(order.taxPrice)}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Total</Col>
									<Col>{formatter.format(order.totalPrice)}</Col>
								</Row>
							</ListGroup.Item>
							{!order.isPaid && (
								<ListGroup.Item>
									{loadingPay && <Loader />}
									{sdkReady ? <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} /> : <Loader />}
								</ListGroup.Item>
							)}
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</Fragment>
	);
};

export default OrderScreen;