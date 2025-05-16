import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FaTimes, FaHome, FaShoppingCart, FaBoxOpen, FaUserCog } from 'react-icons/fa'

import './Sidebar.css'

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { isAuthenticated, user } = useSelector(state => state.auth)
  const isAdmin = isAuthenticated && user?.username === 'mor_2314'
  
  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <h3>Menu</h3>
        <button className="close-sidebar" onClick={toggleSidebar}>
          <FaTimes />
        </button>
      </div>
      
      <div className="sidebar-content">
        <nav className="sidebar-nav">
          <Link to="/" className="sidebar-link" onClick={toggleSidebar}>
            <FaHome className="sidebar-icon" />
            <span>Home</span>
          </Link>
          
          <Link to="/products" className="sidebar-link" onClick={toggleSidebar}>
            <FaBoxOpen className="sidebar-icon" />
            <span>Products</span>
          </Link>
          
          {isAuthenticated && (
            <Link to="/cart" className="sidebar-link" onClick={toggleSidebar}>
              <FaShoppingCart className="sidebar-icon" />
              <span>Cart</span>
            </Link>
          )}
          
          {isAdmin && (
            <Link to="/admin" className="sidebar-link" onClick={toggleSidebar}>
              <FaUserCog className="sidebar-icon" />
              <span>Admin Panel</span>
            </Link>
          )}
        </nav>
      </div>
      
      <div className="sidebar-footer">
        <p>© 2025 ShopHub</p>
      </div>
    </aside>
  )
}

export default Sidebar