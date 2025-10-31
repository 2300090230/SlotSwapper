import PropTypes from 'prop-types'

export default function SwappableList({ items, mySlots, onRequest }) {
  if (!items?.length)
    return <div className="text-sm text-gray-500">No swappable slots available.</div>

  return (
    <ul className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {items.map((slot) => (
        <li key={slot.id} className="transform rounded-lg bg-white p-4 shadow transition hover:-translate-y-1 hover:shadow-lg">
          <div className="flex flex-col gap-3">
            <div>
              <div className="font-medium text-gray-900">
                {slot.title} <span className="text-xs text-gray-500">by {slot.userName}</span>
              </div>
              <div className="mt-1 text-xs text-gray-500">
                {new Date(slot.startTime).toLocaleString()} → {new Date(slot.endTime).toLocaleString()}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <select className="rounded border px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-200" defaultValue="" id={`select-${slot.id}`}>
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
                className="ml-auto rounded bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700"
              >
                Request Swap
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

SwappableList.propTypes = {
  items: PropTypes.array,
  mySlots: PropTypes.array,
  onRequest: PropTypes.func.isRequired,
}


