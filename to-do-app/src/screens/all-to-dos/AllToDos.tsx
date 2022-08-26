import React, { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import ToDo, { toDoProps } from "../../components/to-do/ToDo";

type AllToDosProps = {
	toDos: toDoProps[];
};

const AllToDos = ({ toDos }: AllToDosProps) => {
	return (
		<>
			<div
				style={{
					// padding: " 5%",
					flexDirection: "row",
					display: "inline-flex",
					justifyContent: "space-around",
				}}
			>
				{toDos.map((toDo) => {
					return (
						<div style={{ margin: 40 }}>
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
