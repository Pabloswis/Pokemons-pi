import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPokemons, deletePokemon } from "../actions/index-actions";
import Card from "./Card";
import loading from './imagen/0052359530771cae3d310ffcc7e9b348.gif'
import { buttonVolver } from './CreatePokemon.module.css'
import { useState } from "react";
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
        console.log(e.target.value)
        dispatch(deletePokemon(e.target.value))
        setActualizar(e.target.value)
        history.push('/home')
    }

    return (
        <div>
            <h2>seleccione el pokemon para eliminar</h2>
            <Link to='/home'><button className={buttonVolver} >Volver a home</button></Link>
            {pokemons.length > 0 ? pokemons.map(p => {
                return (
                    <div>
                        <button value={p.id} onClick={e => handleDelete(e)}>borrar</button>
                        <Card key={p.id} nombre={p.nombre} imagen={p.imagen} tipo={p.tipo} />
                    </div>

                )
            }) : <h2>No hay mas pokemones para eliminar</h2>
                // <img src={loading} alt="" />  
            }

        </div>



    )

}
