import "./App.css";
import AllToDos from "./screens/all-to-dos/AllToDos";
import React, { FC, useEffect, useState } from "react";
import { getAllToDos } from "./API/toDoAPI";

const App: FC = () => {
	const [toDos, setToDos] = useState([]);

	useEffect(() => {
		getAllToDos().then((res) => setToDos(res.data));
	}, []);

	return (
		<>
			<AllToDos toDos={toDos} />
		</>
	);
};
export default App;
