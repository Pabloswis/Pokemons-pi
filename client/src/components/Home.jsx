import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getPokemons, getTypes, filterForType, filterFrom, orderName, ordenAtaque } from "../actions/index-actions";
import { Link } from "react-router-dom"
import Card from "./Card";

import Paginado from "./Paginado";
import s from './Home.module.css'
import SearchBar from "./SearchBar";
import pokeHenry from './imagen/POKEHENRY.png'
import { botonCrear} from './CreatePokemon.module.css'
import NavBar from "./NavBar";

 

export default function Home() {
    const allTypes = useSelector(state => state.types)
    const allPokemons = useSelector((state) => state.pokemons) //arreglo del estado

    const dispatch = useDispatch()


    const [currentPage, serCurrentPage] = useState(1)
    const [pokemonesPorPagina, setPokemonPorPagina] = useState(12)
    const ultimoPokemon = currentPage * pokemonesPorPagina
    const primerPokemon = ultimoPokemon - pokemonesPorPagina
    const currentPokemons = allPokemons.slice(primerPokemon, ultimoPokemon)

    const [orden, setOrden] = useState('')
    const[ordenAt, setOrdenAt] = useState('')
    //corregir renderizado de los pokemones cuando se vuelve de una pagina que no coincide con el filtrado.
    const paginado = (numeroPagina) => {
        serCurrentPage(numeroPagina)
    }

    useEffect(() => {
        dispatch(getPokemons())
        dispatch(getTypes())

    }, [dispatch])

    function handleFilterType(e) {
        dispatch(filterForType(e.target.value))
        serCurrentPage(1)
    }

    function handleFilterCreated(e) {
        dispatch(filterFrom(e.target.value))
        serCurrentPage(1)
    }

    function handleOrder(e) {
        dispatch(orderName(e.target.value))
        serCurrentPage(1)
        setOrden(`ordenado ${e.target.value}`)
    }
    function handleOrderAtaque(e){
        dispatch(ordenAtaque(e.target.value))
        serCurrentPage(1)
        setOrdenAt(`ordenado ${e.target.value}`)
    }

    return (    
           
        <div className={s.divMaster}>
        
        <NavBar/>
        
        {/* <div className={s.logo}>
          <img src={pokeHenry} alt="logo" />
        </div>
     */}
       
        {/* <div>
            <SearchBar/>

            <Link to='/created'>
                <button className={botonCrear} >Crear pokemon</button>
            </Link>
            <Link to='/put'>
                <button className={botonCrear} >Eliminar Pokemon</button>
            </Link>
        </div> */}

        <div className={s.select}>
            <select onChange={(e) => handleOrder(e)}>
                <option value='nombreAz'>Nombre A - Z</option>
                <option value='nombreZa'>Nombre Z - A</option>
            </select>
           
             <select onChange={(e) => handleOrderAtaque(e)}>
                <option value='ataqueAz'>Ataque A - Z</option>
                <option value='ataqueZa'>Ataque Z - A</option>
            </select>
           
             <select onChange={(e) => handleFilterType(e)}>
                <option key={allTypes.length + 1} value='Todos'>Todos los tipos</option>
                {allTypes?.map(type => {
                    return (<option key={type.id} value={type.nombre}>{type.nombre}</option>)
                })}
            </select>
                
            <select  onChange={(e) => handleFilterCreated(e)}>
                <option value='todos'>Todos los creados</option>
                <option value='creados'>Creados en DB</option>
                <option value='api'>Poke API</option>
            </select>

        </div>
            
            <div>
                 <Paginado
                    pokemonesPorPagina={pokemonesPorPagina}
                    allPokemons={allPokemons.length}
                    paginado={paginado} />
            </div>

            <div className={s.divPokemones}>
                {
                currentPokemons.length !== 0 ?
                    currentPokemons?.map(p => {
                        return (
                            <Fragment >
                                <Link to={"/pokemon/" + p.id} >
                                    <Card key={p.id} nombre={p.nombre} imagen={p.imagen} tipo={p.tipo} />
                                </Link>
                            </Fragment>
                        )
                    }) 
                    : <div>
                        {/* <img src={loading} alt="" /> */}
                        <h2 className={s.cargando}>Cargando...</h2>
                      
                    </div>

                }
            </div>


        </div>

    )
}