import React, { useEffect } from "react";
import Message from "../message/message";
import Loader from "../loader/loader";

import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getAllOrderAction } from "../../actions/orderAction";
const OrderListScreen = () => {
	const dispatch = useDispatch();
	const getAllOrdersReducer = useSelector((state) => state.getAllOrdersReducer);
	const {  loading, orders, error } = getAllOrdersReducer;
	
    const history = useHistory();
	const userReducer = useSelector((state) => state.userReducer);
	const { userInfo } = userReducer;

	
	useEffect(() => {
		
	if(userInfo &&userInfo.isAdmin){
        dispatch(getAllOrderAction())
    }

	
	}, [
		history,
		userInfo,
		dispatch,
		
	]);
	
	return (
		<div>
			<div className="row-product">
				<h1>Orders</h1>
			</div>

			{loading ? (
				<Loader />
			) : error ? (
				<Message varaint="danger">{error}</Message>
			) : (
				<Table striped bordered hover variant="dark">
					<thead>
						<tr>
							<th>ID</th>
							<th>USER</th>
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
									<td>{item.user && item.user.name}</td>
									<td>{item.createdAt.substring(0, 10)}</td>
									<td>{item.totalPrice}</td>
									<td>
										{item.isPaid ? (
											item.paidAt.substring(0, 10)
										) : (
											<i className="fas fa-times" style={{ color: "red" }}></i>
										)}
									</td>
									<td>
										{item.isDelivered ? (
											item.deliveredAt.substring(0, 10)
										) : (
											<i className="fas fa-times" style={{ color: "red" }}></i>
										)}
									</td>

									<td>
										<Link to={`/order/${item._id}`}>
											<Button variant="light">
												Details
											</Button>
										</Link>
										
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

export default OrderListScreen;
