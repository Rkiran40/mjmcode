import { useState } from "react";
import axios from "../../services/axios";

function AddGallery() {
  const [image, setImage] = useState(null);
  const [captionTe, setCaptionTe] = useState("");
  const [captionEn, setCaptionEn] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("image", image);
    formData.append("caption_te", captionTe);
    formData.append("caption_en", captionEn);

    try {
      await axios.post("/gallery", formData);
      alert("Image uploaded");

      setImage(null);
      setCaptionTe("");
      setCaptionEn("");
    } catch (err) {
      alert("Upload failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} style={{ padding: 20, maxWidth: 400,marginTop:"150px" }}>
      <h2>Add Gallery Image</h2>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        required
      />

      <input
        placeholder="Caption (Telugu)"
        value={captionTe}
        onChange={(e) => setCaptionTe(e.target.value)}
      />

      <input
        placeholder="Caption (English)"
        value={captionEn}
        onChange={(e) => setCaptionEn(e.target.value)}
      />

      <button disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>
    </form>
  );
}

export default AddGallery;
