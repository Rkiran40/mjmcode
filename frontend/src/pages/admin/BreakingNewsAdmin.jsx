const inputStyle = {
  flex: 1,
  padding: '15px 20px',
  border: '1.5px solid #bdbdbd',
  borderRadius: 10,
  fontSize: 18,
  outline: 'none',
  background: '#f4f7fb',
  transition: 'border 0.2s',
  boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
};

import { useEffect, useState } from "react";
import axios from "../../services/axios";

const pageBg = {
  minHeight: '100vh',
  background: 'linear-gradient(120deg, #e0e7ff 0%, #f8fafc 100%)',
  padding: 0,
  marginTop: '170px',
//   fontFamily: 'Segoe UI, Arial, sans-serif',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
};



const cardStyle = {
  width: '100%',
  maxWidth: '100%',
  margin: '40px 0 0',
  padding: '36px 32px 32px',
  background: '#fff',
  borderRadius: 22,
  boxShadow: '0 8px 32px rgba(0,0,0,0.13)',
  border: '1.5px solid #e0e0e0',
  display: 'flex',
  flexDirection: 'column',
  gap: 28,
  minHeight: 420,
  boxSizing: 'border-box',
};

// Responsive overrides for cardStyle
const responsiveCardStyle = {
  ...cardStyle,
  maxWidth: '100%',
  padding: '18px 4vw 18px',
  borderRadius: 12,
  minHeight: 0,
};

const buttonStyle = {
  padding: '15px 32px',
  background: 'linear-gradient(90deg, #2563eb 60%, #60a5fa 100%)',
  color: '#fff',
  border: 'none',
  borderRadius: 10,
  fontWeight: 'bold',
  fontSize: 18,
  cursor: 'pointer',
  boxShadow: '0 2px 10px rgba(37,99,235,0.09)',
  transition: 'background 0.2s, transform 0.1s',
  marginLeft: 6,
};

const newsCard = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: 'linear-gradient(90deg, #f1f5f9 80%, #dbeafe 100%)',
  borderRadius: 10,
  padding: '16px 22px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
  border: '1.5px solid #e0e7ef',
  gap: 12,
  marginBottom: 2,
};

const deleteBtn = {
  background: 'linear-gradient(90deg, #ef4444 60%, #f87171 100%)',
  color: '#fff',
  border: 'none',
  borderRadius: 8,
  padding: '9px 20px',
  fontWeight: 'bold',
  fontSize: 16,
  cursor: 'pointer',
  transition: 'background 0.2s, transform 0.1s',
  boxShadow: '0 2px 8px rgba(239,68,68,0.09)',
};


