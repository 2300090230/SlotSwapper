import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-toastify'
import Spinner from '../components/ui/Spinner'
import PrimaryButton from '../components/ui/PrimaryButton'
import Logo from '../components/ui/Logo'

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
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-indigo-600 to-purple-600 px-4 py-12">
      <div className="w-full max-w-4xl">
        <div className="mx-auto mb-8 flex max-w-md flex-col items-center gap-4">
          <div className="rounded-full bg-white/90 p-3 shadow-lg">
            <Logo size={9} />
          </div>
          <h1 className="text-center text-3xl font-bold text-white">SlotSwapper</h1>
          <p className="text-center text-sm text-white/90">Peer-to-Peer Time Slot Scheduling</p>
        </div>
        <div className="mx-auto w-full max-w-md rounded-xl bg-white p-8 shadow-xl">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Create account</h2>
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
          <PrimaryButton disabled={loading} className="w-full justify-center">
            {loading && <Spinner className="h-4 w-4 border-white" />}
            <span>{loading ? 'Creating…' : 'Create account'}</span>
          </PrimaryButton>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            Have an account? <Link to="/login" className="text-indigo-700 font-medium">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}


