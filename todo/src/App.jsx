import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import Home from './pages/HomePage';
import TodoListPage from './pages/ToDo/ListPage';
import TodoUpdatePage from './pages/ToDo/UpdatePage';
import TodoCreatePage from './pages/ToDo/CreatePage';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todo" element={<TodoListPage />} />
        <Route path="/todo/:id" element={<TodoUpdatePage />} />
        <Route path="/todo/create" element={<TodoCreatePage />} />
      </Routes>
    </Router>
  );
}

export default App;
