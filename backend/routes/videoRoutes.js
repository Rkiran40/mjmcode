const express = require("express");
const router = express.Router();

const db = require("../db/database");
const auth = require("../middleware/auth");
const upload = require("../middleware/uploadVideo");

const getYoutubeId = (input) => {
  if (!input) return "";
  input = input.trim();


  if (/^[a-zA-Z0-9_-]{11}$/.test(input)) {
    return input;
  }


  try {
    let url = input;

    if (!/^https?:\/\//i.test(url)) {
      url = "https://" + url;
    }
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) {
      const id = parsed.pathname.split("/")[1];
      if (id && /^[a-zA-Z0-9_-]{11}$/.test(id)) return id;
    }

    if (parsed.searchParams.has("v")) {
      const id = parsed.searchParams.get("v");
      if (id && /^[a-zA-Z0-9_-]{11}$/.test(id)) return id;
    }
    const parts = parsed.pathname.split("/");
    const idx = parts.findIndex((p) => ["embed", "v", "shorts"].includes(p));
    if (idx !== -1 && parts[idx + 1] && /^[a-zA-Z0-9_-]{11}$/.test(parts[idx + 1])) {
      return parts[idx + 1];
    }
  } catch (e) {
  }
  const match = input.match(/([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : "";
};

router.put("/:id", auth, async (req, res) => {
  try {
    const { youtube_id, title_en, title_te } = req.body;

    await db.query(
      `UPDATE video_items
       SET youtube_id=?, title_en=?, title_te=?
       WHERE id=?`,
      [youtube_id, title_en, title_te, req.params.id]
    );

    res.json({ success: true });
  } catch (err) {
    console.error("VIDEO UPDATE ERROR:", err);
    res.status(500).json({ success: false });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    await db.query(
      "DELETE FROM video_items WHERE id=?",
      [req.params.id]
    );

    res.json({ success: true });
  } catch (err) {
    console.error("VIDEO DELETE ERROR:", err);
    res.status(500).json({ success: false });
  }
});

router.get("/albums", async (req, res) => {
  try {
    const [albums] = await db.query(
      "SELECT * FROM video_albums ORDER BY id DESC"
    );
    res.json(albums);
  } catch (err) {
    console.error("VIDEO ALBUM FETCH ERROR:", err);
    res.status(500).json({ message: "Failed to fetch video albums" });
  }
});

router.post("/albums", auth, async (req, res) => {
  try {
    const { title_te, title_en, category, cover_image } = req.body;

    const [result] = await db.query(
      `INSERT INTO video_albums
       (title_te, title_en, category, cover_image)
       VALUES (?, ?, ?, ?)`,
      [title_te, title_en, category, cover_image]
    );

    res.json({
      success: true,
      message: "Video album created",
      albumId: result.insertId
    });
  } catch (err) {
    console.error("VIDEO ALBUM CREATE ERROR:", err);
    res.status(500).json({ message: "Failed to create video album" });
  }
});

router.get("/albums/:albumId/videos", async (req, res) => {
  try {
    const { albumId } = req.params;

    const [videos] = await db.query(
      `SELECT * FROM video_items
       WHERE album_id = ?
       ORDER BY id DESC`,
      [albumId]
    );

    res.json(videos);
  } catch (err) {
    console.error("VIDEO ITEMS FETCH ERROR:", err);
    res.status(500).json({ message: "Failed to fetch videos" });
  }
});

router.post("/albums/:albumId/videos", auth, async (req, res) => {
  try {
    const { youtube_url, youtube_id: bodyYoutubeId, title_te, title_en } = req.body;
    const { albumId } = req.params;

    let youtube_id = "";
    // Prefer direct youtube_id if valid
    if (bodyYoutubeId && /^[a-zA-Z0-9_-]{11}$/.test(bodyYoutubeId)) {
      youtube_id = bodyYoutubeId;
    } else if (youtube_url) {
      youtube_id = getYoutubeId(youtube_url);
    }

    if (!youtube_id) {
      return res.status(400).json({
        success: false,
        message: "Invalid YouTube link or ID"
      });
    }

    await db.query(
      `INSERT INTO video_items
       (album_id, youtube_id, title_te, title_en)
       VALUES (?, ?, ?, ?)`,
      [albumId, youtube_id, title_te || "", title_en || ""]
    );

    res.json({
      success: true,
      message: "Video added successfully"
    });

  } catch (error) {
    console.error("VIDEO ITEM CREATE ERROR:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get("/albums/:albumId", async (req, res) => {
  try {
    const { albumId } = req.params;

    const [albumRows] = await db.query(
      "SELECT * FROM video_albums WHERE id = ?",
      [albumId]
    );

    if (!albumRows.length) {
      return res.status(404).json({ message: "Album not found" });
    }

    const [videos] = await db.query(
      `SELECT * FROM video_items
       WHERE album_id = ?
       ORDER BY id DESC`,
      [albumId]
    );

    res.json({
      album: albumRows[0],
      videos
    });

  } catch (err) {
    console.error("VIDEO ALBUM FETCH ERROR:", err);
    res.status(500).json({ message: "Failed to fetch album" });
  }
});

module.exports = router;