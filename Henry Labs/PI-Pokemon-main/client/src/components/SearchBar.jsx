import React from "react";
import {useState} from "react";
import{useDispatch} from "react-redux";
import{getNamePokemons} from "../actions";
import style from "./SearchBar.module.css";

export default function SearchBar (){
    const dispatch = useDispatch()
    const [name,setName] = useState("")

    function handleInputChange(e){
      e.preventDefault();
      setName(e.target.value);
      console.log(name)
    }

    function handleSubmit(e){
     e.preventDefault()
     dispatch(getNamePokemons(name))
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