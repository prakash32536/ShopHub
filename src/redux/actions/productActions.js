import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCT_DETAIL_REQUEST,
  FETCH_PRODUCT_DETAIL_SUCCESS,
  FETCH_PRODUCT_DETAIL_FAILURE,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAILURE,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE
} from '../types'
import { 
  getAllProducts, 
  getProductById, 
  addProduct, 
  updateProduct, 
  deleteProduct 
} from '../../api/productApi'
import { toast } from 'react-toastify'

// Fetch all products
export const fetchProducts = () => async (dispatch) => {
  dispatch({ type: FETCH_PRODUCTS_REQUEST })
  
  try {
    const data = await getAllProducts()
    
    dispatch({
      type: FETCH_PRODUCTS_SUCCESS,
      payload: data
    })
    
    return data
  } catch (error) {
    dispatch({
      type: FETCH_PRODUCTS_FAILURE,
      payload: error.message
    })
    
    toast.error('Failed to fetch products')
    throw error
  }
}

// Fetch single product
export const fetchProductById = (id) => async (dispatch) => {
  dispatch({ type: FETCH_PRODUCT_DETAIL_REQUEST })
  
  try {
    const data = await getProductById(id)
    
    dispatch({
      type: FETCH_PRODUCT_DETAIL_SUCCESS,
      payload: data
    })
    
    return data
  } catch (error) {
    dispatch({
      type: FETCH_PRODUCT_DETAIL_FAILURE,
      payload: error.message
    })
    
    toast.error('Failed to fetch product details')
    throw error
  }
}

// Add new product
export const createProduct = (productData) => async (dispatch) => {
  dispatch({ type: ADD_PRODUCT_REQUEST })
  
  try {
    const data = await addProduct(productData)
    
    dispatch({
      type: ADD_PRODUCT_SUCCESS,
      payload: data
    })
    
    toast.success('Product added successfully')
    return data
  } catch (error) {
    dispatch({
      type: ADD_PRODUCT_FAILURE,
      payload: error.message
    })
    
    toast.error('Failed to add product')
    throw error
  }
}

// Update product
export const editProduct = (id, productData) => async (dispatch) => {
  dispatch({ type: UPDATE_PRODUCT_REQUEST })
  
  try {
    const data = await updateProduct(id, productData)
    
    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data
    })
    
    toast.success('Product updated successfully')
    return data
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAILURE,
      payload: error.message
    })
    
    toast.error('Failed to update product')
    throw error
  }
}

// Delete product
export const removeProduct = (id) => async (dispatch) => {
  dispatch({ type: DELETE_PRODUCT_REQUEST })
  
  try {
    await deleteProduct(id)
    
    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: id
    })
    
    toast.success('Product deleted successfully')
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAILURE,
      payload: error.message
    })
    
    toast.error('Failed to delete product')
    throw error
  }
}