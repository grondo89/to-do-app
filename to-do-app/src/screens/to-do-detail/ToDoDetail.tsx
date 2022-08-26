import React, { FC, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";

export type toDoProps = {
	expireDate: "string";
	creationDate: "string";
	description: "string";
	id: "string";
	name: "string";
};

const ToDoDetail = () => {
	const toDoParams = useParams();

	const now = moment().format("DD/MM/YYYY");
	const now2 = moment();

	const navigate = useNavigate();

	const [toDo, setToDo] = useState<any>({
		expireDate: "",
		creationDate: "",
		description: "",
		name: "",
	});

	useEffect(() => {
		axios
			.get(
				`https://0jj5dyvv79.execute-api.eu-west-1.amazonaws.com/dev/items/object/7471f91e-9d1f-42f3-bad0-0d145577f6e6/${toDoParams.name}`
			)
			.then((res) => {
				setToDo(res.data);
			});
	}, []);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setToDo((prevState: toDoProps) => ({
			...prevState,
			[name]: value,
		}));
	};

	const deleteToDo = () => {
		axios
			.delete(
				`https://0jj5dyvv79.execute-api.eu-west-1.amazonaws.com/dev/items/object/7471f91e-9d1f-42f3-bad0-0d145577f6e6/${toDoParams.name}`
			)
			.finally(() => navigate("/"));
	};

	const submitChange = () => {
		const isValidDate = moment(toDo.expireDate, "DD/MM/YYYY", true).isValid();
		if (isValidDate) {
			axios
				.post(
					"https://0jj5dyvv79.execute-api.eu-west-1.amazonaws.com/dev/items",
					toDo,
					{ headers: { "Content-Type": "application/json" } }
				)
				.then((res) => console.log("akakkakkkakak", res))
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
								// value={new Date(toDo?.expireDate).toDateString()}
								// value={moment(toDo?.expireDate).format("DD/MM/YYYY")}
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
						<div>
							On time?{" "}
							{moment(toDo.expireDate, "DD-MM-YYYY").valueOf() >
							now2.toDate().getTime() ? (
								<span>YES </span>
							) : (
								<span>NO</span>
							)}{" "}
						</div>
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

// console.log("@@@@@@", moment(toDo.expireDate, "DD-MM-YYYY").valueOf());
// console.log("sasdasdasd", now2.toDate().getTime());

export default ToDoDetail;
