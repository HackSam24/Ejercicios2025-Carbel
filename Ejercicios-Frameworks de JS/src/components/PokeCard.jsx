function PokeCard({ pokemon, highlight = false }) {
  if (!pokemon) return null

  const sprite =
    pokemon.sprites?.other?.['official-artwork']?.front_default ??
    pokemon.sprites?.front_default ??
    ''

  const types = pokemon.types?.map((entry) => entry.type.name) ?? []
  const abilities = pokemon.abilities?.map((entry) => entry.ability.name) ?? []

  return (
    <article className={`poke-card ${highlight ? 'poke-card--highlight' : ''}`}>
      <div className="poke-card__top">
        <span className="poke-card__id">#{String(pokemon.id).padStart(3, '0')}</span>
        <div className="poke-card__types">
          {types.map((type) => (
            <span key={type} className="poke-card__type">
              {type}
            </span>
          ))}
        </div>
      </div>

      <h3 className="poke-card__name">{pokemon.name}</h3>

      {sprite ? (
        <div className="poke-card__image-wrapper">
          <img src={sprite} alt={`Sprite de ${pokemon.name}`} loading="lazy" />
        </div>
      ) : (
        <p className="poke-card__notice">Sin imagen disponible</p>
      )}

      <div className="poke-card__meta">
        <div>
          <p className="poke-card__label">Altura</p>
          <p className="poke-card__value">{(pokemon.height / 10).toFixed(1)} m</p>
        </div>
        <div>
          <p className="poke-card__label">Peso</p>
          <p className="poke-card__value">{(pokemon.weight / 10).toFixed(1)} kg</p>
        </div>
      </div>

      <div className="poke-card__abilities">
        <p className="poke-card__label">Habilidades</p>
        <div className="poke-card__chips">
          {abilities.map((ability) => (
            <span key={ability} className="poke-card__chip">
              {ability}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}

export default PokeCard
