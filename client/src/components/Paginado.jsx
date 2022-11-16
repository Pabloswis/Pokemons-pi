import React from "react";
import s from './Paginado.module.css'
import {botonBuscar} from './SearchBar.module.css'
export default function Paginado({ pokemonesPorPagina, allPokemons, paginado }) {
    const numeroPagina = []

    for (let i = 1; i <= Math.ceil(allPokemons / pokemonesPorPagina); i++) {
        numeroPagina.push(i)
    }

return (
        <nav className={s.nav}>
            <ul className={s.ul}>
                {
                    numeroPagina &&
                    numeroPagina.map(numero => {
                        return(
                        <section className={s.section} key={numero}>
                            <button className={botonBuscar} onClick={() => paginado(numero)}>
                            {numero}
                            </button>
                          
                        </section>
                        )
                    })
                }
            </ul>
        </nav>
    )
}