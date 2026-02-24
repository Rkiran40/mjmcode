import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/axios";
import '../../styles/dashboard.css'

function Dashboard() {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/news");
      setNewsList(res.data || []);
    } catch (err) {
      setError("Failed to load news");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this news?")) {
      return;
    }

    try {
      await axios.delete(`/news/${id}`);
      setNewsList((prev) => prev.filter((n) => (n.id || n._id) !== id));
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div style={{ padding: 40, marginTop: "180px" }}>
      <h2 style={{ textAlign: "center" }}>Admin Dashboard</h2>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>


        <div>
          <Link to="/admin/gallery">
            <button style={{ marginRight: 10, marginBottom: 20 }} className="add">Gallery</button>
          </Link>
          <Link to="/admin/breaking-news">
            <button style={{ marginRight: 10, marginBottom: 20 }} className="add">Breaking News</button>
          </Link>
          <Link to="/admin/add">
            <button style={{ marginRight: 10, marginBottom: 20 }} className="add"> <b>+</b>&nbsp; Add News</button>
          </Link>
          <Link to="/admin/video/add">
            <button style={{ marginBottom: 20 }} className="add"> <b>+</b>&nbsp; Add Video</button>
          </Link>
        </div>
      </div>

      {loading && <div>Loading...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}

      <div
        style={{
          border: "2px solid black",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <table
          cellPadding="10"
          width="100%"
          style={{
            backgroundColor: "lightgrey",
            color: "black",
            fontWeight: "bold",
            borderCollapse: "collapse",
            textAlign: "center",
            width: "100%"
          }}
        >
          <thead>
            <tr>
              <th>Image</th>
              <th>ID</th>
              <th>Title (Telugu)</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {newsList.length === 0 && !loading && (
              <tr>
                <td colSpan="5">No news found</td>
              </tr>
            )}

            {newsList.map((item) => (
              <tr key={item.id || item._id}>
                <td>
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title_te || "news"}
                      style={{
                        width: "160px",
                        height: "80px",
                        objectFit: "cover",
                        borderRadius: "5px"
                      }}
                    />
                  ) : (
                    "-"
                  )}
                </td>

                <td>{item.id || item._id}</td>
                <td>{item.title_te || item.title}</td>
                <td>{item.category}</td>

                <td>
                  <Link to={`/admin/edit/${item.id || item._id}`}>
                    <button className="edit">Edit</button>
                  </Link>

                  <button
                    style={{ marginLeft: "10px" }}
                    className="delete"
                    onClick={() => handleDelete(item.id || item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default Dashboard;
