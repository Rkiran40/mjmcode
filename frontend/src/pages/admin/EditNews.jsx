import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5001";

function EditNews() {
  const { id } = useParams();

  const [titleTe, setTitleTe] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [contentTe, setContentTe] = useState("");
  const [contentEn, setContentEn] = useState("");
  const [category, setCategory] = useState("politics");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch existing news data
  useEffect(() => {
    fetch(`${API_BASE}/api/news/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTitleTe(data.title_te);
        setTitleEn(data.title_en);
        setContentTe(data.content_te);
        setContentEn(data.content_en);
        setCategory(data.category);
        setImage(data.image || "");
        setLoading(false);
      });
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("adminToken");

    const res = await fetch(`${API_BASE}/api/news/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        title_te: titleTe,
        title_en: titleEn,
        content_te: contentTe,
        content_en: contentEn,
        category,
        image,
      }),
    });

    if (res.ok) {
      alert("News updated successfully");
      window.location.href = "/admin/dashboard";
    } else {
      alert("Update failed");
    }
  };

  if (loading) {
    return <p style={{ padding: 40 }}>Loading...</p>;
  }

  return (
    <div className="edit-news-container">
      <h2>Edit News</h2>
      <form className="edit-news-form" onSubmit={handleUpdate}>
        <label htmlFor="">Enter the Telugu Title : </label>
        <input
          type="text"
          placeholder="Title (Telugu)"
          value={titleTe}
          onChange={(e) => setTitleTe(e.target.value)}
          required
        />
        <label htmlFor="">Enter the English Title : </label>
        <input
          type="text"
          placeholder="Title (English)"
          value={titleEn}
          onChange={(e) => setTitleEn(e.target.value)}
          required
        />
        <label htmlFor="">Enter the Telugu Description : </label>
        <textarea
          placeholder="Content (Telugu)"
          value={contentTe}
          onChange={(e) => setContentTe(e.target.value)}
          rows="5"
          required
        />
        <label htmlFor="">Enter the English Description : </label>
        <textarea
          placeholder="Content (English)"
          value={contentEn}
          onChange={(e) => setContentEn(e.target.value)}
          rows="5"
          required
        />
        <label htmlFor="">Select the Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="politics">Politics</option>
          <option value="cinema">Cinema</option>
          <option value="sports">Sports</option>
          <option value="business">Business</option>
          <option value="health">Health</option>
          <option value="family">Family</option>
          <option value="career">Career</option>
          <option value="tech">Tech</option>
        </select>
        <label htmlFor="">Enter the Image URL:</label>
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <button type="submit" className="edit-news-btn">
          Update News
        </button>
      </form>
    </div>
  );
}

export default EditNews;
