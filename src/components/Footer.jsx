
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      
      <div className="copyright">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} ShopHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer