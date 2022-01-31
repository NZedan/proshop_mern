import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
// To interact with Redux state
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { basketReset } from '../actions/basketActions';
import { orderDetailsReset } from '../actions/orderActions';
import { login, removeUserErrors, userLogoutReset } from '../actions/userActions';

const LoginScreen = ({ location, history }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [alert, setAlert] = useState(false);

	// This will be shipping else home
	const redirect = location.search ? location.search.split('=')[1] : '/';

	const dispatch = useDispatch();

	const user = useSelector((state) => state.user);
	const { userStatus, error } = user;

	// Redirects directly to shipping from basket checkout if user already logged in
	useEffect(() => {
		if (userStatus === 'logout') {
			dispatch(userLogoutReset(), basketReset(), orderDetailsReset());
		}
		if (userStatus === 'loggedIn') {
			history.push(redirect);
		}
	}, [dispatch, userStatus, history, redirect]);

	// Remove error message after 5 seconds
	useEffect(() => {
		if (error) {
			setAlert(true);
			setTimeout(() => {
				setAlert(false);
				dispatch(removeUserErrors());
			}, 5000);
		}
	}, [error, dispatch]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(login(email, password));
	};

	return (
		// Component that provides a styling context
		<FormContainer>
			<h1>Sign In</h1>
			{alert && <Message variant='danger'>{error}</Message>}
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
						placeholder='Enter password'
						onChange={(e) => setPassword(e.target.value)}
						value={password}
					></Form.Control>
				</Form.Group>

				<Button type='submit' variant='primary'>
					Sign In
				</Button>
			</Form>

			<Row className='py-3'>
				<Col>
					New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
				</Col>
			</Row>
		</FormContainer>
	);
};

export default LoginScreen;
