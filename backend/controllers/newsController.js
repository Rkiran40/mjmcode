const pool = require("../db/database");


// controllers/newsController.js
exports.getBreakingNews = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT *
      FROM news
      WHERE category = 'breaking'
      ORDER BY created_at DESC
      LIMIT 5
    `);
    res.status(200).json(rows);
  } catch (err) {
    console.error("BREAKING NEWS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch breaking news" });
  }
};/**
 * GET ALL NEWS
 * Home + Latest
 */
exports.getAllNews = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT id, title_te, title_en,
             summary_te, summary_en,
             category, image, created_at
      FROM news
      ORDER BY created_at DESC
    `);

    res.status(200).json(rows);
  } catch (err) {
    console.error("NEWS FETCH ERROR:", err);
    res.status(500).json({ message: "Failed to fetch news" });
  }
};

/**
 * GET NEWS BY CATEGORY
 */
exports.getNewsByCategory = async (req, res) => {
  try {
    const { name } = req.params;

    const [rows] = await pool.query(
      `
      SELECT id, title_te, title_en,
             summary_te, summary_en,
             category, image, created_at
      FROM news
      WHERE category = ?
      ORDER BY created_at DESC
      `,
      [name]
    );

    res.json(rows);
  } catch (err) {
    console.error("CATEGORY ERROR:", err);
    res.status(500).json({ message: "Failed to fetch category news" });
  }
};

/**
 * GET SINGLE NEWS
 */
exports.getSingleNews = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await pool.query(
      "SELECT * FROM news WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "News not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("SINGLE NEWS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch news" });
  }
};

/**
 * ADD NEWS
 */
exports.addNews = async (req, res) => {
  try {
    const {
      title_te,
      title_en,
      summary_te,
      summary_en,
      content_te,
      content_en,
      category,
      image,
    } = req.body;

    const [result] = await pool.query(
      `
      INSERT INTO news
      (title_te, title_en, summary_te, summary_en,
       content_te, content_en, category, image)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        title_te,
        title_en,
        summary_te,
        summary_en,
        content_te,
        content_en,
        category,
        image,
      ]
    );

    res.status(201).json({
      message: "News added successfully",
      id: result.insertId,
    });
  } catch (err) {
    console.error("ADD NEWS ERROR:", err);
    res.status(500).json({ message: "Insert failed" });
  }
};

/**
 * UPDATE NEWS
 */
exports.updateNews = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      `
      UPDATE news SET
      title_te = ?, title_en = ?,
      summary_te = ?, summary_en = ?,
      content_te = ?, content_en = ?,
      category = ?, image = ?
      WHERE id = ?
      `,
      [
        req.body.title_te,
        req.body.title_en,
        req.body.summary_te,
        req.body.summary_en,
        req.body.content_te,
        req.body.content_en,
        req.body.category,
        req.body.image,
        id,
      ]
    );

    res.json({ message: "News updated successfully" });
  } catch (err) {
    console.error("UPDATE NEWS ERROR:", err);
    res.status(500).json({ message: "Update failed" });
  }
};

/**
 * DELETE NEWS
 */
exports.deleteNews = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM news WHERE id = ?", [id]);

    res.json({ message: "News deleted successfully" });
  } catch (err) {
    console.error("DELETE NEWS ERROR:", err);
    res.status(500).json({ message: "Delete failed" });
  }
};

