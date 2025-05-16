import axiosInstance from './axiosInstance'

// Get all products
export const getAllProducts = async () => {
  try {
    const response = await axiosInstance.get('/products')
    return response.data
  } catch (error) {
    throw error
  }
}

// Get single product
export const getProductById = async (id) => {
  try {
    const response = await axiosInstance.get(`/products/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}

// Add a new product
export const addProduct = async (productData) => {
  try {
    const response = await axiosInstance.post('/products', productData)
    return response.data
  } catch (error) {
    throw error
  }
}

// Update a product
export const updateProduct = async (id, productData) => {
  try {
    const response = await axiosInstance.put(`/products/${id}`, productData)
    return response.data
  } catch (error) {
    throw error
  }
}

// Delete a product
export const deleteProduct = async (id) => {
  try {
    const response = await axiosInstance.delete(`/products/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}