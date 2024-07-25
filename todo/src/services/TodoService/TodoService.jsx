import axios from 'axios';
import { Endpoints } from '../../constants';

const normalUrl = process.env.REACT_APP_JSON_SERVER_URL + Endpoints.toDo;

const TodoService = {
    async getTodos() {
        try {
        const response = await axios.get(normalUrl);
        return response.data;
        } catch (error) {
        console.log('Get Todos error', error);
        }
    },
    async getTodoById(id) {
        try {
        const response = await axios.get(normalUrl + `/${id}`);
        return response.data;
        } catch (error) {
        console.log('Get Todo by id error', error);
        }
    },
    async postTodo(todo) {
        try {
        const response = await axios.post(normalUrl, todo);
        return response.data;
        } catch (error) {
        console.log('Create Todo error', error);
        }
    },
    async updateTodoById(id, todo) {
        try {
        const response = await axios.put(normalUrl + `/${id}`, todo);
        return response.data;
        } catch (error) {
        console.log('Update Todo error', error);
        }
    },
    async deleteTodoById(id) {
        try {
        const response = await axios.delete(normalUrl + `/${id}`);
        return response.data;
        } catch (error) {
        console.log('Delete Todo error', error);
        }
    },
    };

export default TodoService;

