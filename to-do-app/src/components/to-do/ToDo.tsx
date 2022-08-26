import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { deleteToDoCall } from "../../API/toDoAPI";
import "./ToDo.styles.scss";

export type ToDoProps = {
	expireDate: "string";
	creationDate: "string";
	description: "string";
	id: "string";
	name: "string";
};

const ToDo = ({
	expireDate,
	creationDate,
	description,
	name,
	id,
}: ToDoProps) => {
	const now = moment();

	const deleteToDo = () => {
		if (!name) return;
		deleteToDoCall(name).finally(() => window.location.reload());
	};

	const isOnTime =
		moment(expireDate, "DD-MM-YYYY").valueOf() > now.toDate().getTime();

	return (
		<>
			<div
				className={
					isOnTime ? "singleToDoContainerOnTime" : "singleToDoContainerExpired"
				}
			>
				<div className="toDoRowMenu">
					<span>Name: </span> <span> {name}</span>
				</div>
				<div className="toDoRowMenu">
					<span>Expiration Date: </span> <span> {expireDate}</span>
				</div>
				<div className="toDoRowMenu">
					<span>Description: </span>
					<span style={{ maxWidth: "70%" }}> {description}</span>
				</div>
				<div className="toDoRowMenu">
					<span>Creation Date: </span>{" "}
					<span> {moment(creationDate).format("DD/MM/YYYY")}</span>
				</div>
				<div className="toDoRowMenu">
					On time? {isOnTime ? <span>YES </span> : <span>NO</span>}{" "}
				</div>
				<div className="bottomRowMenu">
					<Link to={`/todo/${name}`} style={{ textDecoration: "none" }}>
						<div className="editToDo">EDIT</div>
					</Link>
					<div className="deleteToDo" onClick={deleteToDo}>
						DELETE
					</div>
				</div>
			</div>
		</>
	);
};

export default ToDo;
