import React from 'react';
import CreateTodoForm from '../../../components/CreateForm';
import { postTodo } from '../../../services/TodoService/TodoService';


const initialValues = {name:'', description:'',category:'',createdAt:'',updatedAt:''}

const TodoCreatePage = () => {

  function handleSubmit(values){
    values.createdAt = new Date()
    values.updatedAt =  new Date()
    postTodo(values)
  } 

  return (
    <div>
        <h1 className="font-bold text-4xl flex justify-center">Create to do</h1>
        <div className="flex justify-center">
            <CreateTodoForm initialValues={initialValues} handleSubmit={handleSubmit}></CreateTodoForm>
        </div>
    </div>
  )
}

export default TodoCreatePage;