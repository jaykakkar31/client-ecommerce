import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { saveShippingAddress } from "../../actions/cartAction";
import "./shippingScreen.css";
import CheckoutSteps from "../checkoutSteps/checkoutSteps";
import Message from "../message/message";
const ShippingScreen = () => {
	const cartReducer = useSelector((state) => state.cartReducer);
	const { shippingAddress, error } = cartReducer;

	const [address, setAddress] = useState(shippingAddress.address||"");
	const [postalCode, setPostalCode] = useState(shippingAddress.postalCode||"");
	const [city, setCity] = useState(shippingAddress.city||"");
	const [country, setCountry] = useState(shippingAddress.country||"");
	const dispatch = useDispatch();
	const history = useHistory();
	const formSubmitHandler = (e) => {
		e.preventDefault();
		if (
			address?.length === 0 ||
			postalCode?.length === 0 ||
			country?.length === 0 ||
			city?.length === 0
		) {
			alert("Details cannot be empty");
		} else {
			dispatch(
				saveShippingAddress({
					address: address,
					postalCode: postalCode,
					country: country,
					city: city,
				})
			);
			history.push("/payment");
		}
	};
	console.log(error);
	return (
		<div className="form-container">
			<CheckoutSteps step2 />
			<h1>Shipping</h1>
			<Form onSubmit={formSubmitHandler}>
				<Form.Group className="mb-3" controlId="address">
					<Form.Label>Enter Address</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter address"
						onChange={(e) => {
							setAddress(e.target.value);
						}}
						value={address}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="city">
					<Form.Label>City</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter city"
						onChange={(e) => {
							setCity(e.target.value);
						}}
						value={city}
					/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="postalCode">
					<Form.Label>Postal code</Form.Label>
					<Form.Control
						autoComplete="on"
						type="text"
						placeholder="Enter postal code"
						value={postalCode}
						onChange={(e) => {
							setPostalCode(e.target.value);
						}}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="country">
					<Form.Label>Country</Form.Label>
					<Form.Control
						autoComplete="on"
						type="text"
						placeholder="Enter country"
						value={country}
						onChange={(e) => {
							setCountry(e.target.value);
						}}
					/>
				</Form.Group>

				<Button variant="dark" type="submit">
					Continue
				</Button>
			</Form>
		</div>
	);
};

export default ShippingScreen;
