import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { createProduct } from '../../redux/actions/productActions'
import { FaArrowLeft } from 'react-icons/fa'

import './ProductForm.css'

const AddProductPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const [product, setProduct] = useState({
    title: '',
    price: '',
    description: '',
    image: '',
    category: ''
  })
  
  const [errors, setErrors] = useState({})
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setProduct(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }
  
  const validateForm = () => {
    const newErrors = {}
    
    if (!product.title.trim()) {
      newErrors.title = 'Title is required'
    }
    
    if (!product.price) {
      newErrors.price = 'Price is required'
    } else if (isNaN(parseFloat(product.price)) || parseFloat(product.price) <= 0) {
      newErrors.price = 'Price must be a positive number'
    }
    
    if (!product.description.trim()) {
      newErrors.description = 'Description is required'
    }
    
    if (!product.image.trim()) {
      newErrors.image = 'Image URL is required'
    } else if (!isValidUrl(product.image)) {
      newErrors.image = 'Image must be a valid URL'
    }
    
    if (!product.category.trim()) {
      newErrors.category = 'Category is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const isValidUrl = (url) => {
    try {
      new URL(url)
      return true
    } catch (e) {
      return false
    }
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      try {
        // Format price as number
        const formattedProduct = {
          ...product,
          price: parseFloat(product.price)
        }
        
        await dispatch(createProduct(formattedProduct))
        navigate('/admin')
      } catch (error) {
        console.error('Error adding product:', error)
      }
    }
  }
  
  return (
    <div className="product-form-page">
      <div className="container">
        <div className="form-navigation">
          <Link to="/admin" className="back-link">
            <FaArrowLeft /> Back to Products
          </Link>
        </div>
        
        <div className="form-container">
          <h1>Add New Product</h1>
          
          <form className="product-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Product Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={product.title}
                onChange={handleChange}
                className={errors.title ? 'error' : ''}
              />
              {errors.title && <span className="error-message">{errors.title}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="price">Price ($) *</label>
              <input
                type="number"
                step="0.01"
                id="price"
                name="price"
                value={product.price}
                onChange={handleChange}
                className={errors.price ? 'error' : ''}
              />
              {errors.price && <span className="error-message">{errors.price}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="category">Category *</label>
              <select
                id="category"
                name="category"
                value={product.category}
                onChange={handleChange}
                className={errors.category ? 'error' : ''}
              >
                <option value="">Select Category</option>
                <option value="electronics">Electronics</option>
                <option value="jewelery">Jewelry</option>
                <option value="men's clothing">Men's Clothing</option>
                <option value="women's clothing">Women's Clothing</option>
              </select>
              {errors.category && <span className="error-message">{errors.category}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="image">Image URL *</label>
              <input
                type="text"
                id="image"
                name="image"
                value={product.image}
                onChange={handleChange}
                className={errors.image ? 'error' : ''}
                placeholder="https://example.com/image.jpg"
              />
              {errors.image && <span className="error-message">{errors.image}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                value={product.description}
                onChange={handleChange}
                rows="5"
                className={errors.description ? 'error' : ''}
              ></textarea>
              {errors.description && <span className="error-message">{errors.description}</span>}
            </div>
            
            <div className="form-actions">
              <button type="button" className="cancel-btn" onClick={() => navigate('/admin')}>
                Cancel
              </button>
              <button type="submit" className="submit-btn">
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddProductPage