import React from "react";
import { useState } from "react";
import {useDispatch} from "react-redux"
import { getPokeName } from "../actions/index-actions";

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
        <div>
            <input
            onChange={(e)=>handleInputChange(e)}
            type="text"
            placeholder="Buscar Pokemon"
            />
        <button 
        onClick={(e)=> handleSubmit(e)}
        type="submit"> Buscar </button>
        </div>
    )
}