import { 
  LOGIN_REQUEST, 
  LOGIN_SUCCESS, 
  LOGIN_FAILURE, 
  LOGOUT 
} from '../types'
import { loginUser, verifyToken } from '../../api/authApi'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

// Login user
export const login = (credentials) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST })
  
  try {
    const data = await loginUser(credentials)
    
    const user = {
      id: 1, // Using a mock ID since the API doesn't return user details
      username: credentials.username
    }
    
    // Save to localStorage
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(user))
    
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { token: data.token, user }
    })
    
    toast.success('Login successful!')
    
    return data
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response?.data?.message || 'Login failed'
    })
    
    toast.error(error.response?.data?.message || 'Login failed')
    throw error
  }
}

// Logout user
export const logout = () => (dispatch) => {
  Swal.fire({
    title: 'Logging out',
    text: 'Are you sure you want to log out?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3B82F6',
    cancelButtonColor: '#EF4444',
    confirmButtonText: 'Yes, log out'
  }).then((result) => {
    if (result.isConfirmed) {
      // Remove from localStorage
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      
      dispatch({ type: LOGOUT })
      
      toast.success('Logged out successfully')
    }
  })
}

// Check if user is authenticated
export const checkAuthState = () => async (dispatch) => {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user'))
  
  if (!token || !user) {
    dispatch({ type: LOGOUT })
    return
  }
  
  try {
    // Verify token is valid
    const isValid = await verifyToken(token)
    
    if (isValid) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { token, user }
      })
    } else {
      // Token is invalid
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      
      dispatch({ type: LOGOUT })
    }
  } catch (error) {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    
    dispatch({ type: LOGOUT })
  }
}