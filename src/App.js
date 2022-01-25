import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import Popup from "./componentes/popup.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [pokemon, setPokemon] = useState({})
  const [buttonPopup,setButtonPopup]= useState(false);
  const [busqueda, setBusqueda]= useState('');

  const fetchPokemon = (id) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => response.json())
      .then((data) => setPokemon(data))
      ;
  };

  const onChange = async e=>{
    e.persist();
    setBusqueda(e.target.value);
  }

  const add=(min=1,max=600)=>{
    var id;
    if(pokemon.id >=max){
      id = pokemon.id = min;
    } else{
      id = pokemon.id +1;
    } 
    return id;
  };
  const decrease=(min=1, max=600)=>{
    var id;
    if(pokemon.id <= min){
    id = pokemon.id=max;
  }else {
    id = pokemon.id - 1 ;
  } 
    return id;
  };

  const getRandomInt = (min = 1,max=600) => {
    return Math.floor(Math.random()*(max - min) + min );
  }

  useEffect(()=>{
    console.log({pokemon})
  },[pokemon]);
  return (
    <div className="App">
      <div className="containerInput">
        <input
          className="form-control inputBuscar"
          value={busqueda}
          placeholder="Búsqueda por Nombre de Pokemon"
          onChange={onChange}
        />
        <button className="btn btn-success">
          <FontAwesomeIcon icon={faSearch}/>
        </button>
      </div>

      <header className="App-header">
      <a className="alignCentral" href='https://github.com/Ceslusbel/Pokedex.git'>GitHub</a>
        <div className='flex-container'>
          <img src={pokemon?.sprites?.back_default ?? logo} className='poke-image' alt='logo' />
          <img src={pokemon?.sprites?.front_default ?? logo} className='poke-image' alt='logo' />
        </div>
        <p>{pokemon.name ?? "NO POKEMON SELECTED"}</p>
        <p>{pokemon.id ?? "NO POKEMON SELECTED"}</p>
        <div className='flex-container'>
          <button className='button' onClick={() => fetchPokemon(decrease())}>Back</button>
          <button className='button' onClick={() => fetchPokemon(getRandomInt())}>Random</button>
          <button className='button' onClick={() => fetchPokemon(add())}>Next</button> 
          <button className='button' onClick={()=>setButtonPopup(true)}>Abilities</button> 
        </div>
        <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
          <h3>abilities</h3>
          <ul className='text'>
             {pokemon?.abilities?.map((ability)=>(
               <li key={ability.ability.id}>
                 {ability.ability.name}
               </li>
             ))
             }
          </ul>
        </Popup>
      </header>
    </div>
  );
}

export default App;
