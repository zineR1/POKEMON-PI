import axios from "axios";

export const GET_POKEMONS = 'GET_POKEMONS'
export const FILTER_CREATED = 'FILTER_CREATED'
export const ORDER_BY_NAME = 'ORDER_BY_NAME'
export const ORDER_BY_ATTACK = 'ORDER_BY_ATTACK'
export const GET_NAME_POKEMONS = 'GET_NAME_POKEMONS'
export const GET_TYPES= 'GET_TYPES'
export const POST_POKEMON= 'POST_POKEMON'
export const FILTER_TYPES= 'FILTER_TYPES'
export const GET_DETAILS= 'GET_DETAILS'

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

export function orderByAttack(payload){
    return{
        type: ORDER_BY_ATTACK,
        payload
    }
}

export function postPokemon(payload){
    return async function(dispatch){
         const response = await axios.post('http://localhost:3001/pokemons', payload);
         console.log(response)
         return dispatch({
            type: POST_POKEMON,
            payload: response
        })
    }
}

export function getNamePokemons(name){
    return async function(dispatch){
        try{
       const json = await axios.get("http://localhost:3001/pokemons?name=" + name); 
        return dispatch({
            type: GET_NAME_POKEMONS,
            payload: json.data
            }) 
    }
 catch(error){
        console.log(error);
    }
}}


export function getTypes(){  
    return async function(dispatch){
        const info = await axios.get('http://localhost:3001/types');
        return dispatch({
            type: GET_TYPES,
            payload :info.data
        })
    }
} 


export function filterTypes(payload){
    return{
        type: FILTER_TYPES,
        payload
    }
}

export function getDetail(id){     //tenemos que recibir el n??mero de id del pokemon
    return async function (dispatch){
        try{
          const json = await axios.get('http://localhost:3001/pokemons/' + id);
          return dispatch({
              type: GET_DETAILS,
              payload: json.data
          })
    }
    catch(error){
        console.log(error)
    }
} 
}