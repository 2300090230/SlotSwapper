export default function EventList({ items, onEdit, onDelete, onStatus }) {
  const badge = (status) => {
    const classes = {
      BUSY: 'bg-rose-100 text-rose-700 border-rose-200',
      SWAPPABLE: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      SWAP_PENDING: 'bg-amber-100 text-amber-800 border-amber-200',
    }[status] || 'bg-gray-100 text-gray-700 border-gray-200'
    return <span className={`rounded border px-2 py-0.5 text-xs ${classes}`}>{status}</span>
  }
  if (!items?.length) return <div className="text-sm text-gray-500">No events yet.</div>
  return (
    <ul className="divide-y rounded-lg border bg-white shadow-sm">
      {items.map((e) => (
        <li key={e.id} className="flex items-center justify-between gap-2 p-3">
          <div>
            <div className="font-medium">{e.title}</div>
            <div className="text-xs text-gray-500">
              {new Date(e.startTime).toLocaleString()} → {new Date(e.endTime).toLocaleString()}
            </div>
            <div className="mt-1 text-xs">{badge(e.status)}</div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => onStatus(e, 'SWAPPABLE')} className="rounded bg-emerald-600 px-2 py-1 text-xs text-white hover:bg-emerald-700">Mark Swappable</button>
            <button onClick={() => onStatus(e, 'BUSY')} className="rounded bg-rose-600 px-2 py-1 text-xs text-white hover:bg-rose-700">Mark Busy</button>
            <button onClick={() => onEdit(e)} className="rounded border px-2 py-1 text-xs hover:bg-gray-50">Edit</button>
            <button onClick={() => onDelete(e)} className="rounded border px-2 py-1 text-xs text-rose-600 hover:bg-rose-50">Delete</button>
          </div>
        </li>
      ))}
    </ul>
  )
}


