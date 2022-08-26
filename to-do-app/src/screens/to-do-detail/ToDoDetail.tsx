import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import moment from "moment";
import {
	createOrEditToDoCall,
	deleteToDoCall,
	getToDoByName,
} from "../../API/toDoAPI";

export type toDoProps = {
	expireDate: "string";
	creationDate: "string";
	description: "string";
	id: "string";
	name: "string";
};

const ToDoDetail = () => {
	const toDoParams = useParams();

	const now = moment();

	const navigate = useNavigate();

	const [toDo, setToDo] = useState<any>({
		expireDate: "",
		creationDate: "",
		description: "",
		name: "",
	});

	const isOnTime =
		moment(toDo.expireDate, "DD-MM-YYYY").valueOf() > now.toDate().getTime();

	useEffect(() => {
		if (!toDoParams.name) return;
		getToDoByName(toDoParams.name).then((res) => {
			setToDo(res.data);
		});
	}, [toDoParams.name]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setToDo((prevState: toDoProps) => ({
			...prevState,
			[name]: value,
		}));
	};

	const deleteToDo = () => {
		if (!toDoParams.name) return;
		deleteToDoCall(toDoParams.name).finally(() => navigate("/"));
	};

	const submitChange = () => {
		const isValidDate = moment(toDo.expireDate, "DD/MM/YYYY", true).isValid();
		if (isValidDate) {
			createOrEditToDoCall(toDo)
				.catch(() => alert("There has been an error with your request."))
				.finally(() => navigate("/"));
		} else {
			alert("The date you entered is invalid.");
		}
	};

	return (
		<>
			<div
				style={{
					border: "1px solid black",
					display: "flex",
					flexDirection: "column",
					width: "50%",
					borderRadius: "20px",
					padding: "20px",
					margin: "100px auto",
				}}
			>
				{toDo && (
					<>
						<div style={{ display: "flex", justifyContent: "space-between" }}>
							<span>Name:</span> <span>{toDo?.name}</span>
						</div>
						<div style={{ display: "flex", justifyContent: "space-between" }}>
							Expiration Date:{" "}
							<input
								style={{ width: "80%", textAlign: "right" }}
								value={toDo.expireDate}
								onChange={handleChange}
								name="expireDate"
							></input>
						</div>
						<div style={{ display: "flex", justifyContent: "space-between" }}>
							Description:{" "}
							<input
								style={{ width: "80%", textAlign: "right" }}
								value={toDo?.description}
								onChange={handleChange}
								name="description"
							></input>
						</div>
						<div style={{ display: "flex", justifyContent: "space-between" }}>
							<span>Creation Date:</span>{" "}
							<span>{moment(toDo?.creationDate).format("DD/MM/YYYY")}</span>
						</div>
						<div>On time? {isOnTime ? <span>YES </span> : <span>NO</span>}</div>
					</>
				)}
				<div
					style={{
						marginTop: 15,
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-around",
					}}
				>
					<Link to={`/`}>
						<div>GO BACK</div>
					</Link>
					<button onClick={deleteToDo}>DELETE TO DO</button>
					<button onClick={submitChange}>EDIT TO DO</button>
				</div>
			</div>
		</>
	);
};

export default ToDoDetail;
