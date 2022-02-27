import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {getDetail} from '../actions/';
import {useDispatch, useSelector} from "react-redux";
import style from './Detail.module.css'
import Loader from "./Loader";
import backicon from "../back.png";

export default function Detail(props){
    
    const dispatch = useDispatch()

    useEffect(() => {
       dispatch(getDetail(props.match.params.id))
    }, [dispatch])

     
    const myPokemon = useSelector(state => state.detail)
    
    return(
        <div className={style.main1}>
            {
                !myPokemon[0]? <Loader/> :(
                <div className={style.detailgral}>
            <Link to= '/home'>
                <button className={style.detailboton}><img src={backicon} alt="goback" height="20px" width="20px"/></button>
            </Link>
            <div className={style.container}>
               <div className={style.detailinfo}>
                   <h1 className={style.name}>I'm {myPokemon[0].name}</h1>
                   <h4 className={style.title}>Types: {myPokemon[0].types.map(el=> el.name + " ")}</h4>
                   <img className={style.img} src={myPokemon[0].img} alt="img" width='250px' height='250px'/>
                   <h4 className={style.font}>Hp: {myPokemon[0].hp}</h4>
                   <h4 className={style.font}>Attack: {myPokemon[0].attack} </h4>
                   <h4 className={style.font}>Defense: {myPokemon[0].defense}</h4>
                   <h4 className={style.font}>Speed: {myPokemon[0].speed}</h4>
                   <h4 className={style.font}>Height: {myPokemon[0].height}</h4>
                   <h4 className={style.font}>Weight: {myPokemon[0].weight}</h4>
              </div>

        </div>
        <br/>
            </div>
                )}
                
            </div>
            
            
    )
}