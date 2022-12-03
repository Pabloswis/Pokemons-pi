const initialState = {
  pokemons: [],
  types: [],
  pokeonesFull: [],
  detail: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_POKEMONS":
      return {
        ...state,
        pokemons: action.payload,
        pokeonesFull: action.payload,
        detail: [],
      };

    case "GET_POKEMON_ID":
      return {
        ...state,
        detail: action.payload,
      };

    case "GET_TYPES":
      return {
        ...state,
        types: action.payload,
      };

    case "FILTER_POKEMONS_TYPE":
      const pokeTotal = state.pokeonesFull;
      const pokemonesfilter =
        action.payload === "Todos"
          ? pokeTotal
          : pokeTotal.filter((poke) => poke.tipo.includes(action.payload));
      return {
        ...state,
        pokemons: pokemonesfilter,
      };

    case "FILTER_FROM":
      if (action.payload === "todos")
        return {
          ...state,
          pokemons: state.pokeonesFull,
        };
      const pokeFiltrados =
        action.payload === "creados"
          ? state.pokeonesFull.filter((poke) => poke.creadoDb === true)
          : state.pokeonesFull.filter((poke) => !poke.creadoDb);
      return {
        ...state,
        pokemons: pokeFiltrados,
      };

    case "ORDER_NAME":
      let ordenados = [];
      if (action.payload === "nombreAz") {
        ordenados = state.pokemons.sort(function (a, b) {
          if (a.nombre.toLowerCase() > b.nombre.toLowerCase()) {
            return 1;
          }
          if (a.nombre.toLowerCase() < b.nombre.toLowerCase()) {
            return -1;
          }
          return 0;
        });
      }
      if (action.payload === "nombreZa") {
        ordenados = state.pokemons.sort((a, b) => {
          if (a.nombre.toLowerCase() > b.nombre.toLowerCase()) {
            return -1;
          }
          if (a.nombre.toLowerCase() < b.nombre.toLowerCase()) {
            return 1;
          }
          return 0;
        });
      }

      return {
        ...state,
        pokemons: ordenados,
      };

    case "ORDEN_ATAQUE":
      let orden = [];
      if (action.payload === "ataqueAz") {
        orden = state.pokemons.sort(function (a, b) {
          if (parseInt(a.ataque) > parseInt(b.ataque)) {
            return 1;
          }
          if (parseInt(a.ataque) < parseInt(b.ataque)) {
            return -1;
          }
          return 0;
        });
      }
      if (action.payload === "ataqueZa") {
        orden = state.pokemons.sort((a, b) => {
          if (parseInt(a.ataque) > parseInt(b.ataque)) {
            return -1;
          }
          if (parseInt(a.ataque) < parseInt(b.ataque)) {
            return 1;
          }
          return 0;
        });
      }

      return {
        ...state,
        pokemons: orden,
      };

    case "GET_POKEMON_NAME":
      return {
        ...state,
        pokemons: action.payload,
      };

    case "POST_POKEMON":
      return {
        ...state,
      };

    // case "LIMPIAR_DETALLE":
    //   return{
    //     ...state,
    //     detail: action.payload
    //   }
    case "DELETE_POKEMON":
      return {
        ...state,
      };
    default:
      return state;
  }
}

export default rootReducer;
