import React from "react";
import { Link } from 'react-router-dom'
import s from './LandingPage.module.css'
import imagen from './imagen/pokemon.png'
export default function LandingPage() {
    return (
        <div className={s.divMaster}>
         
         <img className={s.imagen} src={imagen} alt="" />
        
            <div>
                <Link to='/home'>
                <button className={s.boton}>Ingresar</button>
            </Link>
            </div>

            

            <p className={s.p}>Proyecto individual de Pablo Swistoniuk.
           El cual se pone en practica todo lo desarrollado en el Bootcamp de SoyHenry</p>




        </div>

    )
}