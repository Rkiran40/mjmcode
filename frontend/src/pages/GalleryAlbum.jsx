import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "../services/axios";
import { LanguageContext } from "../context/LanguageContext";
import "../styles/galleryAlbum.css";

function GalleryAlbum() {
  const { id } = useParams();
  const { language } = useContext(LanguageContext);

  const [album, setAlbum] = useState(null);
  const [images, setImages] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    axios.get(`/gallery/album/${id}`).then((res) => {
      setAlbum(res.data.album);
      setImages(res.data.images);
    });
  }, [id]);

  const next = () => {
    setActiveIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const prev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  if (!album) return <p>Loading...</p>;

  return (
    <div className="album-detail">
      <h2>
        {language === "te" ? album.title_te : album.title_en}
      </h2>

      <div className="album-grid">
        {images.map((img, index) => (
          <img
            key={img.id}
            src={`http://localhost:5000/uploads/gallery/${img.image}`}
            alt=""
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>

      {/* LIGHTBOX */}
      {activeIndex !== null && (
        <div className="lightbox">
          <button className="close" onClick={() => setActiveIndex(null)}>
            ✕
          </button>

          <button className="prev" onClick={prev}>
            ❮
          </button>

          <img
            className="lightbox-image"
            src={`http://localhost:5000/uploads/gallery/${images[activeIndex].image}`}
            alt=""
          />

          <button className="next" onClick={next}>
            ❯
          </button>
        </div>
      )}
    </div>
  );
}

export default GalleryAlbum;
