import React, { useState } from 'react';
// Exporting component with withRouter allows access to props.history when component is embedded in another
import { withRouter } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

const SearchBox = ({ history }) => {
	const [keyword, setKeyword] = useState('');

	const submitHandler = (e) => {
		e.preventDefault();
		// Trims whitespace
		if (keyword.trim()) {
			history.push(`/search/${keyword}`);
		} else {
			history.push('/');
		}
		setKeyword('');
	};

	return (
		<Form onSubmit={submitHandler} inline>
			<Form.Control
				type='text'
				name='q'
				onChange={(e) => setKeyword(e.target.value)}
				placeholder='Search Products...'
				className='mr-sm-2 ml-sm-5'
				value={keyword}
			></Form.Control>
			<Button type='submit' variant='outline-success' className='p-2'>
				Search
			</Button>
		</Form>
	);
};

export default withRouter(SearchBox);
