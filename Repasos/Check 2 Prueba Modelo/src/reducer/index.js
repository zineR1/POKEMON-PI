const initialState = [];

//En nuestro estado guardaremos objetos con `todos`. Cada todo tendra: title, description, place, date, id y un status;
const todos = (state = initialState, action) => {
  switch(action.type) {
    // Aca va tu codigo;
    case "AddTodo": 
      return [...state, action.payload]
      
    case "RemoveTodo":
      return [...state.filter(todo => todo.id !== action.payload)]

    case "ToInProgress":
      return [...state.map(todo => {
        if(Number(todo.id) === Number(action.payload)){
          todo.status = "InProgress";
          return todo;
        }
        else return todo
      })]

      case "ToDone":
      return [...state.map(todo => {
        if(Number(todo.id) === Number(action.payload)){
            todo.status = "Done"
            return todo;
        }
        else return todo
      })]

    default: 
      return state;
  }
}

export default todos;
