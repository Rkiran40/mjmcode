import { useEffect, useState, useContext } from "react";
import { getAllNews } from "../services/api";
import NewsCard from "../components/NewsCard";
import { LanguageContext } from "../context/LanguageContext";
import { setSEO } from "../utils/seo";
import { Link } from "react-router-dom";
import "../styles/layout.css"; // ✅ layout styles

function LatestNews() {
  const [news, setNews] = useState([]);
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    getAllNews().then((data) => setNews(data || []));

    setSEO({
      title:
        language === "te"
          ? "తాజా వార్తలు | Pratyaksha News"
          : "Latest News | Pratyaksha News",
      description:
        language === "te"
          ? "అన్ని విభాగాల తాజా వార్తలు"
          : "Latest news from all categories",
    });
  }, [language]);

  const topNews = news[0];
  const allNews = news.slice(1);

  return (
    <div className="page-layout">

      {/* ================= LEFT CONTENT (75%) ================= */}
      <main className="page-content">

        {/* 🔥 TOP NEWS */}
        {topNews && (
          <section className="top-news" style={{ display: "flex" }}>

            <div className="top-news-image">
              <img src={topNews.image} alt="" />

              {/* DARK OVERLAY */}
              <div className="top-news-overlay">

                {/* TITLE */}
                <h1 className="overlay-title">
                  {language === "te"
                    ? topNews.title_te || ""
                    : topNews.title_en || ""}
                </h1>

                {/* SUBTITLE */}
                <p className="overlay-desc">
                  {language === "te"
                    ? topNews.content_te?.slice(0, 80)
                    : topNews.content_en?.slice(0, 80)}
                </p>
                <Link to={`/news/${topNews.id}`} className="read-more">
                  {language === "te" ? "ఇంకా చదవండి" : "Read More"}
                </Link>

              </div>
            </div>

          </section>
        )}

        <section style={{ padding: 20, marginTop: "30px" }}>
          <h2>
            {language === "te" ? "తాజా వార్తలు" : "Latest News"}
          </h2>

          <div className="news-grid">
            {allNews.map((item) => (
              <NewsCard
                key={item.id}
                news={item}
                language={language}
              />
            ))}
          </div>
        </section>

      </main>

      {/* ================= RIGHT ADS (25%) ================= */}
      <aside className="global-ad-sidebar">

        <div className="ad-box">Advertisement</div>
        <div className="ad-box">Advertisement</div>
        <div className="ad-box">Advertisement</div>

      </aside>

    </div>
  );
}

export default LatestNews;
