import {useEffect, useState} from 'react'
import Navbar from './components/Navbar'
import CategoryTabs from './components/CategoryTabs'
import DishItem from './components/DishItem'
import './App.css'

const API_URL =
  'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'

const App = () => {
  const [menuData, setMenuData] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [dishQuantities, setDishQuantities] = useState({})
  const [cartCount, setCartCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(API_URL)
      const data = await response.json()
      const categories = data[0].table_menu_list
      setMenuData(categories)
      setSelectedCategory(categories[0].menu_category)

      const quantities = {}
      categories.forEach(category =>
        category.category_dishes.forEach(dish => {
          quantities[dish.dish_id] = 0
        }),
      )
      setDishQuantities(quantities)
      setLoading(false)
    }

    fetchData()
  }, [])

  const updateCartCount = updated => {
    const total = Object.values(updated).reduce((a, b) => a + b, 0)
    setCartCount(total)
  }

  const handleIncrement = id => {
    setDishQuantities(prev => {
      const updated = {...prev, [id]: prev[id] + 1}
      updateCartCount(updated)
      return updated
    })
  }

  const handleDecrement = id => {
    setDishQuantities(prev => {
      const updated = {...prev, [id]: Math.max(prev[id] - 1, 0)}
      updateCartCount(updated)
      return updated
    })
  }

  if (loading) return <p>Loading...</p>

  const selectedData = menuData.find(
    item => item.menu_category === selectedCategory,
  )

  return (
    <div className="app-container">
      <Navbar cartCount={cartCount} />
      <CategoryTabs
        categories={menuData}
        selectedCategory={selectedCategory}
        onTabClick={setSelectedCategory}
      />
      <div className="dishes-container">
        {selectedData.category_dishes.map(dish => (
          <DishItem
            key={dish.dish_id}
            dish={dish}
            quantity={dishQuantities[dish.dish_id]}
            onIncrement={() => handleIncrement(dish.dish_id)}
            onDecrement={() => handleDecrement(dish.dish_id)}
          />
        ))}
      </div>
    </div>
  )
}

export default App
