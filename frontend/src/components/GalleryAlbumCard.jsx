import { Link } from "react-router-dom";
import "../styles/gallery.css";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5001";

function GalleryAlbumCard({ album, language }) {
  return (
    <Link to={`/gallery/${album.id}`} className="album-card">
      <div className="album-image-wrap">
        <img
          src={`${API_BASE}/uploads/gallery/${album.cover_image}`}
          alt=""
        />

        {/* IMAGE COUNT BADGE */}
        <span className="album-count">
          📷 {album.total_images} images
        </span>
      </div>

      <div className="album-title">
        {language === "te" ? album.title_te : album.title_en}
      </div>
    </Link>
  );
}

export default GalleryAlbumCard;
