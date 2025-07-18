import {useEffect, useState} from 'react'

import Navbar from './Components/Navbar'

import CategoryTabs from './Components/CategoryTabs'

import DishItem from './Components/DishItem'

import './App.css'

const API_URL =
  'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'

const App = () => {
  const [categories, setCategories] = useState([])

  const [activeCategoryName, setActiveCategoryName] = useState('')

  const [cartItems, setCartItems] = useState({})

  useEffect(() => {
    const fetchMenu = async () => {
      const response = await fetch(API_URL)

      const data = await response.json()

      const menuList = data[0]?.table_menu_list || []

      setCategories(menuList)

      setActiveCategoryName(menuList[0]?.menu_category || '')
    }

    fetchMenu()
  }, [])

  const handleTabClick = name => setActiveCategoryName(name)

  const handleIncrement = id => {
    setCartItems(prev => ({...prev, [id]: (prev[id] || 0) + 1}))
  }

  const handleDecrement = id => {
    setCartItems(prev => {
      const newPrev = {...prev}

      if (newPrev[id] > 1) newPrev[id] -= 1
      else delete newPrev[id]

      return newPrev
    })
  }

  const activeCategory = categories.find(
    cat => cat.menu_category === activeCategoryName,
  )

  const activeDishes = activeCategory?.category_dishes || []

  const totalCount = Object.values(cartItems).reduce((sum, v) => sum + v, 0)

  return (
    <div className="app-container">
      <Navbar cartCount={totalCount} />

      <CategoryTabs
        categories={categories}
        selectedCategoryName={activeCategoryName}
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
