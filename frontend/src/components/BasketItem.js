import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';

const BasketItem = ({ product }) => {
	return (
		<Row>
			<Col>
				<Image src={product.image} thumbnail />
			</Col>
			<Col>{product.name}</Col>
			<Col>£{product.price}</Col>
			<Col>Qty - {product.qty}</Col>
		</Row>
	);
};

BasketItem.propTypes = {
	product: PropTypes.object.isRequired,
};

export default BasketItem;
