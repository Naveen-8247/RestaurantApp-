import './index.css'

const CategoryTabs = ({categories, selectedCategoryName, onTabClick}) => (
  <div className="category-tabs-container">
    {categories.map(category => (
      <button
        type="button"
        key={category.menu_category_id}
        className={`tab-button ${
          selectedCategoryName === category.menu_category ? 'active-tab' : ''
        }`}
        aria-label={category.menu_category}
        onClick={() => onTabClick(category.menu_category)}
      >
        {category.menu_category}
      </button>
    ))}
  </div>
)

export default CategoryTabs
