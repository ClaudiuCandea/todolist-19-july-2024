import React, {useState, useEffect} from 'react';
import { Chart } from "react-google-charts";
import { getTodos } from '../services/TodoService/TodoService';


const PieChart = () => {
    const[todos, setTodos] = useState([])

    useEffect(() => {
        const loadData = async () => {
            const result = await getTodos();
            setTodos(result);
        };

        loadData()
    }, []);

    const itemCounter = (value, index) => {
        return value.filter((x) => x === index).length;
    };

    console.log(todos)
    const catergories = todos.map((todo) => {return todo.category})
    const setCategories = new Set(catergories)
    console.log(setCategories)
    const data = setCategories.map((todo) => {
        return [todo, itemCounter(catergories,todo)]
    })
    const options = {
        title: "My todos",
      };
    console.log(data)
    return(
        <Chart
            chartType="PieChart"
            data={data}
            options={options}
        />
    )
}

export default PieChart