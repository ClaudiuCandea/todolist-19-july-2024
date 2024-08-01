import React, { useState } from 'react';
import { MdEdit, MdDelete, MdMenu } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const ToDoMenu = ({ id, deleteTodo }) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative">
            <button
                onClick={toggleMenu}
                className={`p-2 rounded-md transition duration-200 ${isOpen ? 'bg-gray-900 text-white hover:bg-gray-900' : 'bg-gray-500 text-white hover:bg-gray-700'}`}
            >
                <MdMenu className="text-xl" />
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50">
                    <button
                        onClick={() => navigate(`/todo/${id}`)}
                        className="w-full flex items-center justify-center gap-2 bg-blue-500 dark:bg-blue-600 text-white px-3 py-2 rounded-t hover:bg-blue-600 dark:hover:bg-blue-700 transition duration-200"
                    >
                        <MdEdit className="text-2xl" />
                        Edit
                    </button>
                    <button
                        onClick={() => deleteTodo(id)}
                        className="w-full flex items-center justify-center gap-2 bg-red-500 dark:bg-red-600 text-white px-3 py-2 rounded-b hover:bg-red-600 dark:hover:bg-red-700 transition duration-200"
                    >
                        <MdDelete className="text-2xl" />
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
};

export default ToDoMenu;
