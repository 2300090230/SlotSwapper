import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { swapApi } from '../services/api'
import { toast } from 'react-toastify'
import SkeletonCard from '../components/ui/SkeletonCard'

export default function Requests() {
  const [incoming, setIncoming] = useState([])
  const [outgoing, setOutgoing] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    try {
      const [inc, out] = await Promise.all([swapApi.incoming(), swapApi.outgoing()])
      setIncoming(inc)
      setOutgoing(out)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const decide = async (id, accept) => {
    try {
      await swapApi.respond(id, { accept })
      toast.success(accept ? 'Request accepted' : 'Request declined')
      await load()
    } catch {
      toast.error('Failed to update request')
    }
  }

  const List = ({ title, items, actionButtons }) => (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <h2 className="mb-3 font-semibold text-gray-900">{title}</h2>
      {!items?.length ? (
        <div className="text-sm text-gray-500">No requests.</div>
      ) : (
        <ul className="divide-y">
          {items.map((r) => (
            <li key={r.id} className="flex flex-col gap-2 py-3 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-sm">
                  <span className="font-medium">{r.requesterName}</span> ↔ <span className="font-medium">{r.receiverName}</span>
                </div>
                <div className="text-xs text-gray-500">
                  {r.requesterSlot?.title} ↔ {r.receiverSlot?.title}
                </div>
                <div className="text-xs">Status: <span className="rounded bg-amber-100 px-2 py-0.5 uppercase text-amber-800">{r.status}</span></div>
              </div>
              {actionButtons?.(r)}
            </li>
          ))}
        </ul>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-indigo-50">
      <Navbar />
      <main className="mx-auto max-w-6xl space-y-4 px-4 py-6">
        {loading ? (
          <div className="space-y-4">
            <SkeletonCard lines={3} />
            <SkeletonCard lines={2} />
          </div>
        ) : (
          <>
            <List
              title="Incoming Requests"
              items={incoming}
              actionButtons={(r) => (
                <div className="flex gap-2">
                  <button onClick={() => decide(r.id, true)} className="rounded bg-emerald-600 px-3 py-1.5 text-sm text-white hover:bg-emerald-700">Accept</button>
                  <button onClick={() => decide(r.id, false)} className="rounded bg-rose-600 px-3 py-1.5 text-sm text-white hover:bg-rose-700">Decline</button>
                </div>
              )}
            />
            <List title="Outgoing Requests" items={outgoing} />
          </>
        )}
      </main>
    </div>
  )
}


