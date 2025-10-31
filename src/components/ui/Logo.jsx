import PropTypes from 'prop-types'

export default function Logo({ size = 8 }) {
  const s = size * 4 // approx
  return (
    <div className={`flex items-center gap-3 text-sm`}> 
      <div style={{ width: s, height: s }} className={`flex items-center justify-center rounded-lg bg-white/90 p-1 shadow-md`}>
        <svg width="24" height="24" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="64" height="64" rx="12" fill="#4F46E5"/>
          <g transform="translate(8,8)">
            <path d="M10 6C6 6 4 9 4 12C4 15 6 18 10 18C14 18 16 15 16 12" stroke="#F8FAFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            <path d="M26 24C30 24 32 21 32 18C32 15 30 12 26 12C22 12 20 15 20 18" stroke="#C7D2FE" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            <path d="M8 20L24 4" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round"/>
          </g>
        </svg>
      </div>
      <span className="font-semibold text-gray-900">SlotSwapper</span>
    </div>
  )
}

Logo.propTypes = {
  size: PropTypes.number,
}
