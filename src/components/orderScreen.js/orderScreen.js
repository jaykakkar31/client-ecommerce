import React, { useState,useEffect } from "react";
import {

	Button,
	ListGroup,
	Image,
	Row,
	Col,
} from "react-bootstrap";
import { PayPalButton } from "react-paypal-button-v2";
import {
	ORDER_PAY_RESET,
	ORDER_DELIVER_RESET,
} from "../../constants/orderConstants";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {  useParams } from "react-router";
import Message from "../message/message";
import "./orderScreen.css";
import Loader from "../loader/loader";
import {
	getOrderById,
	payOrder,
	updateDeliverOrder,
} from "../../actions/orderAction";
import axios from "axios";
const OrderScreen = () => {
	const dispatch = useDispatch();
	const { id } = useParams();

	const getOrderReducer = useSelector((state) => state.getOrderReducer);
	const { orderInfo, loading, error } = getOrderReducer;

	const payReducer = useSelector((state) => state.payReducer);
	const { loading: loadingPay, success: successPay } = payReducer;

	const userReducer = useSelector((state) => state.userReducer);
	const { userInfo } = userReducer;
	const updateOrderDeliver = useSelector((state) => state.updateOrderDeliver);
	const {
		success: successDeliver,
		
	} = updateOrderDeliver;
	const [sdkReady, setSdkReady] = useState(false);
	useEffect(() => {
		const addPaypalScript = async () => {
			const { data } = await axios.get("/api/config/paypal");
			const script = document.createElement("script");
			script.type = "text/javascript";
			script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
			script.async = true;
			setSdkReady(true);
			script.onLoad = () => {
				console.log(sdkReady);

				setSdkReady(true);
			};
			document.body.appendChild(script);
		};
		if (!orderInfo?.order || successPay || successDeliver) {
			console.log("RESET");
			dispatch({
				type: ORDER_PAY_RESET,
			});
			dispatch({
				type: ORDER_DELIVER_RESET,
			});
			dispatch(getOrderById(id));
		} else if (!orderInfo?.order.isPaid) {
			if (!window.paypal) {
				addPaypalScript();
			} else {
				setSdkReady(true);
			}
			// dispatch(payOrder());
		}
	}, [dispatch, id, successPay, sdkReady, successDeliver]);
	// return<div></div>
	const onSuccessPaymentHandler = (paymentResult) => {
		try {
			dispatch(payOrder(id, paymentResult));
		} catch (e) {
			console.log(e);
		}
	};
	const deliverHandler = () => {
		try {
			dispatch(updateDeliverOrder(id));
		} catch (e) {
            console.log(e);
        }
	};
	return loading ? (
		<Loader />
	) : error ? (
		<Message variant="danger">{error}</Message>
	) : (
		<div>
			<h2 className="order">Order : {id}</h2>
			<div className="order-summary">
				<Col>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h3>Shipping</h3>
							<p>
								<span>Name : </span>
								{orderInfo?.order.user.name}
							</p>

							<p>
								<span>Email : </span>

								<a href={`mailto:${orderInfo?.order.user.email}`}>
									{orderInfo?.order.user.email}
								</a>
							</p>
							<p>
								<span>Address: </span>
								{orderInfo?.order.shippingAddress.address},{" "}
								{orderInfo?.order.shippingAddress.city}
								{" - "}
								{orderInfo?.order.shippingAddress.postalCode},{" "}
								{orderInfo?.order.shippingAddress.country}
							</p>
							{orderInfo?.order.isDelivered ? (
								<Message variant="success">
									Deliverd on {orderInfo?.order.deliveredAt}
								</Message>
							) : (
								<Message variant="danger">Not Delivered</Message>
							)}
						</ListGroup.Item>
						<ListGroup.Item>
							<h3>Payment Method</h3>
							<p>
								<span>Method: </span>
								{orderInfo?.order.paymentMethod}
							</p>
							{orderInfo?.order.isPaid ? (
								<Message variant="success">
									Paid on {orderInfo?.order.paidAt}
								</Message>
							) : (
								<Message variant="danger">Not Paid</Message>
							)}
						</ListGroup.Item>
						<ListGroup.Item>
							<h3>Order Items</h3>

							{orderInfo?.order.orderItems.length === 0 ? (
								<Message variant="primary">Cart is empty</Message>
							) : (
								<ListGroup>
									{orderInfo?.order.orderItems.map((item, index) => {
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
														{item.price} x {item.qty} = $
														{(item.qty * item.price).toFixed(2)}
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
								<Col>${orderInfo?.order.itemsPrice}</Col>
							</Row>
						</ListGroup.Item>
						<ListGroup.Item>
							<Row>
								<Col>Shipping</Col>
								<Col>${orderInfo?.order.shippingPrice}</Col>
							</Row>
						</ListGroup.Item>

						<ListGroup.Item>
							<Row>
								<Col>Tax</Col>
								<Col>${orderInfo?.order.taxPrice}</Col>
							</Row>
						</ListGroup.Item>
						<ListGroup.Item>
							<Row>
								<Col>Total</Col>
								<Col>${orderInfo?.order.totalPrice}</Col>
							</Row>
						</ListGroup.Item>
						{error && (
							<ListGroup.Item>
								<Message variant="danger">{error}</Message>
							</ListGroup.Item>
						)}
						{!orderInfo?.order.isPaid && (
							<ListGroup.Item>
								{loadingPay && <Loader />}
								{!orderInfo?.order.isPaid && (
									<PayPalButton
										amount={orderInfo?.order.totalPrice}
										onSuccess={onSuccessPaymentHandler}
									/>
								)}
							</ListGroup.Item>
						)}
						{userInfo?.isAdmin &&
							orderInfo?.order.isPaid &&
							!orderInfo?.order.isDelivered && (
								<ListGroup.Item>
									<Button onClick={() => deliverHandler(id)}>
										Mark as delivered
									</Button>
								</ListGroup.Item>
							)}
					</ListGroup>
				</Col>
			</div>
		</div>
	);
};

export default OrderScreen;
