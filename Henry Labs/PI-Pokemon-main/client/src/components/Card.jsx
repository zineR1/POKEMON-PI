import React from "react";

export default function Card({name, img, types}){
    return(
        <div>        {/* ESTA ES LA CARD DE CADA POKEMON EN LA RUTA GENERAL */}
            <h3>{name}</h3>
            <h5>{types}</h5>
            <img src = {img} alt= 'img not found' width= "200px" height='250px'/>
        </div>

    )
}

