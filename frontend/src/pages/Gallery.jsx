import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "../services/axios";
import { LanguageContext } from "../context/LanguageContext";
import "../styles/gallery.css";

const categories = [
  { key: "photos", te: "ఫోటోలు", en: "Photos" },
  { key: "political", te: "రాజకీయాలు", en: "Political" },
  { key: "cinema", te: "సినిమా", en: "Cinema" },
  { key: "business", te: "వ్యాపారం", en: "Business" },
  { key: "sports", te: "క్రీడలు", en: "Sports" },
  { key: "viral", te: "వైరల్", en: "Viral" },
  { key: "world", te: "ప్రపంచం", en: "World" },
];

function Gallery() {
  const { language } = useContext(LanguageContext);
  const [active, setActive] = useState("photos");
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ FETCH ALBUMS SAFELY
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `/gallery/category/${active}`
        );

        // ✅ support both response formats
        // res.data OR { success:true, data: [...] }
        const data = res.data?.data || res.data || [];

        setAlbums(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Gallery fetch error:", err.response?.data || err.message);
        setAlbums([]); // prevent crash
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, [active]);

  return (
    <div className="gallery-page">
      {/* CATEGORY TABS */}
      <div className="gallery-tabs">
        {categories.map((c) => (
          <button
            key={c.key}
            className={active === c.key ? "active" : ""}
            onClick={() => setActive(c.key)}
          >
            {language === "te" ? c.te : c.en}
          </button>
        ))}
      </div>

      {/* ALBUM GRID */}
      <div className="album-grid">
        {!loading && albums.length === 0 && (
          <p style={{ padding: 20 }}>
            {language === "te"
              ? "ఈ విభాగంలో గ్యాలరీలు లేవు"
              : "No albums available"}
          </p>
        )}

        {albums.map((album) => (
          <Link
            key={album.id}
            to={`/gallery/${album.id}`}
            className="album-card"
          >
            <img
              src={`http://localhost:5000/uploads/gallery/${album.cover_image}`}
              alt=""
            />

            <div className="album-info">
              <h3>
                {language === "te"
                  ? album.title_te
                  : album.title_en}
              </h3>

              <span>{album.total_images} Photos</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Gallery;