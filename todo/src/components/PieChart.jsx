import React, {useState, useEffect} from 'react';
import { Chart } from "react-google-charts";

const todosinit = 
[
    {
      "id": "1",
      "name": "Mananca",
      "description": "Orice",
      "category": "categ1",
      "createdAt": "2024-07-22",
      "updatedAt": "2024-07-22"
    },
    {
      "id": "2",
      "name": "Mergi la Deadpool",
      "description": "La 4DX",
      "category": "categ1",
      "createdAt": "2024-07-22",
      "updatedAt": "2024-07-25"
    },
    {
      "id": "475e",
      "name": "adasd",
      "description": "adsad",
      "category": "adssad",
      "createdAt": "2024-07-23T09:21:23.465Z",
      "updatedAt": "2024-07-23T09:21:23.465Z"
    }
  ]

const PieChart = () => {
    const[todos, setTodos] = useState(todosinit)

    const itemCounter = (value, index) => {
        return value.filter((x) => x === index).length;
    };

    const options = {
        title: "My todos",
    };

    const catergories = todos.map((todo) => {return todo.category})
    const setCategories = new Set(catergories)
    const catArr = Array.from(setCategories)
    const data = catArr.map((todo) => {
        return [todo, itemCounter(catergories,todo)]
    })
    data.unshift(["Todo", "Numbers for each category"])
    console.log(data)

    return(
        <Chart
            chartType="PieChart"
            data={data}
            options={options}
            width={"100%"}
            height={"400px"}
        />
    )
}

export default PieChart