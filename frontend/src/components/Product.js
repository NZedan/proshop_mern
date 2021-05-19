import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Rating from './Rating';

const Product = ({ product }) => {
	// JS international number formatter - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
	const formatter = new Intl.NumberFormat('en-UK', {
		style: 'currency',
		currency: 'GBP',
		minimumFractionDigits: 2,
	});

	return (
		<Card className='my-3 p-3 rounded'>
			<Link to={`/product/${product._id}`}>
				<Card.Img src={product.image} variant='top' />
			</Link>

			<Card.Body>
				<Link to={`/product/${product._id}`}>
					<Card.Title as='div'>
						<strong>{product.name}</strong>
					</Card.Title>
				</Link>

				<Card.Text as='div'>
					<Rating value={product.rating} text={`${product.numReviews} reviews`} />
				</Card.Text>

				<Card.Text as='h3'>{formatter.format(product.price)}</Card.Text>
			</Card.Body>
		</Card>
	);
};

Product.propTypes = {
	product: PropTypes.object.isRequired,
};

export default Product;
