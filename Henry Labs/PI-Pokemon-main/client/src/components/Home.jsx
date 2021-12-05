import React from "react";
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getPokemons,filterCreated,orderByName} from "../actions";
import {Link} from 'react-router-dom';
import Card from './Card';
import Paginado from './Paginado';

//El useState se utiliza para cambiar el estado de un componente.
//El useEffect es un hook que se utiliza para renderizar el componente la primera vez y
//cada vez que se efectúa un cambio en el componente.
//El useSelector es:
//El useDispatch es:

export default function Home(){

    const dispatch = useDispatch()
    const allPokemons = useSelector(state => state.pokemon)
    // console.log(allPokemons, "home")
    //PAGINADO
    const [currentPage, setCurrentPage] = useState(1) // PÁGINA INICIAL
    const [orden, setOrden] = useState('')


   const nextPage = () => {
       setCurrentPage(currentPage + 1)
   }

   const prevPage = () => {
   if(currentPage > 1){
       setCurrentPage(currentPage - 1)
   } 
}
       
   


    const [pokemonsPerPage, setPokemonsPerPage] = useState(12) //CANTIDAD DE POKEMONS POR PÁGINA
    const indexOfLastPokemon = currentPage * pokemonsPerPage //12
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage //0
    const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon) 


    const paginado =  (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
      dispatch(getPokemons());
    },[dispatch])

    function handleClick(e){
        e.preventDefault()
        dispatch(getPokemons());
    }

    function handleFilterCreated(e){
        dispatch(filterCreated(e.target.value))
    }

    function handleSort(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

    // function handleFilterTypes(e){
    //     e.preventDefault()
    //     dispatch(getTypes(e.target.value))
    // }
  

return (
    <div>
        <Link to= '/pokemons'>New Pokemon</Link>
        <h1>POKEMON</h1>
        <button onClick = {e => {handleClick(e)}}>Recharge Pokemons</button>  {/* RECARGA LOS POKEMONS */}
         

        <div>
            <select button onChange = {e => {handleSort(e)}}> 
                <option value= 'asc'>A-Z</option> {/* FILTRANDO EN ORDEN ASCENDENTE */}
                <option value= 'desc'>Z-A</option>  {/* FILTRANDO EN ORDEN DESCENDENTE */}
            </select>
            {/* INTENTAR HACER UN MAP */}

             {/* ESTÁ FILTRANDO LOS POKEMONS POR TYPES */} 
            <select>
            
            <option value= 'types'>All Types</option>
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
            <select onChange={e => handleFilterCreated(e)}>
                 {/* FILTRA POR ORIGEN DEL POKEMON */}
                <option value= 'All'>All</option>
                <option value= 'Created'>Created</option>
                <option value= 'Api'>Api Pokemon</option>
            </select>
            {/* <select>
                <option value=  'a-z'>A-Z</option>
            </select> */}
            <br/>

        <button onClick = {prevPage}> {'< Previous'} </button>        
           <Paginado
           pokemonsPerPage = {pokemonsPerPage}
           allPokemons = {allPokemons.length}
           paginado = {paginado}
           />
       <button onClick = {nextPage}> {'Next >'} </button>





            {currentPokemons?.map(c => 
    
    <div key={c.name}>
      <Card name={c.name} img={c.img} types={c.types.map( e => e.name + " ")}/>

      
     </div> 
   
    
                   
 )}
            
        </div>
    </div> 
 )
}
