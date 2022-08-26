import axios from "axios";
import { ToDoProps } from "../components/to-do/ToDo";

export const API_ID = "7471f91e-9d1f-42f3-bad0-0d145577f6e6";

export const createOrEditToDoCall = (toDo: ToDoProps) => {
	return axios.post(
		"https://0jj5dyvv79.execute-api.eu-west-1.amazonaws.com/dev/items",
		toDo,
		{ headers: { "Content-Type": "application/json" } }
	);
};

export const deleteToDoCall = (toDoName: string) => {
	return axios.delete(
		`https://0jj5dyvv79.execute-api.eu-west-1.amazonaws.com/dev/items/object/${API_ID}/${toDoName}`
	);
};

export const getToDoByName = (toDoName: string) => {
	return axios.get(
		`https://0jj5dyvv79.execute-api.eu-west-1.amazonaws.com/dev/items/object/${API_ID}/${toDoName}`
	);
};

export const getAllToDos = () => {
	return axios.get(
		`https://0jj5dyvv79.execute-api.eu-west-1.amazonaws.com/dev/items/${API_ID}`
	);
};
