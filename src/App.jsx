import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import RootLayout from './layouts/RootLayout'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import AdminPage from './pages/admin/AdminPage'
import AddProductPage from './pages/admin/AddProductPage'
import EditProductPage from './pages/admin/EditProductPage'
import NotFoundPage from './pages/NotFoundPage'
import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from './components/AdminRoute'
import GlobalLoader from './components/GlobalLoader'
import { checkAuthState } from './redux/actions/authActions'

function App() {
  const dispatch = useDispatch()
  const { loading } = useSelector(state => state.ui)
  
  useEffect(() => {
    dispatch(checkAuthState())
  }, [dispatch])

  return (
    <>
      {loading && <GlobalLoader />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        <Route element={<RootLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path="/cart" element={<CartPage />} />
          </Route>
          
          <Route path="/admin" element={<AdminRoute />}>
            <Route index element={<AdminPage />} />
            <Route path="add-product" element={<AddProductPage />} />
            <Route path="edit-product/:id" element={<EditProductPage />} />
          </Route>
          
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App