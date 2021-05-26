import React from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  anteriorPokemon,
  obtenerPokemones,
  siguientePokemon,
  pokemonDetalle
} from "../redux/pokeDucks";
import PokeDetail from "./poke-detail";


const Pokemones = () => {
  const dispatch = useDispatch();

  const pokemones = useSelector((store) => store.pokemones.results);
  const next = useSelector((store) => store.pokemones.next);
  const previous = useSelector((store) => store.pokemones.previous);

  return (
    <div className="row">
      <div className="col-md-6 p-3">
        <h3>Pokemones</h3>
        <br/>
        <div className="d-flex justify-content-between">
        {pokemones.length === 0 && (
          <button className="btn btn-dark" onClick={() => dispatch(obtenerPokemones())}>
            Get Pokemones
          </button>
        )}
        {next && (
          <button className="btn btn-dark" onClick={() => dispatch(siguientePokemon())}>
            Next Pokemon
          </button>
        )}
        {previous && (
          <button className="btn btn-dark" onClick={() => dispatch(anteriorPokemon())}>
            Previous Pokemon
          </button>
        )}
        </div>

        <ul className="list-group mt-3">
          {pokemones.map((item, index) => (
            <li className="list-group-item" key={index}>{item.name}
                <button className="btn btn-dark btn-sm float-end" 
                onClick={()=> dispatch(pokemonDetalle(item.url))} 
                >Info</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="col-md-6 p-3">
          <h3>Detalle Pokémon</h3>
          <br/>
          <PokeDetail />
      </div>
    </div>
  );
};

export default Pokemones;