function BreakingNewsAdmin() {
  const [breakingNews, setBreakingNews] = useState([]);
  const [text, setText] = useState(""); // Telugu
  const [textEn, setTextEn] = useState(""); // English
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState(""); // Telugu
  const [editTextEn, setEditTextEn] = useState(""); // English

  const fetchBreakingNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("/breaking-news");
      setBreakingNews(res.data || []);
    } catch (err) {
      setError("Failed to load breaking news");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBreakingNews();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!text.trim() && !textEn.trim()) return;
    try {
      await axios.post("/breaking-news", { text, text_en: textEn });
      setText("");
      setTextEn("");
      fetchBreakingNews();
    } catch (err) {
      setError("Failed to add breaking news");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this breaking news?")) return;
    try {
      await axios.delete(`/breaking-news/${id}`);
      fetchBreakingNews();
    } catch (err) {
      setError("Failed to delete breaking news");
    }
  };

  const handleEdit = (id, currentText, currentTextEn) => {
    setEditId(id);
    setEditText(currentText);
    setEditTextEn(currentTextEn || "");
  };

  const handleEditSave = async (id) => {
    if (!editText.trim() && !editTextEn.trim()) return;
    try {
      await axios.put(`/breaking-news/${id}`, { text: editText, text_en: editTextEn });
      setEditId(null);
      setEditText("");
      setEditTextEn("");
      fetchBreakingNews();
    } catch (err) {
      setError("Failed to update breaking news");
    }
  };

  const handleEditCancel = () => {
    setEditId(null);
    setEditText("");
    setEditTextEn("");
  };

  return (
    <div style={pageBg}>
      <div style={window.innerWidth <= 700 ? responsiveCardStyle : cardStyle}>
        <h2 style={{ textAlign: 'center', marginBottom: 10, color: '#2563eb', letterSpacing: 1, fontWeight: 800, fontSize: 30, textShadow: '0 2px 8px #e0e7ff' }}>Breaking News Manager</h2>
        <form onSubmit={handleAdd} style={{ display: 'flex', gap: 14, marginBottom: 12, alignItems: 'center', justifyContent: 'center', width: '100%', flexWrap: 'wrap' }}>
          <input
            type="text"
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Breaking news (Telugu)"
            maxLength={255}
            style={inputStyle}
            autoFocus
          />
          <input
            type="text"
            value={textEn}
            onChange={e => setTextEn(e.target.value)}
            placeholder="Breaking news (English)"
            maxLength={255}
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle} onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'} onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}>
            ➕ Add
          </button>
        </form>
        {loading && <div style={{ textAlign: 'center', color: '#2563eb', margin: 12, fontWeight: 500 }}>Loading...</div>}
        {error && <div style={{ color: "#ef4444", textAlign: 'center', marginBottom: 10, fontWeight: 500 }}>{error}</div>}
        <div style={{ marginTop: 8, width: '100%', overflowX: 'auto' }}>
          {breakingNews.length === 0 && !loading ? (
            <div style={{ textAlign: 'center', color: '#64748b', fontSize: 20, fontWeight: 500, padding: '32px 0 24px', letterSpacing: 0.5, background: 'linear-gradient(90deg, #f1f5f9 80%, #dbeafe 100%)', borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1.5px solid #e0e7ef', marginTop: 10 }}>
              <span style={{ fontSize: 26, marginRight: 8 }}>🕊️</span> No breaking news added yet.
            </div>
          ) : (
            <table border="1" width="100%" cellPadding="10" style={{ background: '#fff', borderCollapse: 'collapse', marginTop: 8, alignContent: "center" }}>
              <thead style={{ background: '#f1f5f9' }}>
                <tr>
                  <th style={{ minWidth: 40 }}>Priority</th>
                  <th>Telugu</th>
                  <th>English</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {breakingNews.map((item, idx) => (
                  <tr key={item.id}>
                    <td style={{ color: '#2563eb', fontWeight: 600 }}>{idx + 1}</td>
                    <td>
                      {editId === item.id ? (
                        <input
                          type="text"
                          value={editText}
                          onChange={e => setEditText(e.target.value)}
                          style={{ ...inputStyle, width: '90%', fontSize: 17, padding: '10px 14px' }}
                          maxLength={255}
                          autoFocus
                        />
                      ) : (
                        <span style={{ fontSize: 18, color: '#222', fontWeight: 500, letterSpacing: 0.5, display: 'flex', alignItems: 'center' }}>
                          <span style={{ fontSize: 22, marginRight: 8 }}>💥</span> {item.text}
                        </span>
                      )}
                    </td>
                    <td>
                      {editId === item.id ? (
                        <input
                          type="text"
                          value={editTextEn}
                          onChange={e => setEditTextEn(e.target.value)}
                          style={{ ...inputStyle, width: '90%', fontSize: 17, padding: '10px 14px' }}
                          maxLength={255}
                        />
                      ) : (
                        <span style={{ fontSize: 18, color: '#222', fontWeight: 500, letterSpacing: 0.5, display: 'flex', alignItems: 'center' }}>
                          <span style={{ fontSize: 22, marginRight: 8 }}>💥</span> {item.text_en}
                        </span>
                      )}
                    </td>
                    <td>
                      {editId === item.id ? (
                        <>
                          <button
                            onClick={() => handleEditSave(item.id)}
                            style={{ color: 'green', fontWeight: 600, marginRight: 8 }}
                          >
                            Save
                          </button>
                          <button
                            onClick={handleEditCancel}
                            style={{ color: '#555', fontWeight: 600 }}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEdit(item.id, item.text, item.text_en)}
                            style={{ color: '#f59e42', fontWeight: 600, marginRight: 8 }}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            style={{ color: 'red', fontWeight: 600 }}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default BreakingNewsAdmin;
