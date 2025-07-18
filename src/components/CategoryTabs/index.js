import './index.css'

const CategoryTabs = ({categories, selectedCategory, onTabClick}) => (
  <div className="tabs-container">
    {categories.map(category => (
      <button
        key={category.menu_category_id}
        type="button"
        className={`tab-button ${
          selectedCategory === category.menu_category ? 'active' : ''
        }`}
        onClick={() => onTabClick(category.menu_category)}
      >
        {category.menu_category}
      </button>
    ))}
  </div>
)

export default CategoryTabs
