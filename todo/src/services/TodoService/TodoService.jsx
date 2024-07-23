import toast from "react-hot-toast"
import { Endpoints } from "../../constants"

export {postTodo}
function postTodo(values){
   const url = process.env.REACT_APP_JSON_SERVER_URL + Endpoints.toDo
   console.log(url)
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(values)
      })
         .then((response) => response.json())
         .then((data) => {
            toast.success("Todo created")
         })
         .catch((err) => {
           toast.error("Could not create todo")
         })
}