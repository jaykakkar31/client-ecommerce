import React from "react";

const Rating = ({ value, text }) => {
	return (
		<div>
			<span style={{ color: "#f8e825" }}>
				{value >= 1 ? (
					<i class="fas fa-star"></i>
				) : value >= 0.5 ? (
					<i class="fas fa-star-half-alt"></i>
				) : (
					<i class="far fa-star"></i>
				)}
			</span>
			<span style={{ color: "#f8e825" }}>
				{value >= 2 ? (
					<i class="fas fa-star"></i>
				) : value >= 1.5 ? (
					<i class="fas fa-star-half-alt"></i>
				) : (
					<i class="far fa-star"></i>
				)}
			</span>{" "}
			<span style={{ color: "#f8e825" }}>
				{value >= 3 ? (
					<i class="fas fa-star"></i>
				) : value >= 2.5 ? (
					<i class="fas fa-star-half-alt"></i>
				) : (
					<i class="far fa-star"></i>
				)}
			</span>{" "}
			<span style={{ color: "#f8e825" }}>
				{value >= 4 ? (
					<i class="fas fa-star"></i>
				) : value >= 3.5 ? (
					<i class="fas fa-star-half-alt"></i>
				) : (
					<i class="far fa-star"></i>
				)}
			</span>
			<span style={{ color: "#f8e825" }}>
				{value >= 5 ? (
					<i class="fas fa-star"></i>
				) : value >= 4.5 ? (
					<i class="fas fa-star-half-alt"></i>
				) : (
					<i class="far fa-star"></i>
				)}
			</span>
			<span>{text}</span>
		</div>
	);
};

export default Rating;
