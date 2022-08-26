import React, { FC, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";

export type toDoProps = {
	expireDate: "string";
	creationDate: "string";
	description: "string";
	id: "string";
	name: "string";
};

const CreateToDo = () => {
	const navigate = useNavigate();

	const [readyToCreate, setReadyToCreate] = useState(false);
	const [toDo, setToDo] = useState<any>({
		expireDate: "",
		creationDate: "",
		description: "",
		name: "",
		id: "7471f91e-9d1f-42f3-bad0-0d145577f6e6",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setToDo((prevState: toDoProps) => ({
			...prevState,
			[name]: value,
		}));
	};

	const CreateNewToDo = () => {
		const now = moment().milliseconds;
		console.log("creandooo", moment(toDo.expireDate).milliseconds());
		const isValidDate = moment(toDo.expireDate, "DD/MM/YYYY", true).isValid();

		if (isValidDate) {
			setToDo((prevState: toDoProps) => ({
				...prevState,
				creationDate: now,
				// expireDate: moment(toDo.expireDate).milliseconds,
			}));
			setReadyToCreate(true);
		} else {
			alert("The date you entered is invalid.");
		}
	};

	useEffect(() => {
		if (readyToCreate) {
			axios
				.post(
					"https://0jj5dyvv79.execute-api.eu-west-1.amazonaws.com/dev/items",
					toDo,
					{ headers: { "Content-Type": "application/json" } }
				)
				.then((res) => console.log("akakkakkkakak", res))
				.catch(() => alert("There has been an error with your request."))
				.finally(() => navigate("/"));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [readyToCreate]);

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
							<span>Name:</span>{" "}
							<input
								style={{ width: "80%", textAlign: "right" }}
								value={toDo.name}
								name="name"
								onChange={handleChange}
							></input>
						</div>
						<div style={{ display: "flex", justifyContent: "space-between" }}>
							Expiration Date:{" "}
							<input
								style={{ width: "80%", textAlign: "right" }}
								value={toDo.expireDate}
								placeholder="DD/MM/YYYY"
								name="expireDate"
								onChange={handleChange}
							></input>
						</div>
						<div style={{ display: "flex", justifyContent: "space-between" }}>
							Description:{" "}
							<input
								style={{ width: "80%", textAlign: "right" }}
								value={toDo?.description}
								name="description"
								onChange={handleChange}
							></input>
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
					<button onClick={CreateNewToDo}>CREATE TO DO</button>
				</div>
			</div>
		</>
	);
};

export default CreateToDo;
