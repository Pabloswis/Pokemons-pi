import axios from "axios";

export function getPokemons() {
  return async function (dispatch) {
    let json = await axios.get("/pokemons", {});

    return dispatch({
      type: "GET_POKEMONS",
      payload: json.data,
      detail: []
    });
  };
}
export function getTypes() {
  return async function (dispatch) {
    let types = await axios.get("/type", {});

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
export function ordenAtaque(payload){
  return {
    type: "ORDEN_ATAQUE",
    payload:payload
  }
}
export function getPokeName(nombre) {
  return async function (dispatch) {
    try {
      const pokeName = await axios.get(
        `/pokemons?nombre=${nombre}`
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
export function postPokemon(pokemon) {
  try {
    return function (dispatch) {
      return axios.post("/pokemons", pokemon);
    };
    // eslint-disable-next-line no-unreachable
  } catch (error) {
    console.log(error);
    return "Algo salio mal, intente de nuevo";
  }
}
export function getPokeId(idPokemon) {
  return async function (dispatch) {
    try {
      const pokeId = await axios.get(`/pokemons/`+ idPokemon);

      return dispatch({
        type: "GET_POKEMON_ID",
        payload: pokeId.data,
      });
    } catch (error) {
      console.log('error');
    }
  };
}
export function deletePokemon(idPokemon){
  return async function(dispatch){
     try {
    return axios.delete("/pokemons/"+idPokemon)
  } catch (error) {
    console.log(error)
  }
  } 
}
export function putPokemon(pokemon) {
  const {id} = pokemon
  try {
    return function (dispatch) {
      return axios.put(`/pokemons/${id}`, pokemon);
    };
    // eslint-disable-next-line no-unreachable
  } catch (error) {
    console.log(error);
    return `Algo salio mal, intente de nuevo: ${error}`;
  }
}


