import React, { useContext } from "react";
import { IoMdAdd } from "react-icons/io";
import ToDoItem from "../../../components/ToDoItem";
import { useNavigate } from "react-router-dom";
import { TodoContext } from "../../../context/TodoContext";
import { useAuth } from "../../../hooks/useAuth";
import PieChart from '../../../components/PieChart';

const TodoListPage = () => {
  const navigate = useNavigate();
  const { state } = useContext(TodoContext);

    const { profile } = useAuth()
    const filteredTodos = state?.todos?.filter(todo => todo.userId === profile.id);

    return (
        <div className="min-h-screen flex flex-col dark:bg-gray-900">
            <div className="container mx-auto p-6 flex-grow">
                <div className="flex flex-col items-start gap-8 mb-6">
                    <h2 className="text-3xl dark:text-white text-black">Todo List</h2>
                    <button
                        onClick={() => navigate(`/todo/create`)}
                        className="text-white font-bold bg-blue-500 transition duration-200 hover:bg-blue-300 px-4 py-2 rounded flex items-center"
                        >
                        <IoMdAdd className="text-xl" />
                        Add Task
                    </button>
                </div>
                <ul className="todo-list grid grid-cols-1 xl:grid-cols-2 gap-4 ">
                    {filteredTodos.map((todo) => (
                        <li className="todo-item md:flex " key={todo.id}>
                            <ToDoItem todo={todo} />
                        </li>
                    ))}
                </ul>
            </div>
            <h1 className="font-bold text-xl flex justify-center mt-6 dark:text-white dark:bg-gray-500">Stats for my todos</h1>
            <PieChart className="mt-10" todos={filteredTodos}></PieChart>
        </div>     
)};

export default TodoListPage;
