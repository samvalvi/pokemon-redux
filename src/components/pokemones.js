import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { anteriorPokemon, obtenerPokemones, siguientePokemon } from '../redux/pokeDucks';


const Pokemones = () => {
    const dispatch = useDispatch();

    const pokemones = useSelector(store => store.pokemones.results)
    const next = useSelector(store => store.pokemones.next)
    const previous = useSelector(store => store.pokemones.previous)

    return (
        <div>
            <h2>Pokemones</h2>
            {
               pokemones.length === 0 &&  <button onClick={()=> dispatch(obtenerPokemones())}>Get Pokemones</button>
            }
            {
                next && <button onClick={()=> dispatch(siguientePokemon())} >Next Pokemon</button>
            }
            {
                previous && <button onClick={()=> dispatch(anteriorPokemon())}>Previous Pokemon</button>
            }

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
