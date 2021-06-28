import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
// To interact with Redux state
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { getUserDetails, updateUser } from '../actions/userActions';
import { USER_UPDATE_RESET } from '../constants/userConstants';

const UserEditScreen = ({ match, history }) => {
	const userId = match.params.id;

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [isAdmin, setIsAdmin] = useState(false);

	const dispatch = useDispatch();

	const user = useSelector((state) => state.user);
	const { userStatus, userInfo, error } = user;

	const userUpdate = useSelector((state) => state.userUpdate);
	const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate;

	useEffect(() => {
		if (userStatus === 'logout') {
			history.push('/');
		}
		if (successUpdate) {
			dispatch({ type: USER_UPDATE_RESET });
			history.push('/admin/userlist');
		} else {
			// Sets form fields with inititial values
			if (!userInfo.name || userInfo._id !== userId) {
				dispatch(getUserDetails(userId));
			} else {
				setName(userInfo.name);
				setEmail(userInfo.email);
				setIsAdmin(userInfo.isAdmin);
			}
		}
	}, [history, userStatus, dispatch, userInfo, userId, successUpdate]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(updateUser({ _id: userId, name, email, isAdmin }));
	};

	return (
		<Fragment>
			<Link to='/admin/userlist' className='btn btn-dark my-3'>
				Go Back
			</Link>
			<FormContainer>
				<h1>Edit User</h1>
				{loadingUpdate && <Loader />}
				{errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
				{!userInfo ? (
					<Loader />
				) : error ? (
					<Message variant='danger'>{error}</Message>
				) : (
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

						<Form.Group controlId='isAdmin'>
							<Form.Check
								type='checkbox'
								label='Is Admin'
								disabled={userId === userInfo._id}
								onChange={(e) => setIsAdmin(e.target.checked)}
								checked={isAdmin}
							></Form.Check>
						</Form.Group>

						<Button type='submit' variant='primary'>
							Update
						</Button>
					</Form>
				)}
			</FormContainer>
		</Fragment>
	);
};

export default UserEditScreen;
