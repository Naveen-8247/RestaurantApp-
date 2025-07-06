import './index.css'

const CategoryTabs = ({categories, selectedCategoryId, onTabClick}) => (
  <div className="category-tabs-container">
    {categories.map(category => (
      <button
        type="button"
        key={category.menu_category_id}
        className={`tab-button ${
          selectedCategoryId === category.menu_category_id ? 'active-tab' : ''
        }`}
        onClick={() => onTabClick(category.menu_category_id)}
      >
        {category.menu_category}
      </button>
    ))}
  </div>
)

export default CategoryTabs
