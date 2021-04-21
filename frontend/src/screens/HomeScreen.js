import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Row } from 'react-bootstrap';
import Product from '../components/Product';

const HomeScreen = () => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		const fetchProducts = async () => {
			// Destructured variable to make data directly available rather than res.data
			const { data } = await axios.get('/api/products');

			setProducts(data);
		};
		fetchProducts();
		// eslint-disable-next-line
	}, []);

	return (
		<Fragment>
			<h1>Latest Products</h1>
			<Row>
				{/* Specifies col width from breakpoint up (out of 12) */}
				{products.map((product) => (
					<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
						<Product product={product} />
					</Col>
				))}
			</Row>
		</Fragment>
	);
};

export default HomeScreen;
