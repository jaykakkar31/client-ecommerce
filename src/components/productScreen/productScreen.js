import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./productScreen.css";
import Rating from "./Rating";

const ProductScreen = ({product}) => {

	return (
		<Card className="card-container" >
			<Link to={`/product/${product._id}`}>
				{" "}
				<Card.Img variant="top" src={product.image} />
				<Card.Body>
					<Card.Title>{product?.name}</Card.Title>
					
						<Rating
							value={product.rating}
							text={` ${product.numReviews} reviews`}
						/>
					
					<Card.Text>{product.price}</Card.Text>
					{/* <Button variant="primary">Go somewhere</Button> */}
				</Card.Body>
			</Link>
		</Card>
	);
};

export default ProductScreen;
