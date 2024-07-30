import React, { useContext, useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TodoContext } from "../../../context/TodoContext";
import { useAuth } from "../../../hooks/useAuth";

const TodoUpdateSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, "Too Short!")
        .max(50, "Too Long!")
        .required("Required"),
    description: Yup.string()
        .min(2, "Too Short!")
        .max(50, "Too Long!")
        .required("Required"),
    category: Yup.string()
        .min(2, "Too Short!")
        .max(50, "Too Long!")
        .required("Required"),
});

const TodoUpdatePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { updateTodoById, getTodoById } = useContext(TodoContext);
    const [errorMessage, setErrorMessage] = useState("");
    const [todo, setTodo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { profile } = useAuth();
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    useEffect(() => {
        const userId = profile?.id
        console.log(userId)
        const fetchTodo = async () => {
            setIsLoading(true);
            try {
              await delay(1000)
              const fetchedTodo = await getTodoById(id)
                if (fetchedTodo.userId !== userId) {
                    navigate("/home");
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
    }, [id, getTodoById, navigate]);

    const handleSubmit = async (values) => {
        try {
            await updateTodoById(id, values)
                .then((response) => {
                    navigate("/todo");
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.log("Todo update error", error);
            setErrorMessage("An error occurred while updating the todo item.");
        }
    };

    const getInitialValues = (todo, id) => {
        const now = new Date();

        const gmtPlusThree = new Date(now.getTime() + 3 * 60 * 60 * 1000);

        return {
            id: id,
            name: todo ? todo.name : "",
            description: todo ? todo.description : "",
            category: todo ? todo.category : "",
            createdAt: todo ? todo.createdAt : "",
            updatedAt: gmtPlusThree.toISOString(),
            userId: todo ? todo.userId : "",
        };
    };

    const attributes = useMemo(
        () => [
            { name: "name", label: "Name" },
            { name: "description", label: "Description" },
            { name: "category", label: "Category" },
        ],
        []
    );

    return (
        <div className="flex justify-center items-center h-screen dark:bg-gray-900 bg-zinc-200">
            <div className="w-full max-w-xl p-5 dark:bg-gray-800 bg-zinc-300 rounded-lg shadow">
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                <h2 className="text-2xl font-bold mb-6 dark:text-white">
                    Update Todo with id = {id}
                </h2>
                <Formik
                    initialValues={getInitialValues(todo, id)}
                    enableReinitialize
                    validationSchema={TodoUpdateSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched }) => (
                        <Form className="space-y-4">
                            {attributes.map(({ name, label }) => (
                                <div key={name} className="flex flex-col">
                                    <label
                                        htmlFor={name}
                                        className="mb-2 font-medium dark:text-white"
                                    >
                                        {label}
                                    </label>
                                    {isLoading ? (
                                        <div className="animate-pulse duration-1000 dark:bg-gray-300 bg-gray-500 h-10 rounded-md"></div>
                                    ) : (
                                        <Field
                                            name={name}
                                            className="pl-3 border-gray-300 h-10 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm  dark:bg-gray-700 dark:text-white"
                                            as="input"
                                        />
                                    )}
                                    {errors[name] && touched[name] ? (
                                        <div className="text-red-500 text-sm">
                                            {errors[name]}
                                        </div>
                                    ) : null}
                                </div>
                            ))}
                            <div className="flex justify-center mt-4">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                                >
                                    Update
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default TodoUpdatePage;
