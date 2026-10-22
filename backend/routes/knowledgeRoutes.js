const express = require("express");

const router = express.Router();

const {
  getArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
} = require("../controllers/knowledgeController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.get("/articles", authMiddleware, getArticles);

router.get("/articles/:id", authMiddleware, getArticleById);

router.post(
  "/createarticle",
  authMiddleware,
  roleMiddleware("support_admin"),
  createArticle,
);

router.patch(
  "/updatearticle/:id",
  authMiddleware,
  roleMiddleware("support_admin"),
  updateArticle,
);

router.delete(
  "/deletearticle/:id",
  authMiddleware,
  roleMiddleware("support_admin"),
  deleteArticle,
);

module.exports = router;
