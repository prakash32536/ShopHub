import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchProducts } from '../redux/actions/productActions'
import ProductCard from '../components/ProductCard'

import './HomePage.css'

const HomePage = () => {
  const dispatch = useDispatch()
  const { products, loading, error } = useSelector(state => state.products)
  
  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])
  
  // Get featured products (first 4)
  const featuredProducts = products.slice(0, 4)
  
  // Group products by category
  const categories = products.reduce((acc, product) => {
    const category = product.category
    
    if (!acc[category]) {
      acc[category] = []
    }
    
    acc[category].push(product)
    return acc
  }, {})
  
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to ShopHub</h1>
          <p>Discover amazing products at unbeatable prices!</p>
          <Link to="/products" className="shop-now-btn">
            Shop Now
          </Link>
        </div>
      </section>
      
      <section className="featured-section">
        <div className="container">
          <h2 className="section-title">Featured Products</h2>
          
          {loading && <p>Loading featured products...</p>}
          
          {error && <p className="error-message">Error loading products: {error}</p>}
          
          {!loading && !error && (
            <div className="featured-grid">
              {featuredProducts.map(product => (
                <div className="featured-item" key={product.id}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
          
          <div className="view-all">
            <Link to="/products" className="view-all-link">
              View All Products
            </Link>
          </div>
        </div>
      </section>
      
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Shop by Category</h2>
          
          <div className="categories-grid">
            {Object.keys(categories).map(category => (
              <Link 
                to={`/products?category=${category}`} 
                className="category-card" 
                key={category}
              >
                <div className="category-image">
                  <img 
                    src={categories[category][0]?.image} 
                    alt={category} 
                  />
                </div>
                <h3 className="category-title">{category}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
    </div>
  )
}

export default HomePage