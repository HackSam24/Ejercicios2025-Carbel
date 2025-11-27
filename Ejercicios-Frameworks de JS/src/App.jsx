import { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Activities from './pages/Activities'
import Home from './pages/Home'
import Login from './pages/Login'
import Poke from './pages/Poke'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleLoginSuccess = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Layout isAuthenticated={isAuthenticated} onLogout={handleLogout} />}
        >
          <Route index element={<Home />} />
          <Route
            path="login"
            element={
              <Login onLoginSuccess={handleLoginSuccess} isAuthenticated={isAuthenticated} />
            }
          />
          <Route path="poke" element={<Poke />} />
          <Route
            path="actividades"
            element={<Activities isAuthenticated={isAuthenticated} />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
