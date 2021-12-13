import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router";
import { addToCart,removeFromCart } from "../../actions/cartAction";
import "./cartScreen.css";
import Message from "../message/message";
import { Link } from "react-router-dom";
import { Image, ListGroup, Form, Button } from "react-bootstrap";
const CartScreen = ({ match, location }) => {
	const dispatch = useDispatch();
	const cartReducer = useSelector((state) => state.cartReducer);
	const { cartItems } = cartReducer;
	console.log(cartItems);
	const { id } = useParams();
	// console.log(id);
	const history = useHistory();

	const qty = window.location.search
		? Number(window.location.search.split("=")[1])
		: 1;
	useEffect(() => {
		if (id) {
			console.log(id);
			dispatch(addToCart(id, qty));
		}
	}, [dispatch, id, qty]);

	const removeItemHandler = (id) => {
        dispatch(removeFromCart(id))
    };
	const checkoutHandler = () => {
		history.push("/login?redirect=shipping");
		console.log("checkout");
	};
	return (
		<div className="shopping-cart">
			<h2>SHOPPING CART</h2>
			{cartItems?.length > 0 ? (
				<div className="container-cart">
					<div className="sub-container-cart">
						{cartItems.map((item) => {
							return (
								<ListGroup variant="flush">
									<ListGroup.Item className="product-container">
										<div>
											<Image
												className="product-img"
												src={item.image}
												fluid
												rounded
											/>
										</div>
										<div className="product-name">
											<Link to={`/product/${item.product}`}>{item.name}</Link>
										</div>
										<div id="quantity-container">
											<Form.Control
                                            type="select"
												className="qty-select"
												aria-label="qty"
												value={item.qty}
												as="select"
												onChange={(e) => {
                                                    console.log(e.target.value)
													dispatch(
														addToCart(item.product, Number(e.target.value))
													);
												}}
											>
												{[...Array(item.countInStock).keys()].map((x) => {
													return (
														<option key={x + 1} value={x + 1}>
															{x + 1}
														</option>
													);
												})}

												{/* <option value="2">Two</option>
										<option value="3">Three</option> */}
											</Form.Control>
										</div>
										<div
											className="trash-btn"
											onClick={() => {
												removeItemHandler(item.product);
											}}
										>
											<i class="fas fa-trash"></i>
										</div>
									</ListGroup.Item>
								</ListGroup>
							);
						})}
					</div>
					<ListGroup className="subtotal">
						<ListGroup.Item>
							<h2>
								Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
								Items
							</h2>
						</ListGroup.Item>
						<ListGroup.Item>
							$
							{cartItems
								.reduce((acc, item) => acc + item.price * item.qty, 0)
								.toFixed(2)}
						</ListGroup.Item>
						<ListGroup.Item>
							<Button
								onClick={() => {
									checkoutHandler();
								}}
								variant="dark"
							>
								Proceed to checkout
							</Button>
						</ListGroup.Item>
					</ListGroup>
				</div>
			) : (
				<Message>
					Cart is empty <Link to="/">Go back</Link>
				</Message>
			)}
		</div>
	);
};

export default CartScreen;
