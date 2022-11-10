const initialState = {
  pokemons: [],
  types: [],
  pokeonesFull: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_POKEMONS":
      return {
        ...state,
        pokemons: action.payload,
        pokeonesFull: action.payload,
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
      let ordenados =
        action.payload === "nombreAz"
          ? state.pokemons.sort(function (a, b) {
              if (a.nombre > b.nombre) {
                return 1;
              }
              if (a.nombre < b.nombre) {
                return -1;
              }
              return 0;
            })
          : state.pokemons.sort((a, b) => {
              if (a.nombre > b.nombre) {
                return -1;
              }
              if (a.nombre < b.nombre) {
                return 1;
              }
              return 0;
            });

      return {
        ...state,
        pokemons: ordenados,
      };

    case "GET_POKEMON_NAME":
      return{
        ...state,
        pokemons: action.payload
      }
      case "POST_POKEMON":
        return{
          ...state,
        }
    default:
      return state;
  }
}

export default rootReducer;
