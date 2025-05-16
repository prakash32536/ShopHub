import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { fetchProducts } from '../redux/actions/productActions'
import ProductCard from '../components/ProductCard'

import './ProductsPage.css'

const ProductsPage = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const { products, loading, error } = useSelector(state => state.products)
  
  const [filteredProducts, setFilteredProducts] = useState([])
  const [filters, setFilters] = useState({
    category: '',
    search: ''
  })
  const [sortOption, setSortOption] = useState('default')
  
  // Parse URL query params
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const categoryParam = queryParams.get('category')
    
    if (categoryParam) {
      setFilters(prev => ({ ...prev, category: categoryParam }))
    }
  }, [location.search])
  
  // Fetch products
  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])
  
  // Apply filters and sorting
  useEffect(() => {
    let result = [...products]
    
    // Apply category filter
    if (filters.category) {
      result = result.filter(product => 
        product.category === filters.category
      )
    }
    
    
    // Apply search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      result = result.filter(product => 
        product.title.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
      )
    }
    
    // Apply sorting
    switch (sortOption) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price)
        break
        
      case 'price-high':
        result.sort((a, b) => b.price - a.price)
        break
        
      case 'rating':
        result.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0))
        break
        
      default:
        // Default sorting (no specific order)
        break
    }
    
    setFilteredProducts(result)
  }, [products, filters, sortOption])
  
  // Get unique categories from products
  const categories = [...new Set(products.map(product => product.category))]
  
  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  // Handle sort change
  const handleSortChange = (e) => {
    setSortOption(e.target.value)
  }
  
  // Clear all filters
  const clearFilters = () => {
    setFilters({
      category: '',
      search: ''
    })
    setSortOption('default')
  }
  
  return (
    <div className="products-page">
      <div className="container">
        <h1 className="page-title">All Products</h1>
        
        <div className="products-layout">
          <aside className="filters-sidebar">
            <div className="filter-section">
              <h3>Search</h3>
              <input
                type="text"
                name="search"
                placeholder="Search products..."
                value={filters.search}
                onChange={handleFilterChange}
                className="search-input"
              />
            </div>
            
            <div className="filter-section">
              <h3>Categories</h3>
              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="filter-select"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            
            
            <button 
              className="clear-filters-btn"
              onClick={clearFilters}
            >
              Clear Filters
            </button>
          </aside>
          
          <div className="products-content">
            <div className="products-header">
              <div className="products-count">
                {filteredProducts.length} products found
              </div>
              
              <div className="sort-options">
                <label htmlFor="sort">Sort by:</label>
                <select
                  id="sort"
                  value={sortOption}
                  onChange={handleSortChange}
                  className="sort-select"
                >
                  <option value="default">Default</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
            </div>
            
            {loading && <p className="loading-message">Loading products...</p>}
            
            {error && <p className="error-message">Error loading products: {error}</p>}
            
            {!loading && !error && filteredProducts.length === 0 && (
              <p className="no-products-message">
                No products found matching your criteria. Try adjusting your filters.
              </p>
            )}
            
            <div className="products-grid">
              {filteredProducts.map(product => (
                <div className="product-item" key={product.id}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductsPage