import React from 'react';
import { Formik, Form, Field } from 'formik';

const TodoCreatePage = () => {
  return (
    <div>
        <h1 className="font-bold text-4xl flex justify-center">Create to do</h1>
        <div className="flex justify-center">
          <Formik 
              initialValues={{name:'', description:'',category:'',createdAt:'',updatedAt:''}}
              onSubmit={async (values) => {
                values.createdAt = new Date()
                values.updatedAt =  new Date()
                alert(JSON.stringify(values, null, 2));
                fetch('http://localhost:3001/todos', {
                  method: 'POST',
                  body: JSON.stringify(values)
                })
                   .then((response) => response.json())
                   .then((data) => {
                      console.log(data);
                   })
                   .catch((err) => {
                      console.log(err.message);
                   })
              }}
          >
            <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <lable className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</lable>
              <Field  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name='name' type='text'></Field>

              <lable className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Description</lable>
              <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name='description' type='text'></Field>

              <lable className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">Category</lable>
              <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name='category' type='text'></Field>

              <button className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" type="submit">Create</button>
            </Form>
          </Formik>
        </div>
    </div>
  )
};

export default TodoCreatePage;