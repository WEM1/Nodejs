'use client';
import Navbar from '../navbar';
import '../global.css';
import { useState } from 'react';
import style from './styles.module.css';

interface pokemon {
  pokemonName: string;
  sprite: string;
}
const clearLocalStorage = () => {
  localStorage.clear();
};
export default function pokemon() {
  const [allPokemon, setAllPokemon] = useState<pokemon[]>([]);
  const [pokeStart, setPokeStart] = useState<number>();
  const [pokeCount, setPokeCount] = useState<number>();

  const fetchData = async (url: string) => {
    let data = await fetch(url);
    let output = await data.json();
    return output;
  };

  async function getName(pokemonStart: number, pokemonCount: number) {
    let storedData = localStorage.getItem('pokemonData');
    console.log(storedData);

    if (storedData) {
      let storedDataString = JSON.parse(storedData);
      storedDataString.map((item,index)=>
      )
      setAllPokemon([...storedDataString]);
    } else {
      let pokemonData = [];
      let data = await fetchData(
        `https://pokeapi.co/api/v2/pokemon/?offset=${pokemonStart}&limit=${pokemonCount}`
      );

      for (let i = 0; i < data.results.length; i++) {
        const pokeName = data.results[i].name;
        const spriteLink = (
          await fetchData(
            `https://pokeapi.co/api/v2/pokemon/${pokemonStart + i + 1}/`
          )
        ).sprites.front_default;

        pokemonData.push({ pokemonName: pokeName, sprite: spriteLink });
      }

      localStorage.setItem('pokemonData', JSON.stringify(pokemonData));

      setAllPokemon([...pokemonData]);
    }
  }

  return (
    <main>
      <Navbar />
      <section>
        <input
          type='number'
          placeholder='Starting-point(default 0)'
          value={pokeStart}
          onChange={(event) => setPokeStart(+event.target.value)}
        />

        <input
          type='number'
          placeholder='How many Pokemon?'
          value={pokeCount}
          onChange={(event) => setPokeCount(+event.target.value)}
        />

        <button
          onClick={() =>
            getName(pokeStart ? pokeStart : 0, pokeCount ? pokeCount : 1)
          }
        >
          Click me!
        </button>
        <button onClick={() => clearLocalStorage()}>Clear LocalStorage!</button>
      </section>
      <section className={style.pokemonSection}>
        {allPokemon.map((item, index) => (
          <div key={index}>
            <img
              width={100}
              height={100}
              src={item.sprite}
              alt='Pokemon Image'
            />

            <p>{item.pokemonName}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
