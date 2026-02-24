import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../services/axios";

const categories = [
  "photos",
  "political",
  "cinema",
  "business",
  "sports",
  "viral",
  "world",
];

function EditGalleryAlbum() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title_te: "",
    title_en: "",
    category: "photos",
  });

  useEffect(() => {
    axios.get(`/gallery/album/${id}`).then((res) => {
      setForm({
        title_te: res.data.album.title_te,
        title_en: res.data.album.title_en,
        category: res.data.album.category,
      });
    });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    await axios.put(`/gallery/album/${id}`, form);
    alert("Album updated");
    navigate("/admin/gallery");
  };

  return (
    <div style={{ padding: 20,marginTop:"100px" }}>
      <h2>Edit Gallery Album</h2>

      <form onSubmit={submit}>
        <input
          name="title_te"
          placeholder="తెలుగు శీర్షిక"
          value={form.title_te}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          name="title_en"
          placeholder="English Title"
          value={form.title_en}
          onChange={handleChange}
          required
        />

        <br /><br />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c.toUpperCase()}
            </option>
          ))}
        </select>

        <br /><br />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditGalleryAlbum;
