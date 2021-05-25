import axios from 'axios'

//Acciones para consumir el API
//Constantes
const dataInicial = {
    array: [],
    offset: 0
}

//Types
const GET_POKEMON = 'GET_POKEMON'
const NEXT_POKEMON = 'NEXT_POKEMON'


//Reducer
export default function pokeReducer (state=dataInicial, action) {
    switch(action.type ) {
        case GET_POKEMON:
            return {...state, array:action.payload}
        case NEXT_POKEMON:
            return {...state, array:action.payload.array, offset: action.payload.offset}
        default:
            return state
    }   
}

//Acciones
export const obtenerPokemones = () => async (dispatch, getState) => {

    //Lee el store
    const { offset } = getState().pokemones

    try{
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}`)
                               
        dispatch({
            type: GET_POKEMON,
            payload: res.data.results
        })
    }catch(error) {
        console.log.apply(error);
    }
}

export const siguientePokemon = (numero) => async(dispatch, getState) => {
    const {offset} = getState().pokemones
    const next = offset + numero

    try{
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${next}`)

        dispatch({
            type: NEXT_POKEMON,
            payload: {
                array: res.data.results,
                offset: next
                
            }

        })
    }catch(error) {
        console.log(error)
    }
}