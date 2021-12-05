import {GET_POKEMONS,FILTER_CREATED, ORDER_BY_NAME} from "../actions";


const initialState = {
    pokemon : [],
    allPokemons: [],
    
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
        const createdFilter = action.payload === 'Created' ? state.allPokemons.filter(el => el.createdInDb) : state.allPokemons.filter(e => !e.createdInDb) 
        console.log(createdFilter)

            return{
                ...state,
                 pokemon: createdFilter
            }
        case ORDER_BY_NAME:
            let sortedArr = action.payload === 'asc'?
               state.allPokemons.sort(function(a,b){
                   if(a.name > b.name){
                       return 1
                   }
                   if(b.name > a.name){
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
        
            
    //    case GET_TYPES:
    //     return{
    //         ...state,
    //         allTypes: action.payload,
    //         allPokemons: action.payload
            
    //        }

    //     case FILTER_TYPES:
    //         const typesFiltered = action.payload === 'types' ? allPokemons.types.name : allPokemons.filter(el => el.types.name === action.payload)   
    //         return{
    //                 ...state,
    //                 types: typesFiltered
            // }

           default:
               return state;
   }
}
   
export default rootReducer;