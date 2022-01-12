import React, { useEffect } from 'react';
// Route can be used to pass in props.history to an embedded component through a render prop and then as a prop
// Not necessary when using withRouter from react-router-dom
// import { Route } from 'react-router-dom';
// useDispatch gets from Redux state, useSelector calls actions in Redux state
import { useDispatch, useSelector } from 'react-redux';
// This is like link but for Bootstrap elements, wrap the linking element
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import SearchBox from './SearchBox';
import { logout, refreshToken } from '../actions/userActions';
import BasketItem from './BasketItem';

const Header = () => {
	const dispatch = useDispatch();

	const user = useSelector((state) => state.user);
	const { userInfo, userStatus } = user;

	const basket = useSelector((state) => state.basket);
	const { basketItems } = basket;

	// // Logs out if token or session cookie expired or not present
	// useEffect(() => {
	// 	if (error) {
	// 		if (error.status === 401) {
	// 			dispatch(logout());
	// 		}
	// 	}
	// }, [error, dispatch]);

	useEffect(() => {
		if (userStatus === 'loggedIn') {
			dispatch(refreshToken());
			setTimeout(() => {
				dispatch(refreshToken());
			}, 1000 * 59.9);
		}
		// eslint-disable-next-line
	}, []);

	const logoutHandler = () => {
		dispatch(logout());
	};

	return (
		<header>
			<Navbar bg='dark' variant='dark' expand='sm' collapseOnSelect>
				<Container>
					<LinkContainer to='/'>
						<Navbar.Brand>ProShop</Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						{/* Syntax to allow access to props.history in an embedded component when not using withRouter */}
						{/* <Route render={({ history }) => <SearchBox history={history} />} /> */}
						<SearchBox />
						<Nav className='ml-auto'>
							{basketItems.length === 0 ? (
								<LinkContainer to='/basket'>
									<Nav.Link>
										<i className='fas fa-shopping-cart'></i> Basket
									</Nav.Link>
								</LinkContainer>
							) : (
								<NavDropdown title='Basket' id='basket'>
									{basketItems.map((item) => (
										<LinkContainer key={item.productId} to={`/product/${item.productId}`}>
											<NavDropdown.Item>
												<BasketItem product={item} />
												<NavDropdown.Divider />
											</NavDropdown.Item>
										</LinkContainer>
									))}
									<LinkContainer to='/basket'>
										<NavDropdown.Item>
											<i className='fas fa-shopping-cart'></i> Go To Basket
										</NavDropdown.Item>
									</LinkContainer>
								</NavDropdown>
							)}
							{!userStatus || userStatus === 'guest' ? (
								<LinkContainer to='/login'>
									<Nav.Link>
										<i className='fas fa-user'></i> Sign In
									</Nav.Link>
								</LinkContainer>
							) : userInfo && userInfo.isAdmin ? (
								<NavDropdown title={userInfo.name} id='username'>
									<LinkContainer to='/admin/userlist'>
										<NavDropdown.Item>Users</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to='/admin/productlist'>
										<NavDropdown.Item>Products</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to='/admin/orderlist'>
										<NavDropdown.Item>Orders</NavDropdown.Item>
									</LinkContainer>
									<NavDropdown.Divider></NavDropdown.Divider>
									<LinkContainer to='/profile'>
										<NavDropdown.Item>Profile</NavDropdown.Item>
									</LinkContainer>
									<NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
								</NavDropdown>
							) : (
								<NavDropdown title={userInfo.name} id='username'>
									<LinkContainer to='/profile'>
										<NavDropdown.Item>Profile</NavDropdown.Item>
									</LinkContainer>
									<NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
								</NavDropdown>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
