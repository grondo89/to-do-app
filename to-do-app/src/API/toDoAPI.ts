import axios from "axios";
import { ToDoProps } from "../components/to-do/ToDo";

export const API_ID = "dfd97cd8-f071-401b-be67-bd68480e8169";

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
