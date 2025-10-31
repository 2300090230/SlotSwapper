import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Logo from './ui/Logo'

export default function Navbar() {
  const { user, logout } = useAuth()
  const loc = useLocation()
  const navClass = (path) => `rounded px-3 py-1.5 text-sm ${loc.pathname === path ? 'bg-white text-indigo-600 shadow' : 'text-white/90 hover:bg-white/10'}`
  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-3">
          <Logo />
        </Link>
        <nav className="flex items-center gap-3">
          <Link to="/" className={navClass('/')}>Dashboard</Link>
          <Link to="/requests" className={navClass('/requests')}>Requests</Link>
        </nav>
        <div className="flex items-center gap-4">
          <span className="hidden rounded bg-green-50 px-2 py-1 text-green-700 md:inline">● Connected</span>
          <span className="hidden text-sm text-gray-700 md:inline">{user?.name}</span>
          <button onClick={logout} className="rounded bg-rose-600 px-3 py-1.5 text-sm text-white hover:bg-rose-700">Logout</button>
        </div>
      </div>
    </header>
  )
}


