import './index.css'

const Navbar = ({cartCount}) => (
  <div className="navbar">
    <h1 className="logo">UNI Resto Cafe</h1>
    <div className="cart-container">
      <p className="my-orders">My Orders</p>
      <div className="icon-wrapper">
        <img
          src="https://cdn-icons-png.flaticon.com/512/263/263142.png"
          alt="cart"
          className="cart-icon"
        />
        <span className="cart-count">{cartCount}</span>
      </div>
    </div>
  </div>
)

export default Navbar
