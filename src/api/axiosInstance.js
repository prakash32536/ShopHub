import axios from 'axios'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import store from '../redux/store'
import { startLoading, stopLoading } from '../redux/actions/uiActions'

const API_URL = 'https://fakestoreapi.com'

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor
axiosInstance.interceptors.request.use(
  config => {
    // Dispatch loading action
    store.dispatch(startLoading())
    
    // Get auth token from Redux store
    const state = store.getState()
    const token = state.auth.token
    
    // If token exists, add to request headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    return config
  },
  error => {
    store.dispatch(stopLoading())
    return Promise.reject(error)
  }
)

// Response interceptor
axiosInstance.interceptors.response.use(
  response => {
    // Stop loading when response received
    store.dispatch(stopLoading())
    return response
  },
  error => {
    store.dispatch(stopLoading())
    
    // Handle error responses
    const { response } = error
    
    if (response) {
      // Server responded with an error status code
      switch (response.status) {
        case 401:
          // Unauthorized - show error and redirect to login
          Swal.fire({
            title: 'Session Expired',
            text: 'Please log in again to continue.',
            icon: 'warning',
            confirmButtonColor: '#3B82F6'
          }).then(() => {
            // Handle logout or redirect to login
            window.location.href = '/login'
          })
          break
          
        case 403:
          toast.error('You do not have permission to perform this action')
          break
          
        case 404:
          toast.error('The requested resource was not found')
          break
          
        case 500:
          toast.error('Server error. Please try again later.')
          break
          
        default:
          toast.error(response.data?.message || 'Something went wrong')
      }
    } else {
      // Network error or client-side error
      toast.error('Network error. Please check your connection.')
    }
    
    return Promise.reject(error)
  }
)

export default axiosInstance