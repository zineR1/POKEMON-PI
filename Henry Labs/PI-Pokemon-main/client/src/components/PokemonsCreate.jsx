import React, {useState,useEffect} from "react";
import {Link, useHistory} from "react-router-dom";
import {postPokemon, getTypes} from '../actions/';
import {useDispatch, useSelector} from "react-redux";

function validate(input){
    let errors = {};
    if(!input.name){
        errors.name = "Name required"
    }
   return errors;
};


export default function PokemonsCreate(){
const dispatch = useDispatch();
const history = useHistory();
const types = useSelector(state => state.types);
const [errors,setErrors] = useState({});

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
    setErrors(validate({
        ...input,
        [e.target.name] : e.target.value
    }));
}

function handleSelect(e){
    setInput({
        ...input,
        types:[...input.types, e.target.value]
    })
}

function handleSubmit(e){
    e.preventDefault();
    dispatch(postPokemon(input))
    alert("Pokemon Created!")
    setInput({
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
    history.push('/home')
}

function handleDelete(e){
setInput({
    ...input,
    types: input.types.filter(type => type !== e)
})
}

useEffect(()=> {
    dispatch(getTypes())
}, [dispatch])

return(
    <div>
        <Link to= '/home'><button>Back</button></Link>
        <h1>Create Pokemon</h1>  
        <form onSubmit={handleSubmit}>
            <div>
            <label>Name:</label>
            <input
            type= "text"
            value= {input.name}
            name = "name"
            onChange={e => handleChange(e)}
            />
            {errors.name && (
                <p className='error'>{errors.name}</p>
            )}
            </div>
        
            <div>
            <label>Image:</label>
            <input
            type= "text"
            value= {input.img}
            name = "img"
            onChange={e => handleChange(e)}
            />
            </div>

            <div>
            <label>Hp:</label>
            <input
            type= "number"
            value= {input.hp}
            name = "hp"
            onChange={e => handleChange(e)}
            />
            </div>

            <div>
            <label>Attack:</label>
            <input
            type= "number"
            value= {input.attack}
            name = "attack"
            onChange={e => handleChange(e)}
            />
            </div>

            <div>
            <label>Defense:</label>
            <input
            type= "defense"
            value= {input.defense}
            name = "defense"
            onChange={e => handleChange(e)}
            />
            </div>

            <div>
            <label>Speed</label>
            <input
            type= "number"
            value= {input.speed}
            name = "speed"
            onChange={e => handleChange(e)}
            />
            </div>

            <div>
            <label>Height:</label>
            <input
            type= "number"
            value= {input.height}
            name = "height"
            onChange={e => handleChange(e)}
            />
            </div>

            <div>
            <label>Weight:</label>
            <input
            type= "number"
            value= {input.weight}
            name = "weight"
            onChange={e => handleChange(e)}
            />
            </div>

            {/* <a>Types:</a> */}
            <select onChange={e => handleSelect(e)}>
                {types.map((type) => (
                     <option key={type.id} value={type.name}>{type.name}</option>
                ))}
            </select>
            {/* <ul><li>{input.types.map(el => el + ", ")}</li></ul> */}
            <button type='submit'>Create Pokemon</button>
        </form>
      {input.types.map(el =>
        <div className = 'divType' key={el}>
            <p key={el}>{el}</p>
            <button key={el} className="botonX" onClick={()=> handleDelete(el)}>x</button>
        </div>
        )}

    </div>
)

}


