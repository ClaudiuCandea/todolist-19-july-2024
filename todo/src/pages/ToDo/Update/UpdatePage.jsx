import React, { useContext, useEffect, useState } from 'react';
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
      } catch(error){
        console.log('Todo fetch error', error);
        setIsLoading(false);
      }
    };

    fetchTodo();
  }, [id, getTodoById]);

  const handleSubmit = async (values) => {
    try {
      await updateTodoById(id, values).then((response) =>{
        navigate('/todo');
      }).catch((error) => {
        console.log(error);
      });
      
    } catch (error) {
      console.log('Todo update error', error);
      setErrorMessage('An error occurred while updating the todo item.');
    }
  };

  const getInitialValues = (todo, id) => ({
    id: id,
    name: todo.name,
    description: todo.description,
    category: todo.category,
    createdAt: todo.createdAt,
    updatedAt: new Date().toISOString(),
  });

  const attributes = [
    {name: 'name', label: 'Name'},
    {name: 'description', label: 'Description'},
    {name: 'category', label: 'Category'},
  ]


  if (isLoading || !todo) return <div>Loading...</div>;

  return (
    <div>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <h2>Update Todo with id = {id}</h2>
      <Formik
        initialValues={getInitialValues(todo, id)}
        validationSchema={TodoUpdateSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
          {attributes.map(({ name, label }) => (
            <div key={name}>
              <label htmlFor={name}>{label}</label>
              <Field name={name} />
              {errors[name] && touched[name] ? <div>{errors[name]}</div> : null}
            </div>
          ))}
          <button type="submit">Update Todo</button>
        </Form>
        )}
      </Formik>
    </div>
  );
};

export default TodoUpdatePage;