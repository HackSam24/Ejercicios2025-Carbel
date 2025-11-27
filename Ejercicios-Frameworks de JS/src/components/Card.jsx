import '../styles/card.scss'

function Card({ title, subtitle, children, className = '' }) {
  const classes = ['card', className].filter(Boolean).join(' ')

  return (
    <article className={classes}>
      <header className="card__header">
        <h2 className="card__title">{title}</h2>
        {subtitle ? <p className="card__subtitle">{subtitle}</p> : null}
      </header>
      <div className="card__body">{children}</div>
    </article>
  )
}

export default Card
