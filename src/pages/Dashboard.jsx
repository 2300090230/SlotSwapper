import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import EventForm from '../components/EventForm'
import EventList from '../components/EventList'
import SwappableList from '../components/SwappableList'
import { eventsApi, swapApi } from '../services/api'
import { toast } from 'react-toastify'
import SkeletonCard from '../components/ui/SkeletonCard'

export default function Dashboard() {
  const [events, setEvents] = useState([])
  const [swappable, setSwappable] = useState([])
  const [loading, setLoading] = useState(true)
  const [edit, setEdit] = useState(null)
  const [tab, setTab] = useState('events')

  const load = async () => {
    setLoading(true)
    try {
      const [mine, sw] = await Promise.all([eventsApi.listMine(), swapApi.swappableSlots()])
      setEvents(mine)
      setSwappable(sw.filter((s) => !mine.find((m) => m.id === s.id)))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const onCreate = async (payload) => {
    try {
      if (edit) {
        await eventsApi.update(edit.id, payload)
        setEdit(null)
        toast.success('Event updated')
      } else {
        await eventsApi.create(payload)
        toast.success('Event created')
      }
      await load()
    } catch {
      toast.error('Failed to save event')
    }
  }

  const onDelete = async (e) => {
    try {
      await eventsApi.delete(e.id)
      toast.success('Event deleted')
      await load()
    } catch {
      toast.error('Failed to delete event')
    }
  }

  const onStatus = async (e, status) => {
    try {
      await eventsApi.updateStatus(e.id, { status })
      toast.success(`Marked ${status}`)
      await load()
    } catch {
      toast.error('Failed to update status')
    }
  }

  const onRequest = async (mySlotId, theirSlotId) => {
    try {
      await swapApi.createRequest({ mySlotId, theirSlotId })
      toast.success('Swap request sent')
    } catch {
      toast.error('Failed to send request')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-indigo-50">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-6">
        <div className="mb-4 flex gap-2">
          <button onClick={() => setTab('events')} className={`rounded px-3 py-1.5 text-sm ${tab==='events'?'bg-indigo-600 text-white':'border'}`}>My Events</button>
          <button onClick={() => setTab('swappable')} className={`rounded px-3 py-1.5 text-sm ${tab==='swappable'?'bg-indigo-600 text-white':'border'}`}>Swappable Slots</button>
        </div>
        {tab === 'events' ? (
          <div className="space-y-4">
            {loading ? (
              <div className="space-y-4">
                <div className="rounded-xl border bg-white p-4 shadow-sm">
                  <SkeletonCard lines={2} />
                </div>
                <div className="space-y-2">
                  <SkeletonCard lines={3} />
                  <SkeletonCard lines={3} />
                </div>
              </div>
            ) : (
              <>
                <div className="rounded-xl border bg-white p-4 shadow-sm">
                  <h2 className="mb-3 font-semibold text-gray-900">{edit ? 'Edit event' : 'Create event'}</h2>
                  <EventForm initial={edit ? { title: edit.title, startTime: edit.startTime, endTime: edit.endTime } : undefined} onSubmit={onCreate} submitLabel={edit ? 'Update' : 'Create'} />
                </div>
                <EventList items={events} onEdit={setEdit} onDelete={onDelete} onStatus={onStatus} />
              </>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {loading ? (
              <div>
                <SkeletonCard lines={3} />
              </div>
            ) : (
              <SwappableList items={swappable} mySlots={events} onRequest={onRequest} />
            )}
          </div>
        )}
      </main>
    </div>
  )
}


