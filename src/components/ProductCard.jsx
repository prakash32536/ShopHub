import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../redux/actions/cartActions'

import './ProductCard.css'

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector(state => state.auth)
  
  const handleAddToCart = (e) => {
    e.preventDefault()
    
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      window.location.href = '/login'
      return
    }
    
    dispatch(addToCart(product, 1))
  }
  
  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`} className="product-link">
        <div className="product-image-container">
          <img 
            src={product.image} 
            alt={product.title} 
            className="product-image" 
          />
        </div>
        
        <div className="product-info">
          <h3 className="product-title">{product.title}</h3>
          
          <div className="product-category">
            {product.category}
          </div>
          
          <div className="product-price">
            ${product.price.toFixed(2)}
          </div>
          
          <div className="product-rating">
            <span className="rating-stars">
              {'★'.repeat(Math.round(product.rating?.rate || 0))}
              {'☆'.repeat(5 - Math.round(product.rating?.rate || 0))}
            </span>
            <span className="rating-count">
              ({product.rating?.count || 0} reviews)
            </span>
          </div>
        </div>
      </Link>
      
      <button 
        className="add-to-cart-btn" 
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  )
}

export default ProductCard