import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
// To interact with Redux state
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails } from '../actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

const ProfileScreen = ({ history }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState(null);

	const dispatch = useDispatch();

	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(() => {
		// Check if logged in else redirect to login
		if (!userInfo) {
			history.push('/login');
		} else {
			// If logged in check for user, if no user get user
			if (!user || !user.name) {
				dispatch({ type: USER_UPDATE_PROFILE_RESET });
				dispatch(getUserDetails('profile'));
			} else {
				// If logged in with user details, fill form fields
				setName(user.name);
				setEmail(user.email);
			}
		}
	}, [history, dispatch, userInfo, user]);

	const submitHandler = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setMessage("Passwords don't match");
		} else {
			// DISPATCH UPDATE PROFILE
		}
	};

	return (
		<Row>
			<Col lg={8}>
				<h2>My Orders</h2>
			</Col>
			<Col lg={4}>
				<h2>User Profile</h2>
				{message && <Message variant='danger'>{message}</Message>}
				{error && <Message variant='danger'>{error}</Message>}
				{loading && <Loader />}

				<Form.Group controlId='name'>
					<Form.Label>Name</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter Name'
						onChange={(e) => setName(e.target.value)}
						value={name}
					></Form.Control>
				</Form.Group>

				<Form onSubmit={submitHandler}>
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
