import './Button.scss'

const Button = ({ icon, children, className, onClick }) => {
  return (
    <button className={`button ${className}`} onClick={onClick}>
      {icon}
      {children}
    </button>
  )
}

export default Button
