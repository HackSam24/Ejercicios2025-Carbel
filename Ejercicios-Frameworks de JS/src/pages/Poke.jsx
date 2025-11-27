import { useEffect, useState } from 'react'
import PokeCard from '../components/PokeCard'
import '../styles/poke.scss'

const API_BASE_URL = 'https://pokeapi.co/api/v2/pokemon'
const POKEMON_COUNT = 20

function Poke() {
  const [featuredPokemon, setFeaturedPokemon] = useState(null)
  const [pokemonList, setPokemonList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    const fetchById = async (id) => {
      const response = await fetch(`${API_BASE_URL}/${id}`, { signal: controller.signal })
      if (!response.ok) {
        throw new Error(`No se pudo obtener el Pokémon con id ${id}`)
      }
      return response.json()
    }

    const loadPokemon = async () => {
      try {
        const ids = Array.from({ length: POKEMON_COUNT }, (_, index) => index + 1)
        const results = await Promise.all(ids.map(fetchById))

        setFeaturedPokemon(results.find((item) => item.id === 1) ?? results[0])
        setPokemonList(results)
      } catch (err) {
        if (err.name === 'AbortError') return
        console.error(err)
        setError('No se pudieron cargar los datos desde la PokeAPI.')
      } finally {
        setIsLoading(false)
      }
    }

    loadPokemon()

    return () => controller.abort()
  }, [])

  const restOfPokemon = featuredPokemon
    ? pokemonList.filter((pokemon) => pokemon.id !== featuredPokemon.id)
    : pokemonList

  return (
    <section className="poke">
      <header className="poke__header">
        <p className="eyebrow">Pokédex básica</p>
        <h1>Consulta la PokeAPI (1 - 20)</h1>
        <p className="poke__subtitle">
          Usamos fetch dentro de useEffect para obtener a Bulbasaur y los primeros veinte Pokémon
          directamente de la API oficial.
        </p>
      </header>

      {isLoading && <p className="poke__notice">Cargando Pokémon...</p>}
      {error && <p className="poke__notice poke__notice--error">{error}</p>}

      {!isLoading && !error && featuredPokemon ? (
        <div className="poke__featured">
          <h2>Destacado: Bulbasaur</h2>
          <PokeCard pokemon={featuredPokemon} highlight />
        </div>
      ) : null}

      {!isLoading && !error && (
        <div className="poke__grid">
          {restOfPokemon.map((pokemon) => (
            <PokeCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}
    </section>
  )
}

export default Poke
