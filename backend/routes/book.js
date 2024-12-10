const express = require("express");
const {
  allBooks,
  detaislBook,
  createBook,
  deleteBook,
  updateBook,
  createReviews,
  adminBooks,
  AdminDeleteReview,
} = require("../controllers/book.js");
const { authenticationMid, roleChecked } = require("../middleware/auth.js");

const router = express.Router();

router.get(`/books`, allBooks);
router.get(`/admin/books`, authenticationMid, roleChecked("admin"), adminBooks);
router.get(`/book/:id`, detaislBook);
router.post(`/book/new`, authenticationMid, roleChecked("admin"), createBook);
router.post(`/book/newReview`, authenticationMid, createReviews);
router.put(`/book/:id`, authenticationMid, roleChecked("admin"), updateBook);
router.delete(`/book/:id`, authenticationMid, roleChecked("admin"), deleteBook);
router.delete(
  "/book/:bookId/review/:reviewId",
  authenticationMid,
  roleChecked("admin"),
  AdminDeleteReview
);

module.exports = router;
