import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = () => {
	return (
		<Spinner animation='border' role='status' style={spinnerStyle}>
			<span className='sr-only'>Loading...</span>
		</Spinner>
	);
};

const spinnerStyle = {
	width: '100px',
	height: '100px',
	margin: 'auto',
	display: 'block',
};

export default Loader;
