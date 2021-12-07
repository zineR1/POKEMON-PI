import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {getDetail} from '../actions/';
import {useDispatch, useSelector} from "react-redux";

export default function Detail(props){
    console.log(props)
    const dispatch = useDispatch()

    useEffect(() => {
       dispatch(getDetail(props.match.params.id))
    }, [dispatch])

     
    const myPokemon = useSelector(state => state.detail)

    return(
        <div>
            {
                myPokemon.length > 0 ? 
                <div>
                   <h1>I'm {myPokemon[0].name}</h1>
                   <h4>{myPokemon[0].types.name} </h4>
                   <img src={myPokemon[0].img}/>
                   <h4>Hp: {myPokemon[0].hp}</h4>
                   <h4>Attack: {myPokemon[0].attack} </h4>
                   <h4>Defense: {myPokemon[0].defense}</h4>
                   <h4>Speed: {myPokemon[0].speed}</h4>
                   <h4>Height: {myPokemon[0].height}</h4>
                   <h4>Weight: {myPokemon[0].weight}</h4>

                </div> : <p>loading..</p>
            }
            <Link to= '/home'>
                <button>Back</button>
            </Link>
        </div>
    )
}