import React, { useMemo } from 'react';
import { Formik, Form, Field } from 'formik';
import  TodoService  from '../services/TodoService/TodoService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const CreateTodoForm = ({initialValues}) => {
    const { profile } = useAuth();
    const navigate = useNavigate();
    function handleSubmit(values){
        values.userId = profile.id
        values.createdAt = new Date()
        values.updatedAt =  new Date()
        TodoService.postTodo(values)
        navigate('/todo')
        window.location.reload()
    } 
    const attributes = useMemo(
      () => [
          { name: "name", label: "Name" },
          { name: "description", label: "Description" },
          { name: "category", label: "Category" },
      ],
      []
  );
  return (
    <div className="flex justify-center items-center h-screen dark:bg-gray-900">
      <div className="w-full max-w-xl p-5 dark:bg-gray-800 bg-zinc-300 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6 dark:text-white text-black">
          Create Todo
        </h2>
        <Formik
          initialValues={initialValues}
          onSubmit={async (values) => handleSubmit(values)}
        >
          <Form className="space-y-4">
            {attributes.map((attr) => (
              <div key={attr.name} className="mb-4 flex flex-col">
                <label
                  className="block text-black dark:text-gray-300 text-base font-bold mb-2"
                  htmlFor={attr.name}
                >
                  {attr.label}
                </label>
                <Field
                  className="pl-3 dark:border-gray-300 h-10 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm dark:bg-gray-700 dark:text-white"
                  name={attr.name}
                  type="text"
                />
              </div>
            ))}
            <div className="flex justify-center mt-4">
              <button
                className="align-baseline font-bold text-base text-blue-500 hover:text-blue-800 px-4 py-2 bg-blue-500 text-white rounded-md"
                type="submit"
              >
                Create
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default CreateTodoForm;
