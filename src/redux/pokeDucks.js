import axios from "axios";

//Acciones para consumir el API
//Constantes
const dataInicial = {
  //Contenido de la API
  count: 0,
  next: null,
  previous: null,
  results: []
};

//Types
const GET_POKEMON = "GET_POKEMON";
const POKE_DETALLE = "POKE_DETALLE"
const NEXT_POKEMON = "NEXT_POKEMON";
const PREVIOUS_POKEMON = "PREVIOUS_POKEMON";

//Reducer
export default function pokeReducer(state = dataInicial, action) {
  switch (action.type) {
    case GET_POKEMON:
      return { ...state, ...action.payload };
    case POKE_DETALLE:
        return {...state, unPokemon: action.payload}
    case NEXT_POKEMON:
      return { ...state, ...action.payload };
    case PREVIOUS_POKEMON:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

//Acciones
export const obtenerPokemones = () => async (dispatch, getState) => {
  if (localStorage.getItem("offset=0")) {
    dispatch({
      type: GET_POKEMON,
      payload: JSON.parse(localStorage.getItem("offset=0")),
    });
    console.log("LocalStorage");
  } else {
    try {
      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?offset=0&limit=13`
      );

      dispatch({
        type: GET_POKEMON,
        payload: res.data,
      });
      localStorage.setItem("offset=0", JSON.stringify(res.data));
    } catch (error) {
      console.log.apply(error);
    }
  }
};

export const pokemonDetalle = (url="https://pokeapi.co/api/v2/pokemon/1/") => async(dispatch) => {
    try {
        const res = await axios.get(url)
        
        dispatch({
            type: POKE_DETALLE,
            payload: {
                name: res.data.name,
                picture: res.data.sprites.front_default,
                abilities: [res.data.abilities]
            }
        })
    }catch(error){
        console.error(error)
    }
}

export const siguientePokemon = () => async (dispatch, getState) => {
  const next = getState().pokemones.next;
  if (localStorage.getItem(next)) {
    dispatch({
      type: NEXT_POKEMON,
      payload: JSON.parse(localStorage.getItem(next)),
    });
    console.log("LocalStorage Next");
  } else {
    try {
      const res = await axios.get(next);

      dispatch({
        type: NEXT_POKEMON,
        payload: res.data,
      });
      localStorage.setItem(next, JSON.stringify(res.data));
    } catch (error) {
      console.log(error);
    }
  }
};

export const anteriorPokemon = () => async (dispatch, getState) => {
  const previous = getState().pokemones.previous;

  if (localStorage.getItem(previous)) {
    dispatch({
      type: PREVIOUS_POKEMON,
      payload: JSON.parse(localStorage.getItem(previous)),
    });
    console.log('LocalStorage Previous')
  } else {
    try {
      const res = await axios.get(previous);

      dispatch({
        type: PREVIOUS_POKEMON,
        payload: res.data,
      });
      localStorage.setItem(previous, JSON.stringify(res.data));
    } catch (error) {
      console.error(error);
    }
  }
};
