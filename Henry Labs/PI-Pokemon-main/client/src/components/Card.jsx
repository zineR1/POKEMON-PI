import React from "react";
import style from "./Card.module.css";


export default function Card({name, img, types}){
    return(

        <div className={style.Card}>        {/* ESTA ES LA CARD DE CADA POKEMON EN LA RUTA GENERAL */}
            <h3 className={style.name}>{name}</h3>
            <h5 className={style.types}>{types}</h5>
            <img className={style.img} src = {img} alt= 'img not found' width= "150px" height='180px'/>
        </div>

    )
}

