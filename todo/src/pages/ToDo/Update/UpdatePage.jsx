import React, { useContext, useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TodoContext } from '../../../context/TodoContext';

const TodoUpdateSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  description: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  category: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
});

const TodoUpdatePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateTodoById, getTodoById } = useContext(TodoContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [todo, setTodo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  useEffect(() => {
    const fetchTodo = async () => {
      setIsLoading(true);
      try {
        const [fetchedTodo] = await Promise.all([
          getTodoById(id),
          delay(1000) // Delay for 1 second
        ]);
        setTodo(fetchedTodo);
        setIsLoading(false);
      } catch (error) {
        console.log('Todo fetch error', error);
        setIsLoading(false);
      }
    };

    fetchTodo();
  }, [id, getTodoById]);

  const handleSubmit = async (values) => {
    try {
      await updateTodoById(id, values).then((response) => {
        navigate('/todo');
      }).catch((error) => {
        console.log(error);
      });
    } catch (error) {
      console.log('Todo update error', error);
      setErrorMessage('An error occurred while updating the todo item.');
    }
  };

  const getInitialValues = (todo, id) => {

    const now = new Date();

    const gmtPlusThree = new Date(now.getTime() + (3 * 60 * 60 * 1000));

    return {
      id: id,
      name: todo ? todo.name : '',
      description: todo ? todo.description : '',
      category: todo ? todo.category : '',
      createdAt: todo ? todo.createdAt : '',
      updatedAt: gmtPlusThree.toISOString(),
    };
  };

  const attributes = useMemo(() => [
    { name: 'name', label: 'Name' },
    { name: 'description', label: 'Description' },
    { name: 'category', label: 'Category' },
  ], []);

  return (
    <div className="flex justify-center items-center h-screen bg-slate-700">
      <div className="w-full max-w-xl p-5 bg-white rounded-lg shadow">
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <h2 className="text-2xl font-bold mb-6">Update Todo with id = {id}</h2>
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
                  <label htmlFor={name} className="mb-2 font-medium">{label}</label>
                  {isLoading ? (
                    <div className="animate-pulse bg-gray-300 h-10 rounded-md"></div>
                  ) : (
                    <Field
                      name={name}
                      className="border-gray-300 h-10 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                      as="input"
                    />
                  )}
                  {errors[name] && touched[name] ? <div className="text-red-500 text-sm">{errors[name]}</div> : null}
                </div>
              ))}
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                Update Todo
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default TodoUpdatePage;
