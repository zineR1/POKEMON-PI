import {GET_POKEMONS,FILTER_CREATED, ORDER_BY_NAME, GET_NAME_POKEMONS, GET_TYPES, 
        POST_POKEMON, FILTER_TYPES,GET_DETAILS,ORDER_BY_ATTACK} from "../actions";


const initialState = {
    pokemon : [],
    allPokemons: [],
    types: [],
    detail:[]
    
}


function rootReducer(state = initialState, action){
   switch(action.type){
       case GET_POKEMONS:
    
           return{
               ...state,
               pokemon: action.payload,
               allPokemons: action.payload
           }
        case FILTER_CREATED:
        const createdFilter = action.payload === 'Created' ? state.allPokemons.filter(el => el.createdInDb) : state.allPokemons.filter(el => !el.createdInDb) 

            return{
                ...state,
                pokemon: createdFilter
            }
            
        case POST_POKEMON:
           return{
               ...state
           }

        case ORDER_BY_ATTACK:
            let sortedArr2 = action.payload === 'attack'?
               state.allPokemons.sort(function(a,b){
                   if(a.attack > b.attack){
                       return 1
                   }
                   if(b.attack > a.attack){
                       return -1
                   }
                   return 0
               }):
               state.allPokemons.sort(function(a,b){
                   if(a.attack > b.attack){
                       return -1
                   }
                   if(a.attack > b.attack){
                       return 1
                   }
                   return 0
               })
               return {
                   ...state,
                   pokemon: sortedArr2
               }

        case ORDER_BY_NAME:
            let sortedArr = action.payload === 'asc'?
               state.allPokemons.sort(function(a,b){
                   if(a.name.toLowerCase() > b.name.toLowerCase()){
                       return 1
                   }
                   if(b.name.toLowerCase() > a.name.toLowerCase()){
                       return -1
                   }
                   return 0
               }):
               state.allPokemons.sort(function(a,b){
                   if(a.name > b.name){
                       return -1
                   }
                   if(a.name > b.name){
                       return 1
                   }
                   return 0
               })
               return {
                   ...state,
                   pokemon: sortedArr
               }

    
        case GET_NAME_POKEMONS:
            return{
                ...state,
                pokemon: action.payload
            }
        


    case GET_TYPES:
        return{
            ...state,
            types: action.payload,
        }

        case FILTER_TYPES:
        const result = action.payload 
        const typesFiltered = state.allPokemons.filter(el=> el.types.some(e => e.name === result))
    
            return{
                    ...state,
                    pokemon: typesFiltered
            }
        

        case GET_DETAILS:
            return {
                ...state,
                detail: action.payload
            }

           default:
               return state;
   }
}
   
export default rootReducer;