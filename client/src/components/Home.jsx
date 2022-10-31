import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux"
import { getPokemons } from "../actions/index-actions";
import {Link} from "react-router-dom"
import Card from "../components/Card";

export default function Home (){
    const dispatch = useDispatch()
    const allPokemons = useSelector((state)=> state.pokemons)

    useEffect(()=>{
        dispatch(getPokemons())
    },[])

function HandleClick(e){
dispatch(getPokemons())
}

return (
    <div>
        <Link to='/pokemons'>Crear Pokemon</Link>
        <h1> Buscador de Pokemones</h1>
        {/* boton para reiniciar y buscar de nuevo */}
        <button onClick={e =>{ HandleClick(e)}}> Cargar todos los pokemones</button>
            {/* filtrar por tipo de pokemon y por pokemon existente o creado por nosotros
             ordenar tanto ascendentemente como descendentemente los pokemons por orden alfabético 
            y por ataque */}
        <div>
            <select>
                <option value= 'asc'>Ascendente</option>
                <option value= 'desc'>Descendente</option>
            </select>
            <select>
                <option value= 'todos'>Todos</option>
                <option value= 'normal'>Normal</option>
                <option value= 'fuego'>Fuego</option>
            </select>
            <select>
                <option value= 'todos'>Todos</option>
                <option value= 'creados'>Creados en DB</option>
                <option value= 'api'>Poke API</option>
            </select>
            {
                allPokemons?.map( p => {
                    return(
                        <Fragment >
                          
                            <Card nombre= {p.nombre} imagen={p.imagen} tipo= {p.tipo} />            
                                             
                        </Fragment>
                    )
                }) 
                
            }
        </div>
    </div>
)
}