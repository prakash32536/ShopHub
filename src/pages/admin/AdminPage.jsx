import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts, removeProduct } from '../../redux/actions/productActions'
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa'
import Swal from 'sweetalert2'

import './AdminPage.css'

const AdminPage = () => {
  const dispatch = useDispatch()
  const { products, loading, error } = useSelector(state => state.products)
  
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredProducts, setFilteredProducts] = useState([])
  
  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])
  
  useEffect(() => {
    setFilteredProducts(
      products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  }, [products, searchTerm])
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }
  
  const handleDeleteProduct = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this product!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3B82F6',
      cancelButtonColor: '#EF4444',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeProduct(id))
      }
    })
  }
  
  return (
    <div className="admin-page">
      <div className="container">
        <div className="admin-header">
          <h1>Product Management</h1>
          <Link to="/admin/add-product" className="add-product-btn">
            <FaPlus /> Add New Product
          </Link>
        </div>
        
        <div className="admin-controls">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
        
        {loading && <p className="loading-message">Loading products...</p>}
        
        {error && <p className="error-message">Error: {error}</p>}
        
        {!loading && !error && (
          <div className="products-table-container">
            <table className="products-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map(product => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>
                      <div className="product-image">
                        <img src={product.image} alt={product.title} />
                      </div>
                    </td>
                    <td>{product.title}</td>
                    <td>{product.category}</td>
                    <td>${product.price.toFixed(2)}</td>
                    <td>
                      <div className="action-buttons">
                        <Link 
                          to={`/admin/edit-product/${product.id}`}
                          className="edit-btn"
                          title="Edit product"
                        >
                          <FaEdit />
                        </Link>
                        <button
                          className="delete-btn"
                          onClick={() => handleDeleteProduct(product.id)}
                          title="Delete product"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                
                {filteredProducts.length === 0 && (
                  <tr>
                    <td colSpan="6" className="no-products">
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminPage