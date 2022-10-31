import React from "react";

export default function pokeCard ({id,nombre,imagen,tipo}){
    return (
        <div>
            <img src={imagen} alt="imagen pokemon" width='200px' height='250px'  />
            <h3>{nombre}</h3>
            <h5>{tipo}</h5>
        </div>
    )
}