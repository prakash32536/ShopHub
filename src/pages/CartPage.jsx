import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../redux/actions/productActions'
import { 
  fetchCart,
  removeFromCart, 
  updateCartItemQuantity, 
  clearCart 
} from '../redux/actions/cartActions'
import { FaTrash, FaArrowLeft, FaShoppingCart } from 'react-icons/fa'
import './CartPage.css'

const CartPage = () => {
  const dispatch = useDispatch()
  const { items } = useSelector(state => state.cart)
  const { products } = useSelector(state => state.products)
  const { user } = useSelector(state => state.auth)
  
  useEffect(() => {
    // Fetch cart data when component mounts and user is logged in
    if (user) {
      dispatch(fetchCart(user.id))
    }
    
    // Make sure products are loaded
    if (products.length === 0) {
      dispatch(fetchProducts())
    }
  }, [dispatch, products.length, user])
  
  // Get product details for cart items
  const cartItemsWithDetails = items.map(item => {
    const product = products.find(p => p.id === item.productId)
    return {
      ...item,
      product
    }
  })
  
  // Calculate cart total
  const cartTotal = cartItemsWithDetails.reduce((total, item) => {
    if (item.product) {
      return total + (item.product.price * item.quantity)
    }
    return total
  }, 0)
  
  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId))
  }
  
  const handleQuantityChange = (productId, quantity) => {
    dispatch(updateCartItemQuantity(productId, quantity))
  }
  
  const handleClearCart = () => {
    dispatch(clearCart())
  }
  
  const handleCheckout = () => {
    // For demo purposes
    alert('Checkout functionality would be implemented here!')
  }
  
  if (items.length === 0) {
    return (
      <div className="empty-cart">
        <div className="empty-cart-icon">
          <FaShoppingCart />
        </div>
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added any products to your cart yet.</p>
        <Link to="/products" className="continue-shopping-btn">
          Start Shopping
        </Link>
      </div>
    )
  }
  
  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="page-title">Your Shopping Cart</h1>
        
        <div className="cart-navigation">
          <Link to="/products" className="back-link">
            <FaArrowLeft /> Continue Shopping
          </Link>
        </div>
        
        <div className="cart-container">
          <div className="cart-items">
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItemsWithDetails.map(item => (
                  <tr key={item.productId} className="cart-item">
                    <td className="product-cell">
                      {item.product ? (
                        <div className="cart-product">
                          <div className="cart-product-image">
                            <img 
                              src={item.product.image} 
                              alt={item.product.title} 
                            />
                          </div>
                          <div className="cart-product-info">
                            <h3 className="cart-product-title">
                              <Link to={`/products/${item.productId}`}>
                                {item.product.title}
                              </Link>
                            </h3>
                            <div className="cart-product-category">
                              {item.product.category}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div>Loading product...</div>
                      )}
                    </td>
                    <td className="price-cell">
                      {item.product ? `$${item.product.price.toFixed(2)}` : '-'}
                    </td>
                    <td className="quantity-cell">
                      <div className="quantity-control">
                        <button 
                          className="quantity-btn"
                          onClick={() => handleQuantityChange(
                            item.productId, 
                            Math.max(1, item.quantity - 1)
                          )}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="quantity-value">{item.quantity}</span>
                        <button 
                          className="quantity-btn"
                          onClick={() => handleQuantityChange(
                            item.productId, 
                            item.quantity + 1
                          )}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="total-cell">
                      {item.product 
                        ? `$${(item.product.price * item.quantity).toFixed(2)}` 
                        : '-'
                      }
                    </td>
                    <td className="action-cell">
                      <button 
                        className="remove-btn"
                        onClick={() => handleRemoveItem(item.productId)}
                        title="Remove item"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div className="cart-actions">
              <button 
                className="clear-cart-btn"
                onClick={handleClearCart}
              >
                Clear Cart
              </button>
            </div>
          </div>
          
          <div className="cart-summary">
            <h2 className="summary-title">Order Summary</h2>
            
            <div className="summary-item">
              <span className="summary-label">Subtotal</span>
              <span className="summary-value">${cartTotal.toFixed(2)}</span>
            </div>
            
            <div className="summary-item">
              <span className="summary-label">Shipping</span>
              <span className="summary-value">Free</span>
            </div>
            
            <div className="summary-item">
              <span className="summary-label">Tax</span>
              <span className="summary-value">${(cartTotal * 0.1).toFixed(2)}</span>
            </div>
            
            <div className="summary-total">
              <span className="total-label">Total</span>
              <span className="total-value">
                ${(cartTotal + (cartTotal * 0.1)).toFixed(2)}
              </span>
            </div>
            
            <button 
              className="checkout-btn"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage