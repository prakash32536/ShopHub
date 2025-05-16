import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const AdminRoute = () => {
  const { isAuthenticated, user } = useSelector(state => state.auth)
  
  // Check if user is authenticated
  if (!isAuthenticated) {
    toast.error('Please login to continue')
    return <Navigate to="/login" replace />
  }
  
  // Check if user is admin (for demo, we're using the test user)
  if (user?.username !== 'mor_2314') {
    toast.error('You do not have permission to access this page')
    return <Navigate to="/" replace />
  }
  
  return <Outlet />
}

export default AdminRoute