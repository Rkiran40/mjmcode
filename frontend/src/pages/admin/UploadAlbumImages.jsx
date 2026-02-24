import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../services/axios";

function UploadAlbumImages() {
  const { id } = useParams(); // albumId
  const navigate = useNavigate();

  const [files, setFiles] = useState([]);
  const [preview, setPreview] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFiles = (e) => {
    const selected = Array.from(e.target.files);

    if (selected.length < 1) {
      alert("Select at least 1 image");
      return;
    }

    if (selected.length > 20) {
      alert("Maximum 20 images allowed");
      return;
    }

    setFiles(selected);
    setPreview(selected.map((f) => URL.createObjectURL(f)));
  };

  const upload = async () => {
    if (files.length === 0) {
      alert("No images selected");
      return;
    }

    const formData = new FormData();
    files.forEach((f) => formData.append("image", f));

    try {
      setLoading(true);
      await axios.post(`/gallery/album/${id}/images`, formData);
      alert("Images uploaded successfully");
      navigate("/admin/gallery");
    } catch (err) {
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>Upload Album Images</h2>
      <p>Upload 1 to 20 images</p>

      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFiles}
      />

      {/* PREVIEW */}
      <div style={{ display: "flex", flexWrap: "wrap", marginTop: 20 }}>
        {preview.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            width="120"
            style={{ margin: 5, border: "1px solid #ccc" }}
          />
        ))}
      </div>

      <br />

      <button onClick={upload} disabled={loading}>
        {loading ? "Uploading..." : "Upload Images"}
      </button>
    </div>
  );
}

export default UploadAlbumImages;
