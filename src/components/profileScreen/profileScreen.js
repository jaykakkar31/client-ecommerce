import React, { useState, useEffect } from "react";
import { Form, Button, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getDetails, updateProfileDetails } from "../../actions/userAction";
import { getAllMyOrderAction } from "../../actions/orderAction";
import Message from "../message/message";
import Loader from "../loader/loader";
import "./profileScreen.css";
const ProfileScreen = () => {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState(null);

	const userDetailReducer = useSelector((state) => state.userDetailReducer);
	const { error, user, loading } = userDetailReducer;

	const getAllMyOrdersReducer = useSelector(
		(state) => state.getAllMyOrdersReducer
	);

	const {
		loading: loadingOrder,
		error: errorOrder,
		orders,
	} = getAllMyOrdersReducer;
	const userUpdateProfileReducer = useSelector(
		(state) => state.userUpdateProfileReducer
	);
	const { success } = userUpdateProfileReducer;

	const userReducer = useSelector((state) => state.userReducer);
	const { userInfo } = userReducer;
	const history = useHistory();
	useEffect(() => {
		if (!userInfo) {
			console.log("ENTER");

			history.push("/login");
		} else {
			if (!user?.name || !user?.email) {
				console.log("CALLED");
				dispatch(getDetails("profile"));
				dispatch(getAllMyOrderAction());
			} else {
				setName(user.name);
				setEmail(user.email);
			}
		}
	}, [dispatch, history, userInfo, user]);
	const formSubmitHandler = (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			setMessage("Password don't match");
		} else {
			dispatch(updateProfileDetails({ id: user._id, name, email, password }));
		}
		// setEmail();
		setPassword("");
		// setName("");
		setConfirmPassword("");
	};
	// console.log(userInfo);
	return (
		<div className="profile">
			<Col md={3}>
				<h1>Profile</h1>
				{message && <Message variant="danger">{message}</Message>}
				{error && <Message variant="danger">{error}</Message>}
				{success && <Message variant="success">Profile Updated</Message>}
				{loading && <Loader />}
				<Form onSubmit={formSubmitHandler}>
					<Form.Group className="mb-3" controlId="nameEmail">
						<Form.Label>Enter name</Form.Label>
						<Form.Control
							type="name"
							placeholder="Enter name"
							onChange={(e) => {
								setName(e.target.value);
							}}
							value={name}
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Email address</Form.Label>
						<Form.Control
							type="email"
							placeholder="Enter email"
							onChange={(e) => {
								setEmail(e.target.value);
							}}
							value={email}
						/>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control
							autoComplete="on"
							type="password"
							placeholder="Password"
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
							}}
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="confirmPassword">
						<Form.Label>Confirm Password</Form.Label>
						<Form.Control
							autoComplete="on"
							type="password"
							placeholder="Confirm password"
							value={confirmPassword}
							onChange={(e) => {
								setConfirmPassword(e.target.value);
							}}
						/>
					</Form.Group>

					<Button variant="dark" type="submit">
						Update
					</Button>
				</Form>
				{/* <div>
				Have an Account?
				<Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
					Login
				</Link>
			</div> */}
			</Col>
			<Col md={9}>
				{loadingOrder ? (
					<Loader />
				) : errorOrder ? (
					<Message variant="danger">{error}</Message>
				) : (
					<Table striped bordered hover variant="dark">
						<thead>
							<tr>
								<th>ID</th>
								<th>DATE</th>
								<th>TOTAL</th>
								<th>PAID</th>
								<th>DELIVERED</th>
                                <th></th>
							</tr>
						</thead>
						<tbody>
							{orders.map((item) => {
								return (
									<tr>
										<td>{item._id}</td>
										<td>{item.createdAt.substring(0, 10)}</td>
										<td>{item.totalPrice}</td>
										<td>
											{item.isPaid ? (
												item.paidAt.substring(0, 10)
											) : (
												<i class="fas fa-times" style={{ color: "red" }}></i>
											)}
										</td>
										<td>
											{item.isDelivered ? (
												item.deliveredAt.substring(0, 10)
											) : (
												<i class="fas fa-times" style={{ color: "red" }}></i>
											)}
										</td>
										<td>
											<Link to ={`/order/${item._id}`}><Button className="btn-sm">DETAIL</Button></Link>
										</td>
									</tr>
								);
							})}
						</tbody>
					</Table>
				)}
			</Col>
		</div>
	);
};

export default ProfileScreen;
