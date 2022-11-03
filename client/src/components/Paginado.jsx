import React from "react";

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
                        <li className="item" key={numero}>
                           <a onClick={() => paginado(numero)} > {numero} </a>
                        </li>
                        )
                    })
                }
            </ul>
        </nav>
    )
}