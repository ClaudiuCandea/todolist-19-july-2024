import React from 'react';
import {useParams} from 'react-router-dom';
const TodoUpdatePage = () => {
    const {id} = useParams();

  return (
    <div>
      <h2>Welcome, TodoUpdatePage for todo with id = {id}!</h2>
      <p>This is the Home page. You have access to standard user features.</p>
    </div>
  );
};

export default TodoUpdatePage;