import {createContext, useState} from 'react'

const CartContext = createContext()

export const CartProvider = ({children}) => {
  const [cartList, setCartList] = useState([])

  const removeCartItem = id => {
    setCartList(prev => prev.filter(each => each.dish_id !== id))
  }

  const incrementCartItemQuantity = id => {
    setCartList(prev =>
      prev.map(each =>
        each.dish_id === id ? {...each, quantity: each.quantity + 1} : each,
      ),
    )
  }

  const decrementCartItemQuantity = id => {
    setCartList(
      prev =>
        prev
          .map(each =>
            each.dish_id === id ? {...each, quantity: each.quantity - 1} : each,
          )
          .filter(each => each.quantity > 0), // remove if quantity becomes 0
    )
  }

  const addCartItem = item => {
    const itemExists = cartList.find(each => each.dish_id === item.dish_id)
    if (itemExists) {
      incrementCartItemQuantity(item.dish_id)
    } else {
      setCartList(prev => [...prev, {...item, quantity: 1}])
    }
  }

  const removeAllCartItems = () => {
    setCartList([])
  }

  return (
    <CartContext.Provider
      value={{
        cartList,
        addCartItem,
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
        removeAllCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartContext
