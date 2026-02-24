import { useEffect, useState } from "react";
import axios from "../services/axios";
import "../styles/shorts.css";

function Shorts() {
    const [shorts, setShorts] = useState([]);

    useEffect(() => {
        axios.get("/videos")
            .then(res => {
                const onlyShorts = res.data.filter(
                    v => v.type?.toLowerCase() === "short"
                );
                setShorts(onlyShorts);
            });
    }, []);

    return (
        <div className="shorts-container">
            {shorts.map(video => (
                <div className="short-item" key={video.id}>
                    <iframe
                        src={`https://www.youtube.com/embed/${video.youtube_id}?autoplay=1&mute=1&loop=1&playlist=${video.youtube_id}`}
                        allow="autoplay"
                        allowFullScreen
                        title="Short Video"
                    ></iframe>

                    <div className="short-info">
                        <h3>{video.title_en}</h3>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Shorts;
