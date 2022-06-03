import React, { useState } from "react";
import { Form, Button, ProgressBar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Message from "../message/message";
import Loader from "../loader/loader";
import axios from "axios";
import { storage } from "../firebase/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import { createProduct } from "../../actions/productAction";
const ProductCreateScreen = () => {
	const dispatch = useDispatch();
	const [brand, setBrand] = useState("");
	const [price, setPrice] = useState(0);
	const [name, setName] = useState("");
	const [image, setImage] = useState("");
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState("");
	const [countInStock, setCountInStock] = useState(0);
	const [uploading, setUploading] = useState(false);
	const [iImage, setiImage] = useState(null);
	const [iprogress, setIProgress] = useState(0);
	const history = useHistory();
	const productCreateReducer = useSelector(
		(state) => state.productCreateReducer
	);
	const { error, loading } = productCreateReducer;

	const formSubmitHandler = (e) => {
		e.preventDefault();
		console.log("CALLED");
		dispatch(
			createProduct({
				name: name,
				description: description,
				category: category,
				brand: brand,
				price: price,
				countInStock: countInStock,
				image: image,
			})
		);
		history.push("/admin/productlist");
	};

	const iImageHanlder = () => {
		const storageRef = ref(storage, `property/${iImage.name}`);
		const uploadTask = uploadBytesResumable(storageRef, iImage);

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const prog = Math.round(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
				);
				setIProgress(prog);
			},
			(error) => console.log(error),
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					// setUserImage(downloadURL)
					setImage(downloadURL);
				});
			}
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

			const { data } = await axios.post("/api/uploads", formData, config);
			console.log(data, "DATSA");
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
			<h1>Create Product</h1>

			{loading && <Loader />}
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Form onSubmit={formSubmitHandler}>
					<Form.Group className="mb-3" controlId="name">
						<Form.Label>Name</Form.Label>
						<Form.Control
							required
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
							required
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
						{/* <Form.Control
							required
							type="text"
							placeholder="Enter image url"
							onChange={(e) => {
								setImage(e.target.value);
							}}
							value={image}
						/> */}
						<input
							// id="image-file"

							required
							label="Choose File"
							// custom
							accept=".jpg,.jpeg,.png"
							type="file"
							onChange={(e) => {
								setiImage(e.target.files[0]);
							}}
						></input>
						{iprogress > 0 && iprogress < 100 && (
							<ProgressBar
								striped
								variant="success"
								style={{ marginTop: "10px" }}
								now={iprogress}
							/>
						)}
						<Button
							onClick={iImageHanlder}
							variant="btn btn-secondary btn-outline w-100"
							style={{
								backgroundColor: "#00c194",
								textAlign: "center",
								border: 0,
								height: "30px",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								fontSize: "16px",
								padding: "20px ",
								marginTop: "10px",
							}}
						>
							{iprogress === 100 ? "Uploaded" : "Upload"}
						</Button>
						{/* {uploading && <Loader />} */}
					</Form.Group>
					<Form.Group className="mb-3" controlId="countInStock">
						<Form.Label>Stock</Form.Label>

						<Form.Control
							required
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
							required
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
							required
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
							required
							type="text"
							placeholder="Enter description"
							onChange={(e) => {
								setDescription(e.target.value);
							}}
							value={description}
						/>
					</Form.Group>

					<Button variant="dark" type="submit">
						Create
					</Button>
				</Form>
			)}
		</div>
	);
};

export default ProductCreateScreen;
