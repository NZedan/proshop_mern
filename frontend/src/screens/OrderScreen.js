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
import { deliverOrder, getOrderDetails, payOrder, removeOrderErrors } from '../actions/orderActions';
import { ORDER_DELIVER_RESET, ORDER_PAY_RESET } from '../constants/orderConstants';
import { addOrderToBasket, basketReset } from '../actions/basketActions';

const OrderScreen = ({ history, match }) => {
	const orderId = match.params.id;

	// PayPal SDK
	const [sdkReady, setSdkReady] = useState(false);
	const [alert, setAlert] = useState(false);

	const dispatch = useDispatch();

	const user = useSelector((state) => state.user);
	const { userStatus, userInfo } = user;

	const orderDetails = useSelector((state) => state.orderDetails);
	const { order, success, error, status } = orderDetails;

	// JS international number formatter - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
	const formatter = new Intl.NumberFormat('en-UK', {
		style: 'currency',
		currency: 'GBP',
		minimumFractionDigits: 2,
	});

	// Calculate Prices
	if (order) {
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
		if (userStatus === 'logout') {
			history.push('/');
		}
	}, [userStatus, history]);

	useEffect(() => {
		// Clears basket after successful payment
		if (success) {
			dispatch(basketReset());
		}
	}, [dispatch, success]);

	// Remove error message after 5 seconds
	useEffect(() => {
		if (error) {
			setAlert(true);
			setTimeout(() => {
				setAlert(false);
				dispatch(removeOrderErrors());
			}, 5000);
		}
	}, [error, dispatch]);

	// Refreshes order details so deleted order can't be paid
	// Order marked as deleted at 0.99 hrs so still possibility of paying a deleted order (36 seconds)!!!
	useEffect(() => {
		setTimeout(() => {
			dispatch(getOrderDetails(orderId));
		}, 1000 * 60 * 60);
		dispatch(basketReset());
	}, [dispatch, orderId]);

	useEffect(() => {
		// Gets order details if no order, order id's don't match (if coming from a different order page) or after a successful payment
		if (!order || order._id !== orderId || success) {
			if (status === 'idle' || status === 'resolved') {
				dispatch({ type: ORDER_PAY_RESET });
				dispatch({ type: ORDER_DELIVER_RESET });
				dispatch(getOrderDetails(orderId));
			}
		} else if (!order.isPaid) {
			// If the order is not paid and the PayPal script is not in the document
			// The Window interface represents a window containing a DOM document - https://developer.mozilla.org/en-US/docs/Web/API/Window
			if (!window.paypal) {
				addPayPalScript();
			} else {
				setSdkReady(true);
			}
		}
	}, [dispatch, order, orderId, success, status]);

	const successPaymentHandler = (paymentResult) => {
		console.log(paymentResult);
		dispatch(payOrder(orderId, paymentResult));
	};

	const deliverHandler = () => {
		dispatch(deliverOrder(order));
	};

	const reOrderHandler = () => {
		dispatch(addOrderToBasket(order.orderItems));
	};

	return !order ? (
		<Loader />
	) : alert ? (
		<Message variant='danger'>{error}</Message>
	) : order.isDeleted ? (
		<Message variant='danger'>
			{order.message}.{' '}
			<Link to='/basket' onClick={reOrderHandler}>
				Click to Re-order.
			</Link>
		</Message>
	) : (
		<Fragment>
			{!userInfo.isAdmin && (
				<Link to='/profile' className='btn btn-light my-3'>
					Go Back
				</Link>
			)}
			<h2 className='order-screen-title'>Order {order._id}</h2>
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
							<h2>Delivery Details</h2>
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
							<p>{order.deliveryAddress.address}</p>
							<p>{order.deliveryAddress.city}</p>
							<p>{order.deliveryAddress.postCode}</p>
							<p>{order.deliveryAddress.country}</p>
							{order.isDelivered ? (
								<Message variant='success'>
									Delivered at <Moment format='h:mm:ss a, MMMM Do YYYY'>{order.deliveredAt}</Moment>
								</Message>
							) : (
								<Message variant='danger'>Not Delivered</Message>
							)}
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Payment</h2>
							<p>Payment Method: {order.paymentMethod}</p>
							{order.isPaid ? (
								<Message variant='success'>
									Paid at <Moment format='h:mm:ss a, MMMM Do YYYY'>{order.paidAt}</Moment>
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
									<Col>Delivery</Col>
									<Col>{!order.deliveryPrice ? 'Free' : formatter.format(order.deliveryPrice)}</Col>
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
									{sdkReady ? <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} /> : <Loader />}
								</ListGroup.Item>
							)}
							{userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
								<ListGroup.Item>
									<Button type='button' className='btn btn-block' onClick={deliverHandler}>
										Mark As Delivered
									</Button>
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
