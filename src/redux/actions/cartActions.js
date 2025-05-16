import {
  FETCH_CART_REQUEST,
  FETCH_CART_SUCCESS,
  FETCH_CART_FAILURE,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_ITEM_QUANTITY,
  CLEAR_CART
} from '../types'
import { getUserCart, updateCart, createCart } from '../../api/cartApi'
import { toast } from 'react-toastify'

// Fetch user's cart
export const fetchCart = (userId) => async (dispatch) => {
  dispatch({ type: FETCH_CART_REQUEST })
  
  try {
    const data = await getUserCart(userId)
    
    // For this demo, we'll map the API response to our cart format
    const cartItems = []
    
    // If user has cart(s)
    if (data && data.length > 0) {
      // Use the most recent cart
      const latestCart = data[0]
      
      // Map products to our cart items format
      latestCart.products.forEach(product => {
        cartItems.push({
          productId: product.productId,
          quantity: product.quantity
        })
      })
      
      dispatch({
        type: FETCH_CART_SUCCESS,
        payload: {
          items: cartItems,
          cartId: latestCart.id
        }
      })
    } else {
      // User has no cart
      dispatch({
        type: FETCH_CART_SUCCESS,
        payload: {
          items: [],
          cartId: null
        }
      })
    }
    
    return data
  } catch (error) {
    dispatch({
      type: FETCH_CART_FAILURE,
      payload: error.message
    })
    
    toast.error('Failed to fetch cart')
    throw error
  }
}

// Add item to cart
export const addToCart = (product, quantity = 1) => async (dispatch, getState) => {
  try {
    // Add to Redux store first for immediate UI update
    dispatch({
      type: ADD_TO_CART,
      payload: {
        productId: product.id,
        product,
        quantity
      }
    })
    
    // Get current cart state
    const { auth, cart } = getState()
    
    // Create cart payload
    const cartData = {
      userId: auth.user.id,
      date: new Date().toISOString().split('T')[0],
      products: cart.items.map(item => ({
        productId: item.productId,
        quantity: item.quantity
      }))
    }
    
    // Update or create cart in API
    if (cart.cartId) {
      await updateCart(cart.cartId, cartData)
    } else {
      await createCart(cartData)
    }
    
    toast.success('Added to cart')
  } catch (error) {
    toast.error('Failed to update cart on server')
    console.error('Cart update error:', error)
  }
}

// Remove item from cart
export const removeFromCart = (productId) => async (dispatch, getState) => {
  try {
    // Remove from Redux store
    dispatch({
      type: REMOVE_FROM_CART,
      payload: productId
    })
    
    // Get current cart state
    const { auth, cart } = getState()
    
    // Update cart in API
    if (cart.cartId) {
      const cartData = {
        userId: auth.user.id,
        date: new Date().toISOString().split('T')[0],
        products: cart.items.map(item => ({
          productId: item.productId,
          quantity: item.quantity
        }))
      }
      
      await updateCart(cart.cartId, cartData)
    }
    
    toast.success('Removed from cart')
  } catch (error) {
    toast.error('Failed to update cart on server')
    console.error('Cart update error:', error)
  }
}

// Update item quantity
export const updateCartItemQuantity = (productId, quantity) => async (dispatch, getState) => {
  try {
    // Update in Redux store
    dispatch({
      type: UPDATE_CART_ITEM_QUANTITY,
      payload: { productId, quantity }
    })
    
    // Get current cart state
    const { auth, cart } = getState()
    
    // Update cart in API
    if (cart.cartId) {
      const cartData = {
        userId: auth.user.id,
        date: new Date().toISOString().split('T')[0],
        products: cart.items.map(item => ({
          productId: item.productId,
          quantity: item.quantity
        }))
      }
      
      await updateCart(cart.cartId, cartData)
    }
  } catch (error) {
    toast.error('Failed to update cart on server')
    console.error('Cart update error:', error)
  }
}

// Clear entire cart
export const clearCart = () => async (dispatch, getState) => {
  try {
    // Clear Redux store
    dispatch({ type: CLEAR_CART })
    
    // Get current cart state
    const { auth, cart } = getState()
    
    // Update cart in API
    if (cart.cartId) {
      const cartData = {
        userId: auth.user.id,
        date: new Date().toISOString().split('T')[0],
        products: []
      }
      
      await updateCart(cart.cartId, cartData)
    }
    
    toast.success('Cart cleared')
  } catch (error) {
    toast.error('Failed to update cart on server')
    console.error('Cart update error:', error)
  }
}