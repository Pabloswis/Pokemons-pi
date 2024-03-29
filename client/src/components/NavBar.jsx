import React from 'react'
import s from './NavBar.module.css'
import pokeHenry from './imagen/POKEHENRY.png'
import SearchBar from './SearchBar'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { filterFrom } from '../actions/index-actions'


export default function Navbar() {

  return (
    <nav className={s.nav}>        
          <img src={pokeHenry} alt="logo" />
          <Link to='/created'>
                <button className={s.btn_navbar} >Crear pokemon</button>
            </Link>
            <Link to='/delete'>
                <button className={s.btn_navbar} >Eliminar Pokemon</button>
            </Link>
             <Link to='/put'>
                <button className={s.btn_navbar} >Modificar Pokemon</button>
            </Link>
         
          <SearchBar/>             
          
    </nav>
  )
}
