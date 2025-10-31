import { useState } from 'react'
import PropTypes from 'prop-types'

export default function EventForm({ initial, onSubmit, submitLabel = 'Save' }) {
  const [form, setForm] = useState(
    initial || { title: '', startTime: '', endTime: '' }
  )
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(form)
      }}
      className="grid grid-cols-1 gap-3 md:grid-cols-3"
    >
      <input
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="rounded border px-3 py-2 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        required
      />
      <input
        type="datetime-local"
        value={form.startTime}
        onChange={(e) => setForm({ ...form, startTime: e.target.value })}
        className="rounded border px-3 py-2 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        required
      />
      <div className="flex gap-2">
        <input
          type="datetime-local"
          value={form.endTime}
          onChange={(e) => setForm({ ...form, endTime: e.target.value })}
          className="w-full rounded border px-3 py-2 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          required
        />
        <button className="whitespace-nowrap rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
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


