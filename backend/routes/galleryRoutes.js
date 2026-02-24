const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const db = require("../db/database");
const auth = require("../middleware/auth");

const router = express.Router();


router.put('/album/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { title_te, title_en, category } = req.body;

    if (!title_te || !title_en || !category) {
      return res.status(400).json({ message: "Title and category required" });
    }

    const [result] = await db.query(
      'UPDATE gallery_albums SET title_te = ?, title_en = ?, category = ? WHERE id = ?',
      [title_te, title_en, category, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Album not found" });
    }

    res.json({ success: true, message: "Album updated successfully" });
  } catch (err) {
    console.error("ALBUM UPDATE ERROR:", err);
    res.status(500).json({ message: "Album update failed" });
  }
});


router.get('/', async (req, res) => {
  try {
    const [albums] = await db.query(
      `SELECT 
          ga.*,
          COUNT(gi.id) AS total_images,
          MIN(gi.image) AS cover_image
       FROM gallery_albums ga
       LEFT JOIN gallery_images gi 
         ON ga.id = gi.album_id
       GROUP BY ga.id
       ORDER BY ga.id DESC`
    );
    res.json(albums);
  } catch (err) {
    console.error("FETCH ALL GALLERY ALBUMS ERROR:", err);
    res.status(500).json({ message: "Fetch failed" });
  }
});

const uploadDir = path.join(__dirname, "..", "uploads", "gallery");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}


const allowedImageTypes = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/jpg",
];

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const validExts = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
    const safeExt = validExts.includes(ext) ? ext : ".jpg";

    cb(
      null,
      Date.now() +
        "-" +
        path.basename(file.originalname, ext) +
        safeExt
    );
  },
});

const upload = multer({
  storage,
  limits: { files: 20 },
  fileFilter: (req, file, cb) => {
    if (allowedImageTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Only image files (jpg, jpeg, png, gif, webp) are allowed."
        )
      );
    }
  },
});


router.get("/category/:category", async (req, res) => {
  try {
    const { category } = req.params;

    const [albums] = await db.query(
      `SELECT 
          ga.*,
          COUNT(gi.id) AS total_images,
          MIN(gi.image) AS cover_image
       FROM gallery_albums ga
       LEFT JOIN gallery_images gi 
         ON ga.id = gi.album_id
       WHERE ga.category = ?
       GROUP BY ga.id
       ORDER BY ga.id DESC`,
      [category]
    );

    res.json(albums);
  } catch (err) {
    console.error("FETCH ALBUMS BY CATEGORY ERROR:", err);
    res.status(500).json({ message: "Fetch failed" });
  }
});


router.get("/album/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [albumRows] = await db.query(
      "SELECT * FROM gallery_albums WHERE id = ?",
      [id]
    );

    if (!albumRows.length) {
      return res.status(404).json({ message: "Album not found" });
    }

    const [imageRows] = await db.query(
      "SELECT * FROM gallery_images WHERE album_id = ? ORDER BY id DESC",
      [id]
    );

    res.json({
      album: albumRows[0],
      images: imageRows,
    });
  } catch (err) {
    console.error("ALBUM FETCH ERROR:", err);
    res.status(500).json({ message: "Fetch failed" });
  }
});

router.post(
  "/album",
  auth,
  upload.array("images", 20),
  async (req, res) => {
    try {
      const { title_te, title_en, category } = req.body;

      if (!title_te || !title_en || !category) {
        return res.status(400).json({
          message: "Title and category required",
        });
      }

      if (!req.files || req.files.length === 0) {
        return res
          .status(400)
          .json({ message: "Minimum 1 image required" });
      }

      if (req.files.length > 20) {
        return res
          .status(400)
          .json({ message: "Maximum 20 images allowed" });
      }

      // create album
      const [albumResult] = await db.query(
        "INSERT INTO gallery_albums (title_te, title_en, category) VALUES (?, ?, ?)",
        [title_te, title_en, category]
      );

      const albumId = albumResult.insertId;

      // insert images
      for (const file of req.files) {
        await db.query(
          "INSERT INTO gallery_images (album_id, image) VALUES (?, ?)",
          [albumId, file.filename]
        );
      }

      res.json({
        success: true,
        message: "Album created successfully",
        albumId,
      });
    } catch (err) {
      console.error("ALBUM CREATE ERROR:", err);
      res.status(500).json({ message: "Album creation failed" });
    }
  }
);

router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    // delete images from disk first
    const [images] = await db.query(
      "SELECT image FROM gallery_images WHERE album_id = ?",
      [id]
    );

    for (const img of images) {
      const filePath = path.join(uploadDir, img.image);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    // delete DB records
    await db.query("DELETE FROM gallery_images WHERE album_id = ?", [id]);
    await db.query("DELETE FROM gallery_albums WHERE id = ?", [id]);

    res.json({ message: "Album deleted successfully" });
  } catch (err) {
    console.error("DELETE ALBUM ERROR:", err);
    res.status(500).json({ message: "Delete failed" });
  }
});

module.exports = router;