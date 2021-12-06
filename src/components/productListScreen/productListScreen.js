import React, { useEffect } from "react";
import Message from "../message/message";
import Loader from "../loader/loader";
import {
	listProducts,
	deleteProduct,
	createProduct,
} from "../../actions/productAction";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Button, Table, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./productListScreen.css";
import { PRODUCT_CREATE_RESET } from "../../constants/productConstants";
const ProductListScreen = () => {
	const dispatch = useDispatch();
	const productListReducer = useSelector((state) => state.productListReducer);
	const {  loading, products, error } = productListReducer;
	const history = useHistory();
	const userReducer = useSelector((state) => state.userReducer);
	const { userInfo } = userReducer;
	const productCreateReducer = useSelector(
		(state) => state.productCreateReducer
	);
	const {
		success: successCreate,
		product: createdProduct,
		error: errorCreate,
		loading: loadingCreate,
	} = productCreateReducer;

	const productDeleteReducer = useSelector(
		(state) => state.productDeleteReducer
	);
	const {
		loading: loadingDelete,
		error: errorDelete,
		success: successDelete,
	} = productDeleteReducer;
	useEffect(() => {
		dispatch({
			type: PRODUCT_CREATE_RESET,
		});
		if (!userInfo?.isAdmin) {
			history.push("/login");
		}

		if (successCreate) {
			history.push(`/admin/product/${createdProduct?._id}/edit`);
		} else {
			console.log("LIST");
			dispatch(listProducts());
		}
	}, [
		history,
		userInfo,
		dispatch,
		successDelete,
		successCreate,
		createdProduct,
	]);
	const createProductHandler = () => {
		dispatch(createProduct());
	};
	const deleteHandler = (id) => {
		if (window.confirm("Are you sure")) {
			dispatch(deleteProduct(id));
		}
	};

	return (
		<div>
			<div className="row-product">
				<Col>
					<h1>Products</h1>
				</Col>
				<Col md={2}>
					<Button
						onClick={() => {
							createProductHandler();
						}}
					>
						<i className="fas fa-plus"></i>Create Product
					</Button>
				</Col>
			</div>
			{loadingDelete && <Loader />}
			{errorDelete && <Message varaint="danger">{errorDelete}</Message>}
			{loadingCreate && <Loader />}
			{errorCreate && <Message varaint="danger">{errorCreate}</Message>}
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
							<th>PRICE</th>
							<th>CATEGORY</th>
							<th>BRAND</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{products.map((item) => {
							return (
								<tr>
									<td>{item._id}</td>
									<td>{item.name}</td>
									<td>{item.price}</td>
									<td>{item.category}</td>
									<td>{item.brand}</td>
									<td>
										<Link to={`/admin/product/${item._id}/edit`}>
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

export default ProductListScreen;
