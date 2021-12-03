import React from "react";
import {Link} from "react-router-dom";

export default function LandingPage(){
    return(
        <div>
            <h1>Welcome Pokemon Master</h1>
            <Link to = '/home'>                    {/*BOTÓN CON LINK A HOME */}
                <button>Ingresar</button>
            </Link>
        </div>
    )
}