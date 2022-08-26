import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { createOrEditToDoCall, API_ID } from "../../API/toDoAPI";
import "./CreateToDo.styles.scss";

export type ToDoProps = {
	expireDate: "string";
	creationDate: "string";
	description: "string";
	id: "string";
	name: "string";
};

const CreateToDoScreen = () => {
	const navigate = useNavigate();

	const [readyToCreate, setReadyToCreate] = useState(false);
	const [toDo, setToDo] = useState<any>({
		expireDate: "",
		creationDate: "",
		description: "",
		name: "",
		id: API_ID,
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setToDo((prevState: ToDoProps) => ({
			...prevState,
			[name]: value,
		}));
	};

	const createNewToDo = () => {
		const now = moment().milliseconds;
		const isValidDate = moment(toDo.expireDate, "DD/MM/YYYY", true).isValid();

		if (isValidDate) {
			setToDo((prevState: ToDoProps) => ({
				...prevState,
				creationDate: now,
			}));
			setReadyToCreate(true);
		} else {
			alert("The date you entered is invalid.");
		}
	};

	useEffect(() => {
		if (readyToCreate) {
			createOrEditToDoCall(toDo)
				.catch(() => alert("There has been an error with your request."))
				.finally(() => navigate("/"));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [readyToCreate]);

	return (
		<>
			<div className="title">CREATE NEW TO DO</div>
			<div className="createToDoContainer">
				{toDo && (
					<>
						<div className="createToDoRow">
							<span className="toDoDetailHeader">Name:</span>
							<input
								value={toDo.name}
								name="name"
								onChange={handleChange}
							></input>
						</div>
						<div className="createToDoRow">
							<span className="toDoDetailHeader"> Expiration Date: </span>
							<input
								value={toDo.expireDate}
								placeholder="DD/MM/YYYY"
								name="expireDate"
								onChange={handleChange}
							></input>
						</div>
						<div className="createToDoRow">
							<span className="toDoDetailHeader">Description: </span>
							<input
								value={toDo?.description}
								name="description"
								onChange={handleChange}
							></input>
						</div>
					</>
				)}
				<div className="bottomRow">
					<Link to={`/`} style={{ textDecoration: " none" }}>
						<div className="createGoBack">GO BACK</div>
					</Link>
					<div className="createToDo" onClick={createNewToDo}>
						CREATE TO DO
					</div>
				</div>
			</div>
		</>
	);
};

export default CreateToDoScreen;
