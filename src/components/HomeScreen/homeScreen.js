import React, { useEffect } from "react";
// import products from "../products";
import "./homeScreen.css";
import ProductScreen from "../productScreen/productScreen";

import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../actions/productAction";
import Message from "../message/message";
import Loader from "../loader/loader";
import ProductCarousel from "../productCarousel";
import Meta from "../Meta";
const HomeScreen = () => {
	// const [products, setProducts] = useState([]);
	// console.log(products);

	const { keyword } = useParams();
	const dispatch = useDispatch();

	//state.name_of_function_in_reducer
	const productList = useSelector((state) => state.productListReducer);
	// console.log(productList);
	const { loading, error, products } = productList;

	useEffect(() => {
		//Firing the function
		//keyword sent for searcing purpose
			dispatch(listProducts(keyword));
		
	}, [dispatch, keyword]);
	console.log(products);
	// const products=[]
	return (
		<div className="product-container">
			<Meta />
			{/* <iframe
            title="Hel"
				id="gmap_canvas"
				src="https://maps.google.com/maps?q=Signature%20View%2CAppartment%20Delhi%2C%20India%2C%20India&t=&z=13&ie=UTF8&iwloc=&output=embed"
			></iframe> */}

			{!keyword && <ProductCarousel />}
			<h2>LATEST PRODUCTS</h2>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<div className="product-data">
					{products.length !== 0 &&
						products?.map((product, index) => {
							return <ProductScreen key={index} product={product} />;
						})}
				</div>
			)}
		</div>
	);
};

export default HomeScreen;
