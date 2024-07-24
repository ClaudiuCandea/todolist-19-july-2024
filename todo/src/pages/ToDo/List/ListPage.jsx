import React, {useEffect, useState} from 'react';
import { IoMdAdd } from "react-icons/io";
import ToDoItem from "../../../components/ToDoItem/ToDoItem";

const TodoListPage = () => {
    const [todos, setTodos] = useState([]);

    const fetchToDos = async () => {
        try {
            const response = await fetch("http://localhost:3001/todos");
            if (response.ok) {
                const json = await response.json();
                setTodos(json);
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        fetchToDos();
    }, []);


    return (
        <div className="container mx-auto p-6">
            <div className="flex flex-col items-start gap-8 mb-6">
                <h2 className="text-3xl">Todo List</h2>
                <button
                    className="text-white font-bold bg-blue-500 transition duration-200 hover:bg-blue-300 px-4 py-2 rounded flex items-center"
                >
                    <IoMdAdd className="text-xl" />
                    Add Task
                </button>
            </div>
            <ul className="todo-list grid grid-cols-1 xl:grid-cols-2 gap-4">
                {todos.map((todo) => (
                    <li className="todo-item md:flex" key={todo.id}>
                        <ToDoItem todo={todo} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoListPage;