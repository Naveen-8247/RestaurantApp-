import './index.css'

const Navbar = ({cartCount}) => (
  <div className="navbar">
    <h2 className="logo">UNI Resto Cafe</h2>
    <div className="cart-container">
      <div className="order-section">
        <h3 className="text">My Orders</h3>
        <img
          src="https://cdn-icons-png.flaticon.com/512/263/263142.png"
          alt="cart"
          className="cart-icon"
        />
      </div>
      {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
    </div>
  </div>
)

export default Navbar
