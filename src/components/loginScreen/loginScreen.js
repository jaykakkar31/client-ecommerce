import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { userAction } from "../../actions/userAction";
import Message from "../message/message";
import Loader from "../loader/loader";
import "./loginScreen.css";
const LoginScreen = ({ location }) => {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const userReducer = useSelector((state) => state.userReducer);
	const { error, userInfo, loading } = userReducer;
	const history = useHistory();
	const redirect = window.location.search
		&&window.location.search.split("=")[1]
	
	useEffect(() => {
		if (userInfo) {
			history.push(redirect);
		}
	}, [history, userInfo, redirect]);
	const formSubmitHandler = (e) => {
		e.preventDefault();
		dispatch(userAction(email, password));
        setEmail("")
        setPassword("")
	};
	// console.log(userInfo);
	return (
		<div className="form-container">
			<h1>Sign In</h1>

			{error && <Message variant="danger">{error}</Message>}
			{loading&&<Loader/>}
			<Form onSubmit={formSubmitHandler}>
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
						type="password"
                        autoComplete="on"
						placeholder="Password"
						value={password}
						onChange={(e) => {
							setPassword(e.target.value);
						}}
					/>
				</Form.Group>

				<Button variant="dark" type="submit">
					Submit
				</Button>
			</Form>
			<div>
				New Customer?
				<Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
					Register
				</Link>
			</div>
		</div>
	);
};

export default LoginScreen;
