import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-toastify'
import Spinner from '../components/ui/Spinner'

export default function Signup() {
  const navigate = useNavigate()
  const { signup } = useAuth()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signup(form)
      toast.success('Account created')
      navigate('/')
    } catch {
      setError('Signup failed')
      toast.error('Signup failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 px-4">
      <div className="w-full max-w-md rounded-xl border bg-white p-6 shadow-sm">
        <h1 className="mb-6 text-center text-2xl font-semibold text-gray-900">Create account</h1>
        {error && <div className="mb-4 rounded bg-red-50 p-3 text-sm text-red-700">{error}</div>}
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-gray-700">Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded border px-3 py-2 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-gray-700">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded border px-3 py-2 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-gray-700">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full rounded border px-3 py-2 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              required
            />
          </div>
          <button disabled={loading} className="w-full flex items-center justify-center gap-2 rounded bg-indigo-600 py-2 text-white hover:bg-indigo-700 disabled:opacity-60">
            {loading && <Spinner className="h-4 w-4 border-white" />}
            <span>{loading ? 'Creating…' : 'Create account'}</span>
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Have an account? <Link to="/login" className="text-indigo-700 underline">Sign in</Link>
        </p>
      </div>
    </div>
  )
}


