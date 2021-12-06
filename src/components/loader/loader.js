import { Spinner } from "react-bootstrap";
import React from 'react'
import './loader.css'
const loader = () => {
    return (
			<div>
				<Spinner className="spin" animation="border" role="status" >
					<span className=" sr-only">Loading...</span>
				</Spinner>
			</div>
		);
}

export default loader
