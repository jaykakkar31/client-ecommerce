import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import Message from "../message/message";
import Loader from "../loader/loader";
import axios from "axios";
import { productDetail, updateProduct } from "../../actions/productAction";
import { PRODUCT_UPDATE_RESET } from "../../constants/productConstants";
const UserEditScreen = () => {
	const { id } = useParams();

	const dispatch = useDispatch();
	const [brand, setBrand] = useState("");
	const [price, setPrice] = useState(0);
	const [name, setName] = useState("");
	const [image, setImage] = useState("");
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState("");
	const [countInStock, setCountInStock] = useState("");
	const [uploading, setUploading] = useState(false);

	const productUpdateReducer = useSelector(
		(state) => state.productUpdateReducer
	);
	const {
		error: errorUpdate,
		loading: loadingUpdate,
		success: successUpdate,
	} = productUpdateReducer;
	const productDetailReducer = useSelector(
		(state) => state.productDetailReducer
	);
	const { error, product, loading, success } = productDetailReducer;

	const history = useHistory();

	useEffect(() => {
		if (successUpdate) {
			dispatch({ type: PRODUCT_UPDATE_RESET });
			history.push("/admin/productlist");
		} else {
			if (!product?.name || product?._id !== id) {
				dispatch(productDetail(id));
			} else {
				console.log(product);
				setName(product.name);
				setDescription(product.description);
				setCategory(product.category);
				setBrand(product.brand);
				setImage(product.image);
				setPrice(product.price);
				setCountInStock(product.countInStock);
			}
		}
	}, [dispatch, success, history, id, successUpdate]);

	const formSubmitHandler = (e) => {
		e.preventDefault();
		dispatch(
			updateProduct({
				_id: product._id,
				name: name,
				description: description,
				category: category,
				brand: brand,
				price: price,
				countInStock: countInStock,
				image: image,
			})
		);
	};
	const uploadFileHandler = async (e) => {
		const file = e.target.files[0];
        console.log(file);
		 const formData = new FormData();
			formData.append("image", file);
			setUploading(true);

		try {
			const config = {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			};

			const { data } = await axios.post("/api/uploads",formData,config);
            console.log(data,"DATSA");
			setImage(data);
			setUploading(false);
		} catch (error) {
			console.log(error);
			setUploading(false);
		}
	};
	return (
		<div className="form-container">
			<Link to="/admin/productlist">Go Back</Link>
			<h1>Edit Product</h1>
			{loadingUpdate && <Loader />}
			{errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Form onSubmit={formSubmitHandler}>
					<Form.Group className="mb-3" controlId="name">
						<Form.Label>Name</Form.Label>
						<Form.Control
							type="name"
							placeholder="Enter name"
							onChange={(e) => {
								setName(e.target.value);
							}}
							value={name}
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="price">
						<Form.Label>Price</Form.Label>

						<Form.Control
							type="text"
							placeholder="Enter price"
							onChange={(e) => {
								setPrice(e.target.value);
							}}
							value={price}
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="image">
						<Form.Label>Image</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter image url"
							onChange={(e) => {
								setImage(e.target.value);
							}}
							value={image}
						/>
						<Form.File
							// id="image-file"
							label="Choose File"
							custom
                            type="file"
							onChange={uploadFileHandler}
						></Form.File>
						{uploading && <Loader />}
					</Form.Group>
					<Form.Group className="mb-3" controlId="countInStock">
						<Form.Label>Stock</Form.Label>

						<Form.Control
							type="text"
							placeholder="Enter count in stock"
							onChange={(e) => {
								setCountInStock(e.target.value);
							}}
							value={countInStock}
						/>
					</Form.Group>

					<Form.Group className="mb-3" controlId="brand">
						<Form.Label>Brand</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter brand"
							onChange={(e) => {
								setBrand(e.target.value);
							}}
							value={brand}
						/>
					</Form.Group>

					<Form.Group className="mb-3" controlId="category">
						<Form.Label>Category</Form.Label>

						<Form.Control
							type="text"
							placeholder="Enter category"
							onChange={(e) => {
								setCategory(e.target.value);
							}}
							value={category}
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="decription">
						<Form.Label>Description</Form.Label>

						<Form.Control
							type="text"
							placeholder="Enter description"
							onChange={(e) => {
								setDescription(e.target.value);
							}}
							value={description}
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
