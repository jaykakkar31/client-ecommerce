import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Loader from "./loader/loader";
import Message from "./message/message";
import { listTopProduct } from "../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
const ProductCarousel = () => {
	const dispatch = useDispatch();
	const topProductReducer = useSelector((state) => state.topProductReducer);
	const { error, loading, product } = topProductReducer;

	useEffect(() => {
		dispatch(listTopProduct());
	}, [dispatch]);
	return (
		<div>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Carousel indicatorLabels fade className="bg-dark" pause="hover">
					{product?.map((item) => {
						return (
							<Carousel.Item key={item._id}>
								<Link to={`/product/${item._id}`}>
									<Image className="img-product" fluid src={item.image} />

									<Carousel.Caption>
										<h3>
											{item.name} ${item.price}
										</h3>
									</Carousel.Caption>
								</Link>
							</Carousel.Item>
						);
					})}
				</Carousel>
			)}
		</div>
	);
};

export default ProductCarousel;
