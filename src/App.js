import {useEffect, useState} from 'react'
import Navbar from './Components/Navbar'
import CategoryTabs from './Components/CategoryTabs'
import DishItem from './Components/DishItem'
import './App.css'

const API_URL =
  'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'

const App = () => {
  const [categories, setCategories] = useState([])
  const [activeCategoryId, setActiveCategoryId] = useState(null)
  const [cartItems, setCartItems] = useState({})

  const fetchMenu = async () => {
    const res = await fetch(API_URL)
    const json = await res.json()

    if (Array.isArray(json) && json.length > 0 && json[0].table_menu_list) {
      const menu = json[0].table_menu_list
      setCategories(menu)
      setActiveCategoryId(menu[0].menu_category_id)
    } else {
      console.error('Unexpected API response:', json)
    }
  }

  useEffect(() => {
    fetchMenu()
  }, [])

  const handleTabClick = id => setActiveCategoryId(id)

  const handleIncrement = dishId => {
    setCartItems(prev => ({...prev, [dishId]: (prev[dishId] || 0) + 1}))
  }

  const handleDecrement = dishId => {
    setCartItems(prev => {
      const newPrev = {...prev}
      if (newPrev[dishId] > 1) newPrev[dishId] -= 1
      else delete newPrev[dishId]
      return newPrev
    })
  }

  const activeCategory = categories.find(
    cat => cat.menu_category_id === activeCategoryId,
  )
  const activeDishes = activeCategory?.category_dishes || []
  const totalCount = Object.values(cartItems).reduce((sum, v) => sum + v, 0)

  return (
    <div className="app-container">
      <Navbar cartCount={totalCount} />
      <CategoryTabs
        categories={categories}
        selectedCategoryId={activeCategoryId}
        onTabClick={handleTabClick}
      />
      <div className="dish-list">
        {activeDishes.length > 0 ? (
          activeDishes.map(dish => (
            <DishItem
              key={dish.dish_id}
              dish={dish}
              quantity={cartItems[dish.dish_id] || 0}
              onIncrement={() => handleIncrement(dish.dish_id)}
              onDecrement={() => handleDecrement(dish.dish_id)}
            />
          ))
        ) : (
          <p className="no-dishes">No dishes available in this category.</p>
        )}
      </div>
    </div>
  )
}

export default App
