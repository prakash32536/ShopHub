import {
  FETCH_CART_REQUEST,
  FETCH_CART_SUCCESS,
  FETCH_CART_FAILURE,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_ITEM_QUANTITY,
  CLEAR_CART
} from '../types'

const initialState = {
  items: [],
  loading: false,
  error: null,
  cartId: null
}

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CART_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      }
      
    case FETCH_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.items,
        cartId: action.payload.cartId,
        error: null
      }
      
    case FETCH_CART_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
      
    case ADD_TO_CART:
      // Check if item already exists
      const existingItemIndex = state.items.findIndex(
        item => item.productId === action.payload.productId
      )
      
      if (existingItemIndex !== -1) {
        // Item exists, update quantity
        const updatedItems = [...state.items]
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + action.payload.quantity
        }
        
        return {
          ...state,
          items: updatedItems
        }
      } else {
        // Item doesn't exist, add new item
        return {
          ...state,
          items: [...state.items, action.payload]
        }
      }
      
    case REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter(item => item.productId !== action.payload)
      }
      
    case UPDATE_CART_ITEM_QUANTITY:
      return {
        ...state,
        items: state.items.map(item => 
          item.productId === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      }
      
    case CLEAR_CART:
      return {
        ...state,
        items: []
      }
      
    default:
      return state
  }
}

export default cartReducer