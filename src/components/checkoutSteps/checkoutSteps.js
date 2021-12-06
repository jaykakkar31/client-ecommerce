import React from "react";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import "./checkoutScreen.css";
const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
	// console.log(step4);
	return (
		<div className="links-container">
			<Nav.Item>
				{step1 ? (
					<Link to="/login">
						<Nav>Sign In</Nav>
					</Link>
				) : (
					<Nav disabled>Sign In</Nav>
				)}
			</Nav.Item>
			<Nav.Item>
				{step2 ? (
					<Link to="/shipping">
						<Nav>Shipping</Nav>
					</Link>
				) : (
					<Nav disabled>Shipping</Nav>
				)}
			</Nav.Item>
			<Nav.Item>
				{step3 ? (
					<Link to="/payment">
						<Nav>Payment</Nav>
					</Link>
				) : (
					<Nav disabled>Payment</Nav>
				)}
			</Nav.Item>
			<Nav.Item>
				{step4 ? (
					<Link to="/placeorder">
						<Nav >Place Order</Nav>
					</Link>
				) : (
					<Nav disabled>Place Order</Nav>
				)}
			</Nav.Item>
		</div>
	);
};

export default CheckoutSteps;
