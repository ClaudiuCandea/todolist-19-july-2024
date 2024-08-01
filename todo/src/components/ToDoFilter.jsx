const ToDoFilter = ({ title, options, selectedOptions, onOptionChange }) => {
    return (
        <div className="px-6 shadow-sm rounded-sm bg-zinc-300 dark:bg-gray-800">
            <h3 className="text-xl ml-1 font-semibold mb-2 dark:text-white">{title}</h3>
            <ul className="px-2">
                {options.map((option) => (
                    <li className="pb-2" key={option}>
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={selectedOptions.includes(option)}
                                onChange={() => onOptionChange(option)}
                                className="h-4 w-4 appearance-none rounded border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-600 focus:ring-blue-500 dark:focus:ring-blue-400 checked:bg-blue-500 dark:checked:bg-blue-600 transition duration-500" />
                            <span className="dark:text-gray-300 text-gray-800 hover:text-blue-600 dark:hover:text-blue-600 text-sm">{option}</span>
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ToDoFilter;