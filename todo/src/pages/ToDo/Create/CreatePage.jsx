import React from 'react';
import CreateTodoForm from '../../../components/CreateForm';


const initialValues = {name:'', description:'',category:'',createdAt:'',updatedAt:''}

const TodoCreatePage = () => {
  return (
    <div>
        <h1 className="font-bold text-4xl flex justify-center">Create to do</h1>
        <div className="flex justify-center">
            <CreateTodoForm initialValues={initialValues}></CreateTodoForm>
        </div>
    </div>
  )
}

export default TodoCreatePage;