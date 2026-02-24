import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getNewsById } from "../services/api";
import { LanguageContext } from "../context/LanguageContext";
import { setSEO } from "../utils/seo";
import "../styles/newsDetail.css";

function NewsDetail() {
  const { id } = useParams(); // ✅ FIX HERE
  const [news, setNews] = useState(null);
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    getNewsById(id).then((data) => {
      setNews(data);

      setSEO({
        title: language === "te" ? data.title_te : data.title_en,
        description:
          language === "te"
            ? data.content_te.slice(0, 150)
            : data.content_en.slice(0, 150),
      });
    });
  }, [id, language]);

  if (!news) {
    return <p style={{ padding: 20 }}>Loading...</p>;
  }

  const title =
    language === "te" ? news.title_te : news.title_en;

  const content =
    language === "te" ? news.content_te : news.content_en;

  return (
    <article className="news-detail">
      <h1>{title}</h1>

      {news.image && (
        <img
          src={news.image}
          alt={title}
          className="detail-image"
        />
      )}

      <div className="news-content">
        {content.split("\n").map((para, index) => (
          <p key={index} style={{textAlign:"justify"}}>{para}</p>
        ))}
      </div>
      
    </article>
  );
}

export default NewsDetail;
