import {GET_POKEMONS} from "../actions";
import { GET_TYPES } from "../actions";

const initialState = {
    pokemon : []
}


function rootReducer(state = initialState, action){
   switch(action.type){
       case GET_POKEMONS:
           return{
               ...state,
               pokemon: action.payload
           }
    //    case GET_TYPES:
    //        return{
    //            ...state,
    //            types: action.payload
    //        }
           default:
               return state;
   }
}

export default rootReducer;