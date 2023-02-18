import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import s from './PutPokemon.module.css'
import style from './NavBar.module.css'
import { getPokemons } from '../actions/index-actions'

export default function PutPokemon() {
  //traer =>  pokeonesFull: []
  //filtrarlos por => poke.creadoDb === true
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getPokemons())
}, [dispatch]) 

  const pokemonsDb = useSelector((state) => state.pokeonesFull).filter((poke) => poke.creadoDb === true) 
  const tipos = useSelector((state) => state.types)
  const [pokemon, setPokemon] = useState({}) 

  const [errores, setErrores] = useState({})

  const handleName = (e) => { 
    // valores actuales del pokemon ==> completa el placeholder   
    const p = pokemonsDb.find((poke) => poke.id ===  e.target.value)    
    setPokemon( { 
    nombre: p.nombre,
    vida: p.vida,
    ataque: p.ataque,
    defensa: p.defensa,
    velocidad: p.velocidad,
    altura: p.altura,
    peso: p.peso,
    imagen: p.imagen,
    tipo: p.tipo})
  }

  const handleSubmit = ()=>{

  }
  const handleChange = ()=>{

  }

  const handleSelect = ()=>{

  }



  return (
    <div className={s.div_container}>
      <div className={s.div_nav}>
        <Link to='/home'><button className={style.btn_navbar} >Volver a home</button></Link>
      </div>

      <div className={s.div_select}>
        <h2>Seleccione el pokemon que desea modificar</h2>
       
        <select onChange={(e) => handleName(e)}>
          {/* Mapeo los nombres de los pokemones creados en la DB */}
          {pokemonsDb && pokemonsDb.map(p=>{
            return(              
              <option  key={p.id} value={p.id}>{p.nombre}</option>
            )
          })}

        </select>

      </div>    

          {
            // formulario con los datos para modificar
            pokemon &&
            <form className={s.formulario} onSubmit={(e) => handleSubmit(e)}>

            <label>Nombre: </label>
            <input
                placeholder={pokemon.nombre}
                onChange={(e) => handleChange(e)}
                key='nombre'
                name='nombre'
                type="text" />
            {/* <p> {errores.nombre}</p> */}
            {errores.nombre && (
                    <p>{errores.nombre}</p>
                )}


            <label>Vida: </label>
            <input
            placeholder={pokemon.vida}
                onChange={(e) => handleChange(e)}
                key='vida'
                name='vida'
                type="number"
                min="0"
                max="100" />
            {errores.vida && (
                <p className="error">{errores.vida}</p>
            )}


            <label>Ataque: </label>
            <input
           placeholder={pokemon.ataque}
                onChange={(e) => handleChange(e)}
                key='ataque'
                name='ataque'
                type="number"
                min="0"
                max="100" />
            {errores.ataque && (
                <p className="error">{errores.ataque}</p>
            )}


            <label>Defensa: </label>
            <input
                onChange={(e) => handleChange(e)}
                placeholder={pokemon.defensa}
                key='defensa'
                name='defensa'
                type="number"
                min="0"
                max="100" />
            {errores.defensa && (
                <p className="error">{errores.defensa}</p>
            )}


            <label>Velocidad: </label>
            <input placeholder={pokemon.velocidad} onChange={(e) => handleChange(e)} key='velocidad' name='velocidad' type="number" min="0" />

            <label>Altura: </label>
            <input placeholder={pokemon.altura} onChange={(e) => handleChange(e)} key='altura' name='altura' type="number" min="0" />

            <label>Peso: </label>
            <input placeholder={pokemon.peso} onChange={(e) => handleChange(e)} key='peso' name='peso' type="number" min="0" />

            <label>Imagen: </label>
            <input  placeholder="ingrese Url" onChange={(e) => handleChange(e)} key='imagen' name='imagen' type="text" />

            <label >Tipos: </label>
            <section className={s.select_tipo}>               
                <select onChange={(e) => handleSelect(e)}>
                    {tipos?.map(type => {
                        return (
                           <option key={type.id} value={type.nombre}>{type.nombre}</option>
                    )
                        })}
                </select>
                {/* <button onClick={resetTipos} className={s.botonReset} type='button'>Reset Tipos</button>                    */}
                   
            </section>
            <section className={s.tipo_p}>
                      {/* {input.tipo?.map(tipo => {
                        return (
                            <p>{tipo}</p>
                        )
                    })} */}
            </section>
            <button type="submit" class={`${s.boton} ${s.draw_border}`}>Modificar Pokemon</button>
            {/* <button className={s.botonCrear} type="submit"> Crear Pokemon</button> */}


        </form>
          }
   

          
     


    </div>
  )
}
