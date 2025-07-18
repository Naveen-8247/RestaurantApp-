import './index.css'

const DishItem = ({dish, quantity, onIncrement, onDecrement}) => {
  const {
    dish_name: dishName,
    dish_image: dishImage,
    dish_currency: dishCurrency,
    dish_price: dishPrice,
    dish_description: dishDescription,
    dish_calories: dishCalories,
    dish_Availability: dishAvailability,
    addonCat = [],
  } = dish

  const showControls = quantity > 0

  return (
    <div className="dish-card" data-testid="dish-item">
      <div className="dish-details">
        <h1>{dishName}</h1>
        <p>{`${dishCurrency} ${dishPrice}`}</p>
        <p>{dishDescription}</p>
        <p>{`${dishCalories} calories`}</p>

        {!dishAvailability && <p className="not-available">Not available</p>}
        {addonCat.length > 0 && (
          <p className="customizable">Customizations available</p>
        )}

        {dishAvailability && (
          <>
            {showControls ? (
              <div className="quantity-controller">
                <button type="button" onClick={onDecrement}>
                  -
                </button>
                <p>{quantity}</p>
                <button type="button" onClick={onIncrement}>
                  +
                </button>
              </div>
            ) : (
              <button type="button" className="add-btn" onClick={onIncrement}>
                ADD TO CART
              </button>
            )}
          </>
        )}
      </div>

      <img src={dishImage} alt={dishName} className="dish-image" />
    </div>
  )
}

export default DishItem
