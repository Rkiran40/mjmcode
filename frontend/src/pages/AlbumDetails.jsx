import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "../services/axios";
import { LanguageContext } from "../context/LanguageContext";
import "../styles/albumDetails.css";

function AlbumDetails() {
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

    const nextImage = () => {
        setActiveIndex((prev) =>
            prev === images.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = () => {
        setActiveIndex((prev) =>
            prev === 0 ? images.length - 1 : prev - 1
        );
    };

    const closeLightbox = () => setActiveIndex(null);

    return (
        <div className="album-details">

            <h2>
                {language === "te"
                    ? album?.title_te
                    : album?.title_en}
            </h2>

            <div className="image-grid">
                {images.map((img, index) => (
                    <img
                        key={img.id}
                        src={`http://localhost:5000/uploads/gallery/${img.image}`}
                        alt=""
                        onClick={() => setActiveIndex(index)}
                    />
                ))}
            </div>

            {activeIndex !== null && (
                <div className="lightbox">
                    <button className="close" onClick={closeLightbox}>×</button>

                    <button className="prev" onClick={prevImage}>❮</button>

                    <img
                        className="lightbox-img"
                        src={`http://localhost:5000/uploads/gallery/${images[activeIndex].image}`}
                        alt=""
                    />

                    <button className="next" onClick={nextImage}>❯</button>

                    <div className="counter">
                        {activeIndex + 1} / {images.length}
                    </div>
                </div>
            )}
        </div>
    );
}

export default AlbumDetails;
