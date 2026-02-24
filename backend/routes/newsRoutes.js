const express = require("express");
const router = express.Router();

const {
  getAllNews,
  getNewsByCategory,
  getSingleNews,
  addNews,
  updateNews,
  deleteNews,
  getBreakingNews, // ✅ now exists
} = require("../controllers/newsController");

router.get("/breaking-news", getBreakingNews);

router.get("/", getAllNews);
router.get("/category/:name", getNewsByCategory);
router.get("/breaking-news", getBreakingNews);
router.get("/:id", getSingleNews);

router.post("/", addNews);
router.put("/:id", updateNews);
router.delete("/:id", deleteNews);

module.exports = router;
