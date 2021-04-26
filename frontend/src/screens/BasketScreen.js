import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, ListGroupItem, Image, Form, Button, Card } from 'react-bootstrap';
import Message from '../components/Message';
import { addToBasket } from '../actions/basketActions';

// match, location and history are from react-router and give access to the route attributes like URL
const BasketScreen = ({ match, location, history }) => {
	// If the basket screen is reached with an id and quantity in the URL then
	// the add to basket action will be fired, otherwise just the basket will be shown
	const productId = match.params.id;

	// Search query (?qty=x) (added in productScreen addToBasketHandler)
	// Accessed with location.search returns ?qty=x
	// split('=') returns array [?qty, x] so the query is accessed at array position 1
	const qty = location.search ? Number(location.search.split('=')[1]) : 1;

	const dispatch = useDispatch();

	// Make items in state available to component
	const basket = useSelector((state) => state.basket);
	const { basketItems } = basket;

	// If route accessed from product screen (URL contains productId) add product to basket
	useEffect(() => {
		if (productId) {
			dispatch(addToBasket(productId, qty));
		}
	}, [dispatch, productId, qty]);

	return <div>Basket</div>;
};

export default BasketScreen;
