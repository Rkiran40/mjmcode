import React, { useState, useEffect } from "react";
import axios from "../../services/axios";

// function extractYoutubeId(input) {
//   if (!input) return "";

//   input = input.trim();
//   if (/^[a-zA-Z0-9_-]{11}$/.test(input)) {
//     return input;
//   }

//   try {
//     const url = new URL(input);
//     if (url.hostname.includes("youtu.be")) {
//       return url.pathname.split("/")[1];
//     }

//     const v = url.searchParams.get("v");
//     if (v) return v;

//     const parts = url.pathname.split("/");
//     const index = parts.findIndex(p =>
//       ["embed", "shorts", "v"].includes(p)
//     );

//     if (index !== -1 && parts[index + 1]) {
//       return parts[index + 1];
//     }
//   } catch {
//     const match = input.match(/([a-zA-Z0-9_-]{11})/);
//     if (match) return match[1];
//   }

//   return "";
// }

const extractYoutubeId = (input) => {
  if (!input) return "";
  input = input.trim();

  // Direct video ID (11 chars)
  if (/^[a-zA-Z0-9_-]{11}$/.test(input)) {
    return input;
  }

  // Try to parse as URL
  try {
    let url = input;
    // Add protocol if missing
    if (!/^https?:\/\//i.test(url)) {
      url = "https://" + url;
    }
    const parsed = new URL(url);
    // youtu.be short link
    if (parsed.hostname.includes("youtu.be")) {
      const id = parsed.pathname.split("/")[1];
      if (id && /^[a-zA-Z0-9_-]{11}$/.test(id)) return id;
    }
    // youtube.com/watch?v=...
    if (parsed.searchParams.has("v")) {
      const id = parsed.searchParams.get("v");
      if (id && /^[a-zA-Z0-9_-]{11}$/.test(id)) return id;
    }
    // youtube.com/embed/..., /v/..., /shorts/...
    const parts = parsed.pathname.split("/");
    const idx = parts.findIndex((p) => ["embed", "v", "shorts"].includes(p));
    if (idx !== -1 && parts[idx + 1] && /^[a-zA-Z0-9_-]{11}$/.test(parts[idx + 1])) {
      return parts[idx + 1];
    }
  } catch (e) {
    // Not a valid URL, fallback to regex
  }
  // Fallback: extract first 11-char ID from anywhere
  const match = input.match(/([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : "";
};
function AddVideo() {
  const [youtubeInput, setYoutubeInput] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [titleTe, setTitleTe] = useState("");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  const [albumId, setAlbumId] = useState(1); // default album

  const [editId, setEditId] = useState(null);
  const [editYoutube, setEditYoutube] = useState("");
  const [editTitleEn, setEditTitleEn] = useState("");
  const [editTitleTe, setEditTitleTe] = useState("");

  const fetchVideos = async () => {
    const res = await axios.get(`/videos/albums/${albumId}/videos`);
    setVideos(res.data || []);
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    const videoId = extractYoutubeId(youtubeInput);

    if (!videoId) {
      alert("Invalid YouTube link");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `/videos/albums/${albumId}/videos`,
        {
          youtube_id: videoId,
          title_en: titleEn,
          title_te: titleTe,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("✅ Video Added");

      setYoutubeInput("");
      setTitleEn("");
      setTitleTe("");

      fetchVideos();
    } catch (err) {
      const backendMsg = err.response?.data?.message || err.response?.data?.error || err.message || "Failed to add video";
      alert(`Error: ${backendMsg}`);
      console.error("ADD VIDEO ERROR:", err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this video?")) return;

    await axios.delete(`/videos/${id}`);
    fetchVideos();
  };

  const startEdit = (v) => {
    setEditId(v.id);
    setEditYoutube(v.youtube_id);
    setEditTitleEn(v.title_en);
    setEditTitleTe(v.title_te);
  };

  const cancelEdit = () => {
    setEditId(null);
  };


  const saveEdit = async (id) => {
    const videoId = extractYoutubeId(editYoutube);

    if (!videoId) {
      alert("Invalid YouTube link");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `/videos/${id}`,
        {
          youtube_id: videoId,
          title_en: editTitleEn,
          title_te: editTitleTe,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchVideos();
      cancelEdit();
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    }
  };

  const previewId = extractYoutubeId(youtubeInput);
  return (
    <div style={{ maxWidth: 750, padding: 20, border: "2px solid", alignItems: "center", marginTop: "200px", marginLeft: "25%", borderRadius: "15px", backgroundColor: "lavender" }}>
      <h2 style={{ textAlign: "center" }}>Add Video</h2>

      <form onSubmit={submit} style={{ textAlign: "center" }}>
        <input
          placeholder="Paste YouTube URL or ID"
          value={youtubeInput}
          onChange={(e) => setYoutubeInput(e.target.value)}
          required
          style={{ width: "250px", height: "30px", backgroundColor: "whitesmoke", borderRadius: "15px", border: "none", textAlign: "center" }}
        />
        <br /><br />

        {previewId && (
          <img
            src={`https://img.youtube.com/vi/${previewId}/hqdefault.jpg`}
            alt="preview"
            style={{ width: 240, marginTop: 10 }}
          />
        )}

        <input
          placeholder="Enter the English Title"
          value={titleEn}
          onChange={(e) => setTitleEn(e.target.value)}
          style={{ width: "250px", height: "30px", backgroundColor: "whitesmoke", borderRadius: "15px", border: "none", marginRight: "20px", textAlign: "center" }}
        />

        <input
          placeholder="Enter the Telugu Title"
          value={titleTe}
          onChange={(e) => setTitleTe(e.target.value)}
          style={{ width: "250px", height: "30px", backgroundColor: "whitesmoke", borderRadius: "15px", border: "none", textAlign: "center" }}
        />
        <br /><br />
        <button disabled={loading} style={{ backgroundColor: "green", height: "35px", width: "100px", borderRadius: "10px", fontWeight: "bold", border: "none", cursor: "pointer" }}>
          {loading ? "Saving..." : "Add Video"}
        </button>
      </form>

      <h3 style={{ marginTop: 40 }}>Manage Videos</h3>

      <table border="1" cellPadding="8" width="100%">
        <tbody>
          {videos.map((v) => (

            <tr key={v.id}>
              <td>{v.youtube_id}</td>
              <td>
                {editId === v.id ? (
                  <input
                    value={editTitleEn}
                    onChange={(e) => setEditTitleEn(e.target.value)}
                  />
                ) : (
                  v.title_en
                )}
              </td>

              <td>
                {editId === v.id ? (
                  <input
                    value={editTitleTe}
                    onChange={(e) => setEditTitleTe(e.target.value)}
                  />
                ) : (
                  v.title_te
                )}
              </td>

              <td>
                {editId === v.id ? (
                  <>
                    <button onClick={() => saveEdit(v.id)}>Save</button>
                    <button onClick={cancelEdit}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => startEdit(v)}>Edit</button>
                    <button onClick={() => handleDelete(v.id)}>
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AddVideo;





