import React, { Fragment, useState, useEffect } from 'react';
// Used to format dates
import Moment from 'react-moment';
// dispatch to call an action and selector to select parts of state, eg. productList from store
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails, createProductReview } from '../actions/productActions';
// Now handled in reducer
// import axios from 'axios';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem, Form } from 'react-bootstrap';
import Meta from '../components/Meta';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';

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
	// True if user logs out
	const user = useSelector((state) => state.user);
	const { userStatus, userInfo } = user;

	const [qty, setQty] = useState(1);
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState('');

	// useSelector makes state accessible to the component
	// Selector takes in arrow function and then selects from state, in this case productDetails and sets to variable
	const productDetails = useSelector((state) => state.productDetails);
	// Destructured to get individual elements that may be passed from productListReducer
	const { error, product } = productDetails;

	const productCreateReview = useSelector((state) => state.productCreateReview);
	// Syntax to rename item to avoid duplicates
	const { success: successProductReview, error: errorProductReview } = productCreateReview;

	const id = match.params.id;

	const dispatch = useDispatch();

	useEffect(() => {
		// // Now handled in reducer
		// const fetchProduct = async () => {
		// 	const { data } = await axios.get(`/api/products/${id}`);
		// 	setProduct(data);
		// };
		// fetchProduct();
		// Redirects to home on logout
		if (userStatus === 'logout') {
			history.push('/');
		}
		dispatch(listProductDetails(id));
	}, [userStatus, history, dispatch, id]);

	useEffect(() => {
		if (successProductReview) {
			alert('Review Submitted');
			setRating(0);
			setComment('');
			dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
			dispatch(listProductDetails(id));
		} else if (errorProductReview) {
			setTimeout(() => {
				setRating(0);
				setComment('');
				dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
			}, 3000);
		}
	}, [successProductReview, errorProductReview, dispatch, id]);

	const addToBasketHandler = () => {
		// history is a mutable object associated with routes
		// This redirects to this route with the qty state as a query
		history.push(`/basket/${id}?qty=${qty}`);
	};

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(createProductReview(id, { rating, comment }));
	};

	// MAKE ADD TO BASKET A POPUP INSTEAD OF REDIRECT

	return (
		<Fragment>
			<Link to='/' className='btn btn-light my-3'>
				Go Back
			</Link>
			{!product._id || product._id !== id ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Fragment>
					<Meta title={product.name} />
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
									{product.rating && (
										<Rating
											value={product.rating}
											text={`${product.numReviews} ${product.numReviews === 1 ? 'review' : 'reviews'}`}
										/>
									)}
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
													<Form.Control className='qty-selector' as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
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
					<Row>
						<Col md={6}>
							<h2>Reviews</h2>
							{product.reviews.length === 0 && <Message>No Reviews</Message>}
							{product.reviews.map((review) => (
								<ListGroup.Item key={review._id}>
									<strong>{review.name}</strong>
									<Rating value={review.rating} />
									<p>
										<Moment format='h:mm:ss a, D/M/YY'>{review.createdAt}</Moment>
									</p>
									<p>{review.comment}</p>
								</ListGroup.Item>
							))}
							<ListGroup.Item>
								<h2>Write A Customer Review</h2>
								{errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}
								{userInfo ? (
									<Form onSubmit={submitHandler}>
										<Form.Group controlId='rating'>
											<Form.Label>Rating</Form.Label>
											<Form.Control as='select' value={rating} onChange={(e) => setRating(e.target.value)}>
												<option value=''>Select...</option>
												<option value='1'>1 - Poor</option>
												<option value='2'>2 - Fair</option>
												<option value='3'>3 - Good</option>
												<option value='4'>4 - Very Good</option>
												<option value='5'>5 - Excellent</option>
											</Form.Control>
										</Form.Group>
										<Form.Group controlId='comment'>
											<Form.Label>Comment</Form.Label>
											<Form.Control
												as='textarea'
												row='3'
												value={comment}
												onChange={(e) => setComment(e.target.value)}
											></Form.Control>
										</Form.Group>
										<Button type='submit' variant='primary'>
											Submit
										</Button>
									</Form>
								) : (
									<Message>
										Please <Link to='/login'>sign in</Link> to write a review
									</Message>
								)}
							</ListGroup.Item>
						</Col>
					</Row>
				</Fragment>
			)}
		</Fragment>
	);
};

export default ProductScreen;
