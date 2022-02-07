import React, { useState, Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Form, CloseButton } from 'react-bootstrap';
// dispatch to call an action and selector to select parts of state, eg. productList from store
import { useDispatch, useSelector } from 'react-redux';
import { listProducts, removeProductErrors } from '../actions/productActions';
import { basketReset } from '../actions/basketActions';
import { orderDetailsReset } from '../actions/orderActions';
import { userLogoutReset } from '../actions/userActions';
import { setItemsPerPage } from '../actions/screenActions';
import { SET_MULTIPLE_PAGES, SET_SINGLE_PAGE } from '../constants/screenConstants';
// Now handled in reducer
// import axios from 'axios';
import Meta from '../components/Meta';
import ProductCarousel from '../components/ProductCarousel';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';

const HomeScreen = ({ history, match }) => {
	// Used for search, search query added to URL
	const keyword = match.params.keyword;

	// Page number from URL search query, if none page is 1
	const pageNumber = match.params.pageNumber || 1;

	// Now handled in reducer
	// const [products, setProducts] = useState([]);
	const [alert, setAlert] = useState(false);

	// useSelector makes state accessible to the component
	// Selector takes in arrow function and then selects from state, in this case productList and sets to variable productList
	const productList = useSelector((state) => state.productList);
	// Destructured to get individual elements that may be passed from productListReducer
	const { loading, error, products, pages, page } = productList;

	const user = useSelector((state) => state.user);
	const { userStatus } = user;

	const { itemsPerPage, singlePage } = useSelector((state) => state.itemsPerPage);

	const dispatch = useDispatch();

	useEffect(() => {
		// Now handled in reducer
		// const fetchProducts = async () => {
		// 	// Destructured variable to make data directly available rather than res.data
		// 	const { data } = await axios.get('/api/products');

		// 	setProducts(data);
		// };
		// fetchProducts();
		// * eslint-disable-next-line *
		if (userStatus === 'logout') {
			dispatch(userLogoutReset(), basketReset(), orderDetailsReset());
		}
		// keyword is the search query
		dispatch(listProducts(keyword, pageNumber, itemsPerPage));
	}, [userStatus, dispatch, keyword, pageNumber, itemsPerPage]);

	useEffect(() => {
		if (pages === 1) {
			dispatch({ type: SET_SINGLE_PAGE });
		} else {
			dispatch({ type: SET_MULTIPLE_PAGES });
		}
		if (singlePage && !keyword) {
			history.push('/');
		}
	}, [dispatch, history, pages, singlePage, keyword]);

	useEffect(() => {
		if (error) {
			setAlert(true);
		}
	}, [error, dispatch]);

	function onChangeHandler(e) {
		dispatch(setItemsPerPage(e.target.value));
	}

	function dismissHandler() {
		setAlert(false);
		dispatch(removeProductErrors());
	}

	return (
		<Fragment>
			<Meta />
			{!keyword ? (
				<Fragment>
					<h1>Latest Products</h1>
					<ProductCarousel />
				</Fragment>
			) : (
				<Link to='/' className='btn btn-light'>
					Go Back
				</Link>
			)}
			<Form.Label className='inline'>Items per page</Form.Label>
			<Form.Control className='items-per-page' as='select' value={itemsPerPage} onChange={onChangeHandler}>
				<option value={10}>10</option>
				<option value={15}>15</option>
				<option value={20}>20</option>
			</Form.Control>
			{products.length === 0 && !loading && <h2>No results found</h2>}
			{alert ? (
				<Message variant='danger'>
					{error} <CloseButton onClick={dismissHandler} aria-label='Hide' />
				</Message>
			) : (
				<Fragment>
					<Row>
						{/* Specifies col width from breakpoint up (out of 12) */}
						{products.map((product) => (
							<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
								<Product product={product} />
							</Col>
						))}
					</Row>
					<Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} itemsPerPage={itemsPerPage} />
				</Fragment>
			)}
			{products.length === 0 && <Loader />}
		</Fragment>
	);
};

export default HomeScreen;
