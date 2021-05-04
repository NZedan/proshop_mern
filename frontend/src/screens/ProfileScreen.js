import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
// To interact with Redux state
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

const ProfileScreen = ({ history }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState(null);

	const dispatch = useDispatch();
	// Is only filled if user logged in, logout true if user logs out
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo, logout } = userLogin;
	// Only used here? Could use userLogin instead?
	const userDetails = useSelector((state) => state.userDetails);
	const { loading, user } = userDetails;
	// Doesn't require seperate state?
	const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
	const { success, error } = userUpdateProfile;

	useEffect(() => {
		// Check if logged in else redirect to home redirects to home on logout
		if (!userInfo || logout) {
			history.push('/');
		} else {
			// If logged in check for user, if no user get user
			if (!user || !user.name) {
				// Clears any previous user data from state
				dispatch({ type: USER_UPDATE_PROFILE_RESET });
				// Gets the current user details
				dispatch(getUserDetails('profile'));
			} else {
				// If logged in with user details, fill form fields (if password updated clears fields afterwards)
				setName(user.name);
				setEmail(user.email);
				setPassword('');
				setConfirmPassword('');
			}
		}
	}, [logout, history, dispatch, userInfo, user, success]);

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
			<Col lg={8}>
				<h2>My Orders</h2>
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
