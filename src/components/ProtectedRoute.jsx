import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const ProtectedRoute = () => {
  const { isAuthenticated } = useSelector(state => state.auth)
  
  if (!isAuthenticated) {
    toast.error('Please login to continue')
    return <Navigate to="/login" replace />
  }
  
  return <Outlet />
}

export default ProtectedRoute