import "../App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import TodoListPage from "../pages/ToDo/List/ListPage";
import TodoUpdatePage from "../pages/ToDo/Update/UpdatePage";
import TodoCreatePage from "../pages/ToDo/Create/CreatePage";
import { Toaster } from "react-hot-toast";
import Home from "../pages/Home/Home";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todo" element={<TodoListPage />} />
        <Route path="/todo/:id" element={<TodoUpdatePage />} />
        <Route path="/todo/create" element={<TodoCreatePage />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
