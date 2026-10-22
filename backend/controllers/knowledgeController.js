const Article = require("../models/Article");

const getArticles = async (req, res) => {
  try {
    const filter = req.userRole === "support_admin" ? {} : { visibility: "Published" };

    const allArticles = await Article.find(filter).sort({ updatedAt: -1 });

    // const allArticles = await Article.find();
    if (allArticles.length === 0) {
      return res.status(404).json({
        status: false,
        message: "Articles Not found",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "Articles found",
        allArticles,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Unable to fetch articles" });
  }
};


const getArticleById = async (req, res) => {
  const { id } = req.params;

  try {
    const articleData = await Article.findById(id);

    if (
      !articleData ||
      (articleData.visibility !== "Published" &&
        req.userRole !== "support_admin")
    ) {
      return res.status(404).json({
        status: false,
        message: "Article Not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Articles found",
      articleData,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Unable to fetch article",
    });
  }
};


const createArticle = async (req, res) => {
  const { title, content, category, visibility } = req.body;

  if (!title || !content || !category) {
    return res.status(400).json({
      status: false,
      message: "All field Required",
    });
  }

  try {
    await Article.create({
      title,
      content,
      category,
      visibility,
    });
    return res.status(201).json({
      status: true,
      message: "Article Created",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Article Creation failed" });
  }
};

const updateArticle = async (req, res) => {
  const { id } = req.params;
  const { title, content, category, visibility, tags } = req.body;

  try {
    const updatedArticle = await Article.findByIdAndUpdate(
      id,
      {
        title,
        content,
        category,
        visibility,
        tags,
      },
      { returnDocument: "after", runValidators: true },
    );

    if (!updatedArticle) {
      return res.status(404).json({
        status: false,
        message: "Article not found",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "Article updated",
        updatedArticle,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Unable to update article" });
  }
};

const deleteArticle = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedArticle = await Article.findByIdAndDelete(id);

    if (!deletedArticle) {
      return res.status(404).json({
        status: false,
        message: "Article not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Article deleted",
    });
  } catch (error) {
    console.error("Article deletion failed:", error.message);

    return res.status(500).json({
      status: false,
      message: "Article deletion failed",
    });
  }
};
module.exports = {
  getArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
};
