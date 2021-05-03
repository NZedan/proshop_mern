import React, { Fragment, useState, useEffect } from 'react';
// dispatch to call an action and selector to select parts of state, eg. productList from store
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails } from '../actions/productActions';
// Now handled in reducer
// import axios from 'axios';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';

// Initial setup pre-backend development
// import products from '../products';
// // props.match gives access to params which gives access to the URL placeholder 'id' defined in the route in app.js
// const ProductScreen = ({ match }) => {
// 	// This finds the correct product by matching the id of the clicked product with the DB
// 	const product = products.find((p) => p._id === match.params.id);

// history and match are from react-router-dom
const ProductScreen = ({ history, match }) => {
	// Now handled in reducer
	// const [product, setProduct] = useState({});
	const userLogin = useSelector((state) => state.userLogin);
	const { logout } = userLogin;

	const [qty, setQty] = useState(1);

	// useSelector makes state accessible to the component
	// Selector takes in arrow function and then selects from state, in this case productDetails and sets to variable
	const productDetails = useSelector((state) => state.productDetails);
	// Destructured to get individual elements that may be passed from productListReducer
	const { loading, error, product } = productDetails;

	const id = match.params.id;

	const dispatch = useDispatch();

	useEffect(() => {
		// // Now handled in reducer
		// const fetchProduct = async () => {
		// 	const { data } = await axios.get(`/api/products/${id}`);
		// 	setProduct(data);
		// };
		// fetchProduct();
		if (logout) {
			history.push('/');
		}
		dispatch(listProductDetails(id));
	}, [logout, history, dispatch, id]);

	const addToBasketHandler = () => {
		// history is a mutable object associated with routes
		// This redirects to this route with the qty state as a query
		history.push(`/basket/${id}?qty=${qty}`);
	};

	return (
		<Fragment>
			<Link to='/' className='btn btn-light my-3'>
				Go Back
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Row>
					<Col md={6}>
						{/* Fluid is a responsive property */}
						<Image src={product.image} alt={product.name} fluid />
					</Col>
					<Col md={6}>
						<ListGroup variant='flush'>
							<ListGroupItem>
								<h2>{product.name}</h2>
							</ListGroupItem>
							{/* This ternery avoids an error where propTypes checked for value before it was passed */}
							<ListGroupItem>
								{product.rating && <Rating value={product.rating} text={`${product.numReviews} reviews`} />}
							</ListGroupItem>
							<ListGroupItem>Price: £{product.price}</ListGroupItem>
							<ListGroupItem>Description: {product.description}</ListGroupItem>
						</ListGroup>
					</Col>
					<Col md={6}>
						<Card>
							<ListGroup variant='flush'>
								<ListGroupItem>
									<Row>
										<Col>Price:</Col>
										<Col>
											<strong>£{product.price}</strong>
										</Col>
									</Row>
								</ListGroupItem>

								<ListGroupItem>
									<Row>
										<Col>Status:</Col>
										<Col>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</Col>
									</Row>
								</ListGroupItem>

								{product.countInStock > 0 && (
									<ListGroupItem>
										<Row>
											<Col>Qty:</Col>
											<Col>
												<Form.Control
													className='qty-selector'
													as='select'
													value={qty}
													onChange={(e) => setQty(e.target.value)}
												>
													{/* Spread operator with array constructor taking in the countInStock value then taking the key of that
                          item and mapping it ++ to give a list from 1 up */}
													{[...Array(product.countInStock).keys()].map((key) => (
														<option key={key + 1} value={key + 1}>
															{key + 1}
														</option>
													))}
												</Form.Control>
											</Col>
										</Row>
									</ListGroupItem>
								)}

								<ListGroupItem>
									<Button
										className='btn-block'
										type='button'
										disabled={product.countInStock === 0}
										onClick={addToBasketHandler}
									>
										Add to Basket
									</Button>
								</ListGroupItem>
							</ListGroup>
						</Card>
					</Col>
				</Row>
			)}
		</Fragment>
	);
};

export default ProductScreen;
