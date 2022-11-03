import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getPokemons, getTypes } from "../actions/index-actions";
import { Link } from "react-router-dom"
import Card from "./Card";
import Paginado from "./Paginado";
import'./Home.css'

export default function Home() {
    const allTypes = useSelector(state => state.types)
    const allPokemons = useSelector((state) => state.pokemons) //arreglo del estado
    
    const dispatch = useDispatch()


    const [currentPage, serCurrentPage] = useState(1)
    const [pokemonesPorPagina, setPokemonPorPagina] = useState(12)
    const ultimoPokemon = currentPage * pokemonesPorPagina
    const primerPokemon = ultimoPokemon - pokemonesPorPagina
    const currentPokemons = allPokemons.slice(primerPokemon, ultimoPokemon)


    const paginado = (numeroPagina) => {
        serCurrentPage(numeroPagina)
    }

    useEffect(() => {
        dispatch(getPokemons())
        dispatch(getTypes())
    }, [])

    function HandleClick(e) {
        dispatch(getPokemons())
    }

    return (
        <div className="divMaster">
            <Link to='/pokemons'>Crear Pokemon</Link>
            <h1> Buscador de Pokemones</h1>
            {/* boton para reiniciar y buscar de nuevo */}
            {/* <button onClick={e => { HandleClick(e) }}> Cargar todos los pokemones</button> */}
            {/* filtrar por tipo de pokemon y por pokemon existente o creado por nosotros
             ordenar tanto ascendentemente como descendentemente los pokemons por orden alfabético 
            y por ataque */}
           
                <select>
                    <option value='asc'>Ascendente</option>
                    <option value='desc'>Descendente</option>
                </select>
                
                <select>
                        {allTypes?.map(type=>{
                            return(
                                <option key={type.id} value={type.nombre} >{type.nombre}</option>
                            )
                        })}
                </select>

                {/* <select>
                    <option value='todos'>Todos</option>
                </select> */}
                
                <select>
                    <option value='todos'>Todos</option>
                    <option value='creados'>Creados en DB</option>
                    <option value='api'>Poke API</option>
                </select>

            <div>
                <Paginado
                pokemonesPorPagina={pokemonesPorPagina}
                allPokemons={allPokemons.length}
                paginado={paginado} />
            </div>

            <div className="divPokemones">

                {currentPokemons?.map(p => {
                    return (
                        <Fragment >
                            <Link to={"/home/" + p.id} className='link_card'>
                                <Card nombre={p.nombre} imagen={p.imagen} tipo={p.tipo} />
                            </Link>

                        </Fragment>
                    )
                })

                }
            </div>
        </div>
    )
}