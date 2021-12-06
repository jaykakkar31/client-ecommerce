import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router";

const SearchBox = () => {
	const [keyword, setKeyword] = useState("");
	const history = useHistory();
	const onSubmitHandler = (e) => {
        console.log("CALLEdd");
		e.preventDefault();
		if (keyword?.trim()) {
			history.push(`/search/${keyword}`);
		} else {
			history.push("/");
		}
	};
	return (
		<Form style={{display:"flex"}} onSubmit={onSubmitHandler}>
			<Form.Control
				name="q"
				onChange={(e) => setKeyword(e.target.value)}
				type="text"
				placeholder="Search products ..."
			></Form.Control>
			<Button type="submit" variant="outline-success">
				Search
			</Button>
		</Form>
	);
};

export default SearchBox;
