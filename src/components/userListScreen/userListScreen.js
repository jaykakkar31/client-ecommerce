import React, { useEffect } from "react";
import Message from "../message/message";
import Loader from "../loader/loader";
import { listUsers, deleteUsers } from "../../actions/userAction";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
const ListUserScreen = () => {
	const dispatch = useDispatch();
	const userListReducer = useSelector((state) => state.userListReducer);
	const { loading, users, error } = userListReducer;
	const history = useHistory();
	const userReducer = useSelector((state) => state.userReducer);
	const { userInfo } = userReducer;

	const userDeleteReducer = useSelector((state) => state.userDeleteReducer);
	const { success: successDelete } = userDeleteReducer;
	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(listUsers());
		} else {
			history.push("/login");
		}
	}, [successDelete, history, userInfo, dispatch]);
	const deleteHandler = (id) => {
		if (window.confirm("Are you sure")) {
			dispatch(deleteUsers(id));
		}
	};

	return (
		<div>
			{loading ? (
				<Loader />
			) : error ? (
				<Message varaint="danger">{error}</Message>
			) : (
				<Table striped bordered hover variant="dark">
					<thead>
						<tr>
							<th>ID</th>
							<th>NAME</th>
							<th>EMAIL</th>
							<th>ADMIN</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{users.map((item) => {
							return (
								<tr>
									<td>{item._id}</td>
									<td>{item.name}</td>
									<td>
										<a href={`mailto:${item.email}`}>{item.email}</a>
									</td>
									<td>
										{item.isAdmin ? (
											<i
												className="fas fa-check"
												style={{ color: "green" }}
											></i>
										) : (
											<i className="fas fa-times" style={{ color: "red" }}></i>
										)}
									</td>

									<td>
										<Link to={`/admin/user/${item._id}/edit`}>
											<Button variant="light">
												<i className="fas fa-edit"></i>
											</Button>
										</Link>
										<Button
											variant="danger"
											onClick={() => {
												deleteHandler(item._id);
											}}
										>
											{" "}
											<i className="fas fa-trash"></i>
										</Button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			)}
		</div>
	);
};

export default ListUserScreen;
