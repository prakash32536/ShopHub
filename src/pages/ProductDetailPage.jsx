import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductById } from '../redux/actions/productActions'
import { addToCart } from '../redux/actions/cartActions'
import { FaArrowLeft, FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'

import './ProductDetailPage.css'

const ProductDetailPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { currentProduct, loading, error } = useSelector(state => state.products)
  const { isAuthenticated } = useSelector(state => state.auth)
  
  const [quantity, setQuantity] = useState(1)
  
  useEffect(() => {
    dispatch(fetchProductById(id))
  }, [dispatch, id])
  
  const handleAddToCart = () => {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      window.location.href = '/login'
      return
    }
    
    dispatch(addToCart(currentProduct, quantity))
  }
  
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value)
    setQuantity(value > 0 ? value : 1)
  }
  
  // Generate star rating
  const renderRating = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="star-icon" />)
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="star-icon" />)
      } else {
        stars.push(<FaRegStar key={i} className="star-icon" />)
      }
    }
    
    return stars
  }
  
  if (loading) {
    return (
      <div className="loading-container">
        <p>Loading product details...</p>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="error-container">
        <p>Error loading product: {error}</p>
        <Link to="/products" className="back-link">
          <FaArrowLeft /> Back to Products
        </Link>
      </div>
    )
  }
  
  if (!currentProduct) {
    return (
      <div className="not-found-container">
        <p>Product not found</p>
        <Link to="/products" className="back-link">
          <FaArrowLeft /> Back to Products
        </Link>
      </div>
    )
  }
  
  return (
    <div className="product-detail-page">
      <div className="container">
        <div className="product-navigation">
          <Link to="/products" className="back-link">
            <FaArrowLeft /> Back to Products
          </Link>
        </div>
        
        <div className="product-detail-container">
          <div className="product-image-section">
            <div className="product-image-wrapper">
              <img 
                src={currentProduct.image} 
                alt={currentProduct.title} 
                className="product-detail-image" 
              />
            </div>
          </div>
          
          <div className="product-info-section">
            <div className="product-category">{currentProduct.category}</div>
            
            <h1 className="product-title">{currentProduct.title}</h1>
            
            <div className="product-rating">
              <div className="rating-stars">
                {renderRating(currentProduct.rating?.rate || 0)}
              </div>
              <span className="rating-count">
                {currentProduct.rating?.count || 0} reviews
              </span>
            </div>
            
            <div className="product-price">
              ${currentProduct.price.toFixed(2)}
            </div>
            
            <div className="product-description">
              <h3>Description</h3>
              <p>{currentProduct.description}</p>
            </div>
            
            <div className="product-actions">
              <div className="quantity-selector">
                <label htmlFor="quantity">Quantity:</label>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                />
              </div>
              
              <button 
                className="add-to-cart-button"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
            
            <div className="additional-info">
              <div className="info-item">
                <span className="info-label">Availability:</span>
                <span className="info-value">In Stock</span>
              </div>
              
              <div className="info-item">
                <span className="info-label">Product ID:</span>
                <span className="info-value">{currentProduct.id}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage