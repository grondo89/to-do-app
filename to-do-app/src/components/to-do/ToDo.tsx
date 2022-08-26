import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

export type toDoProps = {
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
}: toDoProps) => {
	const now = moment();

	const deleteToDo = () => {
		axios
			.delete(
				`https://0jj5dyvv79.execute-api.eu-west-1.amazonaws.com/dev/items/object/7471f91e-9d1f-42f3-bad0-0d145577f6e6/${name}`
			)
			.finally(() => window.location.reload());
	};

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
				}}
			>
				<div>Name: {name}</div>
				<div>Expiration Date: {expireDate}</div>
				<div>Description: {description}</div>
				<div>Creation Date: {moment(creationDate).format("DD/MM/YYYY")}</div>
				<div>
					On time?{" "}
					{moment(expireDate, "DD-MM-YYYY").valueOf() >
					now.toDate().getTime() ? (
						<span>YES </span>
					) : (
						<span>NO</span>
					)}{" "}
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
					{/* <Link to={"/"}> */}
					<button onClick={deleteToDo}>DELETE</button>
					{/* </Link> */}
				</div>
			</div>
		</>
	);
};

export default ToDo;
