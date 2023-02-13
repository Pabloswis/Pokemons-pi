import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPokemons, deletePokemon } from "../actions/index-actions";
// import Card from "./Card";
// import loading from './imagen/0052359530771cae3d310ffcc7e9b348.gif'
import { buttonVolver } from './CreatePokemon.module.css'
import { useState } from "react";
import {divMaster,divPokemones } from './Home.module.css'
import {card,card__name,card__image,btn,draw_border,grid_container } from './Card.module.css'
import s from './DeletePokemon.module.css'

export default function PutPokemon() {
    const dispatch = useDispatch()
    const history = useHistory()
    useEffect(() => {
        dispatch(getPokemons())
    }, [dispatch])

    const [actualizar, setActualizar] = useState('')

    let pokemons = useSelector((state) => state.pokeonesFull)
    pokemons = pokemons.filter(poke => poke.creadoDb === true)



    function handleDelete(e) {
        e.preventDefault()
        // console.log(e.target.value)
        dispatch(deletePokemon(e.target.value))
        setActualizar(e.target.value)
        history.push('/home')
    }

    return (
        <div className={s.divContainer}>
            <div>
            <Link to='/home'><button className={buttonVolver} >Volver a home</button></Link>
            </div>

            <h2>seleccione el pokemon para eliminar</h2>
           
           <div className={s.divCards}>
              {pokemons.length > 0 ? pokemons.map(p => {
                return (
                    <div class={s.card}>
                    <p class={card__name}>{p.nombre.charAt(0).toUpperCase() + p.nombre.substring(1)}</p>
                    <img src={p.imagen} alt="imagen pokemon" class={card__image} />
                    
                    <div class={grid_container}>                   
                        {p.tipo.map(t=> t.charAt(0).toUpperCase() + t.substring(1)).join(' - ')}                 
                    </div>
    
                    <button value={p.id} onClick={e => handleDelete(e)} class={`${btn} ${draw_border}`}>Borrar</button>
    
                </div>
                    // <div>
                    //     <button value={p.id} onClick={e => handleDelete(e)}>borrar</button>
                    //     <Card key={p.id} nombre={p.nombre} imagen={p.imagen} tipo={p.tipo} />
                    // </div>

                )
            }) : <h2>No hay mas pokemones para eliminar</h2>
                // <img src={loading} alt="" />  
            }

           </div>

          
        </div>



    )

}
