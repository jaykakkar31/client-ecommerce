import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { getDetails, updateUser } from "../../actions/userAction";
import Message from "../message/message";
import Loader from "../loader/loader";

import { USER_UPDATE_RESET } from "../../constants/userConstants";
import "./userEditScreen.css";
const UserEditScreen = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [isAdmin, setIsAdmin] = useState(false);
	const [name, setName] = useState("");

	const userDetailReducer = useSelector((state) => state.userDetailReducer);
	const { error, user, loading } = userDetailReducer;

	const history = useHistory();

	const userUpdateReducer = useSelector((state) => state.userUpdateReducer);
	const {
		
		loading: loadingUpdate,
		error: errorUpdate,
		success: successUpdate,
	} = userUpdateReducer;
	useEffect(() => {
		if (successUpdate) {
			dispatch({
				type: USER_UPDATE_RESET,
			});
			history.push("/admin/userlist");
		} else {
			if (!user || user._id !== id) {
				dispatch(getDetails(id));
			} else {
				setEmail(user?.email);
				setName(user?.name);
				setIsAdmin(user?.isAdmin);
			}
		}
	}, [dispatch, user,history,successUpdate, id]);

	const formSubmitHandler = (e) => {
		e.preventDefault();
		dispatch(updateUser({ name:name, email:email,_id:user._id,isAdmin:isAdmin }));
	};
	return (
		<div className="form-container">
			<Link to="/admin/userlist">Go Back</Link>
			<h1>Edit User</h1>
            {loadingUpdate&&<Loader/>}
            {errorUpdate&&<Message variant="danger">{errorUpdate}</Message>}
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
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
						<Form.Check
							type="checkbox"
							label="Is Admin"
							checked={isAdmin}
							onChange={(e) => {
								setIsAdmin(e.target.checked);
							}}
						/>
					</Form.Group>

					<Button variant="dark" type="submit">
						Update
					</Button>
				</Form>
			)}
		</div>
	);
};

export default UserEditScreen;
