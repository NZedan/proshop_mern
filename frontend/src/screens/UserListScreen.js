import React, { Fragment, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
// To interact with Redux state
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listUsers, deleteUser } from '../actions/userActions';
import { USER_DELETE_RESET } from '../constants/userConstants';

const UserListScreen = ({ history }) => {
	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { logout, userInfo } = userLogin;

	const userList = useSelector((state) => state.userList);
	const { loading, error, users } = userList;

	const userDelete = useSelector((state) => state.userDelete);
	const { success } = userDelete;

	useEffect(() => {
		// Check if logged in else redirect to home redirects to home on logout
		if (logout) {
			history.push('/');
		} else {
			dispatch(listUsers());
		}
		if (success) {
			dispatch({ type: USER_DELETE_RESET });
		}
	}, [history, dispatch, logout, success]);

	// Best practice would be to set a deleted flag in DB instead of permanently removing the record
	const deleteHandler = (id) => {
		if (window.confirm('Are you sure?')) {
			dispatch(deleteUser(id));
		}
	};

	return (
		<Fragment>
			<h1>Users</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Table striped bordered responsive className='table-sm'>
					<thead>
						<tr>
							<th>ID</th>
							<th>NAME</th>
							<th>EMAIL</th>
							<th>ADMIN</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{users.map((user) => (
							<tr key={user._id}>
								<td>{user._id}</td>
								<td>{user.name}</td>
								<td>
									<a href={`mailto:${user.email}`}>{user.email}</a>
								</td>
								<td>
									{user.isAdmin ? (
										<i className='fas fa-check' style={{ color: 'green' }}></i>
									) : (
										<i className='fas fa-times' style={{ color: 'red' }}></i>
									)}
								</td>
								<td style={{ textAlign: 'center' }}>
									<LinkContainer to={`/admin/users/${user._id}/edit`}>
										<Button variant='light' className='btn-sm'>
											<i className='fas fa-edit'></i>
										</Button>
									</LinkContainer>
									<Button
										variant='danger'
										className='btn-sm'
										disabled={userInfo._id === user._id}
										onClick={() => deleteHandler(user._id)}
									>
										<i className='fas fa-trash'></i>
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</Fragment>
	);
};

export default UserListScreen;
