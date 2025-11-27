import { NavLink, useNavigate } from 'react-router-dom'

function Header({ isAuthenticated, onLogout }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    if (typeof onLogout === 'function') {
      onLogout()
    }
    navigate('/')
  }

  const navClass = ({ isActive }) =>
    isActive ? 'nav__link nav__link--active' : 'nav__link'

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <div className="brand" role="banner">
          <span className="brand__dot" aria-hidden="true" />
          <span className="brand__text">Club Deportivo</span>
        </div>

        <nav className="nav" aria-label="Navegación principal">
          <NavLink to="/" className={navClass} end>
            Home
          </NavLink>
          <NavLink to="/login" className={navClass}>
            Login
          </NavLink>
          <NavLink to="/poke" className={navClass}>
            Pokédex
          </NavLink>
          <NavLink to="/actividades" className={navClass}>
            Actividades
          </NavLink>
        </nav>

        <div className="header-actions">
          {isAuthenticated ? (
            <button type="button" className="button button--ghost" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <NavLink to="/login" className="button button--primary">
              Ingresar
            </NavLink>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
