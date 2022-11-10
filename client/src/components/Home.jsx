import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getPokemons, getTypes, filterForType, filterFrom, orderName } from "../actions/index-actions";
import { Link } from "react-router-dom"
import Card from "./Card";
import Paginado from "./Paginado";
import './Home.css'
import SearchBar from "./SearchBar";

export default function Home() {
    const allTypes = useSelector(state => state.types)
    const allPokemons = useSelector((state) => state.pokemons) //arreglo del estado

    const dispatch = useDispatch()


    const [currentPage, serCurrentPage] = useState(1)
    const [pokemonesPorPagina, setPokemonPorPagina] = useState(12)
    const ultimoPokemon = currentPage * pokemonesPorPagina
    const primerPokemon = ultimoPokemon - pokemonesPorPagina
    const currentPokemons = allPokemons.slice(primerPokemon, ultimoPokemon)

    const [orden,setOrden] = useState('')
    //corregir renderizado de los pokemones cuando se vuelve de una pagina que no coincide con el filtrado.
    const paginado = (numeroPagina) => {
        serCurrentPage(numeroPagina)
       }

    useEffect(() => {
        dispatch(getPokemons())
        dispatch(getTypes())
        
        }, [dispatch])

    // function HandleClick(e) {
    //     dispatch(getPokemons())
    // }

    function handleFilterType(e) {
        dispatch(filterForType(e.target.value))
       
        serCurrentPage(1)

    }

    function handleFilterCreated(e) {
        dispatch(filterFrom(e.target.value))
        
        serCurrentPage(1)
    }

    function handleOrder(e){
        dispatch(orderName(e.target.value))
        serCurrentPage(1)
        setOrden(`ordenado ${e.target.value}`)
    }
    return (
        <div className="divMaster">
            
            <h1> Buscador de Pokemones</h1>
           
           <SearchBar/>
           <br />
           <Link to='/created'>
            <button >Crear pokemon</button>
           </Link>
            <br />

            <select onChange={(e)=>handleOrder(e)}>                
                <option value='nombreAz'>nombre A - Z</option>
                <option value='nombreZa'>nombre Z - A</option> 
            </select>

            <select onChange={(e) => handleFilterType(e)}>
                <option key={allTypes.length + 1} value='Todos'>Todos</option>
                {allTypes?.map(type => {
                    return (
                        <option key={type.id} value={type.nombre}>{type.nombre}</option>
                   )
                })}
            </select>
            {/* corregir los cambios de select para que no se afecten entre si */}
            <select onChange={(e) => handleFilterCreated(e)}>
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
                {currentPokemons .length !=0?
                currentPokemons?.map(p => {
                    return (
                        <Fragment >
                            <Link to={"/home/" + p.id} className='link_card'>
                                <Card key={p.id} nombre={p.nombre} imagen={p.imagen} tipo={p.tipo} />
                            </Link>

                        </Fragment>
                    )
                }):(
                    <div className="divLoading">
                        <image src="https://dribbble.com/shots/1024835--GIF-Loading/attachments/8625090?mode=media" alt="imagen" />
                        <h1>cargando pagina....</h1>
                    </div>
                )
            
            }

            </div>
            
            
        </div>
    )
}