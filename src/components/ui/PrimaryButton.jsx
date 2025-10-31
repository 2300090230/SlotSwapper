import PropTypes from 'prop-types'

export default function PrimaryButton({ children, className = '', ...props }) {
  return (
    <button
      {...props}
  className={`inline-flex items-center justify-center gap-2 rounded-md bg-linear-to-r from-indigo-600 to-purple-600 px-4 py-2 text-white shadow-md hover:from-indigo-700 hover:to-purple-700 disabled:opacity-60 ${className}`}
    >
      {children}
    </button>
  )
}

PrimaryButton.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}
