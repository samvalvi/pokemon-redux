import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import userReducer from './usuarioDucks'
import pokeReducer from './pokeDucks'
import { usuarioActivo } from './usuarioDucks'

//Combinar reducers
const rootReducer = combineReducers({
    pokemones: pokeReducer,
    usuario : userReducer,
})

//Redux dev-tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore(){
    const store = createStore( rootReducer, composeEnhancers(applyMiddleware(thunk)))
    usuarioActivo()(store.dispatch)
    return store
}