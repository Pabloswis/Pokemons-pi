import React from "react";
import './Card.css'

export default function pokeCard ({id,nombre,imagen,tipo}){
    return (
        <div className='card'>
           
            <h2>{nombre.charAt(0).toUpperCase() + nombre.substring(1)}</h2>
            <img src={imagen} alt="imagen pokemon" width='200px' height='250px'  />
            {/* separar los nombres de los tipos, ponerlos en mayusculas */}
            <h3 >{tipo.map(t=> t.charAt(0).toUpperCase() + t.substring(1)).join(' - ')}</h3>
            
        </div>
    )
}