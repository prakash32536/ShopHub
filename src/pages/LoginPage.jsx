import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../redux/actions/authActions'

import './LoginPage.css'

const LoginPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error } = useSelector(state => state.auth)
  
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      await dispatch(login(credentials))
      navigate('/')
    } catch (error) {
      // Error is handled in the action and displayed via toast
      console.error('Login error:', error)
    }
  }
  
  
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>Welcome to ShopHub</h1>
          <p>Please login to continue</p>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              required
              autoComplete="username"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
            />
          </div>
          
          <div className="login-actions">
            <button 
              type="submit" 
              className="login-button"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
            
          </div>
        </form>
        
        <div className="login-footer">
          <p>
            Don't have an account? <Link to="/">Browse as guest</Link>
          </p>
         
        </div>
      </div>
    </div>
  )
}

export default LoginPage