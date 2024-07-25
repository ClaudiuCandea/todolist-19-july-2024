import React from 'react';
import { MdDelete, MdEdit } from "react-icons/md";
import { CiCalendar } from "react-icons/ci";
import { GrUpdate } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';

function TodoItem({ todo }) {
    const navigate = useNavigate();

    return (
        <div className="bg-white shadow-md rounded-lg p-6 mb-4 flex flex-col break-words md:flex-1 h-full">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h3 className="text-xl font-bold">{todo.name}</h3>
                    <p className="text-sm text-gray-600 italic">{todo.category}</p>
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
                    >
                        <MdDelete className="text-2xl" />
                    </button>
                </div>
            </div>
            <p className="text-gray-700 mb-4 flex-grow">{todo.description}</p>
            <div className="text-sm text-gray-500 flex justify-between">
                <div className="flex gap-1 items-center">
                    <CiCalendar className="text-2xl"/>
                    <p>{new Date(todo.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex gap-1 items-center">{todo.updatedAt && (
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
