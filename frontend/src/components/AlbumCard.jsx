import { Link } from "react-router-dom";
import "./albumCard.css";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5001";

function AlbumCard({ album, language }) {
  return (
    <Link to={`/gallery/${album.id}`} className="album-card">
      <div className="album-image">
        <img
          src={`${API_BASE}/uploads/gallery/${album.cover_image}`}
          alt=""
        />
        <span className="photo-count">
          📷 {album.total_images} Photos
        </span>
      </div>

      <h3>
        {language === "te"
          ? album.title_te
          : album.title_en}
      </h3>
    </Link>
  );
}

export default AlbumCard;
