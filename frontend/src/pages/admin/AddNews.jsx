import { useState } from "react";
import '../../styles/addnews.css'

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5001";

function AddNews() {
  const [titleTe, setTitleTe] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [contentTe, setContentTe] = useState("");
  const [contentEn, setContentEn] = useState("");
  const [category, setCategory] = useState("politics");
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("adminToken");

    const res = await fetch(`${API_BASE}/api/news`, {
      method: "POST",
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
      alert("News added successfully");
      window.location.href = "/admin/dashboard";
    } else {
      alert("Failed to add news");
    }
  };

  return (
    <div style={{ padding: 40 }} className="news-block">
      <h2 className="heading">Add News</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className=""
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
        </div> <br />

        <h1>Enter the Telugu Context Here</h1>
        <div className="telugu">
          <div>
            <input
              type="text"
              placeholder="టైటిల్"
              value={titleTe}
              onChange={(e) => setTitleTe(e.target.value)}
              className="telugu-text"
              required
            />
          </div>
          <div>
            <textarea
              placeholder="Telugu Content"
              value={contentTe}
              onChange={(e) => setContentTe(e.target.value)}
              rows="5"
              className="telugu-content"
              required
            />
          </div>
        </div>
        <br />
        <h1>Enter the English Context Here</h1>
        <div className="english">
          <div>
            <input
              type="text"
              placeholder="Title"
              value={titleEn}
              onChange={(e) => setTitleEn(e.target.value)}
              className="english-text"
              required
            />
          </div>
          <div>
            <textarea
              placeholder="English Content"
              value={contentEn}
              onChange={(e) => setContentEn(e.target.value)}
              className="english-content"
              rows="5"
              required
            />
          </div>
        </div>
        <br /><br />
        <div className="image-box">
          <span>Paste your Image URL Here &nbsp; : &nbsp;</span>
          <input
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="image"
          />
        </div>
        <br />

        <button type="submit" style={{ marginTop: 15 }} className="publish">
          Publish News
        </button>
      </form>
    </div>
  );
}

export default AddNews;
