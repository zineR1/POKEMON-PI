import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import PokemonsCreate from './components/PokemonsCreate';
import Detail from './components/Detail';


function App() {
  return (
    <BrowserRouter>                   {/* RUTAS CON VERSIÓN 5 INSTALADA*/}
    <div className="App">
      <Switch>
        <Route exact path= '/' component= {LandingPage}/>
        <Route path = '/home' component= {Home}/>
        <Route path = '/pokemons' component= {PokemonsCreate}/>
        <Route path = '/home' component= {Detail}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
