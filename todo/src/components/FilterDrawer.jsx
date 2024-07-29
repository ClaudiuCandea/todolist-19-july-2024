import React from 'react';
import { IoMdClose } from "react-icons/io";

const FilterDrawer = ({ categories, onClose, selectedCategories, onCategoryChange }) => {
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-end z-50">
            <div className="w-3/4 bg-white p-6 shadow-md">
                <div className="flex justify-end mb-4">
                    <button
                        onClick={onClose}
                        className="text-gray-700 hover:text-gray-900 hover:bg-gray-200 transition duration-200"
                    >
                        <IoMdClose className="h-8 w-8"/>
                    </button>
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-2">Category</h3>
                    <ul>
                        {categories.map((category) => (
                            <li className="pb-2" key={category}>
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={selectedCategories.includes(category)}
                                        onChange={() => onCategoryChange(category)}
                                        className="form-checkbox h-5 w-5 text-blue-600"
                                    />
                                    <span className="text-gray-800 hover:text-blue-600">{category}</span>
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default FilterDrawer;