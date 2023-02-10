import React from "react";
import s from './Card.module.css'

// rafc - comando abreviado para crear un componente 


export default function pokeCard({ id, nombre, imagen, tipo }) {
    return (
        
            
            <div class={s.card}>
                <p class={s.card__name}>{nombre.charAt(0).toUpperCase() + nombre.substring(1)}</p>
                <img src={imagen} alt="imagen pokemon" class={s.card__image} />
                
                <div class={s.grid_container}>                   
                    {tipo.map(t=> t.charAt(0).toUpperCase() + t.substring(1)).join(' - ')}                 
                </div>

                <button class={`${s.btn} ${s.draw_border}`}>Mas Informacion</button>

            </div>
           

        
    )
}

/*
<div class="card">
    <img src="" alt="" class="card__image">
    <p class="card__name">Lily-Grace Colley</p>

    <div class="grid-container">

        <div class="grid-child-posts">
            156 Post
        </div>
    
        <div class="grid-child-followers">
            1012 Likes
        </div>
    
    </div>    
    
    <button class="btn draw-border">Mas Informacion</button> 

</div>

*/