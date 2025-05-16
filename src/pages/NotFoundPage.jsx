import { Link } from 'react-router-dom'
import { FaHome } from 'react-icons/fa'

import './NotFoundPage.css'

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>
          The page you are looking for might have been removed, 
          had its name changed, or is temporarily unavailable.
        </p>
        <Link to="/" className="home-link">
          <FaHome /> Go to Homepage
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage