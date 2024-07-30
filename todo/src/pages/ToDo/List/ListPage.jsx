import React, {useContext, useState} from 'react';
import {IoMdAdd, IoMdMenu} from "react-icons/io";
import ToDoItem from "../../../components/ToDoItem";
import {useNavigate} from "react-router-dom";
import { TodoContext } from '../../../context/TodoContext';
import FilterDrawer from "../../../components/FilterDrawer";

const TodoListPage = () => {
    const navigate = useNavigate();
    const { state } = useContext(TodoContext);
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const categories = Array.from(new Set(state.todos.map(todo => todo.category)));
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    const handleCategoryChange = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter(c => c !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    const filteredTodos = state.todos.filter(todo => {
        const filterMatch = selectedCategories.length === 0 || selectedCategories.includes(todo.category);
        const  searchMatch = todo.name.toLowerCase().includes(searchInput.toLowerCase());
        return filterMatch && searchMatch;
    });

    return (
        <div className="flex bg-gray-50 min-h-screen">
            <div className="hidden sm:flex flex-col w-64 py-6 px-2">
                <div className="flex flex-col flex-1 overflow-y-auto">
                    <div className="px-6 border-2 shadow-md rounded-md bg-white">
                        <h3 className="text-xl ml-1 font-semibold mb-2">Category</h3>
                        <ul className="px-2">
                            {categories.map((category) => (
                                <li className="pb-2" key={category}>
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={selectedCategories.includes(category)}
                                            onChange={() => handleCategoryChange(category)}
                                            className="h-4 w-4"
                                        />
                                        <span className="text-gray-800 hover:text-blue-600 text-sm">{category}</span>
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="container mx-auto p-6">
                <div className="flex flex-col items-start gap-4 mb-6">
                    <h2 className="text-3xl">Todo List</h2>
                    <div className="flex w-full flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            className="border rounded px-4 py-2 w-full sm:max-w-md"
                        />
                        <div className="flex gap-3 justify-between w-full sm:w-auto sm:justify-end">
                            <button
                                onClick={() => navigate(`/todo/create`)}
                                className="text-white font-bold bg-blue-500 transition duration-200 hover:bg-blue-300 px-4 py-2 rounded flex items-center"
                            >
                                <IoMdAdd className="text-xl"/>
                                Add Task
                            </button>
                            <button
                                onClick={() => setDrawerOpen(true)}
                                className="sm:hidden text-gray-700 bg-white transition duration-200 hover:bg-gray-200 px-4 py-2 rounded flex items-center"
                            >
                                <IoMdMenu className="text-xl"/>
                                Filter
                            </button>
                        </div>
                    </div>
                </div>

                {/*ToDo List*/}
                <ul className="todo-list grid grid-cols-1 xl:grid-cols-2 gap-4">
                    {filteredTodos.map((todo) => (
                        <li className="todo-item md:flex" key={todo.id}>
                            <ToDoItem todo={todo}/>
                        </li>
                    ))}
                </ul>
            </div>

            {isDrawerOpen && (
                <FilterDrawer
                    categories={categories}
                    selectedCategories={selectedCategories}
                    onCategoryChange={handleCategoryChange}
                    onClose={() => setDrawerOpen(false)}
                />
            )}
        </div>
    );
};

export default TodoListPage;