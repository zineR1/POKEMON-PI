import React from "react";
import {useState} from "react";
import{useDispatch, useSelector} from "react-redux";
import{getNamePokemons} from "../actions";
import style from "./SearchBar.module.css";

export default function SearchBar (){
    const dispatch = useDispatch()
    const [name,setName] = useState("")
    const pokemones =  useSelector(state => state.allPokemons)
    const pokemonNames = pokemones.map(el => el.name)

    function handleInputChange(e){
      e.preventDefault();
      setName(e.target.value);
    }

    function handleSubmit(e){
     e.preventDefault()
     if(!name){
       alert("Write a name to search")
     }
     if(!pokemonNames.includes(name)){
       alert("This Pokemon doesn't exist")
    }else{
     dispatch(getNamePokemons(name))
     }
    }

    return(
        <div className={style.SearchBarDiv}>      
      <input className={style.Searchinput}
      type='text'
      placeholder="Search..."
      onChange={e => handleInputChange(e)} 
      />      
        <button  className={style.Searchbutton} type='submit' onClick={e => {handleSubmit(e)}}>Search</button>
        </div>
    )
}