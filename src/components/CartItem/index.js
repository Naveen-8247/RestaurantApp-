import {useContext} from 'react'
import CartContext from '../../context/CartContext'
import './index.css'

const CartItem = ({item}) => {
  const {
    incrementCartItemQuantity,
    decrementCartItemQuantity,
    removeCartItem,
  } = useContext(CartContext)

  const onIncrement = () => {
    incrementCartItemQuantity(item.dish_id)
  }

  const onDecrement = () => {
    decrementCartItemQuantity(item.dish_id)
  }

  const onRemove = () => {
    removeCartItem(item.dish_id)
  }

  return (
    <div className="cart-item">
      <img
        src={item.dish_image}
        alt={item.dish_name}
        className="cart-item-img"
      />
      <div className="item-details">
        <h3>{item.dish_name}</h3>
        <p>Price: ₹{item.dish_price * item.quantity}</p>
        <div className="quantity-controls">
          <button type="button" onClick={onDecrement}>
            -
          </button>
          <p data-testid="quantity">{item.quantity}</p>
          <button type="button" onClick={onIncrement}>
            +
          </button>
        </div>
        <button type="button" onClick={onRemove} className="remove-btn">
          Remove
        </button>
      </div>
    </div>
  )
}

export default CartItem
