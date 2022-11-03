import React from "react";
import { Link } from 'react-router-dom'
import './LandingPage.css'
export default function LandingPage() {
    return (
        <div>

        
        
        <div className="divLanding">
            
                <h1>Bienvenidos al PI de Pokemones</h1>
                    <Link to='/home'>
                         <button>Ingresar</button>
                    </Link>
                      
        </div>

            <p>Este es el Proyecto individual de Pablo Swistoniuk.
                en el cual se pone en practica todo lo desarrollado en el Bootcamp de SoyHenry
            </p>
        </div>
        
    )
}