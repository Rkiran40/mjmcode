import { useEffect, useState, useContext } from "react";
import { getAllNews } from "../services/api";
import NewsCard from "../components/NewsCard";
import { LanguageContext } from "../context/LanguageContext";
import "../styles/home.css";
import { setSEO } from "../utils/seo";
import { Link } from "react-router-dom";
// import "../styles/layout.css"

function Home() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { language } = useContext(LanguageContext);

  /* 🔹 Fetch news */
  useEffect(() => {
    getAllNews().then((data) => {
      setNews(data || []);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    setSEO({
      title:
        language === "te"
          ? "తాజా తెలుగు వార్తలు | Pratyaksha News"
          : "Latest Telugu News | Pratyaksha News",
      description:
        language === "te"
          ? "తాజా రాజకీయ, సినిమా, క్రీడలు, వ్యాపార వార్తలు చదవండి"
          : "Read latest politics, cinema, sports and business news in Telugu",
    });
  }, [language]);

  if (loading) return <p style={{ padding: 20 }}>Loading...</p>;

  const topNews = news[0];
  const allLatestNews = news.slice(1); // All news except top (for Latest News section)

  const cinemaNews = news.filter(n => n.category === "cinema");
  const sportsNews = news.filter(n => n.category === "sports");
  const businessNews = news.filter(n => n.category === "business");
  const techNews = news.filter(n => n.category === "tech");

  return (
    <div className="home-layout">

      {/* ================= LEFT CONTENT (75%) ================= */}
      <div className="main-content">

        {topNews && (
          <section className="top-news" style={{ display: "flex" }}>

            <div className="top-news-image">
              <img src={topNews.image} alt="" />

              <div className="top-news-overlay">

                <h1 className="overlay-title">
                  {language === "te"
                    ? topNews.title_te || ""
                    : topNews.title_en || ""}
                </h1>

                <p className="overlay-desc">
                  {language === "te"
                    ? topNews.content_te?.slice(0, 80)
                    : topNews.content_en?.slice(0, 80)}
                </p>
                <Link to={`/news/${topNews.id}`} className="read-hero">
                  {language === "te" ? "ఇంకా చదవండి" : "Read More"}
                </Link>

              </div>
            </div>
            

          </section>
        )}


        <section className="latest-section">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <h2 className="fresh-news" style={{ margin: 0 }}>
              {language === "te" ? "తాజా వార్తలు" : "Latest News"}
            </h2>
            {allLatestNews.length > 8 && (
              <a href="/latest" style={{ color: "#1976d2", textDecoration: "none", fontWeight: 600, fontSize: "14px" }}>
                {language === "te" ? "అన్నీ చూడండి" : "View All"}
              </a>
            )}
          </div>

          <div className="news-grid">
            {allLatestNews.slice(0, 8).map(item => (
              <NewsCard
                key={item.id}
                news={item}
                language={language}
                variant="top"
              />
            ))}
          </div>
        </section>
        <br /><br />
        <CategorySection
          titleTe="సినిమా"
          titleEn="Cinema"
          data={cinemaNews}
          language={language}
          variant="left"
          sectionClass="cinema-section"
        />
        <br /><br />
        <CategorySection
          titleTe="క్రీడలు"
          titleEn="Sports"
          data={sportsNews}
          language={language}
          variant="compact"
          sectionClass="sports-section"
        />

        <CategorySection
          titleTe="వ్యాపారం"
          titleEn="Business"
          data={businessNews}
          language={language}
          variant="overlay"
          sectionClass="business-section"
        />
        <br /><br />

        <CategorySection
          titleTe="టెక్నాలజీ"
          titleEn="Technology"
          data={techNews}
          language={language}
          variant="left"
          sectionClass="tech-section"
        />

      </div>

      {/* ================= RIGHT SIDEBAR ADS (25%) ================= */}
      <aside className="ad-sidebar">

        <div className="ad-box">Advertisement</div>
        <div className="ad-box">Advertisement</div>
        {/*<div className="ad-box">Advertisement</div>
        <div className="ad-box">Advertisement</div> */}
        <div className="ht-news">Hot News</div>

      </aside>

    </div>
  );
}

function CategorySection({
  titleTe,
  titleEn,
  data,
  language,
  variant = "top",
  sectionClass
}) {
  const displayData = data.slice(0, 8);
  const hasMore = data.length > 8;

  return (
    <section className={sectionClass}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
        <h2 style={{ margin: 0 }}>{language === "te" ? titleTe : titleEn}</h2>
        {hasMore && (
          <a href="#" style={{ color: "#1976d2", textDecoration: "none", fontWeight: 600, fontSize: "14px" }}>
            {language === "te" ? "అన్నీ చూడండి" : "View All"}
          </a>
        )}
      </div>

      <div className="news-grid">
        {displayData.map(item => (
          <NewsCard
            key={item.id}
            news={item}
            language={language}
            variant={variant}
          />
        ))}
      </div>
    </section>
  );
}

export default Home;
