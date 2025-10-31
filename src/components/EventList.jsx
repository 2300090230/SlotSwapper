import PropTypes from 'prop-types'

export default function EventList({ items, onEdit, onDelete, onStatus }) {
  const badge = (status) => {
    const classes = {
      BUSY: 'bg-rose-100 text-rose-700 border-rose-200',
      SWAPPABLE: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      SWAP_PENDING: 'bg-amber-100 text-amber-800 border-amber-200',
    }[status] || 'bg-gray-100 text-gray-700 border-gray-200'
    return <span className={`rounded border px-2 py-0.5 text-xs ${classes}`}>{status}</span>
  }
  if (!items?.length)
    return (
      <div className="text-center text-gray-600">
        <div className="mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 8h18M3 12h18M3 16h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <div className="font-medium">No events yet.</div>
        <div className="text-sm text-gray-500">Create your first event to get started</div>
      </div>
    )

  return (
    <ul className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
      {items.map((e) => (
        <li key={e.id} className="transform rounded-lg bg-white p-4 shadow transition hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="font-medium text-gray-900">{e.title}</div>
              <div className="mt-1 text-xs text-gray-500">
                {new Date(e.startTime).toLocaleString()} → {new Date(e.endTime).toLocaleString()}
              </div>
              <div className="mt-2 text-xs">{badge(e.status)}</div>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-2">
              <div className="flex gap-2">
                <button onClick={() => onStatus(e, 'SWAPPABLE')} className="rounded bg-emerald-600 px-2 py-1 text-xs text-white hover:bg-emerald-700">Swappable</button>
                <button onClick={() => onStatus(e, 'BUSY')} className="rounded bg-rose-600 px-2 py-1 text-xs text-white hover:bg-rose-700">Busy</button>
              </div>
              <div className="flex gap-2">
                <button onClick={() => onEdit(e)} className="rounded border px-3 py-1 text-xs hover:bg-gray-50">Edit</button>
                <button onClick={() => onDelete(e)} className="rounded border px-3 py-1 text-xs text-rose-600 hover:bg-rose-50">Delete</button>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

EventList.propTypes = {
  items: PropTypes.array,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onStatus: PropTypes.func.isRequired,
}


