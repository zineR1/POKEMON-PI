import React from "react";

export default function Paginado({pokemonsPerPage, allPokemons, paginado}){
    const pageNumbers = []
    
    for(let i=1; i <= Math.ceil(allPokemons/pokemonsPerPage); i++){
        pageNumbers.push(i)
    }

    return(
        <nav>
            {/* <ul className='paginado'> */}
                { pageNumbers &&
                pageNumbers.map(number => ( 
                    // <li className= 'number' key={number}>
                    <button className= 'number' key={number} onClick = {() => paginado(number)}>{number}</button>
                    // </li>
                ))}
            {/* </ul> */}
        </nav>
        
    )
}