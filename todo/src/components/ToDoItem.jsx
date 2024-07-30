import React, { useContext } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { CiCalendar } from "react-icons/ci";
import { GrUpdate } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { TodoContext } from "../context/TodoContext";

function TodoItem({ todo }) {
  const navigate = useNavigate();
  const { deleteTodo } = useContext(TodoContext);

  return (
    <div className="bg-zinc-300 dark:bg-gray-800 text-black dark:text-gray-100 shadow-lg rounded-lg p-6 mb-4 flex flex-col break-words md:flex-1 h-full">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-600 dark:text-gray-300">{todo.name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 italic">{todo.category}</p>
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => navigate(`/todo/${todo.id}`)}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-200"
          >
            <MdEdit className="text-2xl" />
          </button>
          <button
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200"
            onClick={() => deleteTodo(todo.id)}
          >
            <MdDelete className="text-2xl" />
          </button>
        </div>
      </div>
      <p className="dark:text-gray-300 text-gray-600 mb-4 flex-grow">{todo.description}</p>
      <div className="text-sm dark:text-gray-200  text-gray-700 flex justify-between">
        <div className="flex gap-1 items-center">
          <CiCalendar className="text-2xl" />
          <p>{new Date(todo.createdAt).toLocaleDateString()}</p>
        </div>
        <div className="flex gap-1 items-center">
          {todo.updatedAt && (
            <>
              <GrUpdate className="text-sm" />
              <p>{new Date(todo.updatedAt).toLocaleDateString()}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default TodoItem;
