import React from "react";

export default function Card({name, img, temperament, weight}){
return(
    <div>
        <h3>{name}</h3>
        <img src={img} alt="img not found" width="200px" height="200px"/>
        <h5>{temperament}</h5>
        <h5>{weight}</h5>
    </div>
)
}