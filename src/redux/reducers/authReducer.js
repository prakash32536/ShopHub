import { 
  LOGIN_REQUEST, 
  LOGIN_SUCCESS, 
  LOGIN_FAILURE, 
  LOGOUT 
} from '../types'

const initialState = {
  token: localStorage.getItem('token') || null,
  user: JSON.parse(localStorage.getItem('user')) || null,
  loading: false,
  error: null,
  isAuthenticated: !!localStorage.getItem('token')
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      }
      
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.payload.token,
        user: action.payload.user,
        isAuthenticated: true,
        error: null
      }
      
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
      
    case LOGOUT:
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false
      }
      
    default:
      return state
  }
}

export default authReducer