import { Chart } from "react-google-charts";
import React, { useMemo } from "react";


const processTodos = (todos) => {
  const itemCounter = (value, index) => {
    return value.filter((x) => x === index).length;
  };
  const catergories = todos.map((todo) => {return todo.category})
  const setCategories = new Set(catergories)
  const catArr = Array.from(setCategories)
  const data = catArr.map((todo) => {
    return [todo, itemCounter(catergories,todo)]
  })
  data.unshift(["Todo", "Numbers for each category"])
  return data
}


const PieChart = ({todos}) => {
    const data = useMemo( () => processTodos(todos),[todos])
    return(
      <div>
        <Chart
            chartType="PieChart"
            data={data}
            width={"100%"}
            height={"400px"}
        />
      </div>  
    )
}

export default PieChart