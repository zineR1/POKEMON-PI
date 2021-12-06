import React, {useState,useEffect} from "react";
import {Link, useHistory} from "react-router-dom";
import {postPokemon, GetTypes} from '../actions/';
import {useDispatch, useSelector} from "react-redux";
import { getTypes } from "../actions";

export default function PokemonsCreate(){
const dispatch = useDispatch()
const types = useSelector(state => state.types)

const [input,setInput] = useState({
   name: "",
   types: [],
   img: "",
   hp: "",
   attack: "",
   defense: "",
   speed: "",
   height: "",
   weight: ""
   
})

function handleChange(e){
    setInput({
    ...input,
    [e.target.name] : e.target.value
    })
}

useEffect(()=> {
    dispatch(getTypes())
}, [])

return(
    <div>
        <Link to= '/home'><button>Back</button></Link>
        <h1>Create Pokemon</h1>  
        <form>
            <div>
            <label>Name:</label>
            <input
            type= "text"
            value= {input.name}
            name = "name"
            />
            </div>

            <select>
                {types.map((type) => (
                     <option value={type.name}>{type.name}</option>
                ))}
            </select>
            
            <div>
            <label>Image:</label>
            <input
            type= "text"
            value= {input.img}
            name = "img"
            />
            </div>

            <div>
            <label>Hp:</label>
            <input
            type= "number"
            value= {input.hp}
            name = "hp"
            />
            </div>

            <div>
            <label>Attack:</label>
            <input
            type= "number"
            value= {input.attack}
            name = "attack"
            />
            </div>

            <div>
            <label>Defense:</label>
            <input
            type= "defense"
            value= {input.defense}
            name = "defense"
            />
            </div>

            <div>
            <label>Speed</label>
            <input
            type= "number"
            value= {input.speed}
            name = "speed"
            />
            </div>

            <div>
            <label>Height:</label>
            <input
            type= "number"
            value= {input.height}
            name = "height"
            />
            </div>

            <div>
            <label>Weight:</label>
            <input
            type= "number"
            value= {input.weight}
            name = "weight"
            />
            </div>
            <button type='submit'>Create Pokemon</button>
        </form>
    </div>
)

}


