import React, { createContext, useReducer, useEffect, useState } from 'react';
import TodoService from '../services/TodoService/TodoService';

export const TodoContext = createContext();

const initialState = {
  todos: [],
  loading: true,
};

const ACTIONS = {
  SET_TODOS: 'SET_TODOS',
  ADD_TODO: 'ADD_TODO',
  REMOVE_TODO: 'REMOVE_TODO',
  TOGGLE_TODO: 'TOGGLE_TODO',
  SET_LOADING: 'SET_LOADING',
};

function todoReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_TODOS:
      return { ...state, todos: action.payload, loading: false };
    case ACTIONS.ADD_TODO:
      return { ...state, todos: [...state.todos, action.payload] };
    case ACTIONS.REMOVE_TODO:
      return { ...state, todos: state.todos.filter(todo => todo.id !== action.payload) };
    case ACTIONS.TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
        ),
      };
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  useEffect(() => {
    const fetchTodos = async () => {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      const todos = await TodoService.getTodos();
      dispatch({ type: ACTIONS.SET_TODOS, payload: todos });
    };

    fetchTodos();
  }, []);

  const updateTodoById = async (id, todo) => {
    try {
      const updatedTodo = await TodoService.updateTodoById(id, todo);
      dispatch({ type: ACTIONS.SET_TODOS, payload: state.todos.map(t => (t.id === id ? updatedTodo : t)) });
    } catch (error) {
      console.log('Todo update error', error);
    }
  }

  const getTodoById = async (id) => {
    try {
      const todo = state.todos.find(todo => todo.id === id);
      return todo;
    } catch (error) {
      console.log('Todo fetch error', error);
    }
  }

  const value = { state, dispatch, updateTodoById, getTodoById };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

