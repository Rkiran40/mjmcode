// import { useContext, useEffect, useState } from "react";
// import { LanguageContext } from "../context/LanguageContext";
// import { setSEO } from "../utils/seo";
// import { getAllVideos } from "../services/videoApi";
// import "../styles/video.css";

// function Video() {
//   const { language } = useContext(LanguageContext);
//   const [videos, setVideos] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // SEO
//   useEffect(() => {
//     setSEO({
//       title:
//         language === "te"
//           ? "వీడియో వార్తలు | Pratyaksha News"
//           : "Video News | Pratyaksha News",
//       description:
//         language === "te"
//           ? "తాజా వార్తల వీడియోలు"
//           : "Latest news videos",
//     });
//   }, [language]);

//   // Fetch videos from backend
//   useEffect(() => {
//     getAllVideos().then((data) => {
//       setVideos(data || []);
//       setLoading(false);
//     });
//   }, []);

//   if (loading) {
//     return <p style={{ padding: 20 }}>Loading videos...</p>;
//   }

//   return (
//     <section className="video-container">
//       <h2>{language === "te" ? "వీడియోలు" : "Videos"}</h2>

//       <div className="video-grid">
//         {videos.length === 0 && (
//           <p>
//             {language === "te"
//               ? "వీడియోలు లభ్యం కాలేదు"
//               : "No videos available"}
//           </p>
//         )}

//         {Array.isArray(videos) &&
//         videos.map((item) => (
//           <div className="video-item" key={item.id}>
//             <iframe
//               src={`https://www.youtube.com/embed/${item.youtube_id}`}
//               title={
//                 language === "te"
//                   ? item.title_te
//                   : item.title_en
//               }
//               frameBorder="0"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//             ></iframe>

//             <p>
//               {language === "te"
//                 ? item.title_te
//                 : item.title_en}
//             </p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

// export default Video;


import { useEffect, useState, useContext } from "react";
import axios from "../services/axios";
import { LanguageContext } from "../context/LanguageContext";
import "../styles/video.css";

function Video() {
  const { language } = useContext(LanguageContext);
  const [albums, setAlbums] = useState([]);
  const [videosByAlbum, setVideosByAlbum] = useState({});
  const [activeAlbum, setActiveAlbum] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    // Fetch all video albums
    axios.get("/videos/albums").then(res => {
      setAlbums(res.data || []);
      if (res.data && res.data.length > 0) setActiveAlbum(res.data[0].id);
    });
  }, []);

  useEffect(() => {
    if (!activeAlbum) return;
    // Fetch videos for the selected album
    axios.get(`/videos/albums/${activeAlbum}/videos`).then(res => {
      setVideosByAlbum(prev => ({ ...prev, [activeAlbum]: res.data || [] }));
    });
  }, [activeAlbum]);

  const openVideo = (youtubeId) => setActiveVideo(youtubeId);
  const closeVideo = () => setActiveVideo(null);

  const thumbnail = (video) => {
    if (video.thumbnail) {
      return `http://localhost:5000/uploads/videos/${video.thumbnail}`;
    }
    return `https://img.youtube.com/vi/${video.youtube_id}/hqdefault.jpg`;
  };

  return (
    <div className="video-page">
      <h2 style={{textAlign: 'center', margin: '24px 0'}}>{language === "te" ? "వీడియో ఆల్బమ్స్" : "Video Albums"}</h2>
      {/* <div className="album-list" style={{display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center', marginBottom: 32}}>
        {albums.map(album => (
          <div
            key={album.id}
            className={`album-card${activeAlbum === album.id ? ' active' : ''}`}
            style={{cursor: 'pointer', border: activeAlbum === album.id ? '2px solid #2563eb' : '1px solid #ccc', borderRadius: 8, padding: 16, minWidth: 220, background: '#f9fafb'}}
            onClick={() => setActiveAlbum(album.id)}
          >
            {album.cover_image && (
              <img src={`http://localhost:5000/uploads/gallery/${album.cover_image}`} alt="cover" style={{width: '100%', height: 120, objectFit: 'cover', borderRadius: 6, marginBottom: 8}} />
            )}
            <div style={{fontWeight: 600, fontSize: 18}}>{album.title_en || album.title_te || `Album #${album.id}`}</div>
            <div style={{color: '#666', fontSize: 14}}>{album.category}</div>
          </div>
        ))}
      </div> */}

      {activeAlbum && (
        <section className="video-section">
          {/* <h3 style={{textAlign: 'center', marginBottom: 16}}>
            {language === "te" ? "వీడియోలు" : "Videos"} {albums.find(a => a.id === activeAlbum)?.title_en ? `- ${albums.find(a => a.id === activeAlbum).title_en}` : ''}
          </h3> */}
          <div className="video-grid">
            {(videosByAlbum[activeAlbum] || []).length === 0 && (
              <p style={{textAlign: 'center', width: '100%'}}>{language === "te" ? "ఈ ఆల్బమ్‌లో వీడియోలు లేవు" : "No videos in this album"}</p>
            )}
            {(videosByAlbum[activeAlbum] || []).map((item) => (
              <div
                key={item.id}
                className="video-card"
                onClick={() => openVideo(item.youtube_id)}
              >
                <img src={thumbnail(item)} alt="thumb" />
                <div className="play-btn">▶</div>
                <p className="video-title">
                  {language === "te" ? item.title_te : item.title_en}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 🎬 MODAL */}
      {activeVideo && (
        <div className="video-modal" onClick={closeVideo}>
          <div
            className="video-wrapper"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-btn" onClick={closeVideo}>✖</button>

            <iframe
              src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
              title="YouTube video"
              allow="autoplay"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}

export default Video;
