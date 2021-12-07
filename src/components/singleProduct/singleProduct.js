import React, { useEffect, useState } from "react";
import "./singleProduct.css";
import { Button, ListGroup, Form, FormGroup } from "react-bootstrap";
// import Product from "../products";
import { useParams, useHistory } from "react-router";
import Rating from "../productScreen/Rating";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../loader/loader";
import Message from "../message/message";
import { productDetail, createReview } from "../../actions/productAction";
import {
	PRODUCT_CREATE_REVIEW_FAIL,
} from "../../constants/productConstants";
const SingleProduct = () => {
	const history = useHistory();
	let { id } = useParams();
	const dispatch = useDispatch();
	const productDetails = useSelector((state) => state.productDetailReducer);
	const { loading, error, product } = productDetails;

	const userReducer = useSelector((state) => state.userReducer);
	const { userInfo } = userReducer;

	const createReviewReducer = useSelector((state) => state.createReviewReducer);
	const {
		success: successReview,
		error: errorReview,
	} = createReviewReducer;
	const [qty, setQty] = useState(1);
	const [comment, setComment] = useState("");
	const [rating, setRating] = useState(0);
	useEffect(() => {
		if (successReview) {
			alert("Review Submitted!");
			setComment("");
			setRating(0);
			dispatch({
				type: PRODUCT_CREATE_REVIEW_FAIL,
			});
		}

		dispatch(productDetail(id));
	}, [dispatch, id, successReview]);
	// const product = Product.find((p) => p._id === id);

	const addToCartHandler = () => {
		history.push(`/cart/${id}?qty=${qty}`);
	};

	const onSubmitHandler = (e) => {
		e.preventDefault();
		dispatch(createReview(id, { rating: rating, comment: comment }));
	};
	return (
		<div className="single-product-container">
			<span
				className="btn"
				onClick={() => {
					history.push("/");
				}}
			>
				Go Back
			</span>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<div className="big-container-details">
					<div className="lr-single-product-container">
						<div className="left-single-product-container">
							<img src={product.image} alt="product" />
						</div>
						<div className="right-single-product-container">
							<div className="inside-left-product container">
								<h2>{product.name}</h2>
								<hr />
								{/* <span> */}
								<Rating
									value={product.rating}
									text={`${product.numReviews} reviews`}
								/>
								{/* </span> */}
								<hr className="hr" />
								<span>Price: ${product.price}</span>
								<hr className="hr" />
								<span>{product.description}</span>
							</div>
							<div className="inside-right-product container">
								<ListGroup className="single-product-details">
									<ListGroup.Item>Price: ${product.price}</ListGroup.Item>
									<ListGroup.Item
										className={product.countInStock > 0 ? "green" : "red"}
									>{`Status:  ${
										product.countInStock > 0 ? "  In Stock" : "  Out of Stock"
									}`}</ListGroup.Item>
									{product.countInStock > 0 && (
										<ListGroup.Item className="qty-container">
											<span className="span-qty">Qty</span>
											<Form.Control
												className="qty-select"
												aria-label="qty"
												value={qty}
												as="select"
												onChange={(e) => {
													setQty(e.target.value);
												}}
											>
												{[...Array(product.countInStock).keys()].map((x) => {
													return (
														<option key={x + 1} value={x + 1}>
															{x + 1}
														</option>
													);
												})}

												{/* <option value="2">Two</option>
										<option value="3">Three</option> */}
											</Form.Control>
										</ListGroup.Item>
									)}

									<ListGroup.Item>
										{product.countInStock > 0 ? (
											<Button onClick={addToCartHandler} variant="dark">
												ADD TO CART
											</Button>
										) : (
											<Button
												disabled
												onClick={addToCartHandler}
												variant="dark"
											>
												ADD TO CART
											</Button>
										)}
									</ListGroup.Item>
								</ListGroup>
							</div>
						</div>
					</div>
					<>
						<h2>Reviews</h2>
						{product?.reviews?.length === 0 && (
							<Message variant="primary">No reviews</Message>
						)}
						<ListGroup variant="flush">
							{product?.reviews?.map((items) => {
								return (
									<ListGroup.Item>
										<span>
											<strong>{items.name}</strong>
										</span>
										<Rating value={items.rating} />
										<span>{items.createdAt.slice(0, 10)}</span>
										<p>{items.comment}</p>
									</ListGroup.Item>
								);
							})}
							<ListGroup.Item>
								<h3>Write a Customer Review</h3>
								{errorReview && (
									<Message variant="danger">{errorReview}</Message>
								)}
								{userInfo ? (
									<Form onSubmit={onSubmitHandler}>
										<Form.Group className="mb-3" controlId="formBasicEmail">
											<Form.Label>Rating</Form.Label>
											<Form.Control
												as="select"
												value={rating}
												onChange={(e) => {
													setRating(e.target.value);
												}}
											>
												<option value="">Select..</option>
												<option value="1">Poor</option>{" "}
												<option value="2">Fair</option>
												<option value="3">Good</option>
												<option value="4">Very Good</option>
												<option value="5">Excellent</option>{" "}
												<option value="">Select..</option>
											</Form.Control>
										</Form.Group>
										<Form.Group>
											<Form.Label>Comments</Form.Label>
											<Form.Control
												as="textarea"
												value={comment}
												row="3"
												placeholder="Comments"
												onChange={(e) => {
													setComment(e.target.value);
												}}
											/>
										</Form.Group>
										<Form.Group className="btn-holder">
											{" "}
											<Button type="submit" variant="dark">Submit</Button>
										</Form.Group>
										<FormGroup />
									</Form>
								) : (
									<Message>
										Please <Link to="/login">Sign In </Link>
										to write a review{" "}
									</Message>
								)}
							</ListGroup.Item>
						</ListGroup>
					</>
				</div>
			)}
		</div>
	);
};

export default SingleProduct;
