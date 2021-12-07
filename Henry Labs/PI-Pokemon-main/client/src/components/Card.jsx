import React from "react";
import {Link} from "react-router-dom";


export default function Card({name, img, types}){
    return(
        <div>        {/* ESTA ES LA CARD DE CADA POKEMON EN LA RUTA GENERAL */}
            
            <h4>{name}</h4>
            <h5>{types}</h5>
            <img src = {img} alt= 'img not found' width= "200px" height='250px'/>
        </div>

    )
}

