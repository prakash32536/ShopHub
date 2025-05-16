import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCT_DETAIL_REQUEST,
  FETCH_PRODUCT_DETAIL_SUCCESS,
  FETCH_PRODUCT_DETAIL_FAILURE,
  ADD_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_SUCCESS
} from '../types'

const initialState = {
  products: [],
  currentProduct: null,
  loading: false,
  error: null
}

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
    case FETCH_PRODUCT_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      }
      
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
        error: null
      }
      
    case FETCH_PRODUCT_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        currentProduct: action.payload,
        error: null
      }
      
    case FETCH_PRODUCTS_FAILURE:
    case FETCH_PRODUCT_DETAIL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
      
    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        products: [...state.products, action.payload]
      }
      
    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        products: state.products.map(product => 
          product.id === action.payload.id ? action.payload : product
        ),
        currentProduct: action.payload
      }
      
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.payload)
      }
      
    default:
      return state
  }
}

export default productReducer