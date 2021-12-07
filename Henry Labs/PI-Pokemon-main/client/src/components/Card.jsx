import React from "react";
import style from "./Card.module.css";


export default function Card({name, img, types}){
    return(

        <div className={style.Card}>        {/* ESTA ES LA CARD DE CADA POKEMON EN LA RUTA GENERAL */}
            <img src='file:///C:/Users/Sugus/Desktop/Repo/Henry%20Labs/PI-Pokemon-main/bg-pattern-card.svg' alt="" />
            <h4 className={style.name}>{name}</h4>
            <h5>{types}</h5>
            <img src = {img} alt= 'img not found' width= "200px" height='250px'/>
        </div>

    )
}

