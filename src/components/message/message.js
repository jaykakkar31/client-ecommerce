import React from "react";
import { Alert } from "react-bootstrap";
const Message = ({ variant,children }) => {
    // value and children will work for getting inside value of tag in homescreen
	return (
		<div>
			<Alert variant={variant}>{children}</Alert>
		</div>
	);
};

Message.defaultProps = {
	variant: "info",
};

export default Message;
