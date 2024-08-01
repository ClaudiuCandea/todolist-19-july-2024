import React, { useContext, useState } from "react";
import { MdDelete, MdEdit, MdStar } from "react-icons/md";
import { CiCalendar } from "react-icons/ci";
import { GrUpdate } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { TodoContext } from "../context/TodoContext";
import TodoModal from "./TodoModal";
import ToDoMenu from "./ToDoMenu";


function TodoItem({ todo, isPublic }) {
  const navigate = useNavigate();
  const { deleteTodo, updateTodoById } = useContext(TodoContext);
  const imageURL = process.env.REACT_APP_IMAGE_GENERATOR_URL + todo.id;

  const [showFullDescription] = useState(false);

  const MAX_DESCRIPTION_LENGTH = 30; 

  const truncatedDescription = todo.description.substring(0, MAX_DESCRIPTION_LENGTH);


  return (
    <div className="bg-zinc-300 dark:bg-gray-800 text-black dark:text-gray-100 shadow-lg rounded-lg p-6 mb-4 flex flex-row break-words md:flex-1 h-full">
      <div className=" flex flex-col w-1/3 gap-2">
        <img alt="robots" src={imageURL} />

        {isPublic ? (
          <div className="flex flex-row overflow-hidden place-items-center gap-2 ">
            ID:
            <div className=" overflow-clip">
              <div className="hover:animate-rightToLeft text-clip ">
                {todo.userId}
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex flex-col break-words md:flex-1 h-full">

      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-600 dark:text-gray-300 max-w-[300px]">{todo.name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 italic text-ellipsis max-w-[300px]">{todo.category}</p>
        </div>
        <div className="flex gap-1">
            <button
              onClick={() => {
                updateTodoById(todo.id, { ...todo, favorite: !todo.favorite });
              }}
              className="bg-gray-100 px-3 py-1 rounded transition duration-200"
            >
              <MdStar
                className="text-2xl"
                color={todo.favorite ? "orange" : "black"}
              />
            </button>
          <button
            onClick={() => navigate(`/todo/${todo.id}`)}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-200"
          >
            <MdEdit className="text-2xl" />
          </button>
          <button
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200"
            onClick={async () => { await deleteTodo(todo.id)
              window.location.reload()
            }}
          >
            <MdDelete className="text-2xl" />
          </button>
        </div>
      </div>
      <p
          className={`dark:text-gray-300 text-gray-600 mb-4 flex-grow max-w-[300px] ${
            showFullDescription ? "text-ellipsis" : ""
          }`}
          >
          {truncatedDescription}
          {todo.description.length > MAX_DESCRIPTION_LENGTH && (
            <div>
              <TodoModal todo={todo}/>
            </div>
          )}
        </p>
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
    </div>
  );
}

export default TodoItem;
