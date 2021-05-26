import React, {useEffect} from 'react'
import { pokemonDetalle } from '../redux/pokeDucks';
import { useDispatch, useSelector } from 'react-redux'

const PokeDetail = () => {
    const dispatch = useDispatch();
    const detalle = useSelector(store => store.pokemones.unPokemon)

    useEffect(() => {
        const fetchData = () => {
            dispatch(pokemonDetalle())
        }
        fetchData()
    }, [])

    return detalle ? (
        <div className="card mt-5 text-center">
            <div className="card-body">
                <img className="img-fluid" src={detalle.picture} alt="img-fluid"/>
                <div className="card-title">{detalle.name}</div>
            </div>
        </div>
    ) : null
}

export default PokeDetail
