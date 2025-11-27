import { Link } from 'react-router-dom'
import '../styles/home.scss'

function Home() {
  return (
    <section className="home">
      <div className="home__content">
        <p className="eyebrow">React + Router</p>
        <h1 className="home__title">Bienvenido al panel del Club</h1>
        <p className="home__subtitle">
          Inicia sesión para ver las actividades disponibles y asegura tu lugar en cada clase.
        </p>
        <div className="home__actions">
          <Link className="button button--primary" to="/login">
            Ir a Login
          </Link>
          <Link className="button button--ghost" to="/actividades">
            Ver actividades
          </Link>
        </div>
      </div>
      <div className="home__card">
        <h2>¿Qué encontrarás?</h2>
        <ul>
          <li>Listado de actividades con horarios claros.</li>
          <li>Botón de inscripción visible al iniciar sesión.</li>
          <li>Navegación con header, footer y layout común.</li>
        </ul>
      </div>
    </section>
  )
}

export default Home
