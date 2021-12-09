import React from "react";
import {Link} from "react-router-dom";
import style from "./LandingPage.module.css"

export default function LandingPage(){
    return(
        <div className={style.fondo} >
            <br/>
            <div>
            <img className={style.create}src="https://fontmeme.com/permalink/211209/c620be3f9ec3eca8884ca71da383d5fe.png" alt="fuente-pokemon" border="0"/>
            {/* <h1>Welcome Pokemon Master</h1> */}
            <br/>
            <Link to = '/home'>                    {/*BOTÓN CON LINK A HOME */}
                <button className={style.btn}>Ingresar</button>
            </Link>
            </div>
            <br/>
            </div>
    )
}