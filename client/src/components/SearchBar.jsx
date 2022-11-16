import React from "react";
import { useState } from "react";
import {useDispatch} from "react-redux"
import { getPokeName } from "../actions/index-actions";
import s from './SearchBar.module.css'


export default function SearchBar(){
    const dispatch = useDispatch()
    const [name, setName] = useState('')

    function handleInputChange(e) {
        e.preventDefault()
        setName(e.target.value)
        dispatch(getPokeName(name))
        
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getPokeName(name))
        setName('')
    }

    return (
        <div className={s.div}>
            <input
            className={s.input}
            onChange={(e)=>handleInputChange(e)}
            type="text"
            placeholder="Buscar Pokemon"
            />
        <button 
        className={s.botonBuscar}
        onClick={(e)=> handleSubmit(e)}
        type="submit"> Buscar </button>
        </div>
    )
}