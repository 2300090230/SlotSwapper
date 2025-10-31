export default function SwappableList({ items, mySlots, onRequest }) {
  if (!items?.length) return <div className="text-sm text-gray-500">No swappable slots available.</div>
  return (
    <ul className="divide-y rounded-lg border bg-white shadow-sm">
      {items.map((slot) => (
        <li key={slot.id} className="flex flex-col gap-2 p-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="font-medium">
              {slot.title} <span className="text-xs text-gray-500">by {slot.userName}</span>
            </div>
            <div className="text-xs text-gray-500">
              {new Date(slot.startTime).toLocaleString()} → {new Date(slot.endTime).toLocaleString()}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <select className="rounded border px-2 py-1 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-200" defaultValue="" id={`select-${slot.id}`}>
              <option value="" disabled>
                Choose my slot
              </option>
              {mySlots.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title}
                </option>
              ))}
            </select>
            <button
              onClick={() => {
                const sel = document.getElementById(`select-${slot.id}`)
                if (sel && sel.value) onRequest(sel.value, slot.id)
              }}
              className="rounded bg-indigo-600 px-3 py-1.5 text-sm text-white hover:bg-indigo-700"
            >
              Request Swap
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}


