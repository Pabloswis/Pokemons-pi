import React from "react";
import s from './Card.module.css'

// rafc - comando abreviado para crear un componente 


export default function pokeCard ({id,nombre,imagen,tipo}){
    return (
        <div className={s.card}>
           
        
            <h2>{nombre.charAt(0).toUpperCase() + nombre.substring(1)}</h2>
            <img src={imagen} alt="imagen pokemon" width='200px' height='250px'  />
            <h3 >{tipo.map(t=> t.charAt(0).toUpperCase() + t.substring(1)).join(' - ')}</h3>

       
          
            
        </div>
    )
}