import axios from "axios";

export function getPokemons() {
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3001/pokemons", {});

    return dispatch({
      type: "GET_POKEMONS",
      payload: json.data,
    });
  };
}

export function getTypes() {
  return async function (dispatch) {
    let types = await axios.get("http://localhost:3001/type", {});

    return dispatch({
      type: "GET_TYPES",
      payload: types.data,
    });
  };
}

export function filterForType(payload) {
  return {
    type: "FILTER_POKEMONS_TYPE",
    payload: payload,
  };
}

export function filterFrom(payload) {
  return {
    type: "FILTER_FROM",
    payload: payload,
  };
}

export function orderName(payload) {
  return {
    type: "ORDER_NAME",
    payload: payload,
  };
}

export function getPokeName(nombre) {
  return async function (dispatch) {
    try {
      const pokeName = await axios.get(
        `http://localhost:3001/pokemons?nombre=${nombre}`
      );
      return dispatch({
        type: "GET_POKEMON_NAME",
        payload: pokeName.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

// export const postPokemon = (pokemon) => {
//   try {
//       return function(dispatch) {
//           return axios.post('http://localhost:3001/pokemons', pokemon)
//       }
//   } catch (error) {
//       return error
//   }
// };

export function postPokemon(pokemon) {
  try {
    return function (dispatch) {
      return axios.post("http://localhost:3001/pokemons", pokemon);
    };
  // eslint-disable-next-line no-unreachable
  } catch (error) {
    console.log(error)
    return 'Algo salio mal, intente de nuevo';
  }
}
