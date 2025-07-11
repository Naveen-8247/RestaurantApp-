import './index.css'

const DishItem = ({dish, onIncrement, onDecrement, quantity}) => (
  <div className="dish-card" data-testid="dishItem">
    <div className="dish-card-left">
      <div className="dish-type-and-name">
        <div
          className={`dish-type-indicator ${
            dish.dish_Type === 2 ? 'veg' : 'non-veg'
          }`}
        />
        <h1 className="dish-name">{dish.dish_name}</h1>
      </div>

      <p className="dish-price">
        {dish.dish_currency} {dish.dish_price}
      </p>
      <p className="dish-description">{dish.dish_description}</p>

      {dish.dish_Availability ? (
        <div className="quantity-control">
          <button onClick={onDecrement} type="button" className="qty-btn">
            -
          </button>
          <p className="qty-count">{quantity}</p>
          <button onClick={onIncrement} type="button" className="qty-btn">
            +
          </button>
        </div>
      ) : (
        <p className="not-available">Not available</p>
      )}

      {dish.addonCat?.length > 0 && (
        <p className="custom-note">Customizations available</p>
      )}

      <p className="dish-calories">{dish.dish_calories} calories</p>
    </div>

    <div className="dish-card-right">
      <img className="dish-image" src={dish.dish_image} alt={dish.dish_name} />
    </div>
  </div>
)

export default DishItem
