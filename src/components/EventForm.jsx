import { useState } from 'react'
import PropTypes from 'prop-types'

export default function EventForm({ initial, onSubmit, submitLabel = 'Save' }) {
  const [form, setForm] = useState(
    initial || { title: '', startTime: '', endTime: '' }
  )
  const [error, setError] = useState('')

  // helper: format a Date to `YYYY-MM-DDTHH:MM` for datetime-local inputs
  const formatDateTimeLocal = (d) => {
    const dt = new Date(d)
    const pad = (n) => String(n).padStart(2, '0')
    const year = dt.getFullYear()
    const month = pad(dt.getMonth() + 1)
    const day = pad(dt.getDate())
    const hours = pad(dt.getHours())
    const mins = pad(dt.getMinutes())
    return `${year}-${month}-${day}T${hours}:${mins}`
  }

  const nowLocal = () => formatDateTimeLocal(new Date())

  const addMinutes = (isoString, mins = 60) => {
    const d = new Date(isoString)
    d.setMinutes(d.getMinutes() + mins)
    return formatDateTimeLocal(d)
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        setError('')
        // basic validation: endTime must be after startTime
        if (form.startTime && form.endTime) {
          const s = new Date(form.startTime)
          const t = new Date(form.endTime)
          if (t <= s) {
            setError('End time must be after start time')
            return
          }
        }
        onSubmit(form)
      }}
      className="grid grid-cols-1 gap-3 md:grid-cols-12"
    >
      <div className="md:col-span-4">
        <input
          placeholder="Event title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 transition-colors placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
          required
        />
      </div>
      <div className="md:col-span-3">
        <input
          type="datetime-local"
          value={form.startTime}
          onChange={(e) => {
            const newStart = e.target.value
            // update start
            setForm((prev) => ({ ...prev, startTime: newStart }))
            // if endTime is empty or <= newStart, set endTime to +60 minutes
            if (!form.endTime || new Date(form.endTime) <= new Date(newStart)) {
              setForm((prev) => ({ ...prev, endTime: addMinutes(newStart, 60) }))
            }
            setError('')
          }}
          // prevent selecting past times
          min={nowLocal()}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 transition-colors focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
          required
        />
      </div>
      <div className="md:col-span-3">
        <input
          type="datetime-local"
          value={form.endTime}
          onChange={(e) => {
            setForm((prev) => ({ ...prev, endTime: e.target.value }))
            setError('')
          }}
          // end time must be after start time; if startTime not set, prevent past
          min={form.startTime || nowLocal()}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 transition-colors focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
          required
        />
      </div>
      {error && (
        <div className="md:col-span-8 text-sm text-red-600">{error}</div>
      )}
      <div className="md:col-span-2">
        <button className="btn-primary w-full whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium text-white transition-colors">
          {submitLabel}
        </button>
      </div>
    </form>
  )
}

EventForm.propTypes = {
  initial: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  submitLabel: PropTypes.string,
}


