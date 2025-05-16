import axiosInstance from './axiosInstance'

// Get user cart
export const getUserCart = async (userId) => {
  try {
    const response = await axiosInstance.get(`/carts/user/${userId}`)
    return response.data
  } catch (error) {
    throw error
  }
}

// Update cart
export const updateCart = async (cartId, cartData) => {
  try {
    const response = await axiosInstance.put(`/carts/${cartId}`, cartData)
    return response.data
  } catch (error) {
    throw error
  }
}

// Create new cart
export const createCart = async (cartData) => {
  try {
    const response = await axiosInstance.post('/carts', cartData)
    return response.data
  } catch (error) {
    throw error
  }
}