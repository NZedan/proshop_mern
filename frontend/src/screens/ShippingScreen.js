import React, { Fragment, useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
// To interact with Redux state
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { saveShippingAddress } from '../actions/basketActions';

const ShippingScreen = ({ history }) => {
	// True if user logs out
	const user = useSelector((state) => state.user);
	const { userStatus } = user;
	const basket = useSelector((state) => state.basket);
	const { shippingAddress } = basket;

	useEffect(() => {
		// Redirects to home on logout
		if (userStatus === 'logout') {
			history.push('/');
		}
	}, [userStatus, history]);

	// Provides a default state to keep the element 'controlled'
	const [address, setAddress] = useState(shippingAddress.address || '');
	const [city, setCity] = useState(shippingAddress.city || '');
	const [postCode, setPostCode] = useState(shippingAddress.postCode || '');
	const [country, setCountry] = useState(shippingAddress.country || '');

	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(saveShippingAddress({ address, city, postCode, country }));
		history.push('/payment');
	};

	// Check out form validation - https://react-bootstrap.github.io/components/forms/#forms-validation

	return (
		<Fragment>
			<CheckoutSteps step1 step2 />
			<FormContainer>
				<h1>Shipping</h1>
				<Form onSubmit={submitHandler}>
					<Form.Group controlId='address'>
						<Form.Label>Address</Form.Label>
						<Form.Control
							type='text'
							placeholder='Enter Address'
							onChange={(e) => setAddress(e.target.value)}
							value={address}
							required
						></Form.Control>
					</Form.Group>

					<Form.Group controlId='city'>
						<Form.Label>City</Form.Label>
						<Form.Control
							type='text'
							placeholder='Enter City'
							onChange={(e) => setCity(e.target.value)}
							value={city}
							required
						></Form.Control>
					</Form.Group>

					<Form.Group controlId='postCode'>
						<Form.Label>Post Code</Form.Label>
						<Form.Control
							type='text'
							placeholder='Enter Post Code'
							onChange={(e) => setPostCode(e.target.value)}
							value={postCode}
							required
						></Form.Control>
					</Form.Group>

					<Form.Group controlId='country'>
						<Form.Label>Country</Form.Label>
						<Form.Control
							type='text'
							placeholder='Enter Country'
							onChange={(e) => setCountry(e.target.value)}
							value={country}
							required
						></Form.Control>
					</Form.Group>

					<Button type='submit' variant='primary'>
						Continue
					</Button>
				</Form>
			</FormContainer>
		</Fragment>
	);
};

export default ShippingScreen;
