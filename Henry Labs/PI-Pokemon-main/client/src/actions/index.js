import axios from "axios";

export const GET_POKEMONS = 'GET_POKEMONS'
export const FILTER_CREATED = 'FILTER_CREATED'
export const ORDER_BY_NAME = 'ORDER_BY_NAME'
// export const GET_TYPES= 'GET_TYPES'
// export const FILTER_TYPES= 'FILTER_TYPES'

export function getPokemons(){

    return async function(dispatch){
        try{
        const json = await axios.get("http://localhost:3001/pokemons"); 
        return dispatch({
        type: GET_POKEMONS,
        payload: json.data
        }) 
    } catch(error){
        console.log(error);
    }
}
};

export function filterCreated(payload){
    return{
        type: FILTER_CREATED,
        payload
    }
}

export function orderByName(payload){
return{
    type: ORDER_BY_NAME,
    payload
}
}


// export function getTypes(){
//     return async function(dispatch){
//         try{
//         const json1 = await axios.get("http://localhost:3001/types"); 
//         return dispatch({
//         type: GET_TYPES,
//         payload: json1.data.name
//         }) 
//     } catch(error){
//         console.log(error);
//     }
// }
// };

// export function filterTypes(payload){
//     return{
//         type: FILTER_TYPES,
//         payload
//     }
// }