import React from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../../actions';

// Nota 1: Para utilizar el hook `useState` para el manejo de estados de los inputs, tendras que utilizarlo de la siguiente manera
//React.useState

// Nota 2: En este componente tendras que usar la funcion `connect` de react-redux para conectarte al store. 
// Si usas el hook `useDispatch` no funcionaran los test.

export function AddTodo({addTodo}) {
  const [input, setInput] = React.useState({
    title: "",
    description: "",
    place: "",
    date: ""
  })

  const handleOnChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }
  
  const handleOnSubmit = (e) => {
    e.preventDefault();
    addTodo(input);
  }

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <label>Title</label>
        <input name="title" onChange={handleOnChange}/>

        <label>Description</label>
        <textarea name="description" onChange={handleOnChange}/>

        <label>Place</label>
        <input name="place" onChange={handleOnChange}/>

        <label>Date</label>
        <input name="date" onChange={handleOnChange}/>

        <button type="submit">Enviar</button>
      </form>
    </div>
  )
};

const mapStateToProps = (state) => {
  return{
    ...state
  }
}

export default connect(mapStateToProps, { addTodo })(AddTodo);