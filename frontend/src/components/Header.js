import React from 'react';
// Route can be used to pass in props.history to an embedded component through a render prop and then as a prop
// Not necessary when using withRouter from react-router-dom
// import { Route } from 'react-router-dom';
// useDispatch gets from Redux state, useSelector calls actions in Redux state
import { useDispatch, useSelector } from 'react-redux';
// This is like link but for Bootstrap elements, wrap the linking element
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import SearchBox from './SearchBox';
import { logout } from '../actions/userActions';

const Header = () => {
	const dispatch = useDispatch();

	const user = useSelector((state) => state.user);
	const { userInfo, userStatus } = user;

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
							<LinkContainer to='/basket'>
								<Nav.Link>
									<i className='fas fa-shopping-cart'></i> Basket
								</Nav.Link>
							</LinkContainer>
							{userStatus === 'guest' ? (
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
