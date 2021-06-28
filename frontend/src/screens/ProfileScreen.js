import React, { useState, useEffect } from 'react';
// Moment formats date
import Moment from 'react-moment';
import { Table, Form, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
// To interact with Redux state
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { listUserOrders } from '../actions/orderActions';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

const ProfileScreen = ({ history }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState(null);

	const dispatch = useDispatch();
	// Is only filled if user logged in, logout true if user logs out
	const user = useSelector((state) => state.user);
	const { userInfo, userStatus, loading, success, error } = user;

	const orderUserList = useSelector((state) => state.orderUserList);
	const { status, error: errorOrders, orders } = orderUserList;

	// JS international number formatter - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
	const formatter = new Intl.NumberFormat('en-UK', {
		style: 'currency',
		currency: 'GBP',
		minimumFractionDigits: 2,
	});

	useEffect(() => {
		// Check if logged in else redirect to home redirects to home on logout
		if (!userInfo || userStatus === 'logout') {
			history.push('/');
		} else {
			// If logged in check for user, if no user get user
			if (!userInfo.name || success) {
				// Clears any previous user data from state
				dispatch({ type: USER_UPDATE_PROFILE_RESET });
				// Gets the current user details
				dispatch(getUserDetails('profile'));
			} else {
				// If logged in with user details, fill form fields (if password updated clears fields afterwards)
				setName(userInfo.name);
				setEmail(userInfo.email);
				setPassword('');
				setConfirmPassword('');
			}
		}
	}, [userStatus, history, dispatch, userInfo, success]);

	useEffect(() => {
		if (status === 'idle') {
			dispatch(listUserOrders());
		}
	}, [status, dispatch]);

	const submitHandler = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setMessage("Passwords don't match");
		} else {
			// Had * id: user._id * passed in, don't think it's necessary?
			dispatch(updateUserProfile({ name, email, password }));
		}
	};

	return (
		<Row>
			<Col xl={8}>
				<h2>My Orders</h2>
				{status === 'pending' ? (
					<Loader />
				) : errorOrders ? (
					<Message variant='danger'>{errorOrders}</Message>
				) : status === 'resolved' && orders.length > 0 ? (
					<Table striped bordered hover responsive className='table-sm'>
						<thead>
							<tr>
								<th>ORDER ID</th>
								<th>DATE</th>
								<th>TOTAL</th>
								<th>PAID</th>
								<th>DELIVERED</th>
								<th>DETAILS</th>
							</tr>
						</thead>
						<tbody>
							{orders.map((order) => (
								<tr key={order._id}>
									<td>{order._id}</td>
									<td>
										<Moment format='D/M/YY'>{order.createdAt}</Moment>
									</td>
									<td>{formatter.format(order.totalPrice)}</td>
									<td>
										{order.isPaid ? (
											<Moment format='D/M/YY'>{order.paidAt}</Moment>
										) : (
											<i className='fas fa-times' style={{ color: 'red' }}></i>
										)}
									</td>
									<td>
										{order.isDelivered ? (
											<Moment format='D/M/YY'>{order.deliveredAt}</Moment>
										) : (
											<i className='fas fa-times' style={{ color: 'red' }}></i>
										)}
									</td>
									<td>
										<LinkContainer to={`/orders/${order._id}`}>
											<Button className='btn-sm' variant='link'>
												Details
											</Button>
										</LinkContainer>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				) : (
					<Message>You have no previous orders</Message>
				)}
			</Col>
			<Col lg={4}>
				<h2>User Profile</h2>
				{/* Messages should have a timeout */}
				{message && <Message variant='danger'>{message}</Message>}
				{success && <Message variant='success'>Profile Updated</Message>}
				{error && <Message variant='danger'>{error}</Message>}
				{loading && <Loader />}

				<Form onSubmit={submitHandler}>
					<Form.Group controlId='name'>
						<Form.Label>Name</Form.Label>
						<Form.Control
							type='text'
							placeholder='Enter Name'
							onChange={(e) => setName(e.target.value)}
							value={name}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId='email'>
						<Form.Label>Email Address</Form.Label>
						<Form.Control
							type='email'
							placeholder='Enter Email'
							onChange={(e) => setEmail(e.target.value)}
							value={email}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId='password'>
						<Form.Label>Password</Form.Label>
						<Form.Control
							type='password'
							placeholder='Enter Password'
							onChange={(e) => setPassword(e.target.value)}
							value={password}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId='confirm-password'>
						<Form.Label>Confirm Password</Form.Label>
						<Form.Control
							type='password'
							placeholder='Confirm Password'
							onChange={(e) => setConfirmPassword(e.target.value)}
							value={confirmPassword}
						></Form.Control>
					</Form.Group>

					<Button type='submit' variant='primary'>
						Update
					</Button>
				</Form>
			</Col>
		</Row>
	);
};

export default ProfileScreen;
