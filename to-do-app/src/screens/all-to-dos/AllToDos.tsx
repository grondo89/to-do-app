import React from "react";
import { Link } from "react-router-dom";
import ToDo, { ToDoProps } from "../../components/to-do/ToDo";

type AllToDosProps = {
	toDos: ToDoProps[];
};

const AllToDos = ({ toDos }: AllToDosProps) => {
	return (
		<>
			<div>TO DO APP</div>
			<div
				style={{
					flexDirection: "row",
					display: "flex",
					justifyContent: "space-around",
					flexWrap: "wrap",
					margin: "40px auto",
					marginTop: "5%",
				}}
			>
				{toDos.map((toDo) => {
					return (
						<div
							style={{
								maxWidth: "30%",
								border: "1px solid tomato",
								flexWrap: "wrap",
								minWidth: "25%",
							}}
						>
							<ToDo
								expireDate={toDo.expireDate}
								creationDate={toDo.creationDate}
								description={toDo.description}
								name={toDo.name}
								id={toDo.id}
							/>
						</div>
					);
				})}
			</div>
			<div style={{ position: "absolute", bottom: 100, right: 100 }}>
				<Link to={"todo/create"}>
					<button>ADD NEW TODO</button>
				</Link>
			</div>
		</>
	);
};

export default AllToDos;
