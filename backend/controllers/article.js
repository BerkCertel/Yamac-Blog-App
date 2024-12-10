const Article = require("../models/article.js");

const allArticle = async (req, res) => {
  try {
    const articles = await Article.find({});
    res.status(200).json({ articles });
  } catch (error) {
    console.error("Error fetching articles:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const detailsArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    res.status(200).json({ article });
  } catch (error) {
    console.error("Error fetching article:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Admin all
const adminArticles = async (req, res, next) => {
  try {
    const articles = await Article.find({});
    res.status(200).json({ articles });
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Admin Create
const createArticle = async (req, res) => {
  try {
    const articleData = req.body;

    const article = await Article.create(articleData);
    res.status(201).json({ article });
  } catch (error) {
    console.error("Error fetching articles:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Admin Delete
const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Kitap bulunamadı." });
    }

    await Article.findByIdAndDelete(req.params.id);

    res
      .status(200)
      .json({ message: "The article has been deleted successfully" });
  } catch (error) {
    console.error("Error fetching articles:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Admin Update
const updateArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    article = await Article.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res
      .status(200)
      .json({ message: "The Article has been deleted successfully" });
  } catch (error) {
    console.error("Error fetching Articles:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Reviews Create
const createReviews = async (req, res, next) => {
  const { articleId, comment } = req.body;

  if (!comment) {
    return res.status(400).json({ message: "Yorum boş bırakılamaz." });
  }

  try {
    const article = await Article.findById(articleId);

    if (!article) {
      return res.status(404).json({ message: "Kitap bulunamadı." });
    }

    const newReview = {
      user: req.user._id,
      name: req.user.name,
      comment,
    };

    article.reviews.push(newReview);

    await article.save();

    return res.status(200).json({ message: "Yorum başarıyla eklendi!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Bir hata oluştu." });
  }
};

//Delete Review
const AdminDeleteReview = async (req, res) => {
  try {
    const article = await Article.findById(req.params.articleId);

    if (!article) {
      return res.status(404).json({ message: "Kitap bulunamadı." });
    }

    const { reviewId } = req.params;

    const reviewIndex = article.reviews.findIndex(
      (review) => review._id.toString() === reviewId
    );

    if (reviewIndex === -1) {
      return res.status(404).json({ message: "Yorum bulunamadı." });
    }

    article.reviews.splice(reviewIndex, 1);

    await article.save();

    res.status(200).json({ message: "Yorum başarıyla silindi." });
  } catch (error) {
    console.error("Yorum silinirken hata oluştu:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  allArticle,
  createArticle,
  detailsArticle,
  deleteArticle,
  updateArticle,
  createReviews,
  adminArticles,
  AdminDeleteReview,
};
