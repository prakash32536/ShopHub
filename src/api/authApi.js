import axiosInstance from './axiosInstance'

// Login user
export const loginUser = async (credentials) => {
  try {
    const response = await axiosInstance.post('/auth/login', credentials)
    return response.data
  } catch (error) {
    throw error
  }
}

// For demo purposes - in a real app, this would verify the token with the server
export const verifyToken = async (token) => {
  // This is a mock function since the fake API doesn't have token verification
  // In a real app, you would call an endpoint to verify the token
  
  // For this demo, we'll just return true if the token exists
  return !!token
}