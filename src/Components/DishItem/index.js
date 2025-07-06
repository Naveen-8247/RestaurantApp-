import './index.css'

const DishItem = ({dish, onIncrement, onDecrement, quantity}) => (
  <div className="dish-card">
    <div className="dish-card-left">
      <div className="dish-type-and-name">
        <div
          className={`dish-type-indicator ${
            dish.dish_Type === 2 ? 'veg' : 'non-veg'
          }`}
        />
        <div>
          <p className="dish-name">{dish.dish_name}</p>
          <p className="dish-price">SAR {dish.dish_price}</p>
          <p className="dish-description">{dish.dish_description}</p>
        </div>
      </div>

      {dish.dish_Availability && (
        <div className="quantity-control">
          <button onClick={onDecrement} type="button" className="qty-btn">
            -
          </button>
          <span className="qty-count">{quantity}</span>
          <button onClick={onIncrement} type="button" className="qty-btn">
            +
          </button>
        </div>
      )}

      {dish.addonCat?.length > 0 && (
        <p className="custom-note">Customizations available</p>
      )}
      {!dish.dish_Availability && (
        <p className="not-available">Not available</p>
      )}
    </div>

    <div className="dish-card-middle">
      <p className="dish-calories">{dish.dish_calories} calories</p>
    </div>

    <div className="dish-card-right">
      <img className="dish-image" src={dish.dish_image} alt={dish.dish_name} />
    </div>
  </div>
)

export default DishItem
