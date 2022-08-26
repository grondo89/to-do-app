import React from "react";
import { Link } from "react-router-dom";
import ToDo, { ToDoProps } from "../../components/to-do/ToDo";
import "./AllToDos.styles.scss";

type AllToDosProps = {
	toDos: ToDoProps[];
};

const AllToDos = ({ toDos }: AllToDosProps) => {
	return (
		<>
			<div className="title">TO DO APP</div>
			<div className="subtitle">
				Helping you to easily keep track of your tasks
			</div>
			<div className="allToDosContainer">
				{toDos.map((toDo) => {
					return (
						<div className="toDoContainer">
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
			<div className="addToDoContainer">
				<Link to={"todo/create"} style={{ textDecoration: "none" }}>
					<div>ADD NEW TODO</div>
				</Link>
			</div>
		</>
	);
};

export default AllToDos;
