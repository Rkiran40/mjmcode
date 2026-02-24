import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getNewsByCategory } from "../services/api";
import NewsCard from "../components/NewsCard";
import { LanguageContext } from "../context/LanguageContext";
import { setSEO } from "../utils/seo";
import "../styles/category.css";
import "../styles/layout.css"; // your layout css

function Category() {
  const { name } = useParams();
  const [news, setNews] = useState([]);
  const { language } = useContext(LanguageContext);

  const categoryNamesTe = {
    cinema: "సినిమా",
    sports: "క్రీడలు",
    business: "వ్యాపారం",
    politics: "రాజకీయాలు",
    health: "ఆరోగ్యం",
    family: "కుటుంబం",
    career: "కెరీర్",
    tech: "టెక్నాలజీ",
  };

  useEffect(() => {
    getNewsByCategory(name).then((data) => setNews(data));
  }, [name]);

  useEffect(() => {
    setSEO({
      title:
        language === "te"
          ? `${categoryNamesTe[name] || name} వార్తలు | Pratyaksha News`
          : `${name.charAt(0).toUpperCase() + name.slice(1)} News | Pratyaksha News`,
      description:
        language === "te"
          ? `${categoryNamesTe[name] || name} విభాగానికి సంబంధించిన తాజా వార్తలు`
          : `Latest ${name} related news`,
    });
  }, [name, language]);

  return (
    <div className="news-layout">
      <section className="news-main">
        <h2>
          {language === "te"
            ? `${categoryNamesTe[name] || name} వార్తలు`
            : `${name.charAt(0).toUpperCase() + name.slice(1)} News`}
        </h2>

        <div className="news-grid">
          {news.length === 0 && (
            <p>
              {language === "te"
                ? "వార్తలు లభ్యం కాలేదు"
                : "No news available"}
            </p>
          )}

          {news.map((item) => (
            <NewsCard key={item.id} news={item} language={language} />
          ))}
        </div>
      </section>

      {/* RIGHT SIDE ADS (25%) */}
      <aside className="ad-sidebar">

        <div className="ad-box">
          <span>Ad-box</span>
        </div>

        <div className="ad-box">
          <span>Ad-box</span>
        </div>

        <div className="ad-box">
          <span>Ad-box</span>
        </div>

      </aside>

    </div>
  );
}

export default Category;
