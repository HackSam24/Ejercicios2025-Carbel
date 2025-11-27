import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/login.scss'

function Login({ onLoginSuccess, isAuthenticated }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/actividades', { replace: true })
    }
  }, [isAuthenticated, navigate])

  const handleSubmit = (event) => {
    event.preventDefault()
    const isValid = username === 'admin' && password === 'admin'
    console.log(isValid ? 'Login OK' : 'Login Incorrecto')

    if (isValid) {
      if (typeof onLoginSuccess === 'function') {
        onLoginSuccess()
      }
      navigate('/actividades')
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-card__title">Iniciar Sesión</h1>
        <p className="login-card__subtitle">
          Ingresa tus credenciales para continuar.
        </p>

        <form className="login-form" onSubmit={handleSubmit}>
          <label className="login-form__field" htmlFor="username">
            <span>Usuario</span>
            <input
              id="username"
              name="username"
              type="text"
              className="login-form__input"
              placeholder="Usuario"
              autoComplete="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </label>

          <label className="login-form__field" htmlFor="password">
            <span>Contraseña</span>
            <input
              id="password"
              name="password"
              type="password"
              className="login-form__input"
              placeholder="Contraseña"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>

          <button type="submit" className="login-form__button">
            Ingresar
          </button>
        </form>

        <p className="login-card__footer">Usuario y contraseña: admin</p>
      </div>
    </div>
  )
}

export default Login
