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

    function handleSubmit(e) {
        e.preventDefault()
        console.log(input)
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
            tipo: []
        })
        history.push('/home')
    }

    function validate(input) {
        const errores = {}
        if (!input.nombre) {
            errores.nombre = 'se requiere ingresar un nombre'
        } else if (input.nombre.search("[0-9]") !== -1) {
            errores.nombre = "El nombre no debe contener numeros";
        } else if (input.nombre.search("[^A-Za-z0-9]") !== -1) {
            errores.nombre = "El nombre no debe contener simbolos ni espacios";
        } else if (input.vida > 100 || input.vida < 1) {
            errores.vida = 'el valor de vida debe ser entre 1 y 100'
        } else if (input.ataque > 100 || input.ataque < 1) {
            errores.vida = 'el valor de ataque debe ser entre 1 y 100'
        } else if (input.defensa > 100 || input.defensa < 1) {
            errores.vida = 'el valor de defensa debe ser entre 1 y 100'
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
                    <input onChange={(e) => handleChange(e)} name='nombre' type="text" />
                    {errores.nombre && (
                        <p className="error">{errores.nombre}</p>
                    )}
                </div>
                <div>
                    <label>Vida: </label>
                    <input onChange={(e) => handleChange(e)} name='vida' type="number" min="0" max="100" />
                    {errores.vida && (
                        <p className="error">{errores.vida}</p>
                    )}
                </div>
                <div>
                    <label>Ataque: </label>
                    <input onChange={(e) => handleChange(e)} name='ataque' type="number" min="0" max="100" />
                    {errores.ataque && (
                        <p className="error">{errores.ataque}</p>
                    )}
                </div>
                <div>
                    <label>Defensa: </label>
                    <input onChange={(e) => handleChange(e)} name='defensa' type="number" min="0" max="100" />
                    {errores.defensa && (
                        <p className="error">{errores.defensa}</p>
                    )}
                </div>
                <div>
                    <label>Velocidad: </label>
                    <input onChange={(e) => handleChange(e)} name='velocidad' type="number" min="0" />
                </div>
                <div>
                    <label>Altura: </label>
                    <input onChange={(e) => handleChange(e)} name='altura' type="number" min="0"  />
                </div>
                <div>
                    <label>Peso: </label>
                    <input onChange={(e) => handleChange(e)} name='peso' type="number" min="0"  />
                </div>
                <div>
                    <label>Imagen: </label>
                    <input onChange={(e) => handleChange(e)} name='imagen' type="text" />
                </div>
                <div>
                    {/* limitar hasta 2 */}
                    <label>Tipo:</label>
                    {tipos ? tipos.map(t => <label key={t.id}>  <input onChange={(e) => handleCheck(e)} key={t.id} type="checkbox" value={t.nombre} name={t.nombre} /> {t.nombre} </label>) : null}
                </div>
                <button type="submit"> Crear Pokemon</button>
            </form>
        </section>
    )
}