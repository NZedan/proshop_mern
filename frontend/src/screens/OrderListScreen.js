import React, { Fragment, useEffect } from 'react';
// Moment formats date
import Moment from 'react-moment';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
// To interact with Redux state
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getOrders } from '../actions/orderActions';

const OrderListScreen = ({ history }) => {
	const dispatch = useDispatch();

	const user = useSelector((state) => state.user);
	const { userStatus } = user;

	const orderList = useSelector((state) => state.orderList);
	const { error, orders } = orderList;

	// JS international number formatter - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
	const formatter = new Intl.NumberFormat('en-UK', {
		style: 'currency',
		currency: 'GBP',
		minimumFractionDigits: 2,
	});

	useEffect(() => {
		// Check if logged in else redirect to home redirects to home on logout
		if (userStatus === 'logout') {
			history.push('/');
		} else {
			dispatch(getOrders());
		}
	}, [history, dispatch, userStatus]);

	return (
		<Fragment>
			<h1>Orders</h1>
			{!orders ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Table striped bordered responsive className='table-sm'>
					<thead>
						<tr>
							<th>ID</th>
							<th>CUSTOMER</th>
							<th>DATE</th>
							<th>ITEMS</th>
							<th>TOTAL</th>
							<th>PAID</th>
							<th>DELIVERED</th>
							<th>DETAILS</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{orders.map((order) => (
							<tr key={order._id}>
								<td>...{order._id.substring(18, 24)}</td>
								<td>{order.user && order.user.name}</td>
								<td>
									<Moment format='D/M/YY'>{order.createdAt}</Moment>
								</td>
								<td>{order.orderItems.length}</td>
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
								<td style={{ textAlign: 'center' }}>
									<LinkContainer to={`/orders/${order._id}`}>
										<Button variant='light' className='btn-sm'>
											<i className='fas fa-edit'></i>
										</Button>
									</LinkContainer>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</Fragment>
	);
};

export default OrderListScreen;
