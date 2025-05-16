import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaShoppingCart, FaBars, FaSignOutAlt, FaUserCircle } from 'react-icons/fa'
import { logout } from '../redux/actions/authActions'

import './Header.css'

const Header = ({ toggleSidebar }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthenticated, user } = useSelector(state => state.auth)
  const { items } = useSelector(state => state.cart)
  
  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0)
  
  const handleLogout = () => {
    dispatch(logout())
  }
  
  const handleLogin = () => {
    navigate('/login')
  }
  
  return (
    <header className="header">
      <div className="container header-container">
        <div className="header-left">
          <button className="menu-toggle" onClick={toggleSidebar}>
            <FaBars />
          </button>
          <Link to="/" className="logo">
            ShopHub
          </Link>
        </div>
        
        <nav className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/products" className="nav-link">Products</Link>
        </nav>
        
        <div className="header-right">
          {isAuthenticated && (
            <>
              <Link to="/cart" className="cart-icon">
                <FaShoppingCart />
                {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
              </Link>
              
              <div className="user-menu">
                <span className="user-name">
                  <FaUserCircle className="user-icon" />
                  {user?.username}
                </span>
                <div className="user-dropdown">
                  {user?.username === 'mor_2314' && (
                    <Link to="/admin" className="dropdown-item">Admin Panel</Link>
                  )}
                  <button className="dropdown-item logout-btn" onClick={handleLogout}>
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              </div>
            </>
          )}
          
          {!isAuthenticated && (
            <button className="login-btn" onClick={handleLogin}>
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header