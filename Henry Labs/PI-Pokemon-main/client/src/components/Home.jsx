import React from "react";
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getPokemons,getTypes} from "../actions";
import {Link} from 'react-router-dom';
import Card from './Card';

//El useState se utiliza para cambiar el estado de un componente.
//El useEffect es un hook que se utiliza para renderizar el componente la primera vez y
//cada vez que se efectúa un cambio en el componente.
//El useSelector es:
//El useDispatch es:

export default function Home(){

    const dispatch = useDispatch()
    const allPokemons = useSelector(state => state.pokemon)
    console.log(allPokemons, "home")
    // const [currentPage, setCurrentPage] = useState(1)
    // const [pokemonsPerPage, setPokemonsPerPage] = useState(12)
    // const indexOfLastPokemon = currentPage

    useEffect(() => {
      dispatch(getPokemons());
    },[dispatch])

    // const allTypes = useSelector(state => state.types)

    // useEffect(() => {
    //     dispatch(getTypes());
    // },[dispatch])

return (
    <div>
        <Link to= '/pokemons'>New Pokemon</Link>
        <h1>POKEMON</h1>
        <button>Recharge Pokemons</button>  {/* RECARGA LOS POKEMONS */}
        <div>
            <select> 
                <option value= 'asc'>Ascending</option> {/* FILTRANDO EN ORDEN ASCENDENTE */}
                <option value= 'desc'>Descending</option>  {/* FILTRANDO EN ORDEN DESCENDENTE */}
            </select>
            {/* INTENTAR HACER UN MAP */}

             {/* ESTÁ FILTRANDO LOS POKEMONS POR TYPES */} 
            <select>
            
            <option value= 'typ'>Types:</option>
            <option value= 'bug'>bug</option>
            <option value= 'dark'>dark</option>
            <option value= 'dragon'>dragon</option>
            <option value= 'electric'>electric</option>
            <option value= 'fairy'>fairy</option>
            <option value= 'fighting'>fighting</option>
            <option value= 'fire'>fire</option>
            <option value= 'flying'>flying</option>
            <option value= 'ghost'>ghost</option>           
            <option value= 'grass'>grass</option>
            <option value= 'ground'>ground</option>
            <option value= 'ice'>ice</option>
            <option value= 'normal'>normal</option>
            <option value= 'poison'>poison</option>
            <option value= 'psychic'>psychic</option>
            <option value= 'rock'>rock</option>
            <option value= 'shadow'>shadow</option>
            <option value= 'steel'>steel</option>
            <option value= 'unknown'>unknown</option>
            <option value= 'water'>water</option>
            </select>
            <select>
                 {/* FILTRA POR ORIGEN DEL POKEMON */}
                <option value= 'All'>All</option>
                <option value= 'Created'>Created</option>
                <option value= 'Api'>Api Pokemon</option>
            </select>
            <select>
                <option value= 'a-z'>A-Z</option>
            </select>
           
            {allPokemons.map(c => 
    
    <div key={c.name}>
      <Card name={c.name} img={c.img} types={c.types.map( e => e.name + " ")}/>

      
     </div> 
   
    
                   
 )}
            
        </div>
    </div> 
 )
}
