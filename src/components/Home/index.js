import {useEffect, useState, useContext} from 'react'
import Navbar from '../Navbar'
import CategoryTabs from '../CategoryTabs'
import DishItem from '../DishItem'
import CartContext from '../../context/CartContext'
import './index.css'

const API_URL =
  'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'

const Home = () => {
  const [menuData, setMenuData] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [loading, setLoading] = useState(true)

  const {
    addCartItem,
    cartList,
    incrementCartItemQuantity,
    decrementCartItemQuantity,
  } = useContext(CartContext)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(API_URL)
      const data = await response.json()
      const categories = data[0].table_menu_list
      setMenuData(categories)
      setSelectedCategory(categories[0].menu_category)
      setLoading(false)
    }
    fetchData()
  }, [])

  if (loading) return <div data-testid="loader">Loading...</div>

  const selectedData = menuData.find(
    item => item.menu_category === selectedCategory,
  )

  return (
    <div className="home-container">
      <Navbar />
      <CategoryTabs
        categories={menuData}
        selectedCategory={selectedCategory}
        onTabClick={setSelectedCategory}
      />
      <div className="dishes-container">
        {selectedData.category_dishes.map(dish => {
          const itemInCart = cartList.find(i => i.dish_id === dish.dish_id)
          const quantity = itemInCart ? itemInCart.quantity : 0

          const onIncrement = () => {
            if (quantity > 0) {
              incrementCartItemQuantity(dish.dish_id)
            } else {
              addCartItem(dish)
            }
          }

          const onDecrement = () => {
            decrementCartItemQuantity(dish.dish_id)
          }

          return (
            <DishItem
              key={dish.dish_id}
              dish={dish}
              quantity={quantity}
              onIncrement={onIncrement}
              onDecrement={onDecrement}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Home
