import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { TodoContext } from "../../../context/TodoContext";
import UpdateForm from "../../../components/UpdateForm";
import { routes } from "../../../routes/routes";

const TodoUpdatePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { updateTodoById, getTodoById } = useContext(TodoContext);
    const { profile } = useAuth();
    const [todo, setTodo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    useEffect(() => {
        const userId = profile?.id;
        const fetchTodo = async () => {
            setIsLoading(true);
            try {
                await delay(1000);
                const fetchedTodo = await getTodoById(id);
                if (fetchedTodo.userId !== userId) {
                    navigate(routes.home);
                } else {
                    setTodo(fetchedTodo);
                    setIsLoading(false);
                }
            } catch (error) {
                console.log("Todo fetch error", error);
                setIsLoading(false);
            }
        };

        fetchTodo();
    }, [id, getTodoById, navigate, profile]);

    const handleSubmit = async (values) => {
        try {
            await updateTodoById(id, values);
            navigate(routes.todo);
        } catch (error) {
            setErrorMessage("Update failed. Please try again.");
        }
    };

    const getInitialValues = (todo, id) => {
        const now = new Date();
        const gmtPlusThree = new Date(now.getTime() + 3 * 60 * 60 * 1000);
        return({
            id: id,
            name: todo?.name || "",
            description: todo?.description || "",
            category: todo?.category || "",
            createdAt: todo ? todo.createdAt : "",
            updatedAt: gmtPlusThree.toISOString(),
            userId: todo ? todo.userId : "",
        });
    }
    
        

    const attributes = [
        { name: "name", label: "Name" },
        { name: "description", label: "Description" },
        { name: "category", label: "Category" },
    ];

    return (
        <UpdateForm
            id={id}
            todo={todo}
            isLoading={isLoading}
            errorMessage={errorMessage}
            handleSubmit={handleSubmit}
            getInitialValues={getInitialValues}
            attributes={attributes}
        />
    );
};

export default TodoUpdatePage;