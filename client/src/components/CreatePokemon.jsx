import React from "react";
import { Link, useHistory } from "react-router-dom";
import { postPokemon, getTypes } from "../actions/index-actions";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";

export default function PokemonCrate() {
    const dispatch = useDispatch()
    const history = useHistory()
    const tipos = useSelector((state) => state.types)

    const [input, setInput] = useState({
        nombre: '',
        vida: 50,
        ataque: 50,
        defensa: 50,
        velocidad: 50,
        altura: 50,
        peso: 50,
        imagen: '',
        tipo: []
    })
    const [errores, setErrores] = useState({})


    useEffect(() => {
        dispatch(getTypes())

    }, [dispatch])

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrores(validate({
            ...input,
            [e.target.name]: e.target.value
        }))


    }
    const handleCheck = (e) => {
        if (e.target.checked) {
            setInput({
                ...input,
                tipo: [...input.tipo, e.target.value]
            })
        }
    }

    const handleSelect = (e)=> {
        if(input.tipo.length <2){
            setInput({
                ...input,
                tipo: [...input.tipo, e.target.value]
            })
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
       
        dispatch(postPokemon(input))
        setInput({ 
        nombre: '',
        vida: 50,
        ataque: 50,
        defensa: 50,
        velocidad: 50,
        altura: 50,
        peso: 50,
        imagen: '',
        tipo: []})
        history.push('/home')
    }

    function resetTipos(e){
        setInput({
            tipo:[]
        })
    }

    function validate(input) {
        const errores = {}
        if (!input.nombre) {
            errores.nombre = 'se requiere ingresar un nombre'

        } else if (input.nombre.search("[0-9]") !== -1) {
            errores.nombre = "El nombre no debe contener numeros";

        } else if (input.nombre.search("[^A-Za-z0-9]") !== -1) {
            errores.nombre = "El nombre no debe contener simbolos ni espacios";

        } else if (parseInt(input.vida) > 100 || parseInt(input.vida) < 1) {
            errores.vida = 'el valor de vida debe ser entre 1 y 100'

        } else if (parseInt(input.ataque) > 100 || (parseInt(input.ataque)) < 1) {
            errores.vida = 'el valor de ataque debe ser entre 1 y 100'

        } else if (parseInt(input.defensa) > 100 || (parseInt(input.defensa)) < 1) {
            errores.vida = 'el valor de defensa debe ser entre 1 y 100'

        } else if (input.tipo.length > 2) {
            errores.tipo = 'solo puede seleccionar 2 tipos'
        }

        return errores
    }


    return (
        <section>
            <Link to='/home'><button>Volver a home</button></Link>
            <h1>Formulario de nuevo Pokemon</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Nombre: </label>
                    <input onChange={(e) => handleChange(e)} key='nombre' name='nombre' type="text" />
                    {errores.nombre && (
                        <p className="error">{errores.nombre}</p>
                    )}
                </div>
                <div>
                    <label>Vida: </label>
                    <input onChange={(e) => handleChange(e)} key='vida' name='vida' type="number" min="0" max="100" />
                    {errores.vida && (
                        <p className="error">{errores.vida}</p>
                    )}
                </div>
                <div>
                    <label>Ataque: </label>
                    <input onChange={(e) => handleChange(e)} key='ataque' name='ataque' type="number" min="0" max="100" />
                    {errores.ataque && (
                        <p className="error">{errores.ataque}</p>
                    )}
                </div>
                <div>
                    <label>Defensa: </label>
                    <input onChange={(e) => handleChange(e)} key='defensa' name='defensa' type="number" min="0" max="100" />
                    {errores.defensa && (
                        <p className="error">{errores.defensa}</p>
                    )}
                </div>
                <div>
                    <label>Velocidad: </label>
                    <input onChange={(e) => handleChange(e)} key='velocidad' name='velocidad' type="number" min="0" />
                </div>
                <div>
                    <label>Altura: </label>
                    <input onChange={(e) => handleChange(e)} key='altura' name='altura' type="number" min="0" />
                </div>
                <div>
                    <label>Peso: </label>
                    <input onChange={(e) => handleChange(e)} key='peso' name='peso' type="number" min="0" />
                </div>
                <div>
                    <label>Imagen: </label>
                    <input onChange={(e) => handleChange(e)} key='imagen' name='imagen' type="text" />
                </div>
              
                <div>
                   
                    <label >Tipos: </label>
                    <select onChange={(e)=> handleSelect(e)}>
                    {tipos?.map(type => {
                    return (
                        <option key={type.id} value={type.nombre}>{type.nombre}</option>
                    )
                })}
                     </select>
                      <button onClick={resetTipos} type='button'>Reset Tipos</button>
                      {input.tipo?.map(tipo=>{
                        return(
                            <p>{tipo}</p>
                            
                        )
                      })}

                    
                </div>
                <button  type="submit"> Crear Pokemon</button>
            </form>
        </section>
    )
}