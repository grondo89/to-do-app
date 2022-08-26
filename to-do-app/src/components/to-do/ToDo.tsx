import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { deleteToDoCall } from "../../API/toDoAPI";

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
				style={{
					border: "1px solid black",
					display: "flex",
					flexDirection: "column",
					width: "100%",
					borderRadius: "20px",
					padding: "20px",
					marginBottom: "5%",
				}}
			>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						marginBottom: "1%",
					}}
				>
					<span>Name: </span> <span> {name}</span>
				</div>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						marginBottom: "1%",
					}}
				>
					<span>Expiration Date: </span> <span> {expireDate}</span>
				</div>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						marginBottom: "1%",
					}}
				>
					<span>Description: </span>
					<span style={{ maxWidth: "70%" }}> {description}</span>
				</div>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						marginBottom: "1%",
					}}
				>
					<span>Creation Date: </span>{" "}
					<span> {moment(creationDate).format("DD/MM/YYYY")}</span>
				</div>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						marginBottom: "1%",
					}}
				>
					On time? {isOnTime ? <span>YES </span> : <span>NO</span>}{" "}
				</div>
				<div
					style={{
						marginTop: 5,
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-around",
					}}
				>
					<Link to={`/todo/${name}`}>
						<div>EDIT</div>
					</Link>
					<button onClick={deleteToDo}>DELETE</button>
				</div>
			</div>
		</>
	);
};

export default ToDo;
