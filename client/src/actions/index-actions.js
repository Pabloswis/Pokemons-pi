import axios from "axios";

export function getPokemons() {
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3001/pokemons", {});
    console.log(json.data)
    return dispatch({
      type: "GET_POKEMONS",
      payload: json.data,
    });
  };
}

export function getTypes(){
  return async function(dispatch){
    let types = await axios.get("http://localhost:3001/type",{})
    return dispatch({
      type: "GET_TYPES",
      payload: types.data
    }) 
  }
}