import PropTypes from 'prop-types'

const Button = ({ classname, text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={classname}
    >
      {text}
    </button>
  )
}

Button.defaultProps = {
  color: 'steelblue',
}

Button.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
}

export default Button
