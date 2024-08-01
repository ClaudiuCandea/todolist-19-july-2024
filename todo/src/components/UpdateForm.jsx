import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const TodoUpdateSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, "Too Short!")
        .max(50, "Too Long!")
        .required("Required"),
    description: Yup.string()
        .min(2, "Too Short!")
        .max(5000, "Too Long!")
        .required("Required"),
    category: Yup.string()
        .min(2, "Too Short!")
        .max(50, "Too Long!")
        .required("Required"),
});

const UpdateForm = ({ id, todo, isLoading, errorMessage, handleSubmit, getInitialValues, attributes }) => {
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

export default UpdateForm;