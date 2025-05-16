import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'
import { useState } from 'react'

import './RootLayout.css'

const RootLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }
  
  return (
    <div className="root-layout">
      <Header toggleSidebar={toggleSidebar} />
      
      <div className="content-container">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        
        <main className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
          <Outlet />
        </main>
      </div>
      
      <Footer />
    </div>
  )
}

export default RootLayout