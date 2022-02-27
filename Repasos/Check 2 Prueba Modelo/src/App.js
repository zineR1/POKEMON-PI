import React from 'react'
import { Switch, Route } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Home from './components/Home/Home';
import AddTodo from './components/AddTodo/AddTodo';
import './App.css';


// En este componente deberias cargar tus rutas.
export function App() {
  return (
    <div className="App">
        <Nav />
        <Switch>

          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/add">
            <AddTodo />
          </Route>

        </Switch>
    </div>
  );
}

export default App;
