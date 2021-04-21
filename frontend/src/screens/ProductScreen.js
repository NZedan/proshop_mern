import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem } from 'react-bootstrap';
import Rating from '../components/Rating';

// Initial setup pre-backend development
// import products from '../products';
// // props.match gives access to params which gives access to the URL placeholder 'id' defined in the route in app.js
// const ProductScreen = ({ match }) => {
// 	// This finds the correct product by matching the id of the clicked product with the DB
// 	const product = products.find((p) => p._id === match.params.id);

const ProductScreen = ({ match }) => {
	const [product, setProduct] = useState({});
	const id = match.params.id;

	useEffect(() => {
		const fetchProduct = async () => {
			const { data } = await axios.get(`/api/products/${id}`);

			setProduct(data);
		};
		fetchProduct();
	}, [id]);

	return (
		<Fragment>
			<Link to='/' className='btn btn-light my-3'>
				Go Back
			</Link>
			<Row>
				<Col md={6}>
					{/* Fluid is a responsive property */}
					<Image src={product.image} alt={product.name} fluid />
				</Col>
				<Col md={3}>
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
				<Col md={3}>
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

							<ListGroupItem>
								<Button className='btn-block' type='button' disabled={product.countInStock === 0}>
									Add to Basket
								</Button>
							</ListGroupItem>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</Fragment>
	);
};

export default ProductScreen;
