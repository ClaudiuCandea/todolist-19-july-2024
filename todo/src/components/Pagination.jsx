const Pagination = ({ currentPage, totalPages, setCurrentPage, todosPerPage, setTodosPerPage, totalItems }) => {
    const handlePageChange = (event) => {
        const pageNumber = Number(event.target.value);
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleFirstPage = () => {
        setCurrentPage(1);
    };

    const handleLastPage = () => {
        setCurrentPage(totalPages);
    };

    const startItem = (currentPage - 1) * todosPerPage + 1;
    const endItem = Math.min(currentPage * todosPerPage, totalItems);

    return (
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-between items-center mt-6 dark:text-gray-200">
            <div className="flex items-center">
                <span>Items per page</span>
                <select
                    value={todosPerPage}
                    onChange={(e) => setTodosPerPage(Number(e.target.value))}
                    className="border rounded px-2 py-1 ml-2 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                </select>
            </div>
            <div>
                {startItem}-{endItem} of {totalItems} items
            </div>
            <div className="flex items-center gap-3">
                <div>
                    <button
                        onClick={handleFirstPage}
                        className="px-2 py-1 border rounded-l bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 dark:border-gray-700 disabled:bg-gray-300 disabled:text-gray-500 disabled:opacity-50 dark:disabled:bg-gray-800"
                        disabled={currentPage === 1}
                    >
                        &laquo;
                    </button>
                    <button
                        onClick={handlePreviousPage}
                        className="px-2 py-1 border w-20 bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 dark:border-gray-700 disabled:bg-gray-300 disabled:text-gray-500 disabled:opacity-50 dark:disabled:bg-gray-800"
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                </div>
                <div className="flex gap-1 items-center">
                    <input
                        type="number"
                        value={currentPage}
                        onChange={handlePageChange}
                        className="w-12 text-center border dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
                    />
                    <span>of {totalPages}</span>
                </div>
                <div>
                    <button
                        onClick={handleNextPage}
                        className="px-2 py-1 border w-20 bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 dark:border-gray-700 disabled:bg-gray-300 disabled:text-gray-500 disabled:opacity-50 dark:disabled:bg-gray-800"
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                    <button
                        onClick={handleLastPage}
                        className="px-2 py-1 border rounded-r bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 dark:border-gray-700 disabled:bg-gray-300 disabled:text-gray-500 disabled:opacity-50 dark:disabled:bg-gray-800"
                        disabled={currentPage === totalPages}
                    >
                        &raquo;
                    </button>
                </div>
            </div>
        </div>
    );
};
export default Pagination;