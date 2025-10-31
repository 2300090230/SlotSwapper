import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  return (
    <header className="border-b bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-xl font-semibold">SlotSwapper</Link>
        <nav className="flex items-center gap-4">
          <Link to="/" className="text-sm hover:underline">Dashboard</Link>
          <Link to="/requests" className="text-sm hover:underline">Requests</Link>
          <span className="text-sm/none hidden rounded bg-white/20 px-2 py-1 text-white/90 md:inline">{user?.name}</span>
          <button onClick={logout} className="rounded bg-white/20 px-3 py-1.5 text-sm hover:bg-white/30">Logout</button>
        </nav>
      </div>
    </header>
  )
}


