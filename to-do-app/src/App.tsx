import "./App.css";
import AllToDos from "./screens/all-to-dos/AllToDos";
// import ToDoDetail from "./screens/to-do-detail/ToDoDetail";
import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App: FC = () => {
	const [toDos, setToDos] = useState([]);

	useEffect(() => {
		axios
			.get(
				"https://0jj5dyvv79.execute-api.eu-west-1.amazonaws.com/dev/items/7471f91e-9d1f-42f3-bad0-0d145577f6e6"
			)
			.then((res) => setToDos(res.data));
	}, []);

	return (
		<>
			<AllToDos toDos={toDos} />
		</>
	);
};
export default App;
