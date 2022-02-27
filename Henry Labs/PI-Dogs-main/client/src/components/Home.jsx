import React from "react";
import {useState,useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { getDogs } from "../actions";
import {Link} from "react-router-dom";
import Card from "./Card"

export default function Home(){

const dispatch = useDispatch();
const allDogs = useSelector ((state) => state.dogs)

useEffect(() => {
     dispatch(getDogs())
},[])

function handleClick(e){
    e.preventDefault();
    dispatch(getDogs());
}

return(
    <div>
        <Link to="/dogs">Create Breed</Link>
        <h1>THE DOG APP</h1>
        <button onClick={e=>{handleClick(e)}}>Refresh</button>
        <div>
            <select>
                  <option value="asc">A-Z</option>
                  <option value="desc">Z-A</option>   
            </select>
            <select>
            <option value="all">All</option>
            <option value="created">Created</option>
            <option value="api">Api</option>
            </select>
        </div>
        <div>
      {
        allDogs && allDogs.map(el => {
         <Card name={el.name} img={el.img} temperament={el.temperament} weight={el.weight}/>
        })
       }   
    </div>
    </div>
)
}

