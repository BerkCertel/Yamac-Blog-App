const express = require("express");

const {
  allArticle,
  createArticle,
  detailsArticle,
  deleteArticle,
  updateArticle,
  createReviews,
  adminArticles,
  AdminDeleteReview,
} = require("../controllers/article.js");
const { authenticationMid, roleChecked } = require("../middleware/auth.js");

const router = express.Router();

router.get(`/articles`, allArticle);
router.get(
  `/admin/articles`,
  authenticationMid,
  roleChecked("admin"),
  adminArticles
);
router.get(`/article/:id`, detailsArticle);
router.post(`/article/newReview`, authenticationMid, createReviews);
router.post(
  `/article/new`,
  authenticationMid,
  roleChecked("admin"),
  createArticle
);
router.put(
  `/article/:id`,
  authenticationMid,
  roleChecked("admin"),
  updateArticle
);
router.delete(
  `/article/:id`,
  authenticationMid,
  roleChecked("admin"),
  deleteArticle
);
router.delete(
  "/article/:articleId/review/:reviewId",
  authenticationMid,
  roleChecked("admin"),
  AdminDeleteReview
);

module.exports = router;
