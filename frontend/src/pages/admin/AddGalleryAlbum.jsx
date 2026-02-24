import { useState } from "react";
import axios from "../../services/axios";
import { useNavigate } from "react-router-dom";

function AddGalleryAlbum() {
  const navigate = useNavigate();

  const [titleTe, setTitleTe] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [category, setCategory] = useState("cinema");
  const [images, setImages] = useState([]);

  const submit = async (e) => {
    e.preventDefault();

    if (!images || images.length === 0) {
      alert("Select at least 1 image");
      return;
    }

    if (images.length > 20) {
      alert("Maximum 20 images allowed");
      return;
    }

    const formData = new FormData();
    formData.append("title_te", titleTe);
    formData.append("title_en", titleEn);
    formData.append("category", category);

    // Append each file
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    try {
      await axios.post("/gallery/album", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Album created successfully");
      navigate("/admin/gallery");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  return (
    <div style={{ padding: 40,marginTop:"100px" }}>
      <h2>Add Gallery Album (1–20 Images)</h2>

      <form onSubmit={submit}>
        <input
          placeholder="Telugu Title"
          value={titleTe}
          onChange={(e) => setTitleTe(e.target.value)}
        />

        <input
          placeholder="English Title"
          value={titleEn}
          onChange={(e) => setTitleEn(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="cinema">Cinema</option>
          <option value="political">Political</option>
          <option value="business">Business</option>
          <option value="sports">Sports</option>
          <option value="viral">Viral</option>
          <option value="world">World</option>
        </select>

        <input
          type="file"
          multiple
          onChange={(e) => setImages(e.target.files)}
        />

        <button type="submit">Create Album</button>
      </form>
    </div>
  );
}

export default AddGalleryAlbum;
