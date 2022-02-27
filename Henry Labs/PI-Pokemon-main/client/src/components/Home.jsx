import React from "react";
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getPokemons,filterCreated,orderByName,filterTypes, orderByAttack, getTypes} from "../actions";
import {Link} from 'react-router-dom';
import Card from './Card';
import Paginado from './Paginado';
import SearchBar from "./SearchBar";
import style from "./Home.module.css";
import Loader from "./Loader";




export default function Home(){

    const dispatch = useDispatch()
    const allPokemons = useSelector(state => state.pokemon)
   
    const types = useSelector(state => state.types)
    //PAGINADO
    const [currentPage, setCurrentPage] = useState(1) 
    const [orden1, setOrden] = useState('')
    const [orden2, setOrden2] = useState('')
   


     //CANTIDAD DE POKEMONS POR PÁGINA
    const [pokemonsPerPage] = useState(12)
    const indexOfLastPokemon = currentPage * pokemonsPerPage //12
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage //0
    const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);
    const [loading, setLoading] = useState(false);


    const paginado =  (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
      dispatch(getPokemons())
      dispatch(getTypes())
    },[dispatch])

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
    
        
return (
    <div className={style.principal}>
        <div className={style.header}>
            <a href="/home">
        <img className={style.pokemon} src= "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png " alt="" width= "250px" height='90px'/>
        </a>
        <a href="/pokemons">
        <img className={style.play} src="https://pngimg.com/uploads/pokeball/pokeball_PNG3.png" alt="" width= "70px" height='70px'/>
        </a>        
        <br/>
        
        <SearchBar/>
            <select className={style.botonfilter} onChange = {e => {handleSort(e)}}> 
                <option>Order by Letter </option>
                <option value= 'asc'>A-Z</option> {/* FILTRANDO EN ORDEN ASCENDENTE */}
                <option value= 'desc'>Z-A</option>  {/* FILTRANDO EN ORDEN DESCENDENTE */}
            </select>

            <select className={style.botonfilter} onChange = {e => {handleSort2(e)}}> 
                <option value=''>Filter bt Attack </option>
                <option value= 'attack'>Attack+</option> 
                <option value= 'defense'>Attack-</option>  
            </select> 

             {/* FILTRAR LOS POKEMONS POR TYPES */} 
             <select className={style.botonfilter} name="type" onChange = {e => handleFilterTypes(e)}>
                 <option value=''>Filter by Types </option>
                {types?.map(type => (
                     <option value={type.name} key={type.id}>{type.name}</option>
                ))}
            </select>

            <select className={style.botonfilter} onChange={e => handleFilterCreated(e)}>
                 {/* FILTRA POR ORIGEN DEL POKEMON */}
                 <option value=''>Filter by Origin</option>
                <option value= 'All'>All</option>
                <option value= 'Created'>Created</option>
                <option value= 'Api'>Api Pokemon</option>
            </select>
    <br/>
     </div>
     <div className={style.loader_div}>
     {!currentPokemons[0]?<Loader/>: console.log("hola")}
     </div>
      <div className={style.grid}>
            {currentPokemons?.map(c => {
        return(

        <Link className={style.btnName} to= {'/detail/' + c.id}  key={c.id}>
      <Card className={style.grid} name={c.name} img={c.img} types={c.types.map( e => e.name + " ")}/>
      </Link>
      
        );             
        })}
           </div>   
           {/* <div className={style.paginado}>         */}
            <Paginado
           pokemonsPerPage = {pokemonsPerPage}
           allPokemons = {allPokemons.length}
           paginado = {paginado}
           />
        {/* </div> */}
    </div> 
 )
}
