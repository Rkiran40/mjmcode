import { NavLink, Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import axios from "../services/axios";
import { LanguageContext } from "../context/LanguageContext";
import "../styles/header.css";

function Header() {
  const { language, toggleLanguage } = useContext(LanguageContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [breakingNews, setBreakingNews] = useState([]);

  useEffect(() => {
    const fetchBreakingNews = async () => {
      try {
        const res = await axios.get("/breaking-news");
        setBreakingNews(res.data || []);
      } catch (err) {
        setBreakingNews([]);
      }
    };
    fetchBreakingNews();
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const getFormattedDate = () => {
    const days = {
      en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      te: ["ఆదివారం", "సోమవారం", "మంగళవారం", "బుధవారం", "గురువారం", "శుక్రవారం", "శనివారం"]
    };
    const months = {
      en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      te: ["జనవరి", "ఫిబ్రవరి", "మార్చి", "ఏప్రిల్", "మే", "జూన్", "జూలై", "ఆగస్టు", "సెప్టెంబర్", "అక్టోబర్", "నవంబర్", "డిసెంబర్"]
    };
    const today = new Date();
    const lang = language === "te" ? "te" : "en";
    return `${days[lang][today.getDay()]}, ${months[lang][today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;
  };

  // Helper to detect mobile view
  const isMobile = () => {
    if (typeof window !== "undefined") {
      return window.innerWidth <= 480;
    }
    return false;
  };

  return (
    <header className="header">
      {/* Desktop Header Layout */}
      {!isMobile() && (
        <>
          <div className="header-desktop-row">
            <div className="logo">
              <Link to="/" onClick={closeMenu}>
                <img src="/logo.png" alt="" height={35} width={50} />
              </Link>
            </div>
            <span className="date-text">{getFormattedDate()}</span>
            <span className="logo-text">ప్రత్యక్ష న్యూస్</span>
            <div className="header-actions">
              <button className="lang-btn" onClick={toggleLanguage}>
                {language === "te" ? "English" : "తెలుగు"}
              </button>
              <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                ☰
              </button>
            </div>
          </div>
          <nav className={`nav ${menuOpen ? "open" : ""}`}>
            <NavLink to="/" onClick={closeMenu}>
              {language === "te" ? "హోమ్" : "Home"}
            </NavLink>
            <NavLink to="/latest" onClick={closeMenu}>
              {language === "te" ? "తాజా వార్తలు" : "Latest"}
            </NavLink>
            <NavLink to="/category/politics" onClick={closeMenu}>
              {language === "te" ? "రాజకీయాలు" : "Politics"}
            </NavLink>
            <NavLink to="/category/cinema" onClick={closeMenu}>
              {language === "te" ? "సినిమా" : "Cinema"}
            </NavLink>
            <NavLink to="/category/sports" onClick={closeMenu}>
              {language === "te" ? "క్రీడలు" : "Sports"}
            </NavLink>
            <NavLink to="/category/business" onClick={closeMenu}>
              {language === "te" ? "వ్యాపారం" : "Business"}
            </NavLink>
            <NavLink to="/category/career" onClick={closeMenu}>
              {language === "te" ? "కెరీర్" : "Career"}
            </NavLink>
            <NavLink to="/category/family" onClick={closeMenu}>
              {language === "te" ? "కుటుంబం" : "Family"}
            </NavLink>
            <NavLink to="/gallery" onClick={closeMenu}>
              {language === "te" ? "గ్యాలరీ" : "Gallery"}
            </NavLink>
            <NavLink to="/video" onClick={closeMenu}>
              {language === "te" ? "వీడియో" : "Video"}
            </NavLink>
            <NavLink to="/epaper" onClick={closeMenu}>
              {language === "te" ? "ఈ-పేపర్" : "E-Paper"}
            </NavLink>
          </nav>
        </>
      )}
      {/* Mobile Header Layout */}
      {isMobile() && (
        <>
          <div className="header-mobile-row" style={{ display: "flex", alignItems: "center", width: "100vw", backgroundColor: "#2563eb", margin: 0, padding: "0", boxSizing: "border-box", justifyContent: "flex-start",height:"40px" }}>
            <div className="logo" style={{ marginLeft: 0, paddingLeft: 0 }}>
              <Link to="/" onClick={closeMenu}>
                <img src="/logo.png" alt="Pratyaksha News Logo" height="100%" width={50} style={{ display: "block", margin: 0, padding: 0 }} />
              </Link>
            </div>
            <span className="logo-text" style={{ fontSize: "20px", marginLeft: "70px", color: "#fff", fontWeight: 600, textAlign: "center" }}>ప్రత్యక్ష న్యూస్</span>
            <button className="hamburger" style={{ marginLeft: "auto", color: "#fff", fontSize: "1.5em", background: "none", border: "none" }} onClick={() => setMenuOpen(!menuOpen)}>
              ☰
            </button>
          </div>
          <nav className={`nav ${menuOpen ? "open" : ""}`}>
            <NavLink to="/" onClick={closeMenu}>
              {language === "te" ? "హోమ్" : "Home"}
            </NavLink>
            <NavLink to="/latest" onClick={closeMenu}>
              {language === "te" ? "తాజా వార్తలు" : "Latest"}
            </NavLink>
            <NavLink to="/category/politics" onClick={closeMenu}>
              {language === "te" ? "రాజకీయాలు" : "Politics"}
            </NavLink>
            <NavLink to="/category/cinema" onClick={closeMenu}>
              {language === "te" ? "సినిమా" : "Cinema"}
            </NavLink>
            <NavLink to="/category/sports" onClick={closeMenu}>
              {language === "te" ? "క్రీడలు" : "Sports"}
            </NavLink>
            <NavLink to="/category/business" onClick={closeMenu}>
              {language === "te" ? "వ్యాపారం" : "Business"}
            </NavLink>
            <NavLink to="/category/career" onClick={closeMenu}>
              {language === "te" ? "కెరీర్" : "Career"}
            </NavLink>
            <NavLink to="/category/family" onClick={closeMenu}>
              {language === "te" ? "కుటుంబం" : "Family"}
            </NavLink>
            <NavLink to="/gallery" onClick={closeMenu}>
              {language === "te" ? "గ్యాలరీ" : "Gallery"}
            </NavLink>
            <NavLink to="/video" onClick={closeMenu}>
              {language === "te" ? "వీడియో" : "Video"}
            </NavLink>
            <NavLink to="/epaper" onClick={closeMenu}>
              {language === "te" ? "ఈ-పేపర్" : "E-Paper"}
            </NavLink>
            <button className="lang-btn" onClick={toggleLanguage}>
              {language === "te" ? "English" : "తెలుగు"}
            </button>
          </nav>
        </>
      )}
      <div className="breaking-news-bar" style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', width: '100%', padding: 0, margin: 0, background: 'white', minHeight: 32, height: 32 }}>
        <span className="breaking-news-label" style={{ display: 'inline-flex', alignItems: 'center', background: '#d32f2f', color: '#fff', fontWeight: 'bold', fontSize: '1rem', padding: '0 16px', height: 32, lineHeight: '32px', borderRadius: '0 12px 12px 0', marginRight: 0, letterSpacing: 1, flex: '0 0 auto', whiteSpace: 'nowrap' }}>
          {language === 'te' ? 'బ్రేకింగ్ న్యూస్' : 'Breaking News'}:
        </span>
        <marquee className="breaking-news-marquee" style={{ display: 'inline-block', verticalAlign: 'middle', height: 32, lineHeight: '32px', flex: 1, marginLeft: 8, background: 'transparent', color: 'blue', fontWeight: 'bold', fontSize: '16px', border: 'none', whiteSpace: 'nowrap', overflow: 'hidden' }}>
          {breakingNews.length > 0
            ? breakingNews.map((item) => (
                <span key={item.id} style={{ marginRight: '30px', display: 'inline-block', verticalAlign: 'middle', height: 32, lineHeight: '32px' }}>💥{language === 'te' ? item.text : (item.text_en || item.text)}</span>
              ))
            : <span style={{ marginRight: '30px', display: 'inline-block', verticalAlign: 'middle', height: 32, lineHeight: '32px' }}>{language === 'te' ? 'No breaking news' : 'No breaking news'}</span>
          }
        </marquee>
      </div>
    </header>
  );
}

export default Header;
