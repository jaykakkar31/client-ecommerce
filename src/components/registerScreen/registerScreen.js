import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { register } from "../../actions/userAction";
import Message from "../message/message";
import Loader from "../loader/loader";
const RegisterScreen = ({ location }) => {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState(null);

	const userRegisterReducer = useSelector((state) => state.userRegisterReducer);
	const { error, userInfo, loading } = userRegisterReducer;
    
	const history = useHistory();
	const redirect =
		window.location.search && window.location.search.split("=")[1];

	useEffect(() => {
		if (userInfo) {
			history.push(redirect);
		}
	}, [history, userInfo, redirect]);
	const formSubmitHandler = (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			setMessage("Password don't match");
		} else {
			console.log("ENTER");
			dispatch(register(email, password, name));
		}
		setEmail("");
		setPassword("");
		setName("");
        setConfirmPassword("")
	};
	console.log(userInfo);
	return (
		<div className="form-container">
			<h1>Sign Up</h1>
			{message && <Message variant="danger">{message}</Message>}
			{error && <Message variant="danger">{error}</Message>}
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
					Submit
				</Button>
			</Form>
			<div>
				Have an Account?
				<Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
					Login
				</Link>
			</div>
		</div>
	);
};

export default RegisterScreen;
