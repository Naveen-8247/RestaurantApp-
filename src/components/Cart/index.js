import {useContext} from 'react'
import CartContext from '../../context/CartContext'
import Navbar from '../Navbar'
import CartItem from '../CartItem'
import './index.css'

const Cart = () => {
  const {cartList, removeAllCartItems} = useContext(CartContext)
  const isEmpty = cartList.length === 0

  return (
    <div className="cart-container">
      <Navbar />
      <div className="cart-content">
        <h1>Cart</h1>
        {isEmpty ? (
          <div className="empty-cart">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
              alt="empty cart"
              className="empty-cart-img"
            />
            <h2>Your cart is empty</h2>
          </div>
        ) : (
          <>
            <button
              type="button"
              onClick={removeAllCartItems}
              className="remove-all-btn"
            >
              Remove All
            </button>
            {cartList.map(item => (
              <CartItem key={item.dish_id} item={item} />
            ))}
          </>
        )}
      </div>
    </div>
  )
}

export default Cart
