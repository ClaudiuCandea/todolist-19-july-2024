import React, { useState } from 'react';

function TodoModal({ todo }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="">
        See More
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-white w-11/12 max-w-lg rounded-lg overflow-hidden shadow-lg">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">
                {todo.name}
              </h2>
              <p className="text-gray-700">{todo.description}</p>
              <button onClick={handleClose} className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TodoModal;