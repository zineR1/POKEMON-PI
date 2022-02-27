import React, {useState,useEffect} from "react";
import {Link, useHistory} from "react-router-dom";
import {postPokemon, getTypes} from '../actions/';
import {useDispatch, useSelector} from "react-redux";
import style from "./PokemonsCreate.module.css";
import backicon from "../back.png";


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
    <div className={style.gral}>
        <img className={style.create} src="https://fontmeme.com/permalink/211208/35eeaea61e4ed59bf55c0ad42d69c785.png" alt="fuente-pokemon" border="0"/>
        <form onSubmit={handleSubmit}>
            <div>
            <select className={style.types} onChange={e => handleSelect(e)}>
                <p>Select Types:</p>
                {types.map((type) => (
                     <option key={type.id} value={type.name}>{type.name}</option>
                     
                ))}
            </select>
            <br/>
            <input className={style.input}
            type= "text"
            value= {input.name}
            name = "name"
            placeholder = "Pokemon Name:"
            onChange={e => handleChange(e)}
            />
            {errors.name && (
                <p className='error'>{errors.name}</p>
            )}
            </div>
        
            <div>
            <input className={style.input}
            type= "text"
            value= {input.img}
            name = "img"
            placeholder = "Image Url:"
            onChange={e => handleChange(e)}
            />
            </div>

            <div>
            <input className={style.input}
            type= "number"
            value= {input.hp}
            name = "hp"
            placeholder = "Hp Value:"
            onChange={e => handleChange(e)}
            />
            </div>

            <div>
            <input className={style.input}
            type= "number"
            value= {input.attack}
            name = "attack"
            placeholder = "Attack Value:"
            onChange={e => handleChange(e)}
            />
            </div>

            <div>
            <input className={style.input}
            type= "defense"
            value= {input.defense}
            name = "defense"
            placeholder = "Defense Value:"
            onChange={e => handleChange(e)}
            />
            </div>

            <div>
            <input className={style.input}
            type= "number"
            value= {input.speed}
            name = "speed"
            placeholder = "Speed Value:"
            onChange={e => handleChange(e)}
            />
            </div>

            <div>
            <input className={style.input}
            type= "number"
            value= {input.height}
            name = "height"
            placeholder = "Heigh:"
            onChange={e => handleChange(e)}
            />
            </div>

            <div>
            <input className={style.input}
            type= "number"
            value= {input.weight}
            name = "weight"
            placeholder = "Weight:"
            onChange={e => handleChange(e)}
            />
            </div>
            <button className={style.btnCreate} type='submit'>Create Pokemon</button>
        </form>
      {input.types.map(el =>
        <div key={el}>
            <p key={el}>{el}</p>
            <button key={el} className="botonX" onClick={()=> handleDelete(el)}>x</button>
        </div>
        )}
          <Link to= '/home'>
                <button className={style.btnBack}><img src={backicon} alt="goback" height="20px" width="20px"/></button>
            </Link>    </div>
)

}


