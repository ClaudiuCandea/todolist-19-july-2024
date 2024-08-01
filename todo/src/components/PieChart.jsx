import { Chart } from "react-google-charts";
import React, { useMemo, useContext } from "react";
import { DarkModeContext } from "../context/DarkModeContext";


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
    const { darkMode } = useContext(DarkModeContext);
    const textColor = darkMode ? '#ffffff' : '#000000';
    const options = {
      backgroundColor: 'transparent',
      legend: {
        textStyle: { color: textColor }
      },
      titleTextStyle: {
        color: textColor
      },
      pieSliceTextStyle: {
        color: textColor
      }
    }

    const hasData = data && data.length > 1;

    return(
      <div className="bg-gray-200 dark:bg-gray-900 dark:text-white p-4 shadow">
        {hasData ? (
          <Chart
            chartType="PieChart"
            data={data}
            options={options}
            width={"100%"}
            height={"400px"}
          />
        ) : (
          <div className={`text-center text-lg ${darkMode ? 'text-white' : 'text-black'}`}>
            No data available
          </div>
        )}
      </div>  
    )
}

export default PieChart