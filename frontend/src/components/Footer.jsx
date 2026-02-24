import '../styles/footer.css';
import { Link } from 'react-router-dom';
import { FaWhatsapp } from "react-icons/fa";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";


function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner huge-footer">
        <div className="footer-col footer-brand">
          <Link to="/">
            <img src="/logo.png" alt="Pratyaksha News Logo" height={60} style={{ marginBottom: 8 }} />
          </Link>
          <h3 style={{ margin: 0 }}>Pratyaksha News</h3>
          <p className="muted">Real local updates in Telugu and English. Stay informed with the latest news, breaking stories, and in-depth analysis from Andhra Pradesh, Telangana, and around the world.</p>
        </div>
        <div className="footer-col">
          <h4>Quick Links</h4>
          <nav className="footer-nav">
            <Link to="/">Home</Link>
            <Link to="/latest">Latest</Link>
            <Link to="/category/politics">Politics</Link>
            <Link to="/category/cinema">Cinema</Link>
            <Link to="/category/sports">Sports</Link>
            <Link to="/category/business">Business</Link>
            <Link to="/category/career">Career</Link>
            <Link to="/category/family">Family</Link>
            <Link to="/gallery">Gallery</Link>
            <Link to="/video">Video</Link>
            <Link to="/epaper">E-Paper</Link>
            <Link to="/admin/login">Login</Link>
          </nav>
        </div>
        <div className="footer-contact">
          <h3 style={{textDecoration: "underline", marginBottom: "18px", fontWeight: 600}}>For More Queries Contact us:</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* Email */}
            <a
              href="mailto:pratyakshanewspaper@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-item"
              style={{
                display: "flex",
                alignItems: "center",
                background: "#f3f4f6",
                borderRadius: "8px",
                padding: "12px 16px",
                color: "#222",
                textDecoration: "none",
                boxShadow: "0 2px 8px #e0e7ef",
                transition: "background 0.2s"
              }}
            >
              <FaEnvelope size={28} style={{ color: "#2563eb" }} />
              <span style={{ marginLeft: "12px", fontSize: "1.1em", fontWeight: 500 }}>pratyakshanewspaper@gmail.com</span>
            </a>
            {/* Phone Call */}
            <a
              href="tel:+919299991059"
              className="contact-item"
              style={{
                display: "flex",
                alignItems: "center",
                background: "#f3f4f6",
                borderRadius: "8px",
                padding: "12px 16px",
                color: "#222",
                textDecoration: "none",
                boxShadow: "0 2px 8px #e0e7ef",
                transition: "background 0.2s"
              }}
            >
              <FaPhoneAlt size={28} style={{ color: "#10b981" }} />
              <span style={{ marginLeft: "12px", fontSize: "1.1em", fontWeight: 500 }}>Call us</span>
            </a>
            {/* WhatsApp Message */}
            <a
              href="https://wa.me/919299991059"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-item"
              style={{
                display: "flex",
                alignItems: "center",
                background: "#e6f4ea",
                borderRadius: "8px",
                padding: "12px 16px",
                color: "#222",
                textDecoration: "none",
                boxShadow: "0 2px 8px #e0e7ef",
                transition: "background 0.2s"
              }}
            >
              <FaWhatsapp size={28} color="#25D366" />
              <span style={{ marginLeft: "12px", fontSize: "1.1em", fontWeight: 500 }}>WhatsApp</span>
            </a>
          </div>
        </div>
        
      </div>
      <div className="footer-bottom" style={{ marginTop: '32px' }}>
        <p>© {new Date().getFullYear()} Pratyaksha News. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
// Removed duplicate/leftover JSX and ensured only one valid Footer component is exported.
