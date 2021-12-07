import React from "react";
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getPokemons,filterCreated,orderByName,filterTypes, orderByAttack, getTypes} from "../actions";
import {Link} from 'react-router-dom';
import Card from './Card';
import Paginado from './Paginado';
import SearchBar from "./SearchBar";
import style from "./Home.module.css"

//El useState se utiliza para cambiar el estado de un componente.
//El useEffect es un hook que se utiliza para renderizar el componente la primera vez y
//cada vez que se efectúa un cambio en el componente.
//El useSelector es:
//El useDispatch es:

export default function Home(){

    const dispatch = useDispatch()
    const allPokemons = useSelector(state => state.pokemon)
   
    const types = useSelector(state => state.types)
    //PAGINADO
    const [currentPage, setCurrentPage] = useState(1) // PÁGINA INICIAL
    const [orden, setOrden] = useState('')
    const [orden2, setOrden2] = useState('')

   const nextPage = () => {
       setCurrentPage(currentPage + 1)
   }

   const prevPage = () => {
   if(currentPage > 1){
       setCurrentPage(currentPage - 1)
   } 
}
       
   


     //CANTIDAD DE POKEMONS POR PÁGINA
    const [pokemonsPerPage] = useState(12)
    // const [pokemonsPerPage, setPokemonsPerPage] = useState(12)
    const indexOfLastPokemon = currentPage * pokemonsPerPage //12
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage //0
    const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon) 


    const paginado =  (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
      dispatch(getPokemons())
    },[dispatch])

    useEffect(()=> {
      dispatch(getTypes())
    }, [dispatch])

    function handleClick(e){
        e.preventDefault()
        dispatch(getPokemons());
    }

    function handleFilterCreated(e){
        dispatch(filterCreated(e.target.value))
    }

    function handleFilterTypes(e){
        dispatch(filterTypes(e.target.value))
    }

    function handleSort(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }


    function handleSort2(e){
        e.preventDefault();
        dispatch(orderByAttack(e.target.value))
        setCurrentPage(1);
        setOrden2(`Ordenado ${e.target.value}`)
    }
    
    function handleFilterTypes(e){
            dispatch(filterTypes(e.target.value))
        }
        
return (
    <div>
        <Link to= '/pokemons'>New Pokemon</Link>
        <h1>POKEMON</h1>
        <button onClick = {e => {handleClick(e)}}>Recharge Pokemons</button>  
         

        <div>
            <select onChange = {e => {handleSort(e)}}> 
                <option value= 'asc'>A-Z</option> {/* FILTRANDO EN ORDEN ASCENDENTE */}
                <option value= 'desc'>Z-A</option>  {/* FILTRANDO EN ORDEN DESCENDENTE */}
            </select>

            <select onChange = {e => {handleSort2(e)}}> 
                <option value= 'attack'>Attack+</option> 
                <option value= 'defense'>Attack-</option>  
            </select> 

            {/* INTENTAR HACER UN MAP */}

             {/* ESTÁ FILTRANDO LOS POKEMONS POR TYPES */} 
             <select name="type" onChange = {e => handleFilterTypes(e)}>
                 <option value=''>Filtrar x Tipo </option>
                {types?.map(type => (
                     <option value={type.name} key={type.id}>{type.name}</option>
                ))}
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
       <SearchBar/>




            {currentPokemons?.map(c => {
        return(

        <Link to = {'/detail/' + c.id}  key={c.id}>
      <Card name={c.name} img={c.img} types={c.types.map( e => e.name + " ")}/>
      </Link>
      
        );             
        })}
            
        </div>
    </div> 
 )
}
