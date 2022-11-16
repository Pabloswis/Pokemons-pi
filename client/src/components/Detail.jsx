import React from "react";
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getPokeId, limpiarDetalle } from "../actions/index-actions";
import { useEffect } from "react";
import s from './Detail.module.css'
import imagen from './imagen/pokebola.gif'
import {buttonVolver} from './CreatePokemon.module.css'



export default function Detail(props) {

    const dispatch = useDispatch()
    const idPokemon = props.match.params.idPokemon

    useEffect(() => {
        dispatch(getPokeId(idPokemon))
    }, [dispatch])

    const pokemonID = useSelector((state) => state.detail)

    //para borrar el estado previo.
    //¿agregar un evento al boton para que despache una action y limpie el state.deatail?

    // const handleLimpiaDetalle = (e)=>{
    //     dispatch(limpiarDetalle(e))
    // }

    return (
        <div className={s.divMaster}>
            <div className={s.divBoton}>
            </div>
            {pokemonID.length >= 1 ? 
            
            <div className={s.divContent}>
                <Link className={s.link} to={'/home'}>
                    <button className={buttonVolver}>Volver al Home</button>
                </Link>
                <img className={s.imagen} src={pokemonID[0].imagen} alt="Imagen pokemon" />

                <div>                    
                        <h5 className={s.nombre}>Nombre : {pokemonID[0].nombre.charAt(0).toUpperCase() + pokemonID[0].nombre.substring(1)}</h5>
                        <h5 className={s.id}> ID : {pokemonID[0].id}</h5>
                        <h5 className={s.tipo}>Tipo : {pokemonID[0].tipo.map(t => t.charAt(0).toUpperCase() + t.substring(1)).join(' - ')}</h5>
                    
                    <div className={s.detalles1}>
                         <h5>Vida: {pokemonID[0].vida}</h5>
                         <h5>Defensa: {pokemonID[0].defensa}</h5>
                         <h5>Ataque: {pokemonID[0].ataque}</h5>
                    </div>
                    <div className={s.detalles2}>
                         <h5>Velocidad: {pokemonID[0].velocidad}</h5>
                         <h5>Altura: {pokemonID[0].altura}</h5>
                         <h5>Peso: {pokemonID[0].peso}</h5>
                    </div>
                </div>
                
            </div> 
            
            
            : <div>
                <img className={s.loading} src={imagen} alt="gif" />
            </div>
            }

        </div>
    )

}