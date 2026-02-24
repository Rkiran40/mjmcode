import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "../services/axios";
import { LanguageContext } from "../context/LanguageContext";
import { setSEO } from "../utils/seo";
import "../styles/videoDetail.css";

function VideoDetail() {
    const { youtubeId } = useParams();   // ✅ correct param
    const { language } = useContext(LanguageContext);

    const [video, setVideo] = useState(null);
    const [related, setRelated] = useState([]);

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const res = await axios.get("/videos");

                const current = res.data.find(
                    v => v.youtube_id === youtubeId
                );

                setVideo(current);

                const relatedVideos = res.data
                    .filter(v => v.youtube_id !== youtubeId)
                    .slice(0, 6);

                setRelated(relatedVideos);

            } catch (err) {
                console.error("Video fetch error");
            }
        };

        fetchVideo();

    }, [youtubeId]);  // ✅ correct dependency

    useEffect(() => {
        if (video) {
            setSEO({
                title:
                    language === "te"
                        ? video.title_te
                        : video.title_en,
                description:
                    language === "te"
                        ? video.title_te
                        : video.title_en,
            });
        }
    }, [video, language]);

    if (!video)
        return <p style={{ padding: 40 }}>Loading...</p>;

    return (
        <div className="video-detail-page">

            {/* MAIN VIDEO */}
            <div className="main-video">
                <iframe
                    src={`https://www.youtube.com/embed/${video.youtube_id}`}
                    title="YouTube video"
                    allowFullScreen
                />

                <h2>
                    {language === "te"
                        ? video.title_te
                        : video.title_en}
                </h2>
            </div>

            {/* RELATED VIDEOS */}
            <div className="related-section">
                <h3>
                    {language === "te"
                        ? "ఇతర వీడియోలు"
                        : "Related Videos"}
                </h3>

                <div className="related-grid">
                    {related.map(item => (
                        <Link
                            key={item.id}
                            to={`/video/${item.youtube_id}`}
                            className="related-card"
                        >
                            <img
                                src={
                                    item.thumbnail
                                        ? `http://localhost:5000/uploads/videos/${item.thumbnail}`
                                        : `https://img.youtube.com/vi/${item.youtube_id}/hqdefault.jpg`
                                }
                                alt=""
                            />

                            <p>
                                {language === "te"
                                    ? item.title_te
                                    : item.title_en}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default VideoDetail;
