import React, { Fragment, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
// To interact with Redux state
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { deleteProduct, listProducts } from '../actions/productActions';
import { PRODUCT_DELETE_RESET } from '../constants/productConstants';

const ProductListScreen = ({ history, match }) => {
	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { logout, userInfo } = userLogin;

	const productList = useSelector((state) => state.productList);
	const { loading, error, products } = productList;

	const productDelete = useSelector((state) => state.productDelete);
	const { loading: loadingDelete, error: errorDelete, success } = productDelete;

	// JS international number formatter - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
	const formatter = new Intl.NumberFormat('en-UK', {
		style: 'currency',
		currency: 'GBP',
		minimumFractionDigits: 2,
	});

	useEffect(() => {
		// Check if logged in else redirect to home redirects to home on logout
		if (logout) {
			history.push('/');
		} else {
			dispatch(listProducts());
		}
		if (success) {
			dispatch({ type: PRODUCT_DELETE_RESET });
		}
	}, [history, dispatch, logout, success]);

	// Best practice would be to set a deleted flag in DB instead of permanently removing the record
	const deleteHandler = (id) => {
		if (window.confirm('Are you sure?')) {
			dispatch(deleteProduct(id));
		}
	};

	return (
		<Fragment>
			<Row className='align-items-center'>
				<Col>
					<h1>Products</h1>
				</Col>
				<Col className='text-right'>
					<LinkContainer to={'/admin/products/newproduct'}>
						<Button className='my-3'>
							<i className='fas fa-plus'></i> Create Product
						</Button>
					</LinkContainer>
				</Col>
			</Row>
			{loadingDelete && <Loader />}
			{errorDelete && <Message variant='danger'>{errorDelete}</Message>}
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
							<th>PRICE</th>
							<th>CATEGORY</th>
							<th>BRAND</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{products.map((product) => (
							<tr key={product._id}>
								<td>{product._id}</td>
								<td>{product.name}</td>
								<td>{formatter.format(product.price)}</td>
								<td>{product.category}</td>
								<td>{product.brand}</td>
								<td style={{ textAlign: 'center' }}>
									<LinkContainer to={`/admin/products/${product._id}/edit`}>
										<Button variant='light' className='btn-sm'>
											<i className='fas fa-edit'></i>
										</Button>
									</LinkContainer>
									<Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}>
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

export default ProductListScreen;
