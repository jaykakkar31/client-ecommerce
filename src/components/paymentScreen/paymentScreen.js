import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { savePaymentMethod } from "../../actions/cartAction";
import CheckoutSteps from "../checkoutSteps/checkoutSteps";
import './paymentScreen.css'
const PaymentScreen = () => {
	const history = useHistory();

	const cartReducer = useSelector((state) => state.cartReducer);
	const { shippingAddress } = cartReducer;

	if (!shippingAddress) {
		history.push("/shipping");
	}

const [paymentMethod,setPaymentMethod]=useState("PayPal")
	const dispatch = useDispatch();
	const formSubmitHandler = (e) => {
		e.preventDefault();
		dispatch(savePaymentMethod(paymentMethod));
		
		history.push("/placeorder");
	};
	return (
		<div className="form-container">
			<CheckoutSteps step1 step2 step3 />
			<h1>Payment Method</h1>
			<Form onSubmit={formSubmitHandler}>
				<Form.Group className="mb-3" controlId="address">
					<Form.Label>Select method</Form.Label>
					<Form.Check
						type="radio"
						label="PayPal or credit card"
						value="PayPal"
                        checked
						onChange={(e) => {
							setPaymentMethod(e.target.value);
						}}
					/>
					{/* <Form.Check
						type="radio"
						label="Stripe"
						value="Stripe"
						onChange={(e) => {
							setPaymentMethod(e.target.value);
						}}
					/> */}
				</Form.Group>

				<Button variant="dark" type="submit">
					Continue
				</Button>
			</Form>
		</div>
	);
};

export default PaymentScreen;
