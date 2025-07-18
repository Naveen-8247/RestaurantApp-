import {withRouter, Link} from 'react-router-dom'
import {useContext} from 'react'
import Cookies from 'js-cookie'
import CartContext from '../../context/CartContext'
import './index.css'

const Navbar = props => {
  const {cartList} = useContext(CartContext)
  const cartCount = cartList.length

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="navbar">
      <Link to="/" className="logo-link">
        <h1 className="logo">UNI Resto Cafe</h1>
      </Link>
      <p className="orders-heading">My Orders</p>
      <div className="nav-right">
        <Link to="/cart" className="cart-link" type="button">
          <img
            src="https://cdn-icons-png.flaticon.com/512/263/263142.png"
            alt="cart"
            className="cart-icon"
          />
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </Link>
        <button type="button" className="logout-btn" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Navbar)
