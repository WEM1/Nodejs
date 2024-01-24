'use client';
import Navbar from '../navbar';
import '../global.css';
import { useState } from 'react';
import styles from './Pokemon.module.css';

interface PokemonData {
  number: number;
  name: string;
  sprite: string;
}

const clearLocalStorage = () => {
  localStorage.clear();
};

export default function Pokemon() {
  const [allPokemon, setAllPokemon] = useState<PokemonData[]>([]);
  const [startId, setStartId] = useState<number>();
  const [pokemonCount, setPokemonCount] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);

  const loadingValue = (current: number, absolute: number) => {
    let progress = current / absolute;
    setLoadingProgress(progress);
    return;
  };

  async function fetchData(url: string) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetching Error', error);
      throw error;
    }
  }

  async function fetchPokemonData(startId: number, count: number) {
    setLoading(true);
    try {
      let storedData = localStorage.getItem('pokemonData');
      console.log(storedData);
      storedData = JSON.parse(storedData);

      if (storedData && storedData.length > count - startId) {
        setAllPokemon([]);
        for (let i = 0; i < count; i++) {
          loadingValue(i, storedData.length);
          setAllPokemon((prevPokemon) => [
            ...prevPokemon,
            { ...storedData[i + startId], number: i + startId + 1 },
          ]);
        }
      } else {
        let pokemonData = [];
        let data = await fetchData(
          `https://pokeapi.co/api/v2/pokemon/?offset=${startId}&limit=${count}`
        );

        for (let i = 0; i < data.results.length; i++) {
          loadingValue(i, data.results.length);
          const pokeName = data.results[i].name;
          const spriteLink = (
            await fetchData(
              `https://pokeapi.co/api/v2/pokemon/${startId + i + 1}/`
            )
          ).sprites.front_default;

          pokemonData.push({
            number: startId + i + 1,
            name: pokeName,
            sprite: spriteLink,
          });
        }

        localStorage.setItem('pokemonData', JSON.stringify(pokemonData));

        setAllPokemon([...pokemonData]);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <Navbar />
      <section>
        <input
          type='number'
          placeholder='Starting point (default 0)'
          value={startId}
          onChange={(event) => setStartId(+event.target.value)}
        />

        <input
          type='number'
          placeholder='How many Pokémon?'
          value={pokemonCount}
          onChange={(event) => setPokemonCount(+event.target.value)}
        />

        <button
          onClick={() =>
            fetchPokemonData(
              startId ? startId : 0,
              pokemonCount ? pokemonCount : 1
            )
          }
        >
          Get Pokémon
        </button>
        <button onClick={() => clearLocalStorage()}>
          Clear Local Storage!
        </button>
      </section>

      {loading ? (
        <div className={styles.loading}>
          <div
            className={`${styles.loading} ${styles.absolute}`}
            style={{
              width: loadingProgress * 500,
            }}
          >
            {loadingProgress * 100}% Loading...
          </div>
        </div>
      ) : (
        <section className={styles.pokemonSection}>
          {allPokemon.map((item, index) => (
            <div key={index}>
              <img
                width={100}
                height={100}
                src={item.sprite}
                alt='Pokemon Image'
              />
              <p>{item.name}</p>
            </div>
          ))}
        </section>
      )}
    </main>
  );
}
