import React from "react";
import './Paginado.css'
export default function Paginado({ pokemonesPorPagina, allPokemons, paginado }) {
    const numeroPagina = []

    for (let i = 1; i <= Math.ceil(allPokemons / pokemonesPorPagina); i++) {
        numeroPagina.push(i)
    }

return (
        <nav>
            <ul>
                {
                    numeroPagina &&
                    numeroPagina.map(numero => {
                        return(
                        <section className="item" key={numero}>
                            <button onClick={() => paginado(numero)}>
                            {numero}
                            </button>
                           {/* <a onClick={() => paginado(numero)} > {numero} </a> */}
                        </section>
                        )
                    })
                }
            </ul>
        </nav>
    )
}