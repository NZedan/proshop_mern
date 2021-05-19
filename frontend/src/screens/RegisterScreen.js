import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
// To interact with Redux state
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { register } from '../actions/userActions';

const RegisterScreen = ({ location, history }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState(null);

	// This will be shipping else home
	const redirect = location.search ? location.search.split('=')[1] : '/';

	const dispatch = useDispatch();

	const userRegister = useSelector((state) => state.userRegister);
	const { loading, error, userInfo } = userRegister;

	// Redirects directly to shipping from basket checkout if user already logged in
	useEffect(() => {
		if (userInfo) {
			history.push(redirect);
		}
	}, [history, userInfo, redirect]);

	const submitHandler = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setMessage("Passwords don't match");
		} else {
			dispatch(register(name, email, password));
		}
	};

	return (
		// Component that provides a styling context
		<FormContainer>
			<h1>Sign Up</h1>
			{message && <Message variant='danger'>{message}</Message>}
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
					Register
				</Button>
			</Form>

			<Row className='py-3'>
				<Col>
					Have an account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
				</Col>
			</Row>
		</FormContainer>
	);
};

export default RegisterScreen;
