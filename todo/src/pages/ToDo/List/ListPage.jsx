import React, {useContext, useState, useEffect} from 'react';
import {IoMdAdd, IoMdDownload, IoMdMenu} from "react-icons/io";
import ToDoItem from "../../../components/ToDoItem";
import { useNavigate } from "react-router-dom";
import { TodoContext } from "../../../context/TodoContext";
import { useAuth } from "../../../hooks/useAuth";
import PieChart from '../../../components/PieChart';
import { exportToExcel } from "../../../utils/exportModule";
import FilterDrawer from "../../../components/FilterDrawer";
import Pagination from "../../../components/Pagination";
import ToDoFilter from "../../../components/ToDoFilter";

const TodoListPage = () => {
    const navigate = useNavigate();
    const { state } = useContext(TodoContext);
    const user = useAuth();
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const userTodos = state?.todos?.filter(todo => todo.userId === user.profile.id);
    const categories = Array.from(new Set(userTodos.map(todo => todo.category)));

    const filteredTodos = userTodos.filter(todo => {
        const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(todo.category);
        const  searchMatch = todo.name.toLowerCase().includes(searchInput.toLowerCase());
        return categoryMatch && searchMatch;
    });

    const handleCategoryChange = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter(c => c !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    const [currentPage, setCurrentPage] = useState(1);
    const [todosPerPage, setTodosPerPage] = useState(5);

    const paginate = (todos, pageNumber, todosPerPage) => {
        const startIndex = (pageNumber - 1) * todosPerPage;
        return todos.slice(startIndex, startIndex + todosPerPage);
    };

    const paginatedTodos = paginate(filteredTodos, currentPage, todosPerPage);
    const totalPages = Math.ceil(filteredTodos.length / todosPerPage);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategories, searchInput, todosPerPage]);


    return (
        <div className="min-h-screen flex flex-col dark:bg-gray-900">
            <div className="flex flex-grow">
                <div className="hidden sm:flex flex-col w-64 py-6 px-2">
                    <div className="flex flex-col flex-1 gap-1 overflow-y-auto">
                        <ToDoFilter
                            title="Category"
                            options={categories}
                            selectedOptions={selectedCategories}
                            onOptionChange={handleCategoryChange}
                        />
                    </div>
                </div>

                <div className="container mx-auto p-6 flex-grow">
                    <div className="flex flex-col items-start gap-4 mb-6">
                        <h2 className="text-3xl dark:text-white text-black">Todo List</h2>
                        <div className="flex w-full flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                className="border border-gray-300 dark:border-gray-700 rounded px-4 py-2 w-full sm:max-w-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 transition duration-200"
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
                                    onClick={() =>
                                        exportToExcel(filteredTodos, user.profile.name + "' Todo")
                                    }
                                    className="text-white font-bold bg-blue-500 transition duration-200 hover:bg-blue-300 px-4 py-2 rounded flex items-center"
                                >
                                    <IoMdDownload className="text-xl"/>
                                    Export to Excel
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

                    <ul className="todo-list grid grid-cols-1 xl:grid-cols-2 gap-4">
                        {paginatedTodos.map((todo) => (
                            <li className="todo-item md:flex" key={todo.id}>
                                <ToDoItem todo={todo}/>
                            </li>
                        ))}
                    </ul>

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        setCurrentPage={setCurrentPage}
                        todosPerPage={todosPerPage}
                        setTodosPerPage={setTodosPerPage}
                        totalItems={filteredTodos.length}
                    />

                    <h1 className="font-bold text-xl flex justify-center mt-6 dark:text-white dark:bg-gray-500 dark:text-white">Stats for my todos</h1>
                    <PieChart className="mt-10" todos={filteredTodos}></PieChart>
                </div>
            </div>

            {isDrawerOpen && (
                <FilterDrawer
                    title={"Category"}
                    options={categories}
                    selectedOptions={selectedCategories}
                    onOptionChange={handleCategoryChange}
                    onClose={() => setDrawerOpen(false)}
                />
            )}
        </div>
    );
};

export default TodoListPage;
