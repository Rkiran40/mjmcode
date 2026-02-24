import { Link } from "react-router-dom";
import "../styles/newsCard.css";

function NewsCard({ news, language, variant = 'top' }) {
  const title =
    language === "te" ? news.title_te : news.title_en;

  const summary =
    language === "te"
      ? news.content_te?.slice(0, 120)
      : news.content_en?.slice(0, 120);

  return (
    <div className={`news-card ${variant}`}>
      {news.image && (
        <img
          src={news.image}
          alt={title}
          className="news-image"
        />
      )}

      <div className="news-content">
        <span className={`category-tag ${news.category}`}>
          {news.category}
        </span>

        <h3>{title}</h3>

        <p>{summary}...</p>

        <Link to={`/news/${news.id}`} className="read-more">
          {language === "te" ? "ఇంకా చదవండి" : "Read More"}
        </Link>
      </div>
    </div>
  );
}

export default NewsCard;
