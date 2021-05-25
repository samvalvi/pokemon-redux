import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { obtenerPokemones, siguientePokemon } from '../redux/pokeDucks';


const Pokemones = () => {
    const dispatch = useDispatch();

    const pokemones = useSelector(store => store.pokemones.array)

    return (
        <div>
            <h2>Pokemones</h2>
            <button onClick={()=> dispatch(obtenerPokemones())}>Get Pokemones</button>
            <button onClick={()=> dispatch(siguientePokemon(10))} >Next Pokemon</button>
            <ul>
                {
                    pokemones.map((item, index) => (
                        <li key={index}>{item.name}</li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Pokemones
