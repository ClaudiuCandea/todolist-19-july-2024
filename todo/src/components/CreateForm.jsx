import React from 'react';
import { Formik, Form, Field } from 'formik';
import { postTodo } from '../services/TodoService/TodoService';

function handleSubmit(values){
    values.createdAt = new Date()
    values.updatedAt =  new Date()
    postTodo(values)
}


const CreateTodoForm = ({initialValues}) => {
    return(
        <Formik 
            initialValues={initialValues}
            onSubmit={async (values) => handleSubmit(values)}
        >
            <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <lable className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</lable>
                <Field  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name='name' type='text'></Field>

                <lable className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Description</lable>
                <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name='description' type='text'></Field>

                <lable className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">Category</lable>
                <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name='category' type='text'></Field>

                <button className="flex justify-center align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" type="submit">Create</button>
            </Form>
        </Formik>
    )
}

export default CreateTodoForm