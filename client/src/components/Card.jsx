import React from "react";
import './Card.css'

export default function pokeCard ({id,nombre,imagen,tipo}){
    return (
        <div className='card'>
            <h3>{nombre}</h3>
            <img src={imagen} alt="imagen pokemon" width='200px' height='250px'  />
            <h3>{tipo}</h3>
        </div>
    )
}