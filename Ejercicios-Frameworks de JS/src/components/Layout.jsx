import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'
import '../styles/layout.scss'

function Layout({ isAuthenticated, onLogout }) {
  return (
    <div className="app-shell">
      <Header isAuthenticated={isAuthenticated} onLogout={onLogout} />
      <main className="app-shell__main">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
