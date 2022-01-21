import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import Popup from "./componentes/popup.js"

function App() {
  const [pokemon, setPokemon] = useState({})
  const [count, setCount] = useState(0);
  const [buttonPopup,setButtonPopup]= useState(false);

  const fetchPokemon = (id) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => response.json())
      .then((data) => setPokemon(data))
      setCount(id)
      ;
  };

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
    console.log({count})
  },[pokemon]);
  return (
    <div className="App">
      <header className="App-header">
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
        </div>
      </header>
    </div>
  );
}

export default App;
