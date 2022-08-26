import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import moment from "moment";
import {
	createOrEditToDoCall,
	deleteToDoCall,
	getToDoByName,
} from "../../API/toDoAPI";
import "./ToDoDetail.styles.scss";

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
			<div className="title">EDIT TO DO</div>
			<div className="subtitle">Edit or delete your existing to do.</div>
			<div className="toDoDetailContainer">
				{toDo && (
					<>
						<div className="toDoRow">
							<span className="toDoDetailHeader">Name:</span>{" "}
							<span>{toDo?.name}</span>
						</div>
						<div className="toDoRow">
							<span className="toDoDetailHeader">Expiration Date: </span>
							<input
								value={toDo.expireDate}
								onChange={handleChange}
								name="expireDate"
							></input>
						</div>
						<div className="toDoRow">
							<span className="toDoDetailHeader"> Description:</span>
							<input
								value={toDo?.description}
								onChange={handleChange}
								name="description"
								maxLength={80}
							></input>
						</div>
						<div className="toDoRow">
							<span className="toDoDetailHeader">Creation Date:</span>
							<span>{moment(toDo?.creationDate).format("DD/MM/YYYY")}</span>
						</div>
						<div className="toDoRow">
							<span className="toDoDetailHeader">On time? </span>
							{isOnTime ? <span>YES </span> : <span>NO</span>}
						</div>
					</>
				)}
				<div className="bottomRow">
					<Link to={`/`} style={{ textDecoration: " none" }}>
						<div className="goBackDetail">GO BACK</div>
					</Link>
					<div className="deleteToDoDetail" onClick={deleteToDo}>
						DELETE TO DO
					</div>
					<div className="editToDoDetail" onClick={submitChange}>
						EDIT TO DO
					</div>
				</div>
			</div>
		</>
	);
};

export default ToDoDetail;
