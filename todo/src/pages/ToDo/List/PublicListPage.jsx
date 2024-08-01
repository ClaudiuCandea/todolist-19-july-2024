import React, { useContext } from "react";
import { IoMdAdd, IoMdDownload } from "react-icons/io";
import ToDoItem from "../../../components/ToDoItem";
import { useNavigate } from "react-router-dom";
import { TodoContext } from "../../../context/TodoContext";
import PieChart from "../../../components/PieChart";
import { exportToExcel } from "../../../utils/exportModule";

const PublicTodoListPage = () => {
  const navigate = useNavigate();
  const { state } = useContext(TodoContext);
  const todos = state?.todos;

  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900">
    <div className="container mx-auto p-6 ">
      <div className="flex flex-col items-start gap-8 mb-6">
        <h2 className="text-3xl dark:text-white">Todo List</h2>
        <div id="buttons-wrap" className="flex flex-row gap-3">
          <button
            onClick={() => navigate(`/todo/create`)}
            className="text-white font-bold bg-blue-500 transition duration-200 hover:bg-blue-300 px-4 py-2 rounded flex items-center"
          >
            <IoMdAdd className="text-xl" />
            Add Task
          </button>
          <button
            onClick={() => exportToExcel(todos, "Todo")}
            className="text-white font-bold bg-blue-500 transition duration-200 hover:bg-blue-300 px-4 py-2 rounded flex items-center"
          >
            <IoMdDownload className="text-xl" />
            Export to Excel
          </button>
        </div>
      </div>

      <ul className="todo-list grid grid-cols-1 xl:grid-cols-2 gap-4">
        {todos.map((todo) => (
          <li className="todo-item md:flex" key={todo.id}>
            <ToDoItem todo={todo} isPublic={true} />
          </li>
        ))}
      </ul>
      <h1 className="font-bold text-xl flex justify-center mt-6 dark:text-white">
        Stats for my todos
      </h1>
      <PieChart className="mt-10" todos={todos}></PieChart>
    </div>
    </div>
  );
};

export default PublicTodoListPage;
