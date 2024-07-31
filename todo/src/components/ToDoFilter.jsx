const ToDoFilter = ({ title, options, selectedOptions, onOptionChange }) => {
    return (
        <div className="px-6 border-2 shadow-md rounded-md bg-white">
            <h3 className="text-xl ml-1 font-semibold mb-2">{title}</h3>
            <ul className="px-2">
                {options.map((option) => (
                    <li className="pb-2" key={option}>
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={selectedOptions.includes(option)}
                                onChange={() => onOptionChange(option)}
                                className="h-4 w-4"
                            />
                            <span className="text-gray-800 hover:text-blue-600 text-sm">{option}</span>
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ToDoFilter;