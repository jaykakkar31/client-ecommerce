import React, {  useEffect } from "react";
import {
	
	Button,
	ListGroup,
	Image,
	Row,
	Col,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import Message from "../message/message";
import "./placeOrderScreen.css";
import { createOrder } from "../../actions/orderAction";
import CheckoutSteps from "../checkoutSteps/checkoutSteps";
const PlaceOrderScreen = () => {
	const dispatch = useDispatch();
	const cartReducer = useSelector((state) => state.cartReducer);
	const { cartItems, shippingAddress, paymentMethod } = cartReducer;
	const orderCreateReducer = useSelector((state) => state.orderCreateReducer);
	const { orderInfo, success, error } = orderCreateReducer;
	cartReducer.itemsPrice = cartItems.reduce((acc, item) => acc + item.price, 0);
	cartReducer.shippingPrice = Number(
		(cartItems.itemsPrice > 100 ? 0 : 100).toFixed(2)
	);
	cartReducer.taxPrice = Number((0.5 * cartReducer.itemsPrice).toFixed(2));
	cartReducer.totalPrice =
		Number(cartReducer.taxPrice) +
		Number(cartReducer.shippingPrice) +
		Number(cartReducer.itemsPrice);
	const history = useHistory();
	useEffect(() => {
		if (success) {
			history.push(`/order/${orderInfo._id}`);
		}
	});

	const placeOrderHandler = () => {
		dispatch(
			createOrder({
				shippingAddress: shippingAddress,
				paymentMethod: paymentMethod,
				orderItems: cartItems,
				taxPrice: cartReducer.taxPrice,
				shippingPrice: cartReducer.shippingPrice,
				totalPrice: cartReducer.totalPrice,
				itemsPrice: cartReducer.itemsPrice,
			})
		);
	};
	return (
		<div className="order-summary">
			<Col>
				<CheckoutSteps step1 step2 step3 step4 />

				<ListGroup variant="flush">
					<ListGroup.Item>
						<h3>Shipping</h3>

						<p>
							<span>Address: </span>
							{shippingAddress.address}, {shippingAddress.city}
							{" - "}
							{shippingAddress.postalCode}, {shippingAddress.country}
						</p>
					</ListGroup.Item>
					<ListGroup.Item>
						<h3>Payment Method</h3>
						<p>
							<span>Method: </span>
							{paymentMethod}
						</p>
					</ListGroup.Item>
					<ListGroup.Item>
						<h3>Order Items</h3>

						{cartItems.length === 0 ? (
							<Message variant="primary">Cart is empty</Message>
						) : (
							<ListGroup>
								{cartItems.map((item, index) => {
									return (
										<ListGroup.Item>
											<Row>
												<Col md={1}>
													<Image
														src={item.image}
														alt={item.name}
														rounded
														fluid
													/>
												</Col>
												<Col>
													<Link to={`/product/${item.product}`}>
														{item.name}
													</Link>
												</Col>
												<Col md={4}>
													{item.price} x {item.qty} = ${(item.qty * item.price).toFixed(2)}
												</Col>
											</Row>
										</ListGroup.Item>
									);
								})}
							</ListGroup>
						)}
					</ListGroup.Item>
				</ListGroup>
			</Col>
			<Col md={4} className="summary">
				<ListGroup>
					<ListGroup.Item>
						<h2>Order Summary</h2>
					</ListGroup.Item>
					<ListGroup.Item>
						<Row>
							<Col>Item</Col>
							<Col>${cartReducer.itemsPrice}</Col>
						</Row>
					</ListGroup.Item>
					<ListGroup.Item>
						<Row>
							<Col>Shipping</Col>
							<Col>${cartReducer.shippingPrice}</Col>
						</Row>
					</ListGroup.Item>

					<ListGroup.Item>
						<Row>
							<Col>Tax</Col>
							<Col>${cartReducer.taxPrice}</Col>
						</Row>
					</ListGroup.Item>
					<ListGroup.Item>
						<Row>
							<Col>Total</Col>
							<Col>${cartReducer.totalPrice}</Col>
						</Row>
					</ListGroup.Item>
                   {error&& <ListGroup.Item>
                        <Message variant="danger">{error}</Message>
                    </ListGroup.Item>}
					<ListGroup.Item>
						<Button
							variant="dark"
							onClick={placeOrderHandler}
							disabled={cartItems.length === 0}
						>
							Place Order
						</Button>
					</ListGroup.Item>
				</ListGroup>
			</Col>
		</div>
	);
};

export default PlaceOrderScreen;
