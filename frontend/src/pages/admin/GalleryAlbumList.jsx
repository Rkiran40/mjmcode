import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../services/axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5001";

function GalleryAlbumList() {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    const res = await axios.get("/gallery");
    setAlbums(res.data);
  };

  const deleteAlbum = async (id) => {
    if (!window.confirm("Delete this album?")) return;
    await axios.delete(`/gallery/${id}`);
    fetchAlbums();
  };

  return (
    <div style={{ padding: 30,marginTop:"120px" }}>
      <h2>Gallery Albums</h2>

      <Link to="/admin/gallery/album/add">+ Add Album</Link>

      <table border="1" width="100%" cellPadding="10">
        <thead>
          <tr>
            <th>Cover</th>
            <th>Telugu Title</th>
            <th>English Title</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {albums.map((a) => (
            <tr key={a.id}>
              <td>
                <img
                  src={`${API_BASE}/uploads/gallery/${a.cover_image}`}
                  width="120"
                  alt=""
                />
              </td>
              

              <td>{a.title_te}</td>
              <td>{a.title_en}</td>
              <td>{a.category}</td>

              <td>
                <Link to={`/admin/gallery/edit/${a.id}`}>Edit</Link>
                {" | "}
                <Link to={`/admin/gallery/${a.id}/images`}>
                  Upload Images
                </Link>
                {" | "}
                <button
                  style={{ color: "red" }}
                  onClick={() => deleteAlbum(a.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GalleryAlbumList;
