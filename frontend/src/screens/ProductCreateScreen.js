import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
// To interact with Redux state
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { createProduct } from '../actions/productActions';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';

const ProductCreateScreen = ({ history }) => {
	const [name, setName] = useState('');
	const [price, setPrice] = useState(0);
	const [image, setImage] = useState('');
	const [brand, setBrand] = useState('');
	const [category, setCategory] = useState('');
	const [countInStock, setCountInStock] = useState(0);
	const [description, setDescription] = useState('');
	const [uploading, setUploading] = useState(false);
	const [uploadError, setUploadError] = useState(false);

	const dispatch = useDispatch();

	const user = useSelector((state) => state.user);
	const { userStatus, userInfo } = user;

	const productCreate = useSelector((state) => state.productCreate);
	const { loading, error, success } = productCreate;

	// // JS international number formatter - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
	// const formatter = new Intl.NumberFormat('en-UK', {
	// 	style: 'currency',
	// 	currency: 'GBP',
	// 	minimumFractionDigits: 2,
	// });

	useEffect(() => {
		if (userStatus === 'logout') {
			history.push('/');
		}
		if (success) {
			dispatch({ type: PRODUCT_CREATE_RESET });
			history.push('/admin/productlist');
		}
	}, [history, userStatus, dispatch, success]);

	// The files event of a form file field is an array as it can take multiple files
	const uploadFileHandler = async (e) => {
		const file = e.target.files[0];
		// JS for creating form data that takes the file
		const formData = new FormData();
		formData.append('image', file);
		setUploading(true);

		try {
			// This header is required for sending files
			const config = {
				headers: {
					Authorization: `Bearer ${userInfo.token}`,
					'Content-Type': 'multipart/form-data',
				},
			};

			// Response object (data) will be the filepath as set in uploadRouts.js
			const { data } = await axios.post('/api/upload', formData, config);

			setImage(data);
			setUploading(false);
		} catch (err) {
			setUploadError(err.response && err.response.data.message ? err.response.data.message : err.message);
			setUploading(false);
		}
	};

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			createProduct({
				name,
				price,
				image,
				brand,
				category,
				countInStock,
				description,
			})
		);
	};

	return (
		<Fragment>
			<Link to='/admin/productlist' className='btn btn-dark my-3'>
				Go Back
			</Link>
			<FormContainer>
				<h1>Add New Product</h1>
				{loading && <Loader />}
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant='danger'>{error}</Message>
				) : (
					<Form onSubmit={submitHandler}>
						<Form.Group controlId='name'>
							<Form.Label>Name</Form.Label>
							<Form.Control
								type='text'
								placeholder='Product Name'
								onChange={(e) => setName(e.target.value)}
								value={name}
								required
							></Form.Control>
						</Form.Group>

						<Form.Group controlId='price'>
							<Form.Label>Price</Form.Label>
							<Form.Control
								type='number'
								placeholder='Product Price'
								onChange={(e) => setPrice(e.target.value)}
								value={price}
								required
							></Form.Control>
						</Form.Group>

						<Form.Group controlId='image'>
							<Form.Label>Image</Form.Label>
							<Form.Control
								type='text'
								placeholder='Image URL'
								onChange={(e) => setImage(e.target.value)}
								value={image}
								required
							></Form.Control>
							<Form.File id='image-file' label='Choose File' custom onChange={uploadFileHandler}></Form.File>
							{uploading && <Loader />}
							{uploadError && <Message variant='danger'>{uploadError}</Message>}
						</Form.Group>

						<Form.Group controlId='brand'>
							<Form.Label>Brand</Form.Label>
							<Form.Control
								type='text'
								placeholder='Brand'
								onChange={(e) => setBrand(e.target.value)}
								value={brand}
								required
							></Form.Control>
						</Form.Group>

						<Form.Group controlId='category'>
							<Form.Label>Category</Form.Label>
							<Form.Control
								type='text'
								placeholder='Category'
								onChange={(e) => setCategory(e.target.value)}
								value={category}
								required
							></Form.Control>
						</Form.Group>

						<Form.Group controlId='countInStock'>
							<Form.Label>Count In Stock</Form.Label>
							<Form.Control
								type='number'
								placeholder='Count In Stock'
								onChange={(e) => setCountInStock(e.target.value)}
								value={countInStock}
								required
							></Form.Control>
						</Form.Group>

						<Form.Group controlId='description'>
							<Form.Label>Description</Form.Label>
							<Form.Control
								as='textarea'
								rows={8}
								type='text'
								placeholder='Description'
								onChange={(e) => setDescription(e.target.value)}
								value={description}
								required
							></Form.Control>
						</Form.Group>

						<Button type='submit' variant='primary'>
							Create Product
						</Button>
					</Form>
				)}
			</FormContainer>
		</Fragment>
	);
};

export default ProductCreateScreen;
