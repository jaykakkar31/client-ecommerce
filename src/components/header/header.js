import React from "react";
import "./header.css";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userAction";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";

import SearchBox from "../searchBox";
const Header = () => {
	const dispatch = useDispatch();
	const userReducer = useSelector((state) => state.userReducer);
	const {  userInfo } = userReducer;
	// let location=useLocation()

	const history = useHistory();
	return (
		<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
			<Container>
				<Navbar.Brand href="/">PROSHOP</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<SearchBox />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="ml-auto link-container">
						<Link className="cart header-links" to="/cart">
							<i class="fas fa-shopping-cart"></i> Cart
						</Link>
						{userInfo ? (
							<NavDropdown title={userInfo.name} id="nav-dropdown">
								<NavDropdown.Item
									onClick={() => {
										history.push("/profile");
									}}
									eventKey="4.1"
								>
									Profile
								</NavDropdown.Item>
								<NavDropdown.Item
									onClick={() => {
										dispatch(logout());
										history.push("/");
									}}
									eventKey="4.2"
								>
									Logout
								</NavDropdown.Item>
							</NavDropdown>
						) : (
							<Link
								className="header-links"
								to="/login"
								onClick={() => {
									// console.log(userInfo);
								}}
							>
								<i className="fas fa-user"></i> SignIn
							</Link>
						)}

						{userInfo && userInfo.isAdmin && (
							<NavDropdown title="Admin" id="nav-dropdown">
								<NavDropdown.Item
									onClick={() => {
										history.push("/admin/userlist");
									}}
									eventKey="4.1"
								>
									Users
								</NavDropdown.Item>
								<NavDropdown.Item
									onClick={() => {
										history.push("/admin/productlist");
									}}
									eventKey="4.2"
								>
									Products
								</NavDropdown.Item>
								<NavDropdown.Item
									onClick={() => {
										history.push("/admin/orderlist");
									}}
									eventKey="4.3"
								>
									Orders
								</NavDropdown.Item>
							</NavDropdown>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Header;
