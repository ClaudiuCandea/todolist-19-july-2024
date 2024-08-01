import React, { useState } from "react";

function TodoModal({ todo }) {
    const [isOpen, setIsOpen] = useState(false);
    const imageURL = process.env.REACT_APP_IMAGE_GENERATOR_URL + todo.id;

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="dark:text-white text-gray-600 font-bold py-2 rounded"
            >
                See More
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-40 backdrop-blur-sm bg-black bg-opacity-50"></div>
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="bg-white dark:bg-gray-800 w-11/12 max-w-lg rounded-lg overflow-hidden shadow-lg p-6 relative">
                            <img
                                className="absolute top-0 right-0 h-40 w-45 rounded-full object-cover"
                                src={imageURL}
                                alt={todo.name}
                            />
                            <div className="flex flex-col gap-4 pt-8">
                                <h2 className="text-2xl font-bold">
                                    {todo.name}
                                </h2>
                                <p className="text-gray-600">
                                    Category: {todo.category}
                                </p>
                                <p className="text-gray-700 dark:text-gray-400">
                                    Description:
                                </p>
                                <div className="border-t border-gray-200 mt-4 pt-4">
                                    <p>{todo.description}</p>
                                </div>
                            </div>
                            <div className="flex justify-end mt-4">
                                <button
                                    onClick={handleClose}
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default TodoModal;
