export async function getAllVideos() {
  const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";
  const res = await fetch(`${API_BASE}/api/videos`);
  return res.json();
}
