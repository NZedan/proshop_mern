import React, { Fragment, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col, Form } from 'react-bootstrap';
// To interact with Redux state
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import { deleteProduct, listProducts } from '../actions/productActions';
import { setItemsPerPage } from '../actions/screenActions';
import { SET_MULTIPLE_PAGES, SET_SINGLE_PAGE } from '../constants/screenConstants';
import { PRODUCT_DELETE_RESET } from '../constants/productConstants';

const ProductListScreen = ({ history, match }) => {
	const pageNumber = match.params.pageNumber || 1;

	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { logout } = userLogin;

	const productList = useSelector((state) => state.productList);
	const { loading, error, products, pages, page } = productList;

	const productDelete = useSelector((state) => state.productDelete);
	const { loading: loadingDelete, error: errorDelete, success } = productDelete;

	const { itemsPerPage, singlePage } = useSelector((state) => state.itemsPerPage);

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
			// First is keyword which isn't used for the admin screen
			dispatch(listProducts('', pageNumber, itemsPerPage));
		}
		if (success) {
			dispatch({ type: PRODUCT_DELETE_RESET });
		}
	}, [history, dispatch, logout, success, pageNumber, itemsPerPage]);

	useEffect(() => {
		if (pages === 1) {
			dispatch({ type: SET_SINGLE_PAGE });
		} else {
			dispatch({ type: SET_MULTIPLE_PAGES });
		}
		if (singlePage) {
			history.push('/admin/productlist');
		}
	}, [dispatch, history, pages, singlePage]);

	const onChangeHandler = (e) => {
		dispatch(setItemsPerPage(e.target.value));
	};

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
					<Form.Label className='inline'>Items per page</Form.Label>
					<Form.Control className='items-per-page' as='select' value={itemsPerPage} onChange={onChangeHandler}>
						<option value={10}>10</option>
						<option value={15}>15</option>
						<option value={20}>20</option>
					</Form.Control>
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
				<Fragment>
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
					<Paginate pages={pages} page={page} isAdmin={true} itemsPerPage={itemsPerPage} />
				</Fragment>
			)}
		</Fragment>
	);
};

export default ProductListScreen;
