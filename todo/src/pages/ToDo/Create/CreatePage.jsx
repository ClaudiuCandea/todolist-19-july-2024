import React from 'react';
import CreateTodoForm from '../../../components/CreateForm';


const initialValues = {name:'', description:'',category:'',createdAt:'',updatedAt:''}

const TodoCreatePage = () => {

  return (
    <div className="flex justify-center items-center min-h-screen dark:bg-gray-900 bg-zinc-200 ">
    <div className="w-full max-w-xl p-5  rounded-lg ">
        <CreateTodoForm initialValues={initialValues} />
    </div>
    </div>
  )
}

export default TodoCreatePage;