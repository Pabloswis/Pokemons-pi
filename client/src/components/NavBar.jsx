import React from 'react'
import s from './NavBar.module.css'
import pokeHenry from './imagen/POKEHENRY.png'
import SearchBar from './SearchBar'
import { Link } from 'react-router-dom'


export default function Navbar() {
  return (
    <nav className={s.nav}>        
          <img src={pokeHenry} alt="logo" />
          <Link to='/created'>
                <button className={s.botonCrear} >Crear pokemon</button>
            </Link>
            <Link to='/put'>
                <button className={s.botonCrear} >Eliminar Pokemon</button>
            </Link>
          <SearchBar/>             
          
    </nav>
  )
}
